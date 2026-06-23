import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Layout, ConfigProvider, Grid } from 'antd';
const { useBreakpoint } = Grid;
import HeaderContainer from './component/header';
import ClickSpark from './component/ClickSpark';
import AppFooter from './component/footer';
import { FloatingContactButtons } from './component/FloatingContactButtons';
import Breadcrumbs from './component/Breadcrumbs';
import AppRoutes from './AppRoutes';
import BottomNavigation from './component/BottomNavigation';
import NetworkStatus from './component/NetworkStatus';
import MarqueeBanner from './component/MarqueeBanner';
import ScrollToTop from './component/ScrollToTop';
import { FullPageSkeleton } from './component/ui/SkeletonComponents';

import AIChatbot from './component/Chatbot';
// import SideBanners from './component/SideBanners';
// import FallingPetals from './component/FallingPetals';


import { theme } from 'antd';
const { Content } = Layout;

const App = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const screens = useBreakpoint();

  // Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    // Giả lập thời gian load app ban đầu
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const mainColor = '#daca72';


  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", revealOnScroll);
    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  // Style cho Layout Full Màn Hình
  const layoutStyle = {
    // minHeight: '500vh', // Chiều cao tràn màn hình
    width: '99.2vw',    // Chiều rộng tràn màn hình
    background: 'transparent',
  };

  const headerStyle = {
    backgroundColor: '#cb2b2b',
    height: '100px',
    padding: screens.md ? '0 50px' : '0 15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    lineHeight: 'normal', // Reset line-height mặc định của antd header
    boxShadow: isSticky ? '0 4px 12px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
    position: isSticky ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100, // Increase Z-index to be above other content
    // Hiệu ứng trượt xuống khi xuất hiện
    animation: isSticky ? 'slideDown 0.4s ease-out' : 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  } as any;

  const contentStyle = {
    textAlign: 'center',
    padding: screens.md ? '0 10vw 50px 10vw' : '0 5vw 50px 5vw',
    minHeight: '50px 100px',
    backgroundColor: 'transparent',
  } as any;


  // Theo dõi sự kiện scroll
  useEffect(() => {
    const handleScroll = () => {
      // Nếu cuộn hơn 200px thì bật trạng thái Sticky
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: mainColor,
        },
      }}
    >
      <style>
        {`
          @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
          :root {
            --main-color: ${mainColor};
          }
          [data-theme='dark'] .ant-layout-header {
            background-color: #1a1a1a !important;
          }
        `}
      </style>
      <NetworkStatus />
      <ScrollToTop />
      <ClickSpark
        sparkColor={mainColor}
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Layout style={layoutStyle}>
          <MarqueeBanner />
          <HeaderContainer
            headerStyle={headerStyle}
            mainColor={mainColor}
            isSticky={isSticky}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
          <Content className="main-content" style={contentStyle}>
            <Breadcrumbs />
            {isInitialLoading ? (
              <FullPageSkeleton />
            ) : (
              <AppRoutes />
            )}
          </Content>
          <FloatingContactButtons />
          <AppFooter />
          {!screens.md && <BottomNavigation />}
        </Layout>
        {/* <SideBanners /> */}
        {/* <FallingPetals /> */}
        {/* <StickyDecorations /> */}
        <AIChatbot />
      </ClickSpark>
    </ConfigProvider>
  );
};

export default App;
