
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PhoneOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

interface CheckoutPageProps {
  cartCounts: { [key: number]: number };
  productList: any[];
  onClearCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartCounts, productList, onClearCart }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Tính toán lại giỏ hàng để hiển thị
  const cartItems = Object.keys(cartCounts).map((key) => {
    const id = Number(key);
    const product = productList.find((p: any) => p.id === id);
    return product ? { ...product, quantity: cartCounts[id] } : null;
  }).filter((item: any) => item !== null);

  const totalAmount = cartItems.reduce((acc: number, item: any) => {
    const price = parseInt(item.price.replace(/\D/g, ''), 10) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const onFinish = async (values: any) => {
    setLoading(true);

    // Chuẩn bị dữ liệu để gửi
    const orderData = {
      ...values, // fullName, phoneNumber, address, note
      items: cartItems.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: ((parseInt(item.price.replace(/\D/g, ''), 10) || 0) * item.quantity).toLocaleString('vi-VN') + '₫'
      })),
      totalAmount: totalAmount.toLocaleString('vi-VN') + '₫',
      orderDate: new Date().toLocaleString('vi-VN')
    };

    try {
      // --- PHẦN KẾT NỐI GOOGLE SHEET ---
      // 1. Tạo Google Sheet mới.
      // 2. Vào Extensions > Apps Script.
      // 3. Paste code xử lý doPost(e) để appendRow.
      // 4. Deploy > New Deployment > Select type: Web App > Who has access: Anyone.
      // 5. Copy URL Web App dán vào biến bên dưới:
      const GOOGLE_SCRIPT_URL = ''; // Ví dụ: 'https://script.google.com/macros/s/AKfycbx.../exec'

      console.log('Dữ liệu đơn hàng:', orderData);

      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Quan trọng để tránh lỗi CORS
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
      } else {
        // Giả lập delay nếu chưa có URL
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      message.success('Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm.');
      onClearCart(); // Xóa giỏ hàng
      navigate('/'); // Về trang chủ
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
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 mb-4 cursor-pointer hover:text-blue-600 w-fit transition-colors" onClick={() => navigate('/cart')}>
        <ArrowLeftOutlined /> <span>Quay lại giỏ hàng</span>
      </div>
      <Title level={2} className="text-center mb-8">Thanh Toán</Title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form thông tin */}
        <Card title="Thông tin giao hàng" className="shadow-sm">
          <Form form={form} layout="vertical" onFinish={onFinish} size="large">
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

        {/* Thông tin đơn hàng */}
        <Card title="Đơn hàng của bạn" className="shadow-sm h-fit">
          <div className="space-y-4">
            {cartItems.map((item: any) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="max-w-[200px]">
                    <Text strong className="line-clamp-2 text-sm">{item.name}</Text>
                  </div>
                </div>
                <Text strong>{((parseInt(item.price.replace(/\D/g, ''), 10) || 0) * item.quantity).toLocaleString('vi-VN')}₫</Text>
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
  );
};

export default CheckoutPage;
