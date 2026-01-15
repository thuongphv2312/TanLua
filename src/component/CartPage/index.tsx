import React from 'react';
import { Button, Table, Typography, Image, Card, Empty, Divider, Tooltip } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined, ArrowLeftOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const { Title, Text } = Typography;

interface CartPageProps {
  cartCounts: { [key: string]: number };
  flashPrices?: { [key: string]: string };
  productList: any[];
  onIncrease: (id: string | number) => void;
  onDecrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartCounts, flashPrices = {}, productList, onIncrease, onDecrease, onRemove }) => {
  const navigate = useNavigate();

  // Chuyển đổi cartCounts (object) thành mảng sản phẩm để hiển thị
  const cartItems = Object.keys(cartCounts).map((key) => {
    const id = key;
    const product = productList.find((p: any) => String(p.id) === String(id));
    if (!product) return null;

    // Nếu có flash price, sử dụng nó thay vì giá gốc
    const effectivePrice = flashPrices[id] || product.price;
    const isFlashSale = !!flashPrices[id];

    return {
      ...product,
      quantity: cartCounts[id],
      effectivePrice,
      isFlashSale,
      originalPrice: isFlashSale ? product.price : null
    };
  }).filter((item: any) => item !== null);

  // Hàm tính thành tiền cho từng dòng
  const calculateTotal = (priceStr: string, quantity: number) => {
    if (!priceStr) return 0;
    const price = parseInt(priceStr.replace(/\D/g, ''), 10) || 0;
    return price * quantity;
  };

  // Tính tổng tiền toàn bộ giỏ hàng (sử dụng effectivePrice)
  const totalAmount = cartItems.reduce((acc: number, item: any) => {
    return acc + calculateTotal(item.effectivePrice, item.quantity);
  }, 0);

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center gap-4 overflow-hidden">
          <div style={{ width: 80, height: 80, minWidth: 80 }} className="flex-shrink-0 cursor-pointer">
            <Image src={record.images[0]} width={80} height={80} className="object-cover rounded-md" />
          </div>
          <div className="flex flex-col min-w-0">
            <Tooltip title={text}>
              <Text strong className="text-base line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate(`/product/${record.id}`)}>
                {text}
              </Text>
            </Tooltip>
            <Text type="secondary" className="text-xs">Mã SP: {record.id}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Đơn giá',
      dataIndex: 'effectivePrice',
      key: 'price',
      responsive: ['md'],
      render: (_: string, record: any) => (
        <div className="flex flex-col">
          <Text strong className={`whitespace-nowrap ${record.isFlashSale ? 'text-red-600' : ''}`}>
            {record.isFlashSale && <ThunderboltOutlined className="text-orange-500 mr-1" />}
            {record.effectivePrice}
          </Text>
          {record.isFlashSale && record.originalPrice && (
            <Text className="text-gray-400 line-through text-xs">{record.originalPrice}</Text>
          )}
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: any) => (
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md w-fit">
          <Button
            type="text"
            icon={<MinusOutlined />}
            onClick={() => onDecrease(record.id)}
            disabled={quantity <= 1}
            className="flex items-center justify-center"
          />
          <span className="px-4 font-semibold min-w-[40px] text-center">{quantity}</span>
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => onIncrease(record.id)}
            className="flex items-center justify-center"
          />
        </div>
      ),
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_: any, record: any) => (
        <Text type="danger" strong className="whitespace-nowrap">
          {calculateTotal(record.effectivePrice, record.quantity).toLocaleString('vi-VN')}₫
        </Text>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_: any, record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemove(record.id)}
        />
      ),
    },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white rounded-lg shadow-sm m-4 p-8">
        <Empty description="Giỏ hàng của bạn đang trống" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        <Button type="primary" size="large" className="mt-6" onClick={() => navigate('/')}>
          Tiếp tục mua sắm
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 w-full">
      <div className="flex items-center gap-2 mb-6 cursor-pointer hover:text-blue-600 w-fit transition-colors" onClick={() => navigate('/')}>
        <ArrowLeftOutlined /> <span>Tiếp tục mua sắm</span>
      </div>

      <Title level={2} className="mb-8 !text-2xl md:!text-3xl">Giỏ hàng ({cartItems.length} sản phẩm)</Title>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Danh sách sản phẩm */}
        <div className="w-full lg:flex-1">
          <Table
            columns={columns as any}
            dataSource={cartItems}
            rowKey="id"
            pagination={false}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
            scroll={{ x: 600 }}
          />
        </div>

        {/* Tổng đơn hàng - Sticky Sidebar */}
        <motion.div
          className="w-full lg:w-[400px] lg:sticky lg:top-32 transition-all duration-300"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-sm border-gray-200 hover:shadow-md transition-shadow">
            <Title level={4} className="!mb-0">Cộng giỏ hàng</Title>
            <Divider className="my-4" />

            <div className="flex justify-between mb-4">
              <Text className="text-gray-600">Tạm tính:</Text>
              <Text strong>{totalAmount.toLocaleString('vi-VN')}₫</Text>
            </div>

            <div className="flex justify-between mb-6">
              <Text strong className="text-lg">Tổng cộng:</Text>
              <Text type="danger" strong className="text-xl">
                {totalAmount.toLocaleString('vi-VN')}₫
              </Text>
            </div>

            <Button
              type="primary"
              danger
              block
              size="large"
              className="h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate('/cart/checkout')}
            >
              TIẾN HÀNH THANH TOÁN
            </Button>

            <div className="mt-4 text-center">
              <Text type="secondary" className="text-xs">
                Phí vận chuyển sẽ được tính ở trang thanh toán.
              </Text>
            </div>
          </Card>
        </motion.div>
      </div>
    </div >
  );
};

export default CartPage;
