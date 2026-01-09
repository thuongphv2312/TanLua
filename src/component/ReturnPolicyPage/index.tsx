import React from 'react';
import { Divider } from 'antd';
import {
    UserOutlined,
    WarningOutlined,
    DollarOutlined,
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
                        Trong vòng <span className="text-red-600 font-bold">03 ngày</span> kể từ ngày mua khách hàng sẽ được đổi mới sản phẩm có giá trị ngang bằng hoặc cao hơn sản phẩm đã mua.
                    </>
                )
            },
            {
                content: (
                    <>
                        Sản phẩm phải còn <span className="font-bold text-gray-800">nguyên bao bì, chưa sử dụng, kích hoạt</span>, và không nằm trong danh sách hạn chế đổi trả.
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
        icon: <UserOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Đổi hàng (theo nhu cầu của khách):</span> Trong vòng <span className="text-red-600 font-bold">07 ngày</span>.
                        <br />- <span className="font-bold text-gray-800">Miễn phí đổi</span> với hàng có giá trị ngang bằng hoặc lớn hơn.
                        <br />- Thu phí <span className="font-bold text-gray-800">10%</span> (tối thiểu 20.000 VNĐ) nếu đổi hàng giá trị thấp hơn.
                    </>
                )
            },
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Trả hàng (vì khách không ưng ý):</span> Trong vòng <span className="text-red-600 font-bold">03 ngày</span>.
                        <br />- Quý khách chịu mức phí <span className="font-bold text-gray-800">10%</span> (tối thiểu 20.000 VNĐ) trên giá trị hàng hóa và chi phí vận chuyển, lắp đặt (nếu có).
                    </>
                )
            },
            {
                content: (
                    <>
                        <span className="text-red-600 font-bold">Điều kiện:</span> Sản phẩm còn nguyên điều kiện ban đầu, hóa đơn, chưa qua sử dụng, nguyên bao bì, đầy đủ phụ kiện và quà tặng (nếu có).
                    </>
                )
            }
        ]
    },
    {
        title: '2. Đổi/Trả hàng không vì lý do từ phía khách hàng',
        icon: <WarningOutlined className="text-red-600 text-xl" />,
        items: [
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Hàng giao bị bể vỡ, sai nội dung hoặc bị thiếu:</span> Quý khách vui lòng kiểm tra ngay khi nhận hàng.
                        Nếu phát hiện, từ chối nhận hàng và báo ngay cho chúng tôi.
                        <br />Sau <span className="font-bold text-gray-800">02 ngày</span> kể từ ngày nhận hàng, chúng tôi có quyền từ chối hỗ trợ các khiếu nại này.
                    </>
                )
            },
            {
                content: (
                    <>
                        <span className="font-bold text-gray-800">Hàng giao bị lỗi kỹ thuật:</span> Khi có xác nhận từ Trung tâm bảo hành/kỹ thuật.
                        <br />Trong vòng <span className="font-bold text-gray-800">03 ngày</span>, nếu được xác nhận lỗi kỹ thuật, quý khách sẽ được đổi trả theo quy trình.
                    </>
                )
            }
        ]
    },
    {
        title: '3. Phương thức hoàn tiền',
        icon: <DollarOutlined className="text-red-600 text-xl" />,
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

// --- Main Component ---
const ReturnPolicyPage: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-gray-100 font-sans py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-left uppercase border-b pb-4 border-gray-100">
                    CHÍNH SÁCH ĐỔI TRẢ HÀNG
                </h1>

                <div className="rounded-lg overflow-hidden mb-8 w-full">
                    <img
                        src="https://i.ibb.co/ymQV1D2n/chinh-sach-doi-tra-hang.jpg"
                        alt="Chính sách đổi trả hàng"
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
                    title="LIÊN HỆ HỖ TRỢ ĐỔI TRẢ"
                />
            </div>
        </div>
    );
};

export default ReturnPolicyPage;
