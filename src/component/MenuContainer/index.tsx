import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, DockerOutlined, RedditOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Input, Grid, Button, Drawer } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { PARAMETERS, ROUTE_MAP } from '../../constants';
import { CATEGORIES } from '../NewsPage/constants';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Danh mục sản phẩm',
    key: 'SubMenu',
    icon: <AppstoreOutlined />,
    children: CATEGORIES.filter(
      (c) => !['Máy nông nghiệp', 'Máy công nghiệp', 'Tin tức'].includes(c.name)
    ).map((c) => ({
      key: c.slug,
      label: c.name,
    })),
  },
  {
    label: 'Máy nông nghiệp',
    key: PARAMETERS['AGRICULTURAL_MACHINERY'],
    icon: <RedditOutlined />,
  },
  {
    label: 'Máy công nghiệp',
    key: PARAMETERS['INDUSTRIAL_MACHINERY'],
    icon: <DockerOutlined />,
    disabled: false,
  },
  {
    key: PARAMETERS['NEWS'],
    label: 'Tin tức',
  },
];

export const MobileMenu: React.FC<{ isSticky: boolean }> = ({ isSticky }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onClick: MenuProps['onClick'] = (e) => {
    const key = e.key;
    // HashMap xử lý điều hướng:
    const targetPath = ROUTE_MAP[key];
    if (targetPath) {
      navigate(targetPath);
    } else if (key === 'home') {
      navigate('/');
    } else {
      const category = CATEGORIES.find((c) => c.slug === key);
      if (category) navigate(`/${category.slug}`);
    }
    setDrawerOpen(false);
  };

  // Chỉ hiện trên Mobile
  if (screens.md) return null;

  return (
    <>
      <Button
        icon={<MenuOutlined style={{ fontSize: '24px', color: '#fff' }} />}
        onClick={() => setDrawerOpen(true)}
        type="text"
        style={{
          position: isSticky ? 'fixed' : 'absolute',
          top: '30px', // Căn giữa theo chiều cao Header 100px
          left: '10px',
          zIndex: 1000,
          height: '40px',
          width: '40px',
        }}
      />
      <Drawer
        title="Danh mục"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={280}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          onClick={onClick}
          mode="inline"
          items={items}
          style={{ borderRight: 'none' }}
        />
      </Drawer>
    </>
  );
};

const MenuContainer: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate()
  const location = useLocation();
  const { Search } = Input;
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // Đảo ngược map để tìm Key dựa trên Path (dùng cho useEffect)
  const PATH_TO_KEY = Object.entries(ROUTE_MAP).reduce((acc, [key, path]) => {
    acc[path] = key;
    return acc;
  }, {} as Record<string, string>);

  useEffect(() => {
    // HashMap xử lý: Lấy key từ đường dẫn hiện tại
    // Nếu không có trong map (ví dụ trang chủ '/') thì trả về chuỗi rỗng
    const activeKey = PATH_TO_KEY[location.pathname] || '';
    setCurrent(activeKey);
  }, [location.pathname]);

  const onClick: MenuProps['onClick'] = (e) => {
    const key = e.key;
    setCurrent(key);

    // HashMap xử lý điều hướng:
    const targetPath = ROUTE_MAP[key];
    if (targetPath) {
      navigate(targetPath);
    } else if (key === 'home') { // Ví dụ cho trang chủ
      navigate('/');
    } else {
      const category = CATEGORIES.find((c) => c.slug === key);
      if (category) navigate(`/${category.slug}`);
    }
  };

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  // Ẩn menu ngang trên Mobile
  if (!screens.md) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ flex: 1, borderBottom: 'none', borderRadius: '8px' }} />
    </div>
  );
};

export default MenuContainer;
