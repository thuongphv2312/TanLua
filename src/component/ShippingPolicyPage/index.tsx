import React from 'react';
import { Divider } from 'antd';
import {
    CarOutlined,
    InfoCircleOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import { EMAIL, COMPANY_NAME } from '../NewsPage/constants';
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
        title: '1. Chính sách vận chuyển',
        icon: <CarOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        <span className="text-red-600 font-bold">Miễn phí giao hàng</span> trong phạm vi <span className="font-bold text-gray-800">nội thành Nam Định</span> và <span className="font-bold text-gray-800">TP.Hồ Chí Minh</span>.
                        Trường hợp Quý khách đề nghị giao hàng tận nơi <span className="text-red-600 font-bold">ngoại thành</span> hoặc <span className="text-red-600 font-bold">liên tỉnh</span> vui lòng
                        liên hệ với nhân viên kinh doanh hoặc qua email: <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline">{EMAIL}</a>
                    </>
                )
            },
            {
                content: (
                    <>
                        <span className="text-red-600 font-bold">Chuyển phát nhanh (đảm bảo):</span> Hàng hóa được gửi nhanh thông qua nhà cung cấp dịch vụ EMS.
                        Thời gian quý khách nhận được hàng thông thường trong khoảng từ <span className="text-red-600 font-bold">2 đến 4 ngày</span>,
                        <span className="text-red-600 font-bold"> hỏa tốc trong vòng 1 ngày</span>.
                    </>
                )
            },
            { content: <><span className="font-bold text-gray-800">Chuyển hàng bằng xe ô tô</span> theo các tuyến liên tỉnh.</> },
            { content: <><span className="font-bold text-gray-800">Chuyển hàng bằng đường tàu hỏa.</span></> },
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Chuyển thường qua bưu điện:</span> Hàng hóa được gửi theo đường bưu điện.
                        Với cách này, quý khách sẽ nhận được hàng trong khoảng thời gian từ <span className="font-bold text-gray-800">3 đến 7 ngày</span>.
                    </>
                )
            },
            { content: <><span className="font-bold text-gray-800">Các phương thức khác</span> do khách hàng yêu cầu.</> },
        ]
    },
    {
        title: '2. Một số lưu ý',
        icon: <InfoCircleOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Chính sách vận chuyển miễn phí <span className="text-red-600 font-bold">không áp dụng</span> với những sản phẩm được mua trong
                        chương trình <span className="font-bold text-gray-800">khuyến mại, giảm giá</span>… hoặc những sản phẩm <span className="font-bold text-gray-800">thanh lý</span>.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong trường hợp địa chỉ nhận hàng của Quý khách trong ngõ ngách, vùng sâu vùng xa hiểm trở đi lại khó khăn,
                        {COMPANY_NAME} có quyền <span className="text-red-600 font-bold">từ chối vận chuyển</span> và giao hàng tại nơi Quý khách yêu cầu.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trong trường hợp hàng đã vận chuyển đến địa điểm yêu cầu, nhưng vì một lý do nào đó khách hàng yêu cầu <span className="text-red-600 font-bold">trả lại hàng</span>,
                        lúc đó khách hàng sẽ <span className="text-red-600 font-bold">chịu toàn bộ chi phí vận chuyển</span> và các chi phí phát sinh khác.
                    </>
                )
            },
            {
                content: (
                    <>
                        Nếu người nhận không phải người mua, khách hàng cần <span className="font-bold text-gray-800">ủy quyền</span> thông qua văn bản hoặc Email.
                        Nếu không có xác nhận, chúng tôi có quyền từ chối giao hàng.
                    </>
                )
            },
            {
                content: (
                    <>
                        Trường hợp đặc biệt như <span className="font-bold text-gray-800">thiên tai, lũ lụt</span>... dẫn đến giao hàng chậm trễ,
                        chúng tôi sẽ cùng khách hàng giải quyết trên tinh thần hợp tác.
                    </>
                )
            }
        ],
        footer: (
            <div className="mt-5 text-gray-500 italic border-l-4 border-red-600 pl-4 py-2 bg-gray-50 rounded-r">
                Quý khách vui lòng liên hệ trực tiếp với nhân viên kinh doanh để được hướng dẫn cụ thể hơn.
            </div>
        )
    },
    {
        title: '3. Trách nhiệm các bên',
        icon: <SafetyCertificateOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">{COMPANY_NAME}</span> chịu trách nhiệm xử lý đơn hàng và đảm bảo khách hàng nhận được hàng <span className="text-red-600 font-bold">đúng như đã đặt mua</span> theo thời gian cam kết.
                    </>
                )
            },
            {
                content: (
                    <>
                        Nếu khách hàng <span className="text-red-600 font-bold">tự ý hủy đơn hàng</span> hoặc không thể liên lạc được để giao hàng,
                        đơn hàng sẽ bị hủy bỏ.
                    </>
                )
            }
        ]
    }
];


// --- Main Component ---
const ShippingPolicyPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 font-sans py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-left uppercase border-b pb-4 border-gray-100">
                    CHÍNH SÁCH GIAO VÀ NHẬN HÀNG
                </h1>

                <div className="rounded-lg overflow-hidden mb-8 w-full">
                    <img
                        src="https://i.ibb.co/dw94rwXv/giao-hang-toan-quoc-aid-vn.webp"
                        alt="Banner Giao Hàng"
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
                    title="LIÊN HỆ HỖ TRỢ GIAO HÀNG"
                    timeLabel="Thời gian làm việc"
                />
            </div>
        </div>
    );
};

export default ShippingPolicyPage;
