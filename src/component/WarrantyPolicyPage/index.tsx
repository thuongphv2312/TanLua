import React from 'react';
import { Divider } from 'antd';
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ToolOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import ContactInfoSection from '../ContactInfoSection';

// --- Types ---
interface PolicyItem {
    content: React.ReactNode;
}

interface PolicySection {
    title: string;
    icon: React.ReactNode;
    items: PolicyItem[];
    footer?: React.ReactNode;
}

// --- Data ---
const POLICY_DATA: PolicySection[] = [
    {
        title: 'Quy định chung',
        icon: <InfoCircleOutlined className="text-red-600 text-xl" />,
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
        icon: <CheckCircleOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Trong trường hợp sự cố hư hỏng được xác định do <span className="text-red-600 font-bold">lỗi của nhà sản xuất</span> và vẫn còn thời hạn bảo hành.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm <span className="font-bold text-gray-800">không có dấu hiệu can thiệp của bên thứ 03</span> (sửa chữa ngoài).
                    </>
                )
            },
            {
                content: (
                    <>
                        Số series, tem niêm phong trên sản phẩm và phiếu bảo hành phải <span className="text-red-600 font-bold">giống nhau, nguyên vẹn</span>, không rách mất hoặc bị cạo sửa.
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
        icon: <CloseCircleOutlined className="text-red-600 text-xl" />,
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
                        Sản phẩm đã <span className="text-red-600 font-bold">quá thời hạn</span> ghi trên Phiếu bảo hành hoặc <span className="text-red-600 font-bold">mất Phiếu bảo hành</span>.
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
        icon: <ToolOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Trường hợp hàng hóa Quý khách mua tại Tấn Lụa Việt Nam nhưng nằm trong <span className="font-bold text-gray-800">Những trường hợp không được bảo hành</span> nêu ở trên thì chúng tôi sẽ nhận sửa chữa có tính phí (nếu Quý khách yêu cầu).
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

// --- Main Component ---
const WarrantyPolicyPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 font-sans py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-left uppercase border-b pb-4 border-gray-100">
                    CHÍNH SÁCH BẢO HÀNH
                </h1>

                <div className="rounded-lg overflow-hidden mb-8 w-full">
                    <img
                        src="https://i.ibb.co/s9w02K0F/chinh-sach-bao-hanh.jpg"
                        alt="Chính sách bảo hành"
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

                        {section.footer}

                        {index < POLICY_DATA.length - 1 && <Divider className="my-8" />}
                    </div>
                ))}

                <ContactInfoSection
                    title="TRUNG TÂM BẢO HÀNH & HỖ TRỢ KỸ THUẬT"
                    hotlineLabel="Hotline kỹ thuật"
                    timeLabel="Thời gian tiếp nhận bảo hành"
                />
            </div>
        </div>
    );
};

export default WarrantyPolicyPage;
