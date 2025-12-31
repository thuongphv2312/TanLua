import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Space, Divider, Grid } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { HOTLINE } from '../NewsPage/constants';

const { Footer } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const AppFooter = () => {
  const mainColor = '#daca72';
  const screen = useBreakpoint();

  const footerLinkStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontSize: '14px'
  };

  return (
    <Footer style={{ backgroundColor: '#f5f5f5', padding: `60px ${screen.md ? '100px' : '10px'}` }}>
      <Row gutter={[40, 40]}>

        {/* CỘT 1: VỀ CHÚNG TÔI */}
        <Col xs={24} sm={24} md={8} lg={8}>
          <Title level={4} style={{ fontSize: '18px' }}>Về chúng tôi</Title>
          <div style={{ marginBottom: '20px' }}>
            {/* Thay src bằng link logo thực tế của bạn */}
            <img
              src="/src/assets/logo.png"
              alt="Tấn Lụa Logo"
              style={{ maxWidth: '80%', marginBottom: '15px' }}
            />
            <br />
            <Text strong style={{ fontSize: '14px' }}>
              Cung cấp sản phẩm chất lượng từ các thương hiệu hàng đầu.
            </Text>
          </div>
          <Space direction="vertical" size="small">
            <Space align="start">
              <EnvironmentOutlined style={{ color: '#000', marginTop: '5px' }} />
              <Text>Địa chỉ: Nghĩa Thái, Nghĩa Hưng, Nam Định</Text>
            </Space>
            <Space>
              <PhoneOutlined style={{ color: '#000' }} />
              <Text>Số điện thoại: {HOTLINE}</Text>
            </Space>
            <Space>
              <MailOutlined style={{ color: '#000' }} />
              <Text>Email: info@tanlua.com</Text>
            </Space>
          </Space>
          <div style={{ marginTop: '20px' }}>
            <Space size="large">
              <FacebookFilled style={{ fontSize: '24px', color: '#3b5998', cursor: 'pointer' }} />
              {/* Zalo Icon giả lập hoặc dùng img */}
              <div style={{ width: '24px', height: '24px', backgroundColor: '#0068ff', borderRadius: '4px', color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: '12px', lineHeight: '24px', cursor: 'pointer' }}>Z</div>
              <InstagramOutlined style={{ fontSize: '24px', color: '#e4405f', cursor: 'pointer' }} />
            </Space>
          </div>
        </Col>

        {/* CỘT 2: CHÍNH SÁCH */}
        <Col xs={24} sm={24} md={8} lg={4}>
          <Title level={4} style={{ fontSize: '18px' }}>Chính sách</Title>
          <a href="#" style={footerLinkStyle}>Giới thiệu về TẤN LỤA VIỆT NAM</a>
          <a href="#" style={footerLinkStyle}>Cơ hội việc làm tại TẤN LỤA VIỆT NAM</a>
          <a href="#" style={footerLinkStyle}>Liên hệ quảng cáo tại TẤN LỤA VIỆT NAM</a>
          <a href="#" style={footerLinkStyle}>Trở thành đối tác của TẤN LỤA VIỆT NAM</a>
          <a href="#" style={footerLinkStyle}>Đường đến TẤN LỤA VIỆT NAM</a>
        </Col>

        {/* CỘT 3: HỖ TRỢ KHÁCH HÀNG */}
        <Col xs={24} sm={24} md={8} lg={4}>
          <Title level={4} style={{ fontSize: '18px' }}>Hỗ trợ khách hàng</Title>
          <a href="#" style={footerLinkStyle}>Chính sách giao hàng</a>
          <a href="#" style={footerLinkStyle}>Chính sách bảo mật</a>
          <a href="#" style={footerLinkStyle}>Chính sách bảo hành</a>
          <a href="#" style={footerLinkStyle}>Chính sách đổi trả hàng</a>
          <a href="#" style={footerLinkStyle}>Hướng dẫn thanh toán</a>
        </Col>

        {/* CỘT 4: ĐĂNG KÝ NHẬN TIN & THANH TOÁN */}
        <Col xs={24} sm={24} md={8} lg={8}>
          <Title level={4} style={{ fontSize: '18px' }}>Đăng ký nhận tin</Title>
          <div style={{ display: 'flex', marginBottom: '30px' }}>
            <Input placeholder="Nhập địa chỉ email" style={{ borderRadius: '4px 0 0 4px' }} />
            <Button
              style={{
                backgroundColor: mainColor,
                borderColor: mainColor,
                color: '#000',
                borderRadius: '0 4px 4px 0',
                fontWeight: 'bold'
              }}
            >
              Đăng ký
            </Button>
          </div>

          <Title level={4} style={{ fontSize: '18px' }}>Phương thức thanh toán</Title>
          <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', display: 'inline-block' }}>
            <Space size="middle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="40" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width="40" />
              <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" width="30" />
              <img src="https://media.loveitopcdn.com/3807/logo-zalopay1-compressed.jpg" alt="VNPay" width="60" />
            </Space>
          </div>

          <div style={{ marginTop: '20px' }}>
            <img
              src="/src/assets/logo_bct.png"
              alt="Đã thông báo bộ công thương"
              style={{ height: '80px' }}
            />
          </div>
        </Col>
      </Row>

      <Divider />

      <div style={{ textAlign: 'center', color: '#888' }}>
        © Bản quyền thuộc về TẤN LỤA VIỆT NAM | TanLua.com
      </div>
    </Footer>
  );
};

export default AppFooter;
