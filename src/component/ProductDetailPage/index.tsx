import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Rate, Divider, Image, message, Breadcrumb } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { newsList } from '../NewsPage/constants';

const { Title, Text, Paragraph } = Typography;

interface ProductDetailPageProps {
  onAddToCart: (id: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const foundProduct = newsList.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.images[0]);
    }
  }, [id]);

  if (!product) {
    return <div className="text-center py-20">Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Breadcrumb & Back Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined /> <span>Quay lại</span>
        </div>
        {/* <Breadcrumb
          items={[
            { title: <a href="/">Trang chủ</a> },
            { title: 'Sản phẩm' },
            { title: product.name },
          ]}
        /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow-sm">
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden h-[400px] flex items-center justify-center bg-gray-50">
            <Image
              src={mainImage}
              alt={product.name}
              className="object-contain max-h-full"
              style={{ maxHeight: '400px', width: 'auto' }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product.images.map((img: string, index: number) => (
              <div
                key={index}
                className={`w-20 h-20 border rounded cursor-pointer flex-shrink-0 overflow-hidden ${mainImage === img ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
                onClick={() => setMainImage(img)}
              >
                <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div>
            <Title level={2} className="!mb-2">{product.name}</Title>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Mã SP: {product.id}</span>
              <Divider type="vertical" />
              <span>Thương hiệu: {product.author || 'Oshima'}</span>
              <Divider type="vertical" />
              <Rate disabled defaultValue={5} style={{ fontSize: 14 }} />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-baseline gap-4">
              <Text className="text-3xl font-bold text-red-600">{product.price}</Text>
              {product.oldPrice && (
                <Text delete className="text-gray-400 text-lg">{product.oldPrice}</Text>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-bold">{product.discount}</span>
              )}
            </div>
          </div>

          <div>
            <Title level={5}>Mô tả ngắn:</Title>
            <Paragraph className="text-gray-600">{product.description}</Paragraph>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="primary"
              danger
              size="large"
              icon={<ShoppingCartOutlined />}
              className="h-12 px-8 text-lg font-semibold flex-1"
              onClick={() => {
                onAddToCart(product.id);
                message.success(`Đã thêm ${product.name} vào giỏ hàng!`);
              }}
            >
              THÊM VÀO GIỎ HÀNG
            </Button>
          </div>

          <Divider />

          <div className="space-y-2 text-sm text-gray-600">
            <p>✅ Cam kết chính hãng 100%</p>
            <p>✅ Bảo hành 12 tháng</p>
            <p>✅ Giao hàng toàn quốc</p>
          </div>
        </div>
      </div>

      {/* Chi tiết sản phẩm (Nội dung dài) */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <Title level={3} className="border-b pb-4 mb-4">Chi tiết sản phẩm</Title>
        <div className="prose max-w-none">
          <p>{product.description}</p>
          <p>Thông tin chi tiết đang được cập nhật...</p>
          {/* Bạn có thể render nội dung HTML chi tiết ở đây nếu có */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
