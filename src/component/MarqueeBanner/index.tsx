import React from 'react';
import { motion } from 'motion/react';
import { HOTLINE } from '../NewsPage/constants';
import { PhoneOutlined, ThunderboltOutlined, GiftOutlined } from '@ant-design/icons';

const MarqueeBanner: React.FC = () => {
    const messages = [
        { text: "SIÊU ƯU ĐÃI: Giảm ngay 500k cho đơn hàng trên 10 triệu - Số lượng có hạn!", icon: <GiftOutlined className="animate-bounce" />, badge: "HOT" },
        { text: `Hotline hỗ trợ 24/7 (Zalo): ${HOTLINE} - Gọi ngay để được giá tốt nhất!`, icon: <PhoneOutlined />, badge: "" },
        { text: "XẢ KHO THANH LÝ: Máy móc chính hãng mới 100% giảm đến 40%!", icon: <ThunderboltOutlined />, badge: "XẢ KHO" },
        { text: "MIỄN PHÍ VẬN CHUYỂN: Giao hàng thần tốc, bảo trì trọn đời!", icon: <GiftOutlined />, badge: "" },
        { text: "CHẤT LƯỢNG CAM KẾT: Hoàn tiền 200% nếu phát hiện hàng giả hàng nhái!", icon: <ThunderboltOutlined />, badge: "UY TÍN" },
    ];

    // Nhân đôi mảng để tạo hiệu ứng chạy liên tục không bị ngắt quãng
    const fullMessages = [...messages, ...messages, ...messages];

    return (
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 dark:from-red-900 dark:via-red-800 dark:to-red-900 overflow-hidden py-2 border-b border-red-800 dark:border-red-950 relative z-[101]">
            <motion.div
                className="flex whitespace-nowrap items-center hover:cursor-pointer"
                animate={{
                    x: [0, -1500],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 40, // Chạy chậm lại một chút để dễ đọc
                        ease: "linear",
                    },
                }}
                whileHover={{ scale: 1.02 }}
                style={{ width: 'fit-content' }}
            >
                {fullMessages.map((msg, index) => (
                    <div key={index} className="flex items-center mx-10 text-white font-medium text-sm md:text-base">
                        {msg.badge && (
                            <span className="bg-yellow-400 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full mr-3 animate-pulse">
                                {msg.badge}
                            </span>
                        )}
                        <span className="text-yellow-300 mr-2 flex items-center text-lg">
                            {msg.icon}
                        </span>
                        <span className="tracking-wide">
                            {msg.text}
                        </span>
                        <span className="mx-8 text-red-300 opacity-50">|</span>
                    </div>
                ))}
            </motion.div>

            <style>{`
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .bg-gradient-to-r::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 30%;
                    height: 100%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent);
                    animation: shine 3s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default MarqueeBanner;
