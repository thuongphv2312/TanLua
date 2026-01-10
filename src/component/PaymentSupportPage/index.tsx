import React from 'react';
import { Divider } from 'antd';
import {
    ShopOutlined,
    CarOutlined,
    BankOutlined,
    CreditCardOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import ContactInfoSection from '../ContactInfoSection';
import { EMAIL, COMPANY_NAME } from '../NewsPage/constants';

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
        title: '1. Thanh toán trực tiếp tại phòng bán hàng',
        icon: <ShopOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Quý khách có thể đến xem và mua hàng trực tiếp tại các văn phòng của {COMPANY_NAME}.
                    </>
                )
            },
            {
                content: (
                    <>
                        Vui lòng thanh toán trực tiếp bằng <span className="text-red-600 font-bold">TIỀN MẶT</span> hoặc <span className="text-red-600 font-bold">CÀ THẺ</span> thông qua nhân viên bán hàng.
                    </>
                )
            }
        ]
    },
    {
        title: '2. Giao hàng thu tiền tại nhà (COD)',
        icon: <CarOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Đối với khách hàng nội thành Hà Nội & TP. Hồ Chí Minh:</span><br />
                        Nhân viên của chúng tôi sẽ giao hàng tận nhà (nếu khách hàng yêu cầu).
                        Quý khách vui lòng thanh toán tiền trực tiếp cho nhân viên giao hàng bằng <span className="font-bold text-gray-800">tiền mặt</span>.
                    </>
                )
            },
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Đối với khách hàng ở tỉnh xa:</span><br />
                        Chúng tôi sẽ ủy quyền cho các đơn vị chuyển phát uy tín như VNPT, Viettel... giao hàng và thu tiền hộ.
                        Quý khách thanh toán cho nhân viên chuyển phát bằng <span className="font-bold text-gray-800">tiền mặt</span> hoặc <span className="font-bold text-gray-800">quẹt thẻ</span> (nếu đơn vị vận chuyển hỗ trợ).
                    </>
                )
            }
        ]
    },
    {
        title: '3. Chuyển khoản qua ngân hàng',
        icon: <BankOutlined className="text-red-600 text-xl" />,
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
                        Quý khách nên chuyển tiền <span className="text-red-600 font-bold">cùng hệ thống ngân hàng</span> để đảm bảo tiết kiệm chi phí và chuyển tiền nhanh chóng (chỉ mất khoảng 10 phút).
                    </>
                )
            }
        ],
        footer: (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-dashed border-blue-400">
                <span className="font-bold text-blue-600 flex items-start gap-2">
                    <InfoCircleOutlined className="mt-1" />
                    <span>Lưu ý: Nội dung chuyển khoản vui lòng ghi rõ "Tên khách hàng - Số điện thoại - Mã đơn hàng" để chúng tôi dễ dàng xác nhận.</span>
                </span>
            </div>
        )
    },
    {
        title: '4. Thanh toán quốc tế',
        icon: <CreditCardOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        Trường hợp Quý khách hàng đang ở nước ngoài, vui lòng liên hệ trực tiếp qua Email: <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline">{EMAIL}</a> để được hướng dẫn phương thức thanh toán quốc tế phù hợp.
                    </>
                )
            }
        ]
    }
];

// --- Main Component ---
const PaymentSupportPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 font-sans py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-left uppercase border-b pb-4 border-gray-100">
                    HƯỚNG DẪN THANH TOÁN
                </h1>

                {/* Placeholder image hidden as before */}
                <div className="rounded-lg overflow-hidden mb-8 w-full hidden">
                    <img
                        src="https://i.ibb.co/3ykJd0Zz/chinh-sach-doi-tra.jpg"
                        alt="Hướng dẫn thanh toán"
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
                    title="LIÊN HỆ HỖ TRỢ THANH TOÁN"
                />
            </div>
        </div>
    );
};

export default PaymentSupportPage;
