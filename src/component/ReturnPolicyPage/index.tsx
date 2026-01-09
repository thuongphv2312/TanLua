import React from 'react';
import { Layout, Typography, Card, Divider } from 'antd';
import {
    UserOutlined,
    WarningOutlined,
    DollarOutlined,
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
                        Trong vòng <Text style={STYLES.highlight}>03 ngày</Text> kể từ ngày mua khách hàng sẽ được đổi mới sản phẩm có giá trị ngang bằng hoặc cao hơn sản phẩm đã mua.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm phải còn <Text strong>nguyên bao bì, chưa sử dụng, kích hoạt</Text>, và không nằm trong danh sách hạn chế đổi trả.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm còn mới 100% nguyên tem mác, nguyên đai, nguyên kiện ban đầu (không trầy xước, rách, nát, nứt vỡ…) và đầy đủ phụ kiện.
                    </>
                )
            }
        ]
    },
    {
        title: '1. Trường hợp đổi trả vì lý do từ phía khách hàng',
        icon: <UserOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        <Text strong>Đổi hàng (theo nhu cầu của khách):</Text> Trong vòng <Text style={STYLES.highlight}>07 ngày</Text>.
                        <br />- <Text strong>Miễn phí đổi</Text> với hàng có giá trị ngang bằng hoặc lớn hơn.
                        <br />- Thu phí <Text strong>10%</Text> (tối thiểu 20.000 VNĐ) nếu đổi hàng giá trị thấp hơn.
                    </>
                )
            },
            {
                content: (
                    <>
                        <Text strong>Trả hàng (vì khách không ưng ý):</Text> Trong vòng <Text style={STYLES.highlight}>03 ngày</Text>.
                        <br />- Quý khách chịu mức phí <Text strong>10%</Text> (tối thiểu 20.000 VNĐ) trên giá trị hàng hóa và chi phí vận chuyển, lắp đặt (nếu có).
                    </>
                )
            },
            {
                content: (
                    <>
                        <Text style={STYLES.highlight}>Điều kiện:</Text> Sản phẩm còn nguyên điều kiện ban đầu, hóa đơn, chưa qua sử dụng, nguyên bao bì, đầy đủ phụ kiện và quà tặng (nếu có).
                    </>
                )
            }
        ]
    },
    {
        title: '2. Đổi/Trả hàng không vì lý do từ phía khách hàng',
        icon: <WarningOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        <Text strong>Hàng giao bị bể vỡ, sai nội dung hoặc bị thiếu:</Text> Quý khách vui lòng kiểm tra ngay khi nhận hàng.
                        Nếu phát hiện, từ chối nhận hàng và báo ngay cho chúng tôi.
                        <br />Sau <Text strong>02 ngày</Text> kể từ ngày nhận hàng, chúng tôi có quyền từ chối hỗ trợ các khiếu nại này.
                    </>
                )
            },
            {
                content: (
                    <>
                        <Text strong>Hàng giao bị lỗi kỹ thuật:</Text> Khi có xác nhận từ Trung tâm bảo hành/kỹ thuật.
                        <br />Trong vòng <Text strong>03 ngày</Text>, nếu được xác nhận lỗi kỹ thuật, quý khách sẽ được đổi trả theo quy trình.
                    </>
                )
            }
        ]
    },
    {
        title: '3. Phương thức hoàn tiền',
        icon: <DollarOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Đổi sản phẩm mới cùng loại (Khách hàng chịu phí lắp đặt, vận chuyển nếu có).
                    </>
                )
            },
            {
                content: (
                    <>
                        Chuyển khoản qua ngân hàng hoặc hoàn tiền mặt tại cửa hàng.
                    </>
                )
            },
            {
                content: (
                    <>
                        Đối với thanh toán thẻ tín dụng quốc tế, hoàn tiền vào tài khoản thanh toán của chủ thẻ.
                    </>
                )
            }
        ]
    }
];

// --- 3. Main Component ---
const ReturnPolicyPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: COLORS.bg }}>
            <Content style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: COLORS.cardBg }}>
                    <Title level={1} style={{ color: COLORS.text, fontSize: '28px', marginBottom: '40px', textAlign: 'left' }}>
                        CHÍNH SÁCH ĐỔI TRẢ HÀNG
                    </Title>

                    <img
                        src="https://i.ibb.co/ymQV1D2n/chinh-sach-doi-tra-hang.jpg"
                        alt="Chính sách đổi trả hàng"
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

                    <ContactInfoSection
                        title="LIÊN HỆ HỖ TRỢ ĐỔI TRẢ"
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default ReturnPolicyPage;
