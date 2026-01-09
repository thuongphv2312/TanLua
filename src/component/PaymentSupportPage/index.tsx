import React from 'react';
import { Layout, Typography, Card, Divider } from 'antd';
import {
    ShopOutlined,
    CarOutlined,
    BankOutlined,
    CreditCardOutlined
} from '@ant-design/icons';
import ContactInfoSection from '../ContactInfoSection';
import { EMAIL } from '../NewsPage/constants';

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
        title: '1. Thanh toán trực tiếp tại phòng bán hàng',
        icon: <ShopOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Quý khách có thể đến xem và mua hàng trực tiếp tại các văn phòng của Tấn Lụa Việt Nam.
                    </>
                )
            },
            {
                content: (
                    <>
                        Vui lòng thanh toán trực tiếp bằng <Text style={STYLES.highlight}>TIỀN MẶT</Text> hoặc <Text style={STYLES.highlight}>CÀ THẺ</Text> thông qua nhân viên bán hàng.
                    </>
                )
            }
        ]
    },
    {
        title: '2. Giao hàng thu tiền tại nhà (COD)',
        icon: <CarOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        <Text strong>Đối với khách hàng nội thành Hà Nội & TP. Hồ Chí Minh:</Text><br />
                        Nhân viên của chúng tôi sẽ giao hàng tận nhà (nếu khách hàng yêu cầu).
                        Quý khách vui lòng thanh toán tiền trực tiếp cho nhân viên giao hàng bằng <Text strong>tiền mặt</Text>.
                    </>
                )
            },
            {
                content: (
                    <>
                        <Text strong>Đối với khách hàng ở tỉnh xa:</Text><br />
                        Chúng tôi sẽ ủy quyền cho các đơn vị chuyển phát uy tín như VNPT, Viettel... giao hàng và thu tiền hộ.
                        Quý khách thanh toán cho nhân viên chuyển phát bằng <Text strong>tiền mặt</Text> hoặc <Text strong>quẹt thẻ</Text> (nếu đơn vị vận chuyển hỗ trợ).
                    </>
                )
            }
        ]
    },
    {
        title: '3. Chuyển khoản qua ngân hàng',
        icon: <BankOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Chúng tôi luôn khuyến khích Quý khách thanh toán chuyển khoản qua ngân hàng để nhanh chóng và tiện lợi.
                    </>
                )
            },
            {
                content: (
                    <>
                        Ngay sau khi nhận được thông báo từ ngân hàng, chúng tôi sẽ thực hiện đơn hàng và chuyển hàng theo yêu cầu của Quý khách.
                    </>
                )
            },
            {
                content: (
                    <>
                        Quý khách nên chuyển tiền <Text style={STYLES.highlight}>cùng hệ thống ngân hàng</Text> để đảm bảo tiết kiệm chi phí và chuyển tiền nhanh chóng (chỉ mất khoảng 10 phút).
                    </>
                )
            }
        ],
        footer: (
            <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f0f5ff', borderRadius: '8px', border: '1px dashed #1890ff' }}>
                <Text strong style={{ color: COLORS.link }}>
                    <InfoCircleOutlined style={{ marginRight: '8px' }} />
                    Lưu ý: Nội dung chuyển khoản vui lòng ghi rõ "Tên khách hàng - Số điện thoại - Mã đơn hàng" để chúng tôi dễ dàng xác nhận.
                </Text>
            </div>
        )
    },
    {
        title: '4. Thanh toán quốc tế',
        icon: <CreditCardOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Trường hợp Quý khách hàng đang ở nước ngoài, vui lòng liên hệ trực tiếp qua Email: <a href={`mailto:${EMAIL}`} style={{ color: COLORS.link }}>{EMAIL}</a> để được hướng dẫn phương thức thanh toán quốc tế phù hợp.
                    </>
                )
            }
        ]
    }
];

// --- 3. Main Component ---
import { InfoCircleOutlined } from '@ant-design/icons'; // Import bổ sung cho footer section

const PaymentSupportPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: COLORS.bg }}>
            <Content style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: COLORS.cardBg }}>
                    <Title level={1} style={{ color: COLORS.text, fontSize: '28px', marginBottom: '40px', textAlign: 'left' }}>
                        HƯỚNG DẪN THANH TOÁN
                    </Title>

                    <img
                        src="https://i.ibb.co/3ykJd0Zz/chinh-sach-doi-tra.jpg" // Có thể thay bằng ảnh thanh toán nếu có
                        alt="Hướng dẫn thanh toán"
                        style={{ width: '100%', height: 'auto', marginBottom: '30px', borderRadius: '8px', display: 'none' }} // Tạm ẩn ảnh vì chưa có ảnh phù hợp
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
                        title="LIÊN HỆ HỖ TRỢ THANH TOÁN"
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default PaymentSupportPage;
