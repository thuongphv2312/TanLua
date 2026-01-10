import React from 'react';
import { Divider } from 'antd';
import {
    SafetyCertificateOutlined,
    GlobalOutlined,
    DatabaseOutlined,
    EnvironmentOutlined,
    ToolOutlined,
    LockOutlined
} from '@ant-design/icons';
import { HOTLINE, ADDRESS, EMAIL, COMPANY_NAME } from '../NewsPage/constants';
import ContactInfoSection from '../ContactInfoSection';

// --- Types ---
interface PolicyItem {
    content: React.ReactNode;
}

interface PolicySection {
    title: string;
    icon: React.ReactNode;
    items: PolicyItem[];
}

const POLICY_DATA: PolicySection[] = [
    {
        title: '1. Mục đích và phạm vi thu thập',
        icon: <GlobalOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Việc thu thập dữ liệu chủ yếu bao gồm: <span className="font-bold text-gray-800">email, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng</span> (thành viên).
                        Đây là các thông tin mà {COMPANY_NAME} cần thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và để chúng tôi liên hệ xác nhận nhằm đảm bảo quyền lợi cho người tiêu dùng.
                    </>
                )
            },
            {
                content: (
                    <>
                        Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình.
                    </>
                )
            },
            {
                content: (
                    <>
                        Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho chúng tôi về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
                    </>
                )
            }
        ]
    },
    {
        title: '2. Phạm vi sử dụng thông tin',
        icon: <DatabaseOutlined className="text-red-600 text-xl" />,
        items: [
            { content: <>Cung cấp các dịch vụ đến thành viên;</> },
            { content: <>Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và website;</> },
            {
                content: (
                    <>
                        Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo thành viên;
                    </>
                )
            },
            {
                content: (
                    <>
                        Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.
                    </>
                )
            },
            {
                content: (
                    <>
                        Không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại {COMPANY_NAME}.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong trường hợp có yêu cầu của pháp luật: Công ty có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của thành viên.
                    </>
                )
            }
        ]
    },
    {
        title: '3. Thời gian lưu trữ thông tin',
        icon: <SafetyCertificateOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được <span className="text-red-600 font-bold">bảo mật tuyệt đối</span> trên máy chủ của {COMPANY_NAME}.
                    </>
                )
            }
        ]
    },
    {
        title: '4. Địa chỉ của đơn vị thu thập và quản lý thông tin',
        icon: <EnvironmentOutlined className="text-red-600 text-xl" />,
        items: [
            { content: <><span className="font-bold text-gray-800 uppercase">{COMPANY_NAME}</span></> },
            { content: <>Địa chỉ: {ADDRESS}</> },
            { content: <>Hotline: {HOTLINE}</> },
            { content: <>Email: {EMAIL}</> },
        ]
    },
    {
        title: '5. Phương tiện và công cụ để người dùng chỉnh sửa dữ liệu cá nhân',
        icon: <ToolOutlined className="text-red-600 text-xl" />,
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
                        Thành viên có quyền gửi khiếu nại về việc lộ thông tin các nhân cho bên thứ 3 đến Ban quản trị của website. Khi tiếp nhận những phản hồi này, chúng tôi sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên khôi phục và bảo mật lại thông tin.
                    </>
                )
            }
        ]
    },
    {
        title: '6. Cam kết bảo mật thông tin cá nhân khách hàng',
        icon: <LockOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Thông tin cá nhân của thành viên được <span className="text-red-600 font-bold">cam kết bảo mật tuyệt đối</span> theo chính sách bảo vệ thông tin cá nhân. Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.
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
                        Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của Thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa.
                    </>
                )
            },
            {
                content: (
                    <>
                        Ban quản lý yêu cầu các cá nhân khi đăng ký/mua hàng là thành viên, phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, số chứng minh nhân dân, điện thoại, số tài khoản, số thẻ thanh toán …., và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của Thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.
                    </>
                )
            }
        ]
    }
];

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 font-sans py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-left uppercase border-b pb-4 border-gray-100">
                    CHÍNH SÁCH BẢO MẬT THÔNG TIN KHÁCH HÀNG
                </h1>

                <div className="rounded-lg overflow-hidden mb-8 w-full">
                    <img
                        src="https://i.ibb.co/Q7Jb95W2/baomatthongtin.png"
                        alt="Banner Chính sách bảo mật"
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>

                {POLICY_DATA.map((section, index) => (
                    <div key={index} className="mb-10">
                        <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
                            {section.icon} {section.title}
                        </h3>

                        <ul className="space-y-4">
                            {section.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-base text-gray-600 leading-relaxed text-left">
                                    <span className="text-red-600 text-xl flex-shrink-0 leading-7">•</span>
                                    <div className="flex-1">{item.content}</div>
                                </li>
                            ))}
                        </ul>

                        {index < POLICY_DATA.length - 1 && <Divider className="my-8" />}
                    </div>
                ))}

                <ContactInfoSection
                    title="LIÊN HỆ HỖ TRỢ BẢO MẬT"
                />
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
