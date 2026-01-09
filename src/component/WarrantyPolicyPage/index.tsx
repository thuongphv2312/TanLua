import React from 'react';
import { Layout, Typography, Card, Divider } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ToolOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import ContactInfoSection from '../ContactInfoSection';

const { Content } = Layout;
const { Title, Text } = Typography;

// --- 1. Constants & Styles ---
const COLORS = {
    primary: '#d32f2f', // Màu đỏ chủ đạo
    text: '#333',
    textSecondary: '#444',
    textLight: '#666',
    link: '#1890ff',
    bg: '#f5f5f5',
    cardBg: '#fff',
    contactBg: '#fffaf0',
    contactBorder: '#ffe7ba',
};

const STYLES = {
    icon: { color: COLORS.primary, fontSize: '20px' },
    highlight: { color: COLORS.primary, fontWeight: 'bold' as const },
    sectionTitle: { fontSize: '20px', fontWeight: 'bold', color: COLORS.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' },
    list: { fontSize: '15px', lineHeight: '1.8', color: COLORS.textSecondary, listStyleType: 'none', padding: 0, textAlign: 'left' as const, width: '100%' },
    listItem: { display: 'flex', alignItems: 'flex-start', marginBottom: '15px' },
    bullet: { color: COLORS.primary, marginRight: '8px', lineHeight: '1.8', flexShrink: 0 },
};

// --- 2. Data Structure ---
interface PolicyItem {
    content: React.ReactNode;
}

interface PolicySection {
    title: string;
    icon: React.ReactNode;
    items: PolicyItem[];
    footer?: React.ReactNode;
}

const POLICY_DATA: PolicySection[] = [
    {
        title: 'Quy định chung',
        icon: <InfoCircleOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Bảo hành sản phẩm là: khắc phục những lỗi hỏng hóc, sự cố kỹ thuật xảy ra do lỗi của nhà sản xuất.
                    </>
                )
            },
            {
                content: (
                    <>
                        Quý khách vui lòng kiểm tra thật kỹ hàng hoá, đối chiếu sản phẩm với chứng từ, phiếu bảo hành (nếu có) trước khi nhận hàng nhằm đảm bảo quyền lợi của Quý khách trong việc Đổi/Trả hàng và Bảo hành sản phẩm.
                    </>
                )
            }
        ]
    },
    {
        title: '1. Trường hợp được bảo hành',
        icon: <CheckCircleOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Trong trường hợp sự cố hư hỏng được xác định do <Text style={STYLES.highlight}>lỗi của nhà sản xuất</Text> và vẫn còn thời hạn bảo hành.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm <Text strong>không có dấu hiệu can thiệp của bên thứ 03</Text> (sửa chữa ngoài).
                    </>
                )
            },
            {
                content: (
                    <>
                        Số series, tem niêm phong trên sản phẩm và phiếu bảo hành phải <Text style={STYLES.highlight}>giống nhau, nguyên vẹn</Text>, không rách mất hoặc bị cạo sửa.
                    </>
                )
            },
            {
                content: (
                    <>
                        Hàng hóa không bị tác động của môi trường (thấm nước, hóa chất ăn mòn, tác động nhiệt gây biến dạng).
                    </>
                )
            }
        ]
    },
    {
        title: '2. Những trường hợp không được bảo hành',
        icon: <CloseCircleOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Những sản phẩm không thể xác định được nguồn gốc mua tại Tấn Lụa Việt Nam, chúng tôi có quyền từ chối bảo hành.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm đã <Text style={STYLES.highlight}>quá thời hạn</Text> ghi trên Phiếu bảo hành hoặc <Text style={STYLES.highlight}>mất Phiếu bảo hành</Text>.
                    </>
                )
            },
            {
                content: (
                    <>
                        Phiếu bảo hành, hoặc tem bảo hành bị rách, không còn tem bảo hành, tem bảo hành dán đè hoặc bị sửa đổi.
                    </>
                )
            },
            {
                content: (
                    <>
                        Phiếu bảo hành không ghi rõ số Serial và ngày mua hàng.
                    </>
                )
            },
            {
                content: (
                    <>
                        Số Serial trên máy và Phiếu bảo hành không trùng khớp nhau hoặc không xác định được vì bất kỳ lý do nào.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm bị hư hỏng do tác động cơ học làm rơi, vỡ, va đập, trầy xước, móp méo, ẩm ướt, hoen rỉ hoặc do hỏa hoạn, thiên tai gây nên.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm có dấu hiệu hư hỏng do chuột bọ hoặc côn trùng xâm nhập.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm bị hư hỏng do sử dụng không đúng sách hướng dẫn, sử dụng sai điện áp quy định.
                    </>
                )
            },
            {
                content: (
                    <>
                        Tự ý tháo dỡ, thay đổi cấu trúc sản phẩm, sử dụng sai hướng dẫn, sử dụng linh kiện không đúng.
                    </>
                )
            }
        ]
    },
    {
        title: '3. Những trường hợp sửa chữa tính phí',
        icon: <ToolOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Trường hợp hàng hóa Quý khách mua tại Tấn Lụa Việt Nam nhưng nằm trong <b>Những trường hợp không được bảo hành</b> nêu ở trên thì chúng tôi sẽ nhận sửa chữa có tính phí (nếu Quý khách yêu cầu).
                    </>
                )
            },
            {
                content: (
                    <>
                        Những sản phẩm được mua tại Tấn Lụa Việt Nam nhưng đã quá thời hạn bảo hành, Công ty chúng tôi sẽ cung cấp dịch vụ sửa chữa tính phí cho Quý khách.
                    </>
                )
            },
            {
                content: (
                    <>
                        Phí sửa chữa sẽ do chúng tôi hoặc Nhà sản xuất báo với Quý khách (theo chi phí sửa chữa thực tế).
                    </>
                )
            }
        ]
    }
];

// --- 3. Main Component ---
const WarrantyPolicyPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: COLORS.bg }}>
            <Content style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: COLORS.cardBg }}>
                    <Title level={1} style={{ color: COLORS.text, fontSize: '28px', marginBottom: '40px', textAlign: 'left' }}>
                        CHÍNH SÁCH BẢO HÀNH
                    </Title>

                    <img
                        src="https://i.ibb.co/B5BYrZzw/https-lap-637595425811313703.jpg"
                        alt="Chính sách bảo hành"
                        style={{ width: '100%', height: 'auto', marginBottom: '30px', borderRadius: '8px' }}
                    />

                    {POLICY_DATA.map((section, index) => (
                        <div key={index} style={{ marginBottom: '40px' }}>
                            <Title level={3} style={STYLES.sectionTitle}>
                                {section.icon} {section.title}
                            </Title>

                            <ul style={STYLES.list}>
                                {section.items.map((item, idx) => (
                                    <li key={idx} style={STYLES.listItem}>
                                        <span style={STYLES.bullet}>•</span>
                                        <div style={{ flex: 1 }}>{item.content}</div>
                                    </li>
                                ))}
                            </ul>

                            {section.footer}

                            {index < POLICY_DATA.length - 1 && <Divider />}
                        </div>
                    ))}

                    {/* Thông tin liên hệ */}
                    <ContactInfoSection
                        title="TRUNG TÂM BẢO HÀNH & HỖ TRỢ KỸ THUẬT"
                        hotlineLabel="Hotline kỹ thuật"
                        timeLabel="Thời gian tiếp nhận bảo hành"
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default WarrantyPolicyPage;
