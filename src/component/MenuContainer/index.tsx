import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, DockerOutlined, RedditOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { PARAMETERS, ROUTE_MAP } from '../../constants';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: 'Danh mục sản phẩm',
    key: 'SubMenu',
    icon: <AppstoreOutlined />,
    children: [
      {
        key: 'dauxitapluc',
        label: 'Đầu xịt áp lực',
        children: [
          { key: 'dauxitapluc11', label: 'Xi lanh 22mm 1HP' },
          { key: 'dauxitapluc12', label: 'Xi lanh 30mm 2HP' },
        ],
      },
      // {
      //   type: 'group',
      //   label: 'Item 2',
      //   children: [
      //     { label: 'Option 3', key: 'setting:3' },
      //     { label: 'Option 4', key: 'setting:4' },
      //   ],
      // },
      {
        key: 'mayhan',
        label: 'Máy hàn',
        children: [
          { key: 'mayhan11', label: 'Option 11' },
          { key: 'mayhan12', label: 'Option 12' },
        ],
      },
      {
        key: 'maycatco',
        label: 'Máy cắt cỏ',
        children: [
          { key: 'maycatco11', label: 'Option 11' },
          { key: 'maycatco12', label: 'Option 12' },
        ],
      },
      {
        key: 'dayphunapluc',
        label: 'Dây phun áp lực',
        children: [
          { key: 'dayphunapluc11', label: 'Option 11' },
          { key: 'dayphunapluc12', label: 'Option 12' },
        ],
      },
      {
        key: 'mayxoidat',
        label: 'Máy xới đất',
        children: [
          { key: 'mayxoidat11', label: 'Option 11' },
          { key: 'mayxoidat12', label: 'Option 12' },
        ],
      },
      {
        key: 'mayduc',
        label: 'Máy đục',
        children: [
          { key: 'mayduc11', label: 'Option 11' },
          { key: 'mayduc12', label: 'Option 12' },
        ],
      },
      {
        key: 'maynenkhi',
        label: 'Máy nén khí',
        children: [
          { key: 'maynenkhi11', label: 'Option 11' },
          { key: 'maynenkhi12', label: 'Option 12' },
        ],
      },
      {
        type: 'item',
        label: 'Option 5',
        key: 'setting:5',
      },
    ],
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

const MenuContainer: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const navigate = useNavigate()
  const location = useLocation();
  const { Search } = Input;

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
    }
  };

  const onSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)' }}>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ flex: 1, borderBottom: 'none', borderRadius: '8px' }} />
    </div>
  );
};

export default MenuContainer;
