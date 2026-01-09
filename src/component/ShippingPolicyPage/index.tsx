import React from 'react';
import { Layout, Typography, Card, Divider } from 'antd';
import {
    CarOutlined,
    InfoCircleOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { EMAIL } from '../NewsPage/constants';
import ContactInfoSection from '../ContactInfoSection';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

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
// Định nghĩa nội dung text ở đây để dễ dàng thay đổi sau này
interface PolicyItem {
    content: React.ReactNode;
}

interface PolicySection {
    title: string;
    icon: React.ReactNode;
    items: PolicyItem[];
    footer?: React.ReactNode;
}

// https://i.ibb.co/mCnKfPpx/giao-hang.jpg

const POLICY_DATA: PolicySection[] = [
    {
        title: '1. Chính sách vận chuyển',
        icon: <CarOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        <Text style={STYLES.highlight}>Miễn phí giao hàng</Text> trong phạm vi <Text strong>nội thành Hà Nội</Text> và <Text strong>TP.Hồ Chí Minh</Text>.
                        Trường hợp Quý khách đề nghị giao hàng tận nơi <Text style={STYLES.highlight}>ngoại thành</Text> hoặc <Text style={STYLES.highlight}>liên tỉnh</Text> vui lòng
                        liên hệ với nhân viên kinh doanh hoặc qua email: <a href={`mailto:${EMAIL}`} style={{ color: COLORS.link }}>{EMAIL}</a>
                    </>
                )
            },
            {
                content: (
                    <>
                        <Text style={STYLES.highlight}>Chuyển phát nhanh (đảm bảo):</Text> Hàng hóa được gửi nhanh thông qua nhà cung cấp dịch vụ EMS.
                        Thời gian quý khách nhận được hàng thông thường trong khoảng từ <Text style={STYLES.highlight}>2 đến 4 ngày</Text>,
                        <Text style={STYLES.highlight}> hỏa tốc trong vòng 1 ngày</Text>.
                    </>
                )
            },
            { content: <><Text strong>Chuyển hàng bằng xe ô tô</Text> theo các tuyến liên tỉnh.</> },
            { content: <><Text strong>Chuyển hàng bằng đường tàu hỏa.</Text></> },
            {
                content: (
                    <>
                        <Text strong>Chuyển thường qua bưu điện:</Text> Hàng hóa được gửi theo đường bưu điện.
                        Với cách này, quý khách sẽ nhận được hàng trong khoảng thời gian từ <Text strong>3 đến 7 ngày</Text>.
                    </>
                )
            },
            { content: <><Text strong>Các phương thức khác</Text> do khách hàng yêu cầu.</> },
        ]
    },
    {
        title: '2. Một số lưu ý',
        icon: <InfoCircleOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Chính sách vận chuyển miễn phí <Text style={STYLES.highlight}>không áp dụng</Text> với những sản phẩm được mua trong
                        chương trình <Text strong>khuyến mại, giảm giá</Text>… hoặc những sản phẩm <Text strong>thanh lý</Text>.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong trường hợp địa chỉ nhận hàng của Quý khách trong ngõ ngách, vùng sâu vùng xa hiểm trở đi lại khó khăn,
                        Tấn Lụa Việt Nam có quyền <Text style={STYLES.highlight}>từ chối vận chuyển</Text> và giao hàng tại nơi Quý khách yêu cầu.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong trường hợp hàng đã vận chuyển đến địa điểm yêu cầu, nhưng vì một lý do nào đó khách hàng yêu cầu <Text style={STYLES.highlight}>trả lại hàng</Text>,
                        lúc đó khách hàng sẽ <Text style={STYLES.highlight}>chịu toàn bộ chi phí vận chuyển</Text> và các chi phí phát sinh khác.
                    </>
                )
            },
            {
                content: (
                    <>
                        Nếu người nhận không phải người mua, khách hàng cần <Text strong>ủy quyền</Text> thông qua văn bản hoặc Email.
                        Nếu không có xác nhận, chúng tôi có quyền từ chối giao hàng.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trường hợp đặc biệt như <Text strong>thiên tai, lũ lụt</Text>... dẫn đến giao hàng chậm trễ,
                        chúng tôi sẽ cùng khách hàng giải quyết trên tinh thần hợp tác.
                    </>
                )
            }
        ],
        footer: (
            <Paragraph style={{ fontSize: '15px', color: COLORS.textLight, marginTop: '20px', fontStyle: 'italic', borderLeft: `4px solid ${COLORS.primary}`, paddingLeft: '15px' }}>
                Quý khách vui lòng liên hệ trực tiếp với nhân viên kinh doanh để được hướng dẫn cụ thể hơn.
            </Paragraph>
        )
    },
    {
        title: '3. Trách nhiệm các bên',
        icon: <SafetyCertificateOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        <Text strong>Tấn Lụa Việt Nam</Text> chịu trách nhiệm xử lý đơn hàng và đảm bảo khách hàng nhận được hàng <Text style={STYLES.highlight}>đúng như đã đặt mua</Text> theo thời gian cam kết.
                    </>
                )
            },
            {
                content: (
                    <>
                        Nếu khách hàng <Text style={STYLES.highlight}>tự ý hủy đơn hàng</Text> hoặc không thể liên lạc được để giao hàng,
                        đơn hàng sẽ bị hủy bỏ.
                    </>
                )
            }
        ]
    }
];


// --- 3. Main Component ---
const ShippingPolicyPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: COLORS.bg }}>
            <Content style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: COLORS.cardBg }}>
                    <Title level={1} style={{ color: COLORS.text, fontSize: '28px', marginBottom: '40px', textAlign: 'left' }}>
                        CHÍNH SÁCH GIAO VÀ NHẬN HÀNG
                    </Title>
                    <img
                        src="https://i.ibb.co/dw94rwXv/giao-hang-toan-quoc-aid-vn.webp"
                        alt="Banner Tuyển Dụng"
                        style={{ width: '100%', height: 'auto', marginBottom: '20px' }}
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
                        title="LIÊN HỆ HỖ TRỢ GIAO HÀNG"
                        timeLabel="Thời gian làm việc"
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default ShippingPolicyPage;
