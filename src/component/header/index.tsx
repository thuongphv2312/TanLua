import { Input, Badge, Space, Typography, Layout, Grid, Button, Popover, List, Avatar, Empty } from 'antd';
import {
  SearchOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HOTLINE } from '../NewsPage/constants';
import { MobileMenu } from '../MenuContainer';
import brand1 from '../../assets/tojiko.png';
import brand2 from '../../assets/TALU.png';
import React, { useState, useEffect, useMemo } from 'react';
const { Header } = Layout;
const { useBreakpoint } = Grid;
const HeaderContainer = ({ headerStyle = {}, mainColor = '', cartCount = 0, cartCounts = {}, productList = [] }: any) => {
  const { Text } = Typography;
  const [searchValue, setSearchValue] = useState('');
  const screens = useBreakpoint();
  const navigate = useNavigate();

  // Logic typing placeholder
  const placeholderTexts = useMemo(() => [
    "Tìm theo thương hiệu...",
    "Tìm theo tên sản phẩm...",
    "Gõ bất cứ gì bạn muốn tìm..."
  ], []);

  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = placeholderTexts[textIndex];
    let timeout: any;

    if (!isDeleting) {
      if (charIndex < currentFullText.length) {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentFullText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCurrentPlaceholder(currentFullText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % placeholderTexts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, placeholderTexts]);

  // Xử lý dữ liệu giỏ hàng
  const cartItems = Object.keys(cartCounts).map((key) => {
    const id = Number(key);
    const product = productList.find((p: any) => p.id === id);
    return product ? { ...product, quantity: cartCounts[id] } : null;
  }).filter((item: any) => item !== null);

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((acc: number, item: any) => {
    const price = parseInt(item.price.replace(/\D/g, ''), 10) || 0; // Loại bỏ ký tự không phải số
    return acc + (price * item.quantity);
  }, 0);

  // Nội dung hiển thị trong Popover
  const cartContent = (
    <div style={{ width: 350 }}>
      <List
        className="thin-scrollbar"
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.images[0]} shape="square" size={50} />}
              title={<Text strong style={{ fontSize: '14px' }}>{item.name}</Text>}
              description={
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                  <Text type="secondary">SL: {item.quantity}</Text>
                  <Text type="danger" strong>{item.price}</Text>
                </div>
              }
            />
          </List.Item>
        )}
        locale={{ emptyText: <Empty description="Giỏ hàng trống" image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
        style={{ maxHeight: 300, overflowY: 'auto' }}
      />
      {cartItems.length > 0 && (
        <div style={{ marginTop: 16, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text strong>Tổng cộng:</Text>
            <Text type="danger" strong style={{ fontSize: 18 }}>
              {totalAmount.toLocaleString('vi-VN')}₫
            </Text>
          </div>
          <Button type="primary" danger block size="large" onClick={() => navigate('/cart')}>
            Thanh toán ngay
          </Button>
        </div>
      )}
    </div>
  );

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (<>
    <Header style={headerStyle} >
      <MobileMenu />

      {/* 1. Search Bar & Category */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: '800px' }}>
        {screens.md &&
          <Space className='cursor-pointer' style={{ margin: '0 25px' }}>
            <img src="https://i.ibb.co/YF9VJFMg/logo.png" loading='lazy' alt="logo" style={{ height: '80px', maxWidth: '300px' }} onClick={() => navigate('/')} />
          </Space>
        }
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '25px',
          overflow: 'hidden',
          width: '100%',
          minWidth: screens.md ? '300px' : '150px'
        }}>
          <div style={{ padding: '0 10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            {/* <MenuOutlined /> */}
          </div>
          <Input
            placeholder={currentPlaceholder}
            style={{ minWidth: '120px', flex: 1 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            bordered={false}
          />
          <div style={{ backgroundColor: mainColor, padding: '12px 20px', cursor: 'pointer' }} onClick={handleSearch}>
            <SearchOutlined style={{ fontSize: '18px', fontWeight: 'bold' }} />
          </div>
        </div>

      </div>

      {screens.md && (
        <Space style={{ margin: '0 15px' }}>
          <img src={brand1} alt="Brand 1" style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px', paddingBottom: '10px', borderRadius: '5px', cursor: 'pointer', objectFit: 'contain' }} />
          <img src={brand2} alt="Brand 2" style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px', cursor: 'pointer', borderRadius: '5px', objectFit: 'contain' }} />
        </Space>
      )}

      {/* 2. Hotline & Account & Cart*/}
      <Space size={20} style={{ margin: screens.md ? '0 50px' : '0 10px' }} >
        {screens.md &&
          <Space size="middle" style={{ minWidth: '150px' }} className="cursor-pointer group transition-all">
            <PhoneOutlined className="group-hover:scale-110 transition-transform" style={{ fontSize: '26px', color: '#f08a8a' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ fontSize: '12px', color: 'white' }} className="group-hover:text-red-200">Hỗ trợ khách hàng</Text>
              <Typography.Link
                href={`tel:${HOTLINE.replace(/\./g, '')}`}
                strong
                style={{ color: 'white' }}
                className="group-hover:text-yellow-300 transition-colors"
              >
                {HOTLINE}
              </Typography.Link>
            </div>
          </Space>
        }

        {screens.md &&
          <Space size="middle" style={{ minWidth: '120px' }} className="cursor-pointer group transition-all">
            <UserOutlined className="group-hover:scale-110 transition-transform" style={{ fontSize: '26px', color: '#f08a8a' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text strong style={{ color: 'white' }} className="group-hover:text-yellow-300 transition-colors">Tài khoản</Text>
              <Text style={{ fontSize: '12px', color: 'white' }} className="group-hover:text-red-200">Đăng nhập</Text>
            </div>
          </Space>
        }


        {/* 3. Giỏ hàng */}
        <Popover content={cartContent} title="Giỏ hàng của bạn" trigger="hover" placement="bottomRight">
          <div style={{
            backgroundColor: mainColor,
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            border: '1px solid #f08a8a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            margin: '0 0'
          }}>
            <Badge count={cartCount} showZero color="#ff4d4f">
              <ShoppingCartOutlined style={{ fontSize: '35px', color: '#333' }} />
            </Badge>
          </div>
        </Popover>
      </Space>
    </Header>
  </>)
}

export default HeaderContainer;
