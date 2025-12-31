import React, { useState, useEffect } from 'react';
import { FloatButton } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import './index.css';
import { HOTLINE } from '../NewsPage/constants';

export const FloatingContactButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const iconStyle = { width: '28px', height: '28px', objectFit: 'contain', zIndex: 2 } as any;

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FloatButton.Group shape="circle" style={{ right: 24, bottom: 24 }}>
      {/* Nút Back to Top */}
      {showBackToTop && (
        <div className="fade-in">
          <FloatButton
            icon={<VerticalAlignTopOutlined />}
            type="primary"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
      )}

      {/* Các nút mạng xã hội */}
      <FloatButton
        icon={<img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" style={iconStyle} loading='lazy' />}
        href={`https://zalo.me/${HOTLINE}`}
        target="_blank"
      />
      <FloatButton
        icon={<img src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg" alt="Messenger" style={iconStyle} loading='lazy'/>}
        href="https://www.facebook.com"
        target="_blank"
      />

      {/* Nút Hotline với hiệu ứng Sóng Tỏa và Rung */}
      <FloatButton
        className="hotline-pulse-wrapper shake-animation"
        icon={<img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Phone" style={iconStyle} loading='lazy'/>}
        style={{ border: '1px solid #ff4d4f' }}
        href={`tel:${HOTLINE}`}
      />
    </FloatButton.Group>
  );
};
