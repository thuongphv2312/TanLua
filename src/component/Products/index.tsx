import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined, SearchOutlined, PlusOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Badge, Button, message, Empty, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, HOST } from '../NewsPage/constants';
import { ProductGridSkeleton } from '../ui/SkeletonComponents';
import SEO, { CATEGORY_SEO } from '../SEO';
import { isProductInFlashSale } from '../../utils/flashSale';


interface Product {
  id: number;
  name: string;
  images: string[];
  price: string;
  oldPrice?: string;
  discount?: string;
  url?: string;
  categories?: number[];
}

interface ProductsProps {
  title?: string;
  lstProducts?: Product[];
  bannerImage?: string;
  cartCounts?: { [key: number]: number };
  onAddToCart?: (id: number) => void;
  onAddFlashSaleToCart?: (id: number, flashPrice: string) => void;
  categoryId?: number;
  isLoading?: boolean;
}

const Products: React.FC<ProductsProps> = ({
  title = '',
  lstProducts = [],
  bannerImage,
  cartCounts = {},
  onAddToCart = () => { },
  onAddFlashSaleToCart = () => { },
  categoryId,
  isLoading = false
}) => {
  const [activeCategory, setActiveCategory] = useState(() => {
    if (categoryId) return categoryId;
    if (lstProducts.length > 0) {
      const firstItem = lstProducts[0];
      const match = CATEGORIES.find(c => firstItem.categories?.includes(c.id));
      if (match) return match.id;
    }
    return CATEGORIES[0].id;
  });
  const [visibleCount, setVisibleCount] = useState(10);
  const [addingId, setAddingId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Get current category info for SEO
  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);
  const categorySlug = currentCategory?.slug || '';
  const categorySEO = CATEGORY_SEO[categorySlug as keyof typeof CATEGORY_SEO];


  useEffect(() => {
    if (categoryId) {
      setActiveCategory(categoryId);
      setVisibleCount(10);
    } else if (lstProducts.length > 0) {
      const firstItem = lstProducts[0];
      const match = CATEGORIES.find(c => firstItem.categories?.includes(c.id));
      if (match) {
        setActiveCategory(match.id);
      }
    }
  }, [title, categoryId, lstProducts]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra Card
    setAddingId(product.id);

    const flashProduct = isProductInFlashSale(product.id);

    // Delay để chạy animation trước khi hiện thông báo
    setTimeout(() => {
      if (flashProduct) {
        onAddFlashSaleToCart(product.id, flashProduct.flashPrice);
      } else {
        onAddToCart(product.id);
      }

      message.success({
        content: `Đã thêm ${product.name} vào giỏ hàng!`,
        icon: <ShoppingCartOutlined style={{ color: '#52c41a' }} />,
      });
      setAddingId(null);
    }, 400);
  };

  const dataToDisplay = lstProducts.filter(item => item.categories?.includes(activeCategory));
  const visibleData = dataToDisplay.slice(0, visibleCount);

  return (
    <div className="w-full mx-auto mb-8">
      {/* SEO for Category Pages */}
      {categoryId && categorySEO && (
        <SEO
          title={categorySEO.title}
          description={categorySEO.description}
          keywords={categorySEO.keywords}
          url={`https://${HOST}/${categorySlug}`}
          image={currentCategory?.img}
        />
      )}

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
          display: block;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(203, 43, 43, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(203, 43, 43, 0.5);
        }
        .custom-scrollbar {
          -ms-overflow-style: auto;
          scrollbar-width: thin;
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
        <h2 className={`text-xl font-bold text-left ${title.includes('THANH LÝ') ? 'fire-text !text-2xl uppercase' : ''}`}>
          {title}
        </h2>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {CATEGORIES.map((category) => (
          <Button
            key={category.id}
            type={activeCategory === category.id ? 'primary' : 'default'}
            danger={activeCategory === category.id}
            shape="round"
            onClick={() => {
              setActiveCategory(category.id);
              setVisibleCount(10);
            }}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={10} />
      ) : dataToDisplay.length === 0 ? (
        <div className="py-10">
          <Empty description="Không tìm thấy sản phẩm" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bannerImage && (
            <div className="col-span-2 h-full ransition-transform duration-300 hover:scale-[1.04]">
              <img
                src={bannerImage}
                alt="Banner"
                className="w-full h-full object-cover rounded-lg shadow-sm"
                loading='lazy'
              />
            </div>
          )}
          {visibleData.map((product) => {
            const flashProduct = isProductInFlashSale(product.id);
            const displayPrice = flashProduct ? flashProduct.flashPrice : product.price;
            const displayOldPrice = flashProduct ? (product.oldPrice || product.price) : product.oldPrice;

            return (
              <Card
                key={product.id}
                hoverable
                className="relative overflow-hidden transition-transform duration-300 hover:scale-[1.04]"
                onClick={() => navigate(`/product/${product.id}`)}
                cover={
                  <div className={`relative h-48 flex items-center justify-center ${flashProduct ? 'bg-gradient-to-br from-red-50 to-orange-50' : 'bg-gradient-to-br from-green-100 to-green-50'}`}>
                    {/* Flash Sale Badge */}
                    {flashProduct && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 flex items-center gap-1 animate-pulse">
                        <ThunderboltOutlined /> FLASH SALE
                      </div>
                    )}

                    {/* Discount Badge */}
                    {product.discount && !flashProduct && (
                      <Badge.Ribbon
                        text={<span className={parseInt(product.discount.replace(/\D/g, '')) >= 40 ? "fire-text text-sm scale-125" : "fire-text"}>{product.discount}</span>}
                        color="transparent"
                        className="text-xs font-bold"
                      />
                    )}

                    {activeCategory === 99 && (
                      <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 animate-pulse">
                        XẢ KHO
                      </div>
                    )}

                    {/* Product Image Placeholder */}
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" loading='lazy' />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-300">
                        <SearchOutlined style={{ fontSize: '32px' }} />
                      </div>
                    )}

                    {/* Watermark */}
                    <div className="absolute bottom-2 left-2 text-xs text-gray-400 font-mono">
                      {product.url}
                    </div>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                {/* Product Info */}
                <div className="space-y-2">
                  <Tooltip title={product.name}>
                    <h3 className="text-sm font-medium line-clamp-2 h-10 cursor-help">{product.name}</h3>
                  </Tooltip>

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className={`font-bold text-base ${flashProduct ? 'text-red-600' : 'text-red-500'}`}>
                        {flashProduct && <ThunderboltOutlined className="mr-1" />}
                        {displayPrice}
                      </span>
                      {displayOldPrice && (
                        <span className="text-gray-400 line-through text-xs font-normal">{displayOldPrice}</span>
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
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {dataToDisplay.length > 10 && (
        <div className="text-center mt-8">
          {visibleCount < dataToDisplay.length ? (
            <Button
              type="default"
              size="large"
              shape="round"
              className="px-8"
              onClick={() => setVisibleCount(prev => prev + 10)}
            >
              Xem thêm sản phẩm
            </Button>
          ) : (
            <Button
              type="default"
              size="large"
              shape="round"
              className="px-8"
              onClick={() => setVisibleCount(10)}
            >
              Thu gọn
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
