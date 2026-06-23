import { Input, Space, Typography, Layout, Grid } from 'antd';
import {
  SearchOutlined,
  PhoneOutlined,
  UserOutlined
  // ShoppingCartOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HOTLINE } from '../NewsPage/constants';
import { MobileMenu } from '../MenuContainer';
import brand1 from '../../assets/tojiko.png';
import brand2 from '../../assets/TALU.png';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeToggle from '../ThemeToggle';
const { Header } = Layout;
const { useBreakpoint } = Grid;
const HeaderContainer = ({
  headerStyle = {},
  mainColor = '',
  isDarkMode = false,
  onToggleTheme = () => { }
}: any) => {
  const { Text } = Typography;
  const [searchValue, setSearchValue] = useState('');
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const [retailerName, setRetailerName] = useState<string | null>(null);
  const searchInputRef = useRef<any>(null);

  useEffect(() => {
    const handleFocus = () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };
    window.addEventListener('focus_search_input', handleFocus);
    return () => window.removeEventListener('focus_search_input', handleFocus);
  }, []);

  /* Session Check Logic */
  const checkSession = () => {
    try {
      const session = sessionStorage.getItem('kiot_admin_session');
      if (session) {
        const data = JSON.parse(session);
        if (data.retailer) {
          setRetailerName(data.retailer);
          return;
        }
      }
    } catch { }
    setRetailerName(null);
  };

  useEffect(() => {
    checkSession();
    window.addEventListener('kiot_session_changed', checkSession);
    return () => window.removeEventListener('kiot_session_changed', checkSession);
  }, []);

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
    <Header style={{ ...headerStyle, boxShadow: isDarkMode ? '0 4px 20px rgba(0,0,0,0.5)' : '0 4px 10px rgba(0,0,0,0.05)' }} >
      <MobileMenu isDarkMode={isDarkMode} onToggleTheme={onToggleTheme} />

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
            ref={searchInputRef}
            placeholder={currentPlaceholder}
            style={{ minWidth: '120px', flex: 1 }}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            bordered={false}
          />
          <div style={{ backgroundColor: mainColor, padding: '12px 20px', cursor: 'pointer' }} onClick={handleSearch}>
            <SearchOutlined style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }} />
          </div>
        </div>

      </div>

      {screens.md && (
        <Space style={{ margin: '0 15px' }}>
          <img src={brand1} alt="Brand 1" style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px', paddingBottom: '10px', borderRadius: '5px', cursor: 'pointer', objectFit: 'contain' }} />
          <img src={brand2} alt="Brand 2" style={{ maxWidth: '100%', height: 'auto', maxHeight: '80px', cursor: 'pointer', borderRadius: '5px', objectFit: 'contain' }} />
        </Space>
      )}

      {/* 2. Hotline & Account & Language */}
      <Space size={20} style={{ margin: screens.md ? '0 50px' : '0 10px' }} >
        {screens.md &&
          <Space size="middle" style={{ minWidth: '150px' }} className="cursor-pointer group transition-all">
            <PhoneOutlined className="group-hover:scale-110 transition-transform" style={{ fontSize: '26px', color: '#fff' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{ fontSize: '12px', color: '#ffcccc' }}>Hỗ trợ khách hàng</Text>
              <Typography.Link
                href={`tel:${HOTLINE.replace(/\./g, '')}`}
                strong
                style={{ color: '#daca72' }}
                className="header-gold-text group-hover:text-white transition-colors"
              >
                <span style={{ color: '#daca72' }}>{HOTLINE}</span>
              </Typography.Link>
            </div>
          </Space>
        }

        {screens.md &&
          <Space size="middle" style={{ minWidth: '120px' }} className="cursor-pointer group transition-all" onClick={() => navigate('/kiot-admin')}>
            <UserOutlined className="group-hover:scale-110 transition-transform" style={{ fontSize: '26px', color: '#fff' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text strong style={{ color: '#daca72' }} className="header-gold-text group-hover:text-white transition-colors">
                <span style={{ color: '#daca72' }}>{retailerName ? retailerName : 'Tài khoản'}</span>
              </Text>
              <Text style={{ fontSize: '12px', color: '#ffcccc' }}>{retailerName ? 'Quản lý' : 'Đăng nhập'}</Text>
            </div>
          </Space>
        }

        {/* Theme Toggle - Desktop */}
        {screens.md && (
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        )}

        {/* Language Switcher - Desktop */}
        {screens.md && <LanguageSwitcher />}
      </Space>
    </Header>
  </>)
}

export default HeaderContainer;
