
// import React from 'react';
import { Typography, Space } from 'antd';
import { HomeOutlined, PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';
import GoogleMap from '../GoogleMap';

const { Title, Text, Paragraph } = Typography;

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
                <Text>Điện thoại: 024.3838.3456</Text> <Text type="secondary">(Thời gian phục vụ: Từ 8h - 18h30 hàng ngày)</Text>
              </div>
            </Space>
          </div>

          {/* Tân Phú */}
          <div>
            <Space align="start">
              <HomeOutlined style={{ color: '#daca72', fontSize: '18px', marginTop: '4px' }} />
              <div>
                <Text strong>Địa chỉ Tại Quận Tân Phú, Tp.Hồ Chí Minh:</Text> 539/47C Lũy Bán Bích, Phường Phú Thạnh, Quận Tân Phú, Tp. Hồ Chí Minh
              </div>
            </Space>
            <br />
            <Space align="center" style={{ marginTop: '8px' }}>
              <PhoneOutlined style={{ color: '#daca72', fontSize: '18px' }} />
              <div>
                <Text>Điện thoại: 028.3606.0006</Text> <Text type="secondary">(Thời gian phục vụ: Từ 8h - 20h hàng ngày)</Text>
              </div>
            </Space>
          </div>

          {/* Bình Tân */}
          <div>
            <Space align="start">
              <HomeOutlined style={{ color: '#daca72', fontSize: '18px', marginTop: '4px' }} />
              <div>
                <Text strong>Địa chỉ Tại Quận Bình Tân, Tp. Hồ Chí Minh:</Text> 98 Đường 5A, Phường Bình Hưng Hòa A, Quận Bình Tân, Tp. Hồ Chí Minh
              </div>
            </Space>
            <br />
            <Space align="center" style={{ marginTop: '8px' }}>
              <PhoneOutlined style={{ color: '#daca72', fontSize: '18px' }} />
              <div>
                <Text>Điện thoại: 028.3973.7777</Text> <Text type="secondary">(Thời gian phục vụ: Từ 8h - 20h hàng ngày)</Text>
              </div>
            </Space>
          </div>

          {/* Liên hệ khác */}
          <div>
            <Space size="large" wrap>
              <Space>
                <MailOutlined style={{ color: '#daca72' }} />
                <Text>Email: info@oshima.com.vn</Text>
              </Space>
              <Space>
                <GlobalOutlined style={{ color: '#daca72' }} />
                <Text>Website: www.Oshima.com.vn / www.Oshimavietnam.com</Text>
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
