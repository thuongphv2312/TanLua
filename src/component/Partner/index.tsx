
// import React from 'react';
import { Typography, Space } from 'antd';
import { HomeOutlined, PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import GoogleMap from '../GoogleMap';
import { EMAIL, HOST, HOTLINE } from '../NewsPage/constants';

const { Title, Text, Paragraph, Link } = Typography;

const PartnerPage = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff' }}>
      <Title level={2} style={{ textAlign: 'left', marginBottom: '40px' }}>Trở Thành Đối Tác Của TẤN LỤA</Title>

      <div style={{ marginBottom: '40px', textAlign: 'left' }}>
        <Paragraph>
          Mọi thông tin liên hệ xin gửi về:<br />
          <strong>CÔNG TY CỔ PHẦN TẤN LỤA VIỆT NAM</strong>
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>

          {/* Hà Nội */}
          <div>
            <Space align="start">
              <HomeOutlined style={{ color: '#daca72', fontSize: '18px', marginTop: '4px' }} />
              <div>
                <Text strong>Địa chỉ Tại Hà Nội:</Text> Số 10C11 Ngõ 261 Trần Quốc Hoàn, Q. Cầu Giấy, Tp. Hà Nội
              </div>
            </Space>
            <br />
            <Space align="center" style={{ marginTop: '8px' }}>
              <PhoneOutlined style={{ color: '#daca72', fontSize: '18px' }} />
              <div>
                <Text>Điện thoại: </Text>
                <Link href={`tel:${HOTLINE.replace(/\./g, '')}`}>{HOTLINE}</Link>
                <Text type="secondary"> (Thời gian phục vụ: Từ 7h30 - 17h30 hàng ngày)</Text>
              </div>
            </Space>
          </div>

          {/* Liên hệ khác */}
          <div>
            <Space size="large" wrap>
              <Space>
                <MailOutlined style={{ color: '#daca72' }} />
                <Text>Email: </Text>
                <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
              </Space>
              <Space>
                <GlobalOutlined style={{ color: '#daca72' }} />
                <Text>Website: </Text>
                <Link href={HOST} target="_blank" rel="noopener noreferrer">
                  {HOST}
                </Link>
              </Space>
            </Space>
          </div>

        </Space>
      </div>

      <div style={{ marginTop: '40px' }}>
        <GoogleMap />
      </div>
    </div>
  );
};

export default PartnerPage;
