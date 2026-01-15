import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Layout, ConfigProvider, Grid } from 'antd';
const { useBreakpoint } = Grid;
import HeaderContainer from './component/header';
import ClickSpark from './component/ClickSpark';
import AppFooter from './component/footer';
import { FloatingContactButtons } from './component/FloatingContactButtons';
import MenuContainer from './component/MenuContainer';
import Breadcrumbs from './component/Breadcrumbs';
import { newsList } from './component/NewsPage/constants';
import AppRoutes from './AppRoutes';
import RecentPurchaseNotification from './component/RecentPurchaseNotification';
import NetworkStatus from './component/NetworkStatus';
import MarqueeBanner from './component/MarqueeBanner';
import ScrollToTop from './component/ScrollToTop';
import { FullPageSkeleton } from './component/ui/SkeletonComponents';
import StickyDecorations from './component/StickyDecorations';
import AIChatbot from './component/Chatbot';


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

  // Khởi tạo giỏ hàng từ LocalStorage
  const [cartCounts, setCartCounts] = useState<{ [key: string]: number }>(() => {
    try {
      const saved = localStorage.getItem('cartCounts');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  });

  // Lưu giá flash sale cho các sản phẩm được thêm từ Flash Sale
  const [flashPrices, setFlashPrices] = useState<{ [key: string]: string }>(() => {
    try {
      const saved = localStorage.getItem('flashPrices');
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      return {};
    }
  });

  // Lưu vào LocalStorage khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem('cartCounts', JSON.stringify(cartCounts));
  }, [cartCounts]);

  // Lưu flash prices vào LocalStorage
  useEffect(() => {
    localStorage.setItem('flashPrices', JSON.stringify(flashPrices));
  }, [flashPrices]);

  const totalCartItems = Object.values(cartCounts).reduce((sum, count) => sum + count, 0);


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

  const handleUpdateCart = (productId: string | number) => {
    setCartCounts((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  // Thêm sản phẩm flash sale vào giỏ (có lưu giá flash)
  const handleAddFlashSaleToCart = (productId: string | number, flashPrice: string) => {
    setCartCounts((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    // Lưu giá flash sale
    setFlashPrices((prev) => ({
      ...prev,
      [productId]: flashPrice,
    }));
  };

  const handleDecreaseCart = (productId: string | number) => {
    setCartCounts((prev) => {
      const currentCount = prev[productId] || 0;
      if (currentCount <= 1) return prev; // Không giảm dưới 1
      return {
        ...prev,
        [productId]: currentCount - 1,
      };
    });
  };

  const handleRemoveFromCart = (productId: string | number) => {
    setCartCounts((prev) => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
    // Cũng xóa flash price nếu có
    setFlashPrices((prev) => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
  };

  const handleClearCart = () => {
    setCartCounts({});
    setFlashPrices({});
  };

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
            cartCount={totalCartItems}
            cartCounts={cartCounts}
            productList={newsList}
            isSticky={isSticky}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
          <Content style={contentStyle}>
            <MenuContainer />
            <Breadcrumbs />
            {isInitialLoading ? (
              <FullPageSkeleton />
            ) : (
              <AppRoutes
                cartCounts={cartCounts}
                flashPrices={flashPrices}
                onUpdateCart={handleUpdateCart}
                onAddFlashSaleToCart={handleAddFlashSaleToCart}
                onDecreaseCart={handleDecreaseCart}
                onRemoveFromCart={handleRemoveFromCart}
                onClearCart={handleClearCart}
              />
            )}
          </Content>
          <FloatingContactButtons />
          <RecentPurchaseNotification />
          <AppFooter />
        </Layout>
        <StickyDecorations />
        <AIChatbot />
      </ClickSpark>
    </ConfigProvider>
  );
};

export default App;
