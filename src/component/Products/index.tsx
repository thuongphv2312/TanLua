import React, { useState } from 'react';
import { ShoppingCartOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Badge, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { newsList } from '../NewsPage/constants';


interface Product {
  id: number;
  name: string;
  images: string[];
  price: string;
  oldPrice?: string;
  discount?: string;
  url?: string;
}

interface ProductsProps {
  title?: string;
  lstProducts?: Product[];
  bannerImage?: string;
  cartCounts?: { [key: number]: number };
  onAddToCart?: (id: number) => void;
}

const Products: React.FC<ProductsProps> = ({ title = '', lstProducts = [], bannerImage, cartCounts = {}, onAddToCart = () => {} }) => {
  const [activeCategory, setActiveCategory] = useState('Đầu Bơm Xịt Rửa Xe');
  const [addingId, setAddingId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra Card
    setAddingId(product.id);

    // Delay để chạy animation trước khi hiện thông báo
    setTimeout(() => {
      onAddToCart(product.id);

      message.success({
        content: `Đã thêm ${product.name} vào giỏ hàng!`,
        icon: <ShoppingCartOutlined style={{ color: '#52c41a' }} />,
      });
      setAddingId(null);
    }, 400);
  };

  const categories = [
    'Đầu Bơm Xịt Rửa Xe',
    'Máy Xới Đất',
    'Máy Cưa Xích',
    'Máy Khoan Đất',
    'Bình Xịt Điện',
    'Dây Phun Áp Lực',
    'Máy Bơm Nước',
    'Máy Nổ',
    'Máy Cắt Cỏ'
  ];

  const dataToDisplay = lstProducts.length > 0 ? lstProducts : newsList;

  return (
    <div className="w-full mx-auto">
      <style>{`
        @keyframes fire {
          0% { text-shadow: 0 0 2px #fff, 0 -1px 2px #ffeb3b, 0 -2px 4px #ff5722; }
          50% { text-shadow: 0 0 2px #fff, 0 -2px 4px #ffeb3b, 0 -3px 6px #ff5722; }
          100% { text-shadow: 0 0 2px #fff, 0 -1px 2px #ffeb3b, 0 -2px 4px #ff5722; }
        }
        .fire-text {
          color: #f5222d;
          font-weight: 800;
          font-size: 14px;
          animation: fire 0.3s ease-in-out infinite alternate;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        @keyframes click-bounce {
          0% { transform: scale(1); }
          40% { transform: scale(0.75); }
          100% { transform: scale(1); }
        }
        .btn-adding {
          animation: click-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background-color: #52c41a !important;
          border-color: #52c41a !important;
        }
      `}</style>
      {/* Header with Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-left">{title}</h2>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {categories.map((category) => (
          <Button
            key={category}
            type={activeCategory === category ? 'primary' : 'default'}
            danger={activeCategory === category}
            shape="round"
            onClick={() => setActiveCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {bannerImage && (
          <div className="col-span-2 h-full ransition-transform duration-300 hover:scale-[1.04]">
            <img
              src={bannerImage}
              alt="Banner"
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>
        )}
        {(bannerImage ? dataToDisplay.slice(2, 10) : dataToDisplay.slice(0, 10)).map((product) => (
          <Card
            key={product.id}
            hoverable
            className="relative overflow-hidden transition-transform duration-300 hover:scale-[1.04]"
            onClick={() => navigate(`/product/${product.id}`)}
            cover={
              <div className="relative bg-gradient-to-br from-green-100 to-green-50 h-48 flex items-center justify-center">
                {/* Discount Badge */}
                {product.discount && (
                  <Badge.Ribbon
                    text={<span className="fire-text">{product.discount}</span>}
                    color="transparent"
                    className="text-xs font-bold"
                  />
                )}

                {/* Product Image Placeholder */}
                {product.images[0] && product.images[0].startsWith('http') ? (
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-6xl">{product.images[0]}</div>
                )}

                {/* Watermark */}
                <div className="absolute bottom-2 left-2 text-xs text-gray-400 font-mono">
                  {product.url}
                </div>

                {/* Quick View Icon */}
                {/* <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100">
                  <SearchOutlined className="text-gray-600" />
                </div> */}
              </div>
            }
            bodyStyle={{ padding: '12px' }}
          >
            {/* Product Info */}
            <div className="space-y-2">
              <p className="text-xs text-gray-500 uppercase">{product.url}</p>
              <h3 className="text-sm font-medium line-clamp-2 h-10">{product.name}</h3>

              {/* Price Section */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-red-600 font-bold text-base">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through text-xs">{product.oldPrice}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button
                  type="primary"
                  danger
                  icon={cartCounts[product.id] ? null : <PlusOutlined />}
                  shape="circle"
                  size="middle"
                  className={addingId === product.id ? 'btn-adding' : ''}
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  {cartCounts[product.id] ? <span className="font-bold">{cartCounts[product.id]}</span> : null}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-8 mb-8">
        <Button
          type="default"
          size="large"
          shape="round"
          className="px-8"
          onClick={() => message.info('Tính năng đang được cập nhật...')}
        >
          Xem thêm sản phẩm
        </Button>
      </div>
    </div>
  );
};

export default Products;
