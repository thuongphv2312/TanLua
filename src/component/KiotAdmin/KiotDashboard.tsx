import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table, Input, Button, Tag, message, Tooltip, Modal, DatePicker, Select } from 'antd';
const { Option } = Select;

const { RangePicker } = DatePicker;
import {
    SyncOutlined,
    SearchOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    BellOutlined,
    LogoutOutlined,
    ArrowLeftOutlined,
    ReloadOutlined,
    ThunderboltOutlined,
    ExclamationCircleOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
    EyeOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import * as XLSX from 'xlsx';
import type { AdminTab, KiotCustomer, KiotOrder, KiotDebt, KiotStats } from './types';
import {
    getCustomers,
    getOrders,
    getDebts,
    searchCustomer,
    getStats,
    fullSync,
    incrementalSync,
    checkNewEvents,
    clearSession,
} from './kiotService';

interface KiotDashboardProps {
    retailerName: string;
    autoSync?: boolean;
}

interface ToastItem {
    id: number;
    message: string;
}

const KiotDashboard: React.FC<KiotDashboardProps> = ({ retailerName, autoSync = false }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<AdminTab>('customers');
    const [loading, setLoading] = useState(false);
    const [syncLoading, setSyncLoading] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Data states
    const [customers, setCustomers] = useState<KiotCustomer[]>([]);
    const [orders, setOrders] = useState<KiotOrder[]>([]);
    const [debts, setDebts] = useState<KiotDebt[]>([]);
    const [stats, setStats] = useState<KiotStats | null>(null);

    // Pagination
    const [customerPage, setCustomerPage] = useState(1);
    const [orderPage, setOrderPage] = useState(1);
    const [debtPage, setDebtPage] = useState(1);
    const [pageSize, setPageSize] = useState(100);
    const [dateRange, setDateRange] = useState<any>(null); // For orders filter
    const [orderSearch, setOrderSearch] = useState('');
    const [orderStatus, setOrderStatus] = useState<string | undefined>(undefined);
    const [debtSearch, setDebtSearch] = useState('');
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalDebts, setTotalDebts] = useState(0);

    // Debt Details & Export
    const [debtDetailVisible, setDebtDetailVisible] = useState(false);
    const [debtOrders, setDebtOrders] = useState<KiotOrder[]>([]);
    const [debtDetailLoading, setDebtDetailLoading] = useState(false);
    const [selectedDebtCustomer, setSelectedDebtCustomer] = useState<KiotDebt | null>(null);

    // Notifications
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const [newEventCount, setNewEventCount] = useState(0);
    const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const toastIdRef = useRef(0);

    // const PAGE_SIZE = 20; // Removed constant

    // ==================== Fullscreen ====================
    const dashboardRef = useRef<HTMLDivElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            dashboardRef.current?.requestFullscreen().catch((err: any) => {
                message.error(`Lỗi Fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    // ==================== Data Loading ====================

    const loadStats = useCallback(async () => {
        try {
            const result = await getStats();
            if (result.success) {
                setStats(result.stats);
            }
        } catch (err) {
            console.error('Error loading stats:', err);
        }
    }, []);

    const loadCustomers = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const result = await getCustomers(page, pageSize);
            if (result.success) {
                setCustomers(result.data);
                setTotalCustomers(result.total);
            }
        } catch (err) {
            console.error('Error loading customers:', err);
        } finally {
            setLoading(false);
        }
    }, [pageSize]);

    const loadOrders = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const from = dateRange ? dateRange[0].format('YYYY-MM-DD') : undefined;
            const to = dateRange ? dateRange[1].format('YYYY-MM-DD') : undefined;
            const result = await getOrders(page, pageSize, undefined, from, to, orderStatus, orderSearch);

            if (result.success) {
                setOrders(result.data);
                setTotalOrders(result.total);
            }
        } catch (err) {
            console.error('Error loading orders:', err);
        } finally {
            setLoading(false);
        }
    }, [pageSize, dateRange, orderStatus, orderSearch]);

    const loadDebts = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const result = await getDebts(page, pageSize, debtSearch);
            if (result.success) {
                setDebts(result.data);
                setTotalDebts(result.total);
            }
        } catch (err) {
            console.error('Error loading debts:', err);
        } finally {
            setLoading(false);
        }
    }, [pageSize, debtSearch]);

    // Initial load
    useEffect(() => {
        loadStats();
        // Trigger load for active tab
        if (activeTab === 'customers') loadCustomers(customerPage);
    }, [loadStats, loadCustomers, customerPage, pageSize]); // Add pageSize

    // Tab change
    useEffect(() => {
        if (activeTab === 'customers') loadCustomers(customerPage);
        else if (activeTab === 'orders') loadOrders(orderPage);
        else if (activeTab === 'debts') loadDebts(debtPage);
    }, [activeTab, customerPage, orderPage, debtPage, pageSize]);

    // ==================== Polling ====================

    useEffect(() => {
        pollingRef.current = setInterval(async () => {
            try {
                const result = await checkNewEvents();
                if (result.success && result.newEvents > 0) {
                    setNewEventCount(result.newEvents);
                    addToast(`🔔 ${result.newEvents} sự kiện mới từ KiotViet!`);
                }
            } catch {
                // Silent fail for polling
            }
        }, 30000); // 30 seconds

        return () => {
            if (pollingRef.current) clearInterval(pollingRef.current);
        };
    }, []);

    const addToast = (msg: string) => {
        const id = ++toastIdRef.current;
        setToasts(prev => [...prev, { id, message: msg }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 5000);
    };

    // ==================== Search ====================

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            loadCustomers(1);
            return;
        }
        setLoading(true);
        try {
            const result = await searchCustomer(searchQuery.trim());
            if (result.success) {
                setCustomers(result.data);
                setTotalCustomers(result.total);
                setActiveTab('customers');
            } else {
                message.warning(result.error || 'Không tìm thấy kết quả');
            }
        } catch (err) {
            message.error('Lỗi tìm kiếm');
        } finally {
            setLoading(false);
        }
    };

    // ==================== Debt Handlers ====================

    const renderStatus = (status: string | number) => {
        const statusMap: Record<string, string> = {
            '1': 'Phiếu tạm',
            '2': 'Đang xử lý',
            '3': 'Hoàn thành',
            '4': 'Đã hủy',
        };
        const s = String(status);
        const displayStatus = statusMap[s] || s;
        const colorMap: Record<string, string> = {
            'Hoàn thành': 'green',
            'Đang xử lý': 'blue',
            'Đã hủy': 'red',
            'Phiếu tạm': 'orange',
        };
        return <Tag color={colorMap[displayStatus] || 'default'}>{displayStatus}</Tag>;
    };

    const getStatusText = (status: string | number) => {
        const statusMap: Record<string, string> = {
            '1': 'Phiếu tạm',
            '2': 'Đang xử lý',
            '3': 'Hoàn thành',
            '4': 'Đã hủy',
        };
        const s = String(status);
        return statusMap[s] || s;
    }

    const exportToExcelHelper = (data: any[][], headers: string[], fileName: string) => {
        try {
            const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);

            // Auto-fit columns
            const wscols = headers.map((_, i) => {
                const maxContentLength = data.reduce((max, row) => Math.max(max, String(row[i] || '').length), 0);
                const headerLength = headers[i].length;
                return { wch: Math.max(maxContentLength, headerLength) + 5 };
            });
            worksheet['!cols'] = wscols;

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, fileName);
            message.success('Đã xuất file Excel thành công!');
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi xuất file Excel');
        }
    };

    const handleViewDebtDetails = async (record: KiotDebt) => {
        setSelectedDebtCustomer(record);
        setDebtDetailVisible(true);
        setDebtDetailLoading(true);
        try {
            const result = await getOrders(1, 100, String(record.customerId));
            if (result.success) {
                setDebtOrders(result.data);
            } else {
                message.error('Không thể tải lịch sử đơn hàng');
            }
        } catch (error) {
            console.error(error);
            message.error('Lỗi khi tải chi tiết');
        } finally {
            setDebtDetailLoading(false);
        }
    };

    const handleExportDebts = () => {
        if (debts.length === 0) {
            message.warning('Không có dữ liệu để xuất');
            return;
        }

        const headers = ['Mã KH', 'Tên khách hàng', 'Số điện thoại', 'Tổng nợ', 'Đã thanh toán', 'Còn lại', 'Cập nhật'];
        const data = debts.map(d => [
            d.customerId,
            d.customerName,
            d.phone,
            d.totalDebt,
            d.totalPaid,
            d.remaining,
            d.lastTransactionDate ? new Date(d.lastTransactionDate).toLocaleDateString('vi-VN') : ''
        ]);

        exportToExcelHelper(data, headers, `Tong_Hop_Cong_No_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const handleExportDebtDetails = () => {
        if (debtOrders.length === 0) {
            message.warning('Không có chi tiết để xuất');
            return;
        }

        const headers = ['Mã đơn', 'Ngày đặt', 'Khách hàng', 'SĐT', 'Sản phẩm', 'Tổng tiền', 'Giảm giá', 'Trạng thái'];
        const data = debtOrders.map(o => [
            o.code,
            o.purchaseDate ? new Date(o.purchaseDate).toLocaleDateString('vi-VN') : '',
            o.customerName,
            o.phone,
            o.products,
            o.totalAmount,
            o.discount,
            getStatusText(o.statusValue || o.status)
        ]);

        const fileName = `Chi_Tiet_Cong_No_${selectedDebtCustomer?.customerName || 'Khach_Hash'}_${new Date().toISOString().slice(0, 10)}.xlsx`;
        exportToExcelHelper(data, headers, fileName);
    };

    // ==================== Sync ====================

    const handleFullSync = () => {
        Modal.confirm({
            title: 'Full Sync',
            icon: <ExclamationCircleOutlined />,
            content: 'Thao tác này sẽ kéo TOÀN BỘ dữ liệu từ KiotViet và ghi đè dữ liệu cũ. Có thể mất vài phút. Bạn chắc chắn?',
            okText: 'Đồng bộ ngay',
            cancelText: 'Hủy',
            onOk: async () => {
                setSyncLoading(true);
                setSyncMessage('Đang đồng bộ toàn bộ dữ liệu...');
                try {
                    const result = await fullSync();
                    if (result.success) {
                        message.success(
                            `✅ Full sync hoàn tất! ${result.customers || 0} KH, ${result.orders || 0} đơn hàng`
                        );
                        loadStats();
                        loadCustomers(1);
                        setNewEventCount(0);
                    } else {
                        message.error(result.error || 'Lỗi đồng bộ');
                    }
                } catch (err: any) {
                    message.error('Lỗi: ' + (err.message || 'Vui lòng thử lại'));
                } finally {
                    setSyncLoading(false);
                    setSyncMessage('');
                }
            },
        });
    };

    const handleIncrementalSync = async () => {
        setSyncLoading(true);
        setSyncMessage('Đang đồng bộ dữ liệu mới...');
        try {
            const result = await incrementalSync();
            if (result.success) {
                const msg = result.newCustomers
                    ? `✅ Đồng bộ xong! +${result.newCustomers} KH mới, ${result.updatedCustomers || 0} cập nhật`
                    : '✅ Đồng bộ xong! Không có thay đổi mới.';
                message.success(msg);
                loadStats();
                if (activeTab === 'customers') loadCustomers(customerPage);
                else if (activeTab === 'orders') loadOrders(orderPage);
                else loadDebts(debtPage);
                setNewEventCount(0);
            } else {
                message.error(result.error || 'Lỗi đồng bộ');
            }
        } catch (err: any) {
            message.error('Lỗi: ' + (err.message || 'Vui lòng thử lại'));
        } finally {
            setSyncLoading(false);
            setSyncMessage('');
        }
    };

    // ==================== Logout ====================

    const handleLogout = () => {
        clearSession();
        window.location.reload();
    };

    // ==================== Auto Sync ====================
    useEffect(() => {
        if (autoSync) {
            handleIncrementalSync();
        }
    }, []);

    // ==================== Table Columns ====================

    const customerColumns = [
        {
            title: 'Mã KH',
            dataIndex: 'code',
            key: 'code',
            width: 100,
            render: (code: string, record: KiotCustomer) => (
                <span>
                    {code}
                    {record.isNew === 'true' && <span className="kiot-new-badge">MỚI</span>}
                </span>
            ),
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            render: (name: string) => <strong style={{ color: '#e2e8f0' }}>{name}</strong>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
            width: 130,
            render: (phone: string) => (
                <a href={`tel:${phone}`} style={{ color: '#a78bfa' }}>
                    {phone}
                </a>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 180,
            ellipsis: true,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            ellipsis: true,
            render: (_: unknown, record: KiotCustomer) => {
                const parts = [record.address, record.ward, record.district, record.city].filter(Boolean);
                return <Tooltip title={parts.join(', ')}>{parts.join(', ') || '—'}</Tooltip>;
            },
        },
        {
            title: 'Nhóm',
            dataIndex: 'group',
            key: 'group',
            width: 120,
            render: (group: string) => group ? <Tag color="purple">{group}</Tag> : '—',
        },
        {
            title: 'Công nợ',
            dataIndex: 'debt',
            key: 'debt',
            width: 120,
            sorter: (a: KiotCustomer, b: KiotCustomer) => Number(a.debt) - Number(b.debt),
            render: (debt: number) => {
                const val = Number(debt) || 0;
                return (
                    <span className={val > 0 ? 'kiot-debt-positive' : 'kiot-debt-zero'}>
                        {val > 0 ? val.toLocaleString('vi-VN') + '₫' : '0₫'}
                    </span>
                );
            },
        },
        {
            title: 'Doanh thu',
            dataIndex: 'totalRevenue',
            key: 'totalRevenue',
            width: 130,
            sorter: (a: KiotCustomer, b: KiotCustomer) => Number(a.totalRevenue) - Number(b.totalRevenue),
            render: (rev: number) => {
                const val = Number(rev) || 0;
                return <span style={{ color: '#34d399' }}>{val.toLocaleString('vi-VN')}₫</span>;
            },
        },
    ];

    const orderColumns = [
        {
            title: 'Mã đơn',
            dataIndex: 'code',
            key: 'code',
            width: 120,
            render: (code: string) => <strong style={{ color: '#60a5fa' }}>{code}</strong>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            ellipsis: true,
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            key: 'products',
            ellipsis: true,
            render: (products: string) => <Tooltip title={products}>{products || '—'}</Tooltip>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            width: 130,
            sorter: (a: KiotOrder, b: KiotOrder) => Number(a.totalAmount) - Number(b.totalAmount),
            render: (amount: number) => (
                <strong style={{ color: '#fbbf24' }}>
                    {(Number(amount) || 0).toLocaleString('vi-VN')}₫
                </strong>
            ),
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            width: 100,
            render: (d: number) => {
                const val = Number(d) || 0;
                return val > 0 ? <span style={{ color: '#f87171' }}>-{val.toLocaleString('vi-VN')}₫</span> : '—';
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'statusValue',
            key: 'statusValue',
            width: 120,
            render: (status: string | number) => {
                const statusMap: Record<number, string> = {
                    1: 'Phiếu tạm',
                    2: 'Đang xử lý',
                    3: 'Hoàn thành',
                    4: 'Đã hủy',
                };
                const displayStatus = typeof status === 'number' ? (statusMap[status] || status) : status;

                const colorMap: Record<string, string> = {
                    'Hoàn thành': 'green',
                    'Đang xử lý': 'blue',
                    'Đã hủy': 'red',
                    'Phiếu tạm': 'orange',
                };
                return <Tag color={colorMap[String(displayStatus)] || 'default'}>{displayStatus || 'N/A'}</Tag>;
            },
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
            width: 140,
            render: (date: string) => {
                if (!date) return '—';
                try {
                    return new Date(date).toLocaleDateString('en-GB');
                } catch {
                    return date;
                }
            },
        },
    ];

    const debtColumns = [
        {
            title: 'Mã KH',
            dataIndex: 'customerId',
            key: 'customerId',
            width: 100,
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
            ellipsis: true,
            render: (name: string) => <strong style={{ color: '#e2e8f0' }}>{name}</strong>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 130,
            render: (phone: string) => (
                <a href={`tel:${phone}`} style={{ color: '#a78bfa' }}>{phone}</a>
            ),
        },
        {
            title: 'Tổng nợ',
            dataIndex: 'totalDebt',
            key: 'totalDebt',
            width: 130,
            sorter: (a: KiotDebt, b: KiotDebt) => Number(a.totalDebt) - Number(b.totalDebt),
            render: (debt: number) => (
                <strong className="kiot-debt-positive">
                    {(Number(debt) || 0).toLocaleString('vi-VN')}₫
                </strong>
            ),
        },
        {
            title: 'Đã thanh toán',
            dataIndex: 'totalPaid',
            key: 'totalPaid',
            width: 130,
            render: (paid: number) => (
                <span style={{ color: '#34d399' }}>
                    {(Number(paid) || 0).toLocaleString('vi-VN')}₫
                </span>
            ),
        },
        {
            title: 'Còn lại',
            dataIndex: 'remaining',
            key: 'remaining',
            width: 130,
            render: (r: number) => {
                const val = Number(r) || 0;
                return (
                    <strong style={{ color: val > 0 ? '#f87171' : '#34d399' }}>
                        {val.toLocaleString('vi-VN')}₫
                    </strong>
                );
            },
        },
        {
            title: 'Cập nhật',
            dataIndex: 'lastTransactionDate',
            key: 'lastTransactionDate',
            width: 140,
            render: (date: string) => {
                if (!date) return '—';
                try {
                    return new Date(date).toLocaleDateString('en-GB');
                } catch {
                    return date;
                }
            },
        },
        {
            title: 'Thao tác',
            key: 'action',
            width: 100,
            render: (_: any, record: KiotDebt) => (
                <Tooltip title="Xem chi tiết">
                    <Button
                        type="primary"
                        ghost
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDebtDetails(record)}
                    />
                </Tooltip>
            ),
        }
    ];

    // ==================== Render ====================

    return (
        <div
            className="kiot-admin-page"
            ref={dashboardRef}
            style={isFullscreen ? { backgroundColor: '#111827', overflowY: 'auto', maxHeight: '100vh' } : undefined}
        >
            <style>
                {`
                    .kiot-table-wrapper .ant-table-pagination {
                        margin-right: 20px !important;
                        margin-top: 16px !important;
                    }
                    .kiot-table-wrapper .ant-pagination-item {
                        margin-right: 8px !important;
                    }
                    .kiot-table-wrapper .ant-pagination-prev, 
                    .kiot-table-wrapper .ant-pagination-next,
                    .kiot-table-wrapper .ant-pagination-jump-prev,
                    .kiot-table-wrapper .ant-pagination-jump-next {
                        margin-right: 8px !important;
                    }
                `}
            </style>
            {/* Sync Loading Overlay */}
            {syncLoading && (
                <div className="kiot-loading-overlay">
                    <HashLoader color="#a855f7" size={60} />
                    <div className="loading-text">{syncMessage}</div>
                    <div className="loading-progress">Vui lòng không đóng trang trong quá trình đồng bộ...</div>
                </div>
            )}

            {/* Toast Notifications */}
            {toasts.length > 0 && (
                <div className="kiot-notification-toast">
                    {toasts.map((toast) => (
                        <div key={toast.id} className="kiot-toast-item">
                            <BellOutlined />
                            {toast.message}
                        </div>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            <Modal
                title={
                    <div>
                        <span style={{ marginRight: 8 }}>Chi tiết công nợ:</span>
                        <strong style={{ color: '#a78bfa' }}>{selectedDebtCustomer?.customerName}</strong>
                    </div>
                }
                open={debtDetailVisible}
                onCancel={() => setDebtDetailVisible(false)}
                footer={[
                    <Button
                        key="export"
                        icon={<DownloadOutlined />}
                        onClick={handleExportDebtDetails}
                        style={{ marginRight: 8 }}
                    >
                        Xuất Excel
                    </Button>,
                    <Button key="close" onClick={() => setDebtDetailVisible(false)}>
                        Đóng
                    </Button>
                ]}
                width={900}
                styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
            >
                {debtDetailLoading ? (
                    <div style={{ textAlign: 'center', padding: 40 }}>
                        <HashLoader color="#a855f7" size={40} />
                    </div>
                ) : (
                    <div>
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                            <div className="kiot-stat-card" style={{ padding: '10px 15px', minWidth: 150, background: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                                <div style={{ fontSize: 12, color: '#64748b' }}>Tổng nợ hiện tại</div>
                                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#ef4444' }}>
                                    {(selectedDebtCustomer?.totalDebt || 0).toLocaleString('vi-VN')}₫
                                </div>
                            </div>
                            <div className="kiot-stat-card" style={{ padding: '10px 15px', minWidth: 150, background: '#f8fafc', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                                <div style={{ fontSize: 12, color: '#64748b' }}>Số điện thoại</div>
                                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#334155' }}>
                                    {selectedDebtCustomer?.phone || '—'}
                                </div>
                            </div>
                        </div>

                        <h4 style={{ marginBottom: 12, color: '#475569' }}>Lịch sử đơn hàng gần đây</h4>
                        <Table
                            dataSource={debtOrders}
                            rowKey="orderId"
                            size="small"
                            columns={[
                                { title: 'Mã đơn', dataIndex: 'code', key: 'code', render: (t: string) => <b>{t}</b> },
                                { title: 'Ngày', dataIndex: 'purchaseDate', key: 'purchaseDate', render: (d: string) => new Date(d).toLocaleDateString('vi-VN') },
                                { title: 'Sản phẩm', dataIndex: 'products', key: 'products', ellipsis: true },
                                {
                                    title: 'Tổng tiền',
                                    dataIndex: 'totalAmount',
                                    key: 'totalAmount',
                                    render: (t: number) => <span style={{ color: '#d97706', fontWeight: 'bold' }}>{(t || 0).toLocaleString('vi-VN')}₫</span>
                                },
                                {
                                    title: 'Trạng thái',
                                    dataIndex: 'statusValue',
                                    key: 'statusValue',
                                    width: 120,
                                    render: (_: string | number, record: KiotOrder) => renderStatus(record.statusValue || record.status)
                                },
                            ]}
                            pagination={false}
                            scroll={{ y: 400 }}
                        />
                    </div>
                )}
            </Modal>

            <div className="kiot-admin-container">
                {/* Header */}
                <div className="kiot-dashboard-header">
                    <div className="kiot-dashboard-title">
                        <h2>📊 Quản lý KiotViet</h2>
                        {retailerName && (
                            <span className="kiot-retailer-badge">🏪 {retailerName}</span>
                        )}
                        {newEventCount > 0 && (
                            <Tag color="green" style={{ borderRadius: 20, fontWeight: 600 }}>
                                <BellOutlined /> {newEventCount} mới
                            </Tag>
                        )}
                    </div>

                    <div className="kiot-dashboard-actions">

                        <Button
                            className="kiot-back-btn"
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate('/')}
                        >
                            Trang chủ
                        </Button>
                        <Button
                            className="kiot-sync-btn incremental"
                            icon={<ReloadOutlined />}
                            onClick={handleIncrementalSync}
                            loading={syncLoading}
                        >
                            Đồng bộ mới
                        </Button>
                        <Button
                            className="kiot-sync-btn full"
                            icon={<SyncOutlined />}
                            onClick={handleFullSync}
                            loading={syncLoading}
                        >
                            Full Sync
                        </Button>
                        <Button
                            className="kiot-logout-btn"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </Button>
                        <Tooltip title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}>
                            <Button
                                className="kiot-fullscreen-btn"
                                icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
                                onClick={toggleFullScreen}
                                type="text"
                                size="large"
                                style={{
                                    color: '#fff',
                                    marginLeft: 8,
                                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            />
                        </Tooltip>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="kiot-stats-grid">
                    <div className="kiot-stat-card">
                        <div className="stat-icon purple"><TeamOutlined /></div>
                        <div className="stat-value">{stats?.totalCustomers?.toLocaleString('vi-VN') || '—'}</div>
                        <div className="stat-label">Tổng khách hàng</div>
                    </div>
                    <div className="kiot-stat-card">
                        <div className="stat-icon blue"><ShoppingCartOutlined /></div>
                        <div className="stat-value">{stats?.totalOrders?.toLocaleString('vi-VN') || '—'}</div>
                        <div className="stat-label">Tổng đơn hàng</div>
                    </div>
                    <div className="kiot-stat-card">
                        <div className="stat-icon green"><DollarOutlined /></div>
                        <div className="stat-value">
                            {stats?.totalRevenue ? stats.totalRevenue.toLocaleString('vi-VN') + '₫' : '—'}
                        </div>
                        <div className="stat-label">Tổng doanh thu</div>
                    </div>
                    <div className="kiot-stat-card">
                        <div className="stat-icon red"><ExclamationCircleOutlined /></div>
                        <div className="stat-value">{stats?.totalDebtAmount ? stats.totalDebtAmount.toLocaleString('vi-VN') + '₫' : '0₫'}</div>
                        <div className="stat-label">Khách còn nợ</div>
                    </div>
                    <div className="kiot-stat-card">
                        <div className="stat-icon orange"><ClockCircleOutlined /></div>
                        <div className="stat-value" style={{ fontSize: 16 }}>
                            {stats?.lastSyncTime && stats.lastSyncTime !== 'Chưa đồng bộ'
                                ? new Date(stats.lastSyncTime).toLocaleString('vi-VN')
                                : 'Chưa đồng bộ'}
                        </div>
                        <div className="stat-label">Đồng bộ lần cuối</div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="kiot-content-card">
                    {/* Tabs & Search */}
                    <div className="kiot-content-header">
                        <div className="kiot-tabs">
                            <button
                                className={`kiot-tab ${activeTab === 'customers' ? 'active' : ''}`}
                                onClick={() => setActiveTab('customers')}
                            >
                                <TeamOutlined /> Khách hàng ({totalCustomers})
                            </button>
                            <button
                                className={`kiot-tab ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')}
                            >
                                <ShoppingCartOutlined /> Đơn hàng ({totalOrders})
                            </button>
                            <button
                                className={`kiot-tab ${activeTab === 'debts' ? 'active' : ''}`}
                                onClick={() => setActiveTab('debts')}
                            >
                                <DollarOutlined /> Công nợ ({totalDebts})
                            </button>
                        </div>

                        {activeTab === 'customers' && (
                            <div className="kiot-search-input">
                                <Input
                                    prefix={<SearchOutlined />}
                                    placeholder="Tìm theo tên, SĐT, mã KH..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onPressEnter={handleSearch}
                                    allowClear
                                    onClear={() => { setSearchQuery(''); loadCustomers(1); }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Sync Info */}
                    <div className="kiot-sync-info">
                        <div className="kiot-sync-dot" />
                        <span>Polling mỗi 30 giây • Webhook đã kích hoạt</span>
                        {newEventCount > 0 && (
                            <Button
                                type="link"
                                size="small"
                                icon={<ThunderboltOutlined />}
                                onClick={handleIncrementalSync}
                                style={{ color: '#34d399', fontWeight: 600 }}
                            >
                                Cập nhật ngay ({newEventCount} mới)
                            </Button>
                        )}
                    </div>

                    {/* Table */}
                    <div className="kiot-table-wrapper">
                        {activeTab === 'orders' && (
                            <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <Input
                                    placeholder="Tìm mã đơn, tên KH, SĐT..."
                                    prefix={<SearchOutlined />}
                                    style={{ width: 250 }}
                                    allowClear
                                    value={orderSearch}
                                    onChange={e => setOrderSearch(e.target.value)}
                                    onPressEnter={() => loadOrders(1)}
                                />
                                <Select
                                    placeholder="Trạng thái"
                                    style={{ width: 150 }}
                                    allowClear
                                    value={orderStatus}
                                    onChange={val => { setOrderStatus(val); setOrderPage(1); }}
                                >
                                    <Option value="1">Phiếu tạm</Option>
                                    <Option value="2">Đang xử lý</Option>
                                    <Option value="3">Hoàn thành</Option>
                                    <Option value="4">Đã hủy</Option>
                                </Select>
                                <RangePicker
                                    onChange={(dates) => {
                                        setDateRange(dates);
                                        setOrderPage(1);
                                    }}
                                    format="DD/MM/YYYY"
                                    placeholder={['Từ ngày', 'Đến ngày']}
                                />
                                <Button type="primary" icon={<SearchOutlined />} onClick={() => loadOrders(1)}>
                                    Tìm kiếm
                                </Button>
                            </div>
                        )}
                        {activeTab === 'debts' && (
                            <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
                                <Input
                                    placeholder="Tìm khách nợ theo tên, SĐT..."
                                    prefix={<SearchOutlined />}
                                    style={{ width: 300 }}
                                    allowClear
                                    value={debtSearch}
                                    onChange={e => setDebtSearch(e.target.value)}
                                    onPressEnter={() => loadDebts(1)}
                                />
                                <Button type="primary" icon={<SearchOutlined />} onClick={() => loadDebts(1)}>
                                    Tìm kiếm
                                </Button>
                                <Button
                                    className="kiot-excel-btn"
                                    icon={<DownloadOutlined />}
                                    onClick={handleExportDebts}
                                    style={{ backgroundColor: '#10b981', borderColor: '#10b981', color: '#fff', marginLeft: 'auto' }}
                                >
                                    Xuất Excel
                                </Button>
                            </div>
                        )}
                        {activeTab === 'customers' && (
                            <Table
                                columns={customerColumns}
                                dataSource={customers}
                                rowKey="id"
                                loading={loading}
                                pagination={{
                                    current: customerPage,
                                    pageSize: pageSize,
                                    total: totalCustomers,
                                    onChange: (page, size) => {
                                        setCustomerPage(page);
                                        if (size !== pageSize) setPageSize(size);
                                    },
                                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} khách`,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['20', '50', '100'],
                                    position: ['bottomRight'],
                                    showQuickJumper: true
                                }}
                                scroll={{ x: 1000, y: 600 }}
                                size="middle"
                            />
                        )}

                        {activeTab === 'orders' && (
                            <Table
                                columns={orderColumns}
                                dataSource={orders}
                                rowKey="orderId"
                                loading={loading}
                                pagination={{
                                    current: orderPage,
                                    pageSize: pageSize,
                                    total: totalOrders,
                                    onChange: (page, size) => {
                                        setOrderPage(page);
                                        if (size !== pageSize) setPageSize(size);
                                    },
                                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} đơn`,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['20', '50', '100'],
                                    position: ['bottomRight'],
                                    showQuickJumper: true
                                }}
                                scroll={{ x: 900, y: 600 }}
                                size="middle"
                            />
                        )}

                        {activeTab === 'debts' && (
                            <Table
                                columns={debtColumns}
                                dataSource={debts}
                                rowKey="customerId"
                                loading={loading}
                                pagination={{
                                    current: debtPage,
                                    pageSize: pageSize,
                                    total: totalDebts,
                                    onChange: (page, size) => {
                                        setDebtPage(page);
                                        if (size !== pageSize) setPageSize(size);
                                    },
                                    showTotal: (total, range) => `${range[0]}-${range[1]} / ${total} khách`,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['20', '50', '100'],
                                    position: ['bottomRight'],
                                    showQuickJumper: true
                                }}
                                scroll={{ x: 800, y: 600 }}
                                size="middle"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KiotDashboard;
