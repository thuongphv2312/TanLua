import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Avatar } from 'antd';
import { UserOutlined, CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { newsList } from '../NewsPage/constants';
import { motion, AnimatePresence } from 'motion/react';

const NAMES = [
  "Nguyễn Văn An", "Trần Thị Bích", "Lê Minh Châu", "Phạm Quốc Dũng", "Hoàng Thị Hà",
  "Vũ Thanh Hùng", "Đặng Ngọc Khánh", "Bùi Thị Lan", "Đỗ Đức Long", "Hồ Minh Nam",
  "Ngô Thị Oanh", "Dương Quốc Phong", "Lý Thanh Quân", "Mai Thị Trang", "Tạ Minh Tuấn",
  "Trịnh Ngọc Uyên", "Cao Văn Vinh", "Phan Thị Xuân", "Lưu Minh Yến", "Quách Quốc Anh",
  "Nguyễn Thị Ánh", "Trần Văn Bình", "Lê Thị Cẩm", "Phạm Minh Đạt", "Hoàng Văn Em",
  "Vũ Thị Giang", "Đặng Quốc Hải", "Bùi Minh Khoa", "Đỗ Thị Liên", "Hồ Văn Mạnh",
  "Ngô Minh Ngọc", "Dương Thị Phương", "Lý Văn Quang", "Mai Minh Sang", "Tạ Thị Thảo",
  "Trịnh Văn Trung", "Cao Thị Uyên", "Phan Minh Vũ", "Lưu Thị Xinh", "Quách Văn Yên",
  "Nguyễn Quốc Bảo", "Trần Thị Chi", "Lê Văn Đông", "Phạm Thị Hạnh", "Hoàng Minh Hòa",
  "Vũ Văn Khải", "Đặng Thị Linh", "Bùi Quốc Minh", "Đỗ Văn Nghĩa", "Hồ Thị Oanh",
  "Ngô Văn Phúc", "Dương Minh Quỳnh", "Lý Thị Mai", "Mai Văn Nam", "Tạ Minh Phong",
  "Trịnh Thị Quỳnh", "Cao Văn Sơn", "Phan Thị Thu", "Lưu Văn Tài", "Quách Thị Uyển",
  "Nguyễn Minh Vân", "Trần Văn Xuyên", "Lê Thị Yến", "Phạm Văn Zũng", "Hoàng Thị An",
  "Vũ Minh Bắc", "Đặng Văn Cường", "Bùi Thị Diễm", "Đỗ Minh Đức", "Hồ Thị Hương",
  "Ngô Quốc Khôi", "Dương Thị Lệ", "Lý Minh Long", "Mai Thị My", "Tạ Văn Nghĩa",
  "Trịnh Minh Phát", "Cao Thị Quyên", "Phan Văn Tín", "Lưu Minh Trí", "Quách Thị Vân",
  "Nguyễn Văn Xuân", "Trần Minh Y", "Lê Thị Zinh"
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
  const [isDisabled, setIsDisabled] = useState(() => {
    return localStorage.getItem('purchase_notifications_disabled') === 'true';
  });
  const timeoutRef = useRef<any>(null);

  const addNotification = useCallback(() => {
    if (isDisabled) return;

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
      // Giữ tối đa 3 cái để stack đẹp và không quá rối
      const newState = [...prev, newItem];
      if (newState.length > 3) return newState.slice(newState.length - 3);
      return newState;
    });

    // Tự động xóa sau 5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newItem.id));
    }, 5000);

    // Logic: 20% cơ hội nổ "burst" (dồn dập 1-2s), còn lại là chế độ chậm rãi (8-10s)
    const isBurst = Math.random() < 0.2;
    const nextDelay = isBurst
      ? Math.floor(Math.random() * 1000) + 1000  // 1000ms - 2000ms
      : Math.floor(Math.random() * 2000) + 8000; // 8000ms - 10000ms

    timeoutRef.current = setTimeout(addNotification, nextDelay);
  }, [isDisabled]); // Removed addNotification from dependencies to avoid circularity

  useEffect(() => {
    if (isDisabled) return;

    timeoutRef.current = setTimeout(addNotification, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [addNotification, isDisabled]);

  const handleClose = (id: number) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  const disableNotifications = () => {
    setIsDisabled(true);
    localStorage.setItem('purchase_notifications_disabled', 'true');
    setNotifications([]);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  if (isDisabled) return null;

  return (
    <div
      className="fixed bottom-24 left-5 z-[200] flex flex-col-reverse items-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'none' }}
    >
      <AnimatePresence mode="popLayout">
        {notifications.map((item, index) => {
          // Tính toán vị trí cho hiệu ứng Stack (index 0 là cũ nhất, cuối mảng là mới nhất)
          const reverseIndex = notifications.length - 1 - index;
          const isFirst = reverseIndex === 0;

          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.3 }}
              animate={{
                opacity: 1,
                y: isHovered ? 0 : reverseIndex * -12, // Khi không hover thì lồng vào nhau
                scale: isHovered ? 1 : 1 - reverseIndex * 0.05,
                zIndex: 100 - reverseIndex,
              }}
              exit={{ opacity: 0, x: -100, scale: 0.5, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`bg-white shadow-2xl border border-gray-100 rounded-2xl p-4 flex items-center gap-4 w-[340px] relative pointer-events-auto cursor-pointer mb-3 ${!isHovered && !isFirst ? 'absolute bottom-0' : ''}`}
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.95)'
              }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); handleClose(item.id); }}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Đóng"
              >
                <CloseOutlined style={{ fontSize: '12px' }} />
              </button>

              <div className="relative">
                <Avatar
                  size={48}
                  className="shadow-sm border-2 border-green-100"
                  style={{ backgroundColor: '#f6ffed', color: '#52c41a' }}
                  icon={<UserOutlined />}
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border-2 border-white">
                  <ShoppingCartOutlined />
                </div>
              </div>

              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Khách hàng vừa mua</span>
                  <span className="text-[10px] text-gray-400 italic">vừa xong</span>
                </div>
                <div className="font-bold text-gray-800 text-sm">{item.name}</div>
                <div className="text-gray-500 text-[11px] truncate mt-0.5">
                  <span className="text-green-600 font-medium">{item.phone}</span> • {item.product}
                </div>
                {isHovered && isFirst && (
                  <button
                    onClick={(e) => { e.stopPropagation(); disableNotifications(); }}
                    className="text-[9px] text-gray-400 hover:text-red-500 mt-1 text-left w-fit underline decoration-dotted transition-colors"
                  >
                    Tắt thông báo này
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default RecentPurchaseNotification;
