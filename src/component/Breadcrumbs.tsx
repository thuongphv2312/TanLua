// import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  // Tách đường dẫn thành mảng các phần tử, loại bỏ chuỗi rỗng
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  // Map tên đường dẫn sang tiếng Việt (bạn có thể thêm các route khác vào đây)
  const breadcrumbNameMap: Record<string, string> = {
    'news': 'Tin tức',
    'may-cong-nghiep': 'Máy công nghiệp',
    'may-nong-nghiep': 'Máy nông nghiệp',
    'may-cat-co': 'Máy cắt cỏ',
    'san-pham': 'Sản phẩm',
    'lien-he': 'Liên hệ',
    'checkout': 'Thanh toán',
    'cart': 'Giỏ hàng',
    'search': 'Tìm kiếm',
    'tro-thanh-doi-tac': 'Trở thành đối tác',
    'lien-he-quang-cao': 'Liên hệ quảng cáo',
    'tuyen-dung': 'Tuyển dụng',
    'chinh-sach-giao-hang': 'Chính sách giao hàng',
    'chinh-sach-bao-mat': 'Chính sách bảo mật',
    'chinh-sach-bao-hanh': 'Chính sách bảo hành',
    'chinh-sach-doi-tra-hang': 'Chính sách đổi trả hàng',
    'huong-dan-thanh-toan': 'Hướng dẫn thanh toán',
  };

  // Tạo danh sách items cho Breadcrumb
  const breadcrumbItems = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      // Lấy tên từ map hoặc viết hoa chữ cái đầu nếu không tìm thấy
      const name = breadcrumbNameMap[snippet] || snippet.charAt(0).toUpperCase() + snippet.slice(1);

      return {
        title: <Link to={url}>{name}</Link>,
      };
    }),
  ];

  // Ẩn breadcrumb nếu đang ở trang chủ (chỉ có 1 cấp)
  if (location.pathname === '/') return null;

  return (
    <div className="w-full py-4 text-left">
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
};

export default Breadcrumbs;
