import React, { useEffect, useState } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, CloseOutlined } from '@ant-design/icons';
import { newsList } from '../NewsPage/constants';

const NAMES = [
  "Nguyễn Văn An",
  "Trần Thị Bích",
  "Lê Minh Châu",
  "Phạm Quốc Dũng",
  "Hoàng Thị Hà",
  "Vũ Thanh Hùng",
  "Đặng Ngọc Khánh",
  "Bùi Thị Lan",
  "Đỗ Đức Long",
  "Hồ Minh Nam",
  "Ngô Thị Oanh",
  "Dương Quốc Phong",
  "Lý Thanh Quân",
  "Mai Thị Trang",
  "Tạ Minh Tuấn",
  "Trịnh Ngọc Uyên",
  "Cao Văn Vinh",
  "Phan Thị Xuân",
  "Lưu Minh Yến",
  "Quách Quốc Anh",
  "Nguyễn Thị Ánh",
  "Trần Văn Bình",
  "Lê Thị Cẩm",
  "Phạm Minh Đạt",
  "Hoàng Văn Em",
  "Vũ Thị Giang",
  "Đặng Quốc Hải",
  "Bùi Minh Khoa",
  "Đỗ Thị Liên",
  "Hồ Văn Mạnh",
  "Ngô Minh Ngọc",
  "Dương Thị Phương",
  "Lý Văn Quang",
  "Mai Minh Sang",
  "Tạ Thị Thảo",
  "Trịnh Văn Trung",
  "Cao Thị Uyên",
  "Phan Minh Vũ",
  "Lưu Thị Xinh",
  "Quách Văn Yên",
  "Nguyễn Quốc Bảo",
  "Trần Thị Chi",
  "Lê Văn Đông",
  "Phạm Thị Hạnh",
  "Hoàng Minh Hòa",
  "Vũ Văn Khải",
  "Đặng Thị Linh",
  "Bùi Quốc Minh",
  "Đỗ Văn Nghĩa",
  "Hồ Thị Oanh",
  "Ngô Văn Phúc",
  "Dương Minh Quỳnh",
  "Lý Thị Mai",
  "Mai Văn Nam",
  "Tạ Minh Phong",
  "Trịnh Thị Quỳnh",
  "Cao Văn Sơn",
  "Phan Thị Thu",
  "Lưu Văn Tài",
  "Quách Thị Uyển",
  "Nguyễn Minh Vân",
  "Trần Văn Xuyên",
  "Lê Thị Yến",
  "Phạm Văn Zũng",
  "Hoàng Thị An",
  "Vũ Minh Bắc",
  "Đặng Văn Cường",
  "Bùi Thị Diễm",
  "Đỗ Minh Đức",
  "Hồ Thị Hương",
  "Ngô Quốc Khôi",
  "Dương Thị Lệ",
  "Lý Minh Long",
  "Mai Thị My",
  "Tạ Văn Nghĩa",
  "Trịnh Minh Phát",
  "Cao Thị Quyên",
  "Phan Văn Tín",
  "Lưu Minh Trí",
  "Quách Thị Vân",
  "Nguyễn Văn Xuân",
  "Trần Minh Y",
  "Lê Thị Zinh"
];

interface NotificationItem {
  id: number;
  name: string;
  product: string;
  phone: string;
}

const RecentPurchaseNotification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
      let randomProduct = "Sản phẩm cao cấp";
      if (newsList && newsList.length > 0) {
        const randomItem = newsList[Math.floor(Math.random() * newsList.length)];
        randomProduct = randomItem.name;
      }
      const middlePart = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
      const phoneNumber = `09${middlePart}xxx`;

      const newItem = {
        id: Date.now(),
        name: randomName,
        product: randomProduct,
        phone: phoneNumber,
      };

      setNotifications((prev) => {
        const newState = [...prev, newItem];
        // Giới hạn hiển thị tối đa 4 thông báo để tạo hiệu ứng stack đẹp
        if (newState.length > 4) return newState.slice(newState.length - 4);
        return newState;
      });

      // Tự động xóa sau 8s (lâu hơn để kịp nhìn thấy hiệu ứng stack)
      setTimeout(() => {
        setNotifications((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 8000);
    }, 8000); // Xuất hiện mỗi 8s

    return () => clearInterval(interval);
  }, []);

  const handleClose = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  // Đảo ngược mảng để hiển thị: Mới nhất (index 0) sẽ ở dưới cùng (hoặc trên cùng tùy z-index)
  const itemsToDisplay = [...notifications].reverse();

  return (
    <div
      className="fixed bottom-5 left-5 z-50 flex flex-col-reverse items-start transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      style={{ pointerEvents: 'none' }} // Container không chặn click, chỉ chặn ở card
    >
      <style>{`
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .notification-card {
          animation: slideInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
      {itemsToDisplay.map((item, index) => {
        // Logic tính toán style cho hiệu ứng stack
        const isCollapsed = !isHovered;
        // Khi collapsed: các item cũ hơn (index > 0) sẽ bị kéo xuống và nhỏ đi
        const translateY = 0;
        const scale = isCollapsed ? 1 - index * 0.05 : 1;
        const marginBottom = isCollapsed && index !== 0 ? '-70px' : '10px'; // Overlap mạnh để hở ~10px
        const opacity = isCollapsed ? 1 - index * 0.1 : 1;

        return (
          <div
            key={item.id}
            className="notification-card bg-white shadow-lg border-l-4 border-green-500 rounded-r-lg p-3 flex items-center gap-3 w-[320px] relative group pointer-events-auto cursor-pointer"
            style={{
              zIndex: 50 - index, // Item mới nhất (index 0) nằm trên cùng
              transform: `scale(${scale}) translateY(${translateY}px)`,
              marginBottom: marginBottom,
              opacity: opacity,
              transition: 'all 0.4s ease',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); handleClose(item.id); }}
              className="absolute -top-2 -right-2 bg-white rounded-full shadow-md w-5 h-5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all z-10 border border-gray-100"
              title="Đóng thông báo"
            >
              <CloseOutlined style={{ fontSize: '10px' }} />
            </button>

            <Avatar style={{ backgroundColor: '#f6ffed', color: '#52c41a' }} icon={<UserOutlined />} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex justify-between items-center">
                <span className="text-xs text-green-600 font-bold">Vừa mới mua hàng</span>
                <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">vừa xong</span>
              </div>
              <div className="font-semibold text-gray-800 text-sm truncate">{item.name} <span className="text-gray-500 font-normal text-xs">({item.phone})</span></div>
              <div className="text-gray-500 text-xs line-clamp-1">Đã mua {item.product}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentPurchaseNotification;
