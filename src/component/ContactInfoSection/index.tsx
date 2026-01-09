import React from 'react';
import { Typography, Space } from 'antd';
import {
    PhoneOutlined,
    EnvironmentOutlined,
    MailOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import { HOTLINE, ADDRESS, EMAIL } from '../NewsPage/constants';

const { Title, Text } = Typography;

const COLORS = {
    primary: '#d32f2f',
    text: '#333',
    link: '#1890ff',
    contactBg: '#fffaf0',
    contactBorder: '#ffe7ba',
};

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
        <div style={{
            backgroundColor: COLORS.contactBg,
            padding: '30px',
            borderRadius: '12px',
            marginTop: '40px',
            border: `1px solid ${COLORS.contactBorder}`
        }}>
            <Title level={4} style={{ fontSize: '18px', fontWeight: 'bold', color: COLORS.text, marginBottom: '20px', textAlign: 'left' }}>
                {title}
            </Title>

            <Space direction="vertical" size="large" style={{ width: '100%', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'left' }}>
                    <Text strong style={{ fontSize: '18px', color: COLORS.primary, display: 'block', marginBottom: '10px' }}>
                        CÔNG TY CỔ PHẦN TẤN LỤA VIỆT NAM
                    </Text>

                    <Space direction="vertical" align="start" size="middle">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <EnvironmentOutlined style={{ color: COLORS.primary }} />
                            <Text><Text strong>Địa chỉ:</Text> {ADDRESS}</Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <PhoneOutlined style={{ color: COLORS.primary }} />
                            <Text><Text strong>{hotlineLabel}:</Text> <a href={`tel:${HOTLINE}`} style={{ color: COLORS.primary, fontWeight: 'bold' }}>{HOTLINE}</a></Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <MailOutlined style={{ color: COLORS.primary }} />
                            <Text><Text strong>Email:</Text> <a href={`mailto:${EMAIL}`} style={{ color: COLORS.link }}>{EMAIL}</a></Text>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <ClockCircleOutlined style={{ color: COLORS.primary, marginTop: '5px' }} />
                            <Text>
                                <Text strong>{timeLabel}:</Text> Thứ 2 - Thứ 7<br />
                                Sáng: 08:00 - 12:00 | Chiều: 13:30 - 17:30
                            </Text>
                        </div>
                    </Space>
                </div>
            </Space>
        </div>
    );
};

export default ContactInfoSection;
