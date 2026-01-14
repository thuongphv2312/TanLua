import React, { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Empty, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Products from '../Products';
import { newsList } from '../NewsPage/constants';

const { Title } = Typography;

interface SearchResultsProps {
  cartCounts: { [key: number]: number };
  onAddToCart: (id: number) => void;
  onAddFlashSaleToCart: (id: number, flashPrice: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ cartCounts, onAddToCart, onAddFlashSaleToCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  // Lưu từ khóa tìm kiếm vào sessionStorage để khi bấm breadcrumb (mất query param) thì restore lại
  useEffect(() => {
    if (query) {
      sessionStorage.setItem('last_search_query', query);
    } else {
      const lastQuery = sessionStorage.getItem('last_search_query');
      if (lastQuery) {
        navigate(`/search?q=${encodeURIComponent(lastQuery)}`, { replace: true });
      }
    }
  }, [query, navigate]);

  // Lọc sản phẩm từ newsList dựa trên từ khóa
  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase().trim();
    return newsList.filter((item: any) =>
      (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
      (item.title && item.title.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 min-h-[60vh]">
      <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-600 w-fit transition-colors" onClick={() => navigate('/')}>
        <ArrowLeftOutlined /> <span>Quay lại trang chủ</span>
      </div>

      <Title level={2} className="text-center mb-8">
        Kết quả tìm kiếm cho: "{query}"
      </Title>

      {filteredProducts.length > 0 ? (
        <Products
          title={`Tìm thấy ${filteredProducts.length} sản phẩm phù hợp`}
          lstProducts={filteredProducts as any}
          cartCounts={cartCounts}
          onAddToCart={onAddToCart}
          onAddFlashSaleToCart={onAddFlashSaleToCart}
        />
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <Empty description="Không tìm thấy sản phẩm nào phù hợp với từ khóa của bạn" />
          <Button type="primary" className="mt-4" onClick={() => navigate('/')}>
            Xem tất cả sản phẩm
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
