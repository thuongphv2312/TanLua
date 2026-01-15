
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message, Tooltip, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PhoneOutlined, UserOutlined, ArrowLeftOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { HashLoader } from 'react-spinners';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface CheckoutPageProps {
  cartCounts: { [key: string]: number };
  flashPrices?: { [key: string]: string };
  productList: any[];
  onClearCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartCounts, flashPrices = {}, productList, onClearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Tính toán lại giỏ hàng để hiển thị (với flash price nếu có)
  const cartItems = Object.keys(cartCounts).map((key) => {
    const id = key;
    const product = productList.find((p: any) => String(p.id) === String(id));
    if (!product) return null;

    // Sử dụng flash price nếu có, không thì dùng giá gốc
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

  // Tính tổng tiền sử dụng effectivePrice
  const totalAmount = cartItems.reduce((acc: number, item: any) => {
    const price = parseInt(item.effectivePrice.replace(/\D/g, ''), 10) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const onFinish = async (values: any) => {
    console.log('>>> BẮT ĐẦU GỬI ĐƠN HÀNG (onFinish fired)');
    setLoading(true);

    // Sử dụng effectivePrice khi gửi lên Google Sheet
    const orderData = {
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      address: values.address,
      note: values.note,
      itemsList: cartItems.map(item => {
        const priceDisplay = item.isFlashSale
          ? `${item.effectivePrice} (FLASH SALE, giá gốc: ${item.originalPrice})`
          : item.effectivePrice;
        return `${item.name} (SL: ${item.quantity}) - ${priceDisplay}`;
      }).join('\n'),
      totalAmount: totalAmount.toLocaleString('vi-VN') + '₫',
      orderDate: new Date().toLocaleString('vi-VN')
    };

    try {
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_hq3Z1q6spwczXFO8oVyc3fSgLXWQhe9Xa8aBzahy25BABqq-bT_hlRUhmWVIEtXyMA/exec';

      // Tạo trễ giả lập 2 giây để người dùng thấy được hiệu ứng loading
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Dữ liệu đơn hàng gửi đi:', orderData);
      console.log('Đang chuẩn bị gọi API tới:', GOOGLE_SCRIPT_URL);

      if (GOOGLE_SCRIPT_URL) {
        try {
          const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(orderData),
          });
          console.log('Kết quả gọi API (no-cors):', response);
        } catch (fetchError) {
          console.error('Lỗi khi fetch:', fetchError);
        }
      } else {
        console.warn('Không có GOOGLE_SCRIPT_URL');
      }

      message.success('Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm.');
      onClearCart();
      navigate('/');
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return <div className="p-8 text-center">Giỏ hàng trống</div>;
  }

  return (
    <div style={{ position: 'relative', minHeight: '400px' }}>
      {/* Overlay Loading bằng React Spinners */}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(4px)'
        }}>
          <HashLoader color="#cb2b2b" size={60} />
          <Text style={{ marginTop: '20px', fontWeight: 'bold', color: '#cb2b2b' }}>
            Đang xử lý đơn hàng...
          </Text>
        </div>
      )}

      <div className="max-w-6xl mx-auto py-8 px-4" style={{
        opacity: loading ? 0.3 : 1,
        pointerEvents: loading ? 'none' : 'auto',
        transition: 'opacity 0.3s'
      }}>
        <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-600 w-fit transition-colors" onClick={() => navigate('/cart')}>
          <ArrowLeftOutlined /> <span>Quay lại giỏ hàng</span>
        </div>
        <Title level={2} className="text-center mb-8">Thanh Toán</Title>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card title="Thông tin giao hàng" className="shadow-sm">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={(error) => {
                console.error('Form Validation Failed:', error);
                message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
              }}
              size="large"
            >
              <Form.Item name="fullName" label="Họ và tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                <Input prefix={<PhoneOutlined />} placeholder="0912345678" />
              </Form.Item>

              <Form.Item name="address" label="Địa chỉ nhận hàng" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                <TextArea rows={3} placeholder="Số nhà, đường, phường/xã, quận/huyện..." />
              </Form.Item>

              <Form.Item name="note" label="Ghi chú đơn hàng">
                <TextArea rows={2} placeholder="Giao giờ hành chính, gọi trước khi giao..." />
              </Form.Item>

              <Button type="primary" htmlType="submit" block size="large" loading={loading} className="mt-4 bg-red-600 hover:bg-red-500 border-red-600 h-12 font-bold">
                ĐẶT HÀNG ({totalAmount.toLocaleString('vi-VN')}₫)
              </Button>
            </Form>
          </Card>

          <Card title="Đơn hàng của bạn" className="shadow-sm h-fit">
            <div className="space-y-4">
              {cartItems.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="relative flex-shrink-0" style={{ width: 80, height: 80, minWidth: 80 }}>
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="rounded"
                      />
                      <span className="absolute top-0 -right-3 bg-gray-500 text-white text-[10px] min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full z-10 font-bold border border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <Tooltip title={item.name}>
                        <Text strong className="line-clamp-2 text-sm cursor-pointer hover:text-blue-600 transition-colors" onClick={() => navigate(`/product/${item.id}`)}>
                          {item.name}
                        </Text>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Text strong className={item.isFlashSale ? 'text-red-600' : ''}>
                      {item.isFlashSale && <ThunderboltOutlined className="text-orange-500 mr-1" />}
                      {((parseInt(item.effectivePrice.replace(/\D/g, ''), 10) || 0) * item.quantity).toLocaleString('vi-VN')}₫
                    </Text>
                    {item.isFlashSale && (
                      <Text className="text-gray-400 line-through text-xs">
                        {((parseInt(item.originalPrice.replace(/\D/g, ''), 10) || 0) * item.quantity).toLocaleString('vi-VN')}₫
                      </Text>
                    )}
                  </div>
                </div>
              ))}
              <Divider />
              <div className="flex justify-between items-center">
                <Text strong className="text-lg">Tổng cộng</Text>
                <Text type="danger" strong className="text-xl">{totalAmount.toLocaleString('vi-VN')}₫</Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
