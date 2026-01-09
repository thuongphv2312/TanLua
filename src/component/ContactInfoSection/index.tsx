import React from 'react';
import { Space } from 'antd';
import {
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { HOTLINE, ADDRESS, EMAIL } from '../NewsPage/constants';

interface ContactInfoSectionProps {
    title?: string;
    hotlineLabel?: string;
    timeLabel?: string;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
    title = "THÔNG TIN LIÊN HỆ",
    hotlineLabel = "Hotline",
    timeLabel = "Thời gian làm việc"
}) => {
    return (
        <div className="mt-10 p-8 rounded-xl border border-orange-200 bg-orange-50 font-sans">
            <h4 className="text-lg font-bold text-gray-800 mb-5 text-left uppercase">
                {title}
            </h4>

            <div className="w-full text-left">
                <span className="block text-lg font-bold text-red-600 mb-3">
                    CÔNG TY CỔ PHẦN TẤN LỤA VIỆT NAM
                </span>

                <Space direction="vertical" size="middle" className="items-start text-base">
                    <div className="flex items-center gap-2.5 text-gray-700">
                        <EnvironmentOutlined className="text-red-600" />
                        <span><span className="font-semibold">Địa chỉ:</span> {ADDRESS}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700">
                        <PhoneOutlined className="text-red-600" />
                        <span><span className="font-semibold">{hotlineLabel}:</span> <a href={`tel:${HOTLINE}`} className="text-red-600 font-bold hover:text-red-700 ml-1">{HOTLINE}</a></span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-700">
                        <MailOutlined className="text-red-600" />
                        <span><span className="font-semibold">Email:</span> <a href={`mailto:${EMAIL}`} className="text-blue-600 hover:underline ml-1">{EMAIL}</a></span>
                    </div>
                    <div className="flex items-start gap-2.5 text-gray-700">
                        <ClockCircleOutlined className="text-red-600 mt-1.5" />
                        <span>
                            <span className="font-semibold">{timeLabel}:</span> Thứ 2 - Thứ 7<br />
                            Sáng: 08:00 - 12:00 | Chiều: 13:30 - 17:30
                        </span>
                    </div>
                </Space>
            </div>
        </div>
    );
};

export default ContactInfoSection;
