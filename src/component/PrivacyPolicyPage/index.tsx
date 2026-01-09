import React from 'react';
import { Layout, Typography, Card, Divider } from 'antd';
import {
    SafetyCertificateOutlined,
    GlobalOutlined,
    DatabaseOutlined,
    EnvironmentOutlined,
    ToolOutlined,
    LockOutlined
} from '@ant-design/icons';
import { HOTLINE, ADDRESS, EMAIL } from '../NewsPage/constants';
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
        title: '1. Mục đích và phạm vi thu thập',
        icon: <GlobalOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Việc thu thập dữ liệu chủ yếu trên Website TMĐT Tấn Lụa Việt Nam bao gồm: <Text style={STYLES.highlight}>email, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng</Text> (thành viên).
                        Đây là các thông tin mà chúng tôi yêu cầu thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và để chúng tôi liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên website nhằm đảm bảo quyền lợi cho người tiêu dùng.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong quá trình giao dịch thanh toán tại Website, chúng tôi chỉ lưu giữ thông tin chi tiết về đơn hàng đã thanh toán của thành viên, <Text style={STYLES.highlight}>các thông tin về số tài khoản ngân hàng của thành viên sẽ không được lưu giữ</Text>.
                    </>
                )
            },
            {
                content: (
                    <>
                        Chúng tôi cũng sẽ sử dụng cả thông tin nhận diện cá nhân của thành viên và một số thông tin nhận diện phi cá nhân (như cookies, địa chỉ IP, loại trình duyệt...) để gia tăng khả năng đáp ứng về phương diện các Trang và Dịch Vụ, cũng như về phát triển những chức năng, tính năng và các dịch vụ mới.
                    </>
                )
            },
            {
                content: (
                    <>
                        Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình.
                        Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho chúng tôi về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
                    </>
                )
            }
        ]
    },
    {
        title: '2. Phạm vi sử dụng thông tin',
        icon: <SafetyCertificateOutlined style={STYLES.icon} />,
        items: [
            { content: <>Cung cấp các dịch vụ đến thành viên.</> },
            { content: <>Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và Website TMĐT.</> },
            { content: <>Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo thành viên.</> },
            { content: <>Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.</> },
            { content: <>Không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại website.</> },
            {
                content: (
                    <>
                        Trong trường hợp có yêu cầu của pháp luật: Chúng tôi có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng.
                        Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của thành viên.
                    </>
                )
            }
        ]
    },
    {
        title: '3. Thời gian lưu trữ thông tin',
        icon: <DatabaseOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ.
                        Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được <Text style={STYLES.highlight}>bảo mật trên máy chủ</Text> của chúng tôi.
                    </>
                )
            }
        ]
    },
    {
        title: '4. Địa chỉ của đơn vị thu thập và quản lý thông tin',
        icon: <EnvironmentOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        <Text strong>CÔNG TY CỔ PHẦN TẤN LỤA VIỆT NAM</Text><br />
                        <Text strong>Địa chỉ:</Text> {ADDRESS}<br />
                        <Text strong>Điện thoại:</Text> {HOTLINE}
                    </>
                )
            }
        ]
    },
    {
        title: '5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình',
        icon: <ToolOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc yêu cầu chúng tôi thực hiện việc này.
                    </>
                )
            },
            {
                content: (
                    <>
                        Thành viên có quyền gửi khiếu nại về việc lộ thông tin các nhân cho bên thứ 3 đến Ban quản trị của Website.
                        Khi tiếp nhận những phản hồi này, chúng tôi sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên khôi phục và bảo mật lại thông tin.
                    </>
                )
            },
            {
                content: (
                    <>
                        <Text strong>Email tiếp nhận phản hồi:</Text> <a href={`mailto:${EMAIL}`} style={{ color: COLORS.link }}>{EMAIL}</a>
                    </>
                )
            }
        ]
    },
    {
        title: '6. Cam kết bảo mật thông tin cá nhân khách hàng',
        icon: <LockOutlined style={STYLES.icon} />,
        items: [
            {
                content: (
                    <>
                        Thông tin cá nhân của thành viên được chúng tôi <Text style={STYLES.highlight}>cam kết bảo mật tuyệt đối</Text> theo chính sách bảo vệ thông tin cá nhân.
                        Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
                    </>
                )
            },
            {
                content: (
                    <>
                        Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, chúng tôi sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.
                    </>
                )
            },
            {
                content: (
                    <>
                        Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa tại khu vực dữ liệu trung tâm an toàn.
                    </>
                )
            },
            {
                content: (
                    <>
                        Chúng tôi yêu cầu các cá nhân khi đăng ký/mua hàng là thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện thoại, số tài khoản, số thẻ thanh toán …., và chịu trách nhiệm về tính pháp lý của những thông tin trên.
                        Chúng tôi không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.
                    </>
                )
            }
        ]
    }
];

// --- 3. Main Component ---
const PrivacyPolicyPage: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: COLORS.bg }}>
            <Content style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
                <Card style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: COLORS.cardBg }}>
                    <Title level={1} style={{ color: COLORS.text, fontSize: '28px', marginBottom: '40px', textAlign: 'left' }}>
                        CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG
                    </Title>

                    <img
                        src="https://i.ibb.co/Q7Jb95W2/baomatthongtin.png"
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
                        title="LIÊN HỆ HỖ TRỢ BẢO MẬT"
                    />
                </Card>
            </Content>
        </Layout>
    );
};

export default PrivacyPolicyPage;
