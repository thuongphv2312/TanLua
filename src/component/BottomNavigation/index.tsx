import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, AppstoreOutlined, SearchOutlined, PhoneOutlined } from '@ant-design/icons';
import { HOTLINE } from '../NewsPage/constants';

export const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('home');
    } else if (location.pathname === '/search') {
      setActiveTab('search');
    } else {
      setActiveTab('');
    }
  }, [location.pathname]);

  const handleTabClick = (tab: string) => {
    if (tab === 'home') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'category') {
      // Phát sự kiện mở Drawer danh mục của MobileMenu
      window.dispatchEvent(new Event('open_mobile_menu'));
    } else if (tab === 'search') {
      navigate('/');
      // Trì hoãn một chút để đảm bảo đã về trang chủ trước khi focus
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.dispatchEvent(new Event('focus_search_input'));
      }, 100);
    } else if (tab === 'contact') {
      // Mở Zalo hoặc gọi Hotline trực tiếp
      // Ta mở link chat Zalo
      window.open(`https://zalo.me/${HOTLINE.replace(/\./g, '')}`, '_blank');
    }
  };

  return (
    <div className="bottom-nav md:hidden">
      <button
        onClick={() => handleTabClick('home')}
        className={`bottom-nav-item ${activeTab === 'home' ? 'active' : ''}`}
      >
        <HomeOutlined />
        <span>Trang chủ</span>
      </button>
      <button
        onClick={() => handleTabClick('category')}
        className="bottom-nav-item"
      >
        <AppstoreOutlined />
        <span>Danh mục</span>
      </button>
      <button
        onClick={() => handleTabClick('search')}
        className={`bottom-nav-item ${activeTab === 'search' ? 'active' : ''}`}
      >
        <SearchOutlined />
        <span>Tìm kiếm</span>
      </button>
      <button
        onClick={() => handleTabClick('contact')}
        className="bottom-nav-item"
      >
        <PhoneOutlined />
        <span>Liên hệ</span>
      </button>
    </div>
  );
};

export default BottomNavigation;
