import React, { useState, useEffect, useMemo } from 'react';
import { Card, Badge, Button, message, Tooltip } from 'antd';
import { ShoppingCartOutlined, ThunderboltOutlined, PlusOutlined, FireOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { newsList } from '../NewsPage/constants';

interface FlashSaleProps {
    cartCounts?: { [key: number]: number };
    onAddToCart?: (id: number, flashPrice: string) => void;
}

// Seeded random để mỗi ngày random giống nhau
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Lấy 10 sản phẩm ngẫu nhiên dựa vào ngày
const getFlashSaleProducts = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Shuffle array với seed
    const shuffled = [...newsList].sort((a, b) => {
        return seededRandom(seed + a.id) - seededRandom(seed + b.id);
    });

    // Lấy 10 sản phẩm đầu tiên và giảm thêm 10%
    return shuffled.slice(0, 10).map(product => {
        const currentPrice = parseInt(product.price.replace(/[^\d]/g, ''));
        const flashPrice = Math.round(currentPrice * 0.9); // Giảm thêm 10%
        const originalPrice = product.oldPrice || product.price;

        return {
            ...product,
            flashPrice: flashPrice.toLocaleString('vi-VN') + '₫',
            originalPrice: originalPrice,
            extraDiscount: '-10%',
        };
    });
};

const FlashSale: React.FC<FlashSaleProps> = ({
    cartCounts = {},
    onAddToCart = (_id: number, _flashPrice: string) => { },
}) => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [addingId, setAddingId] = useState<number | null>(null);

    // Memoize flash sale products để không re-calculate mỗi lần render
    const flashProducts = useMemo(() => getFlashSaleProducts(), []);

    // Countdown timer
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const diff = endOfDay.getTime() - now.getTime();

            if (diff > 0) {
                setTimeLeft({
                    hours: Math.floor(diff / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleAddToCart = (e: React.MouseEvent, product: any) => {
        e.stopPropagation();
        setAddingId(product.id);
        setTimeout(() => {
            onAddToCart(product.id, product.flashPrice);
            message.success({
                content: `Đã thêm ${product.name} vào giỏ hàng với giá Flash Sale!`,
                icon: <ShoppingCartOutlined style={{ color: '#52c41a' }} />,
            });
            setAddingId(null);
        }, 400);
    };

    const formatTime = (num: number) => num.toString().padStart(2, '0');

    return (
        <div className="w-full mx-auto mb-8">
            <style>{`
        @keyframes flash-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes countdown-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes lightning {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(-2px); }
        }
        @keyframes fire-burning {
          0% { transform: scale(1) translateY(0); filter: drop-shadow(0 0 2px #ff4b2b); }
          25% { transform: scale(1.1) translateY(-1px) rotate(-2deg); filter: drop-shadow(0 0 5px #ff416c); }
          50% { transform: scale(1.05) translateY(0) rotate(2deg); filter: drop-shadow(0 0 8px #f5af19); }
          75% { transform: scale(1.15) translateY(-2px) rotate(-1deg); filter: drop-shadow(0 0 5px #ff4b2b); }
          100% { transform: scale(1) translateY(0); filter: drop-shadow(0 0 2px #ff4b2b); }
        }
        .fire-icon {
          animation: fire-burning 0.8s ease-in-out infinite;
          color: #ffca28 !important;
        }
        .flash-header {
          background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
          animation: flash-pulse 2s ease-in-out infinite;
        }
        .countdown-box {
          background: rgba(0, 0, 0, 0.8);
          animation: countdown-pulse 1s ease-in-out infinite;
        }
        .lightning-icon {
          animation: lightning 0.5s ease-in-out infinite;
        }
        .flash-badge {
          background: linear-gradient(135deg, #f5af19 0%, #f12711 100%);
        }
        .flash-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(255, 65, 108, 0.3);
        }
        .btn-flash {
          background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
          border: none;
        }
        .btn-flash:hover {
          background: linear-gradient(135deg, #ff4b2b 0%, #ff416c 100%);
          transform: scale(1.1);
        }
        @keyframes click-bounce {
          0% { transform: scale(1); }
          40% { transform: scale(0.75); }
          100% { transform: scale(1); }
        }
        .btn-adding {
          animation: click-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background: #52c41a !important;
        }
      `}</style>

            {/* Flash Sale Header */}
            <div className="flash-header rounded-t-xl p-3 md:p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 md:gap-3 text-center sm:text-left">
                    <ThunderboltOutlined className="text-yellow-300 text-2xl md:text-3xl lightning-icon" />
                    <div>
                        <h2 className="text-white text-lg md:text-2xl font-bold flex items-center justify-center sm:justify-start gap-2">
                            FLASH SALE HÔM NAY
                            <FireOutlined className="fire-icon hidden sm:inline" />
                        </h2>
                        <p className="text-white/80 text-xs md:text-sm">Giảm thêm 10% - Chỉ trong hôm nay!</p>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="flex flex-col sm:flex-row items-center gap-2 bg-black/20 sm:bg-transparent p-2 sm:p-0 rounded-lg w-full sm:w-auto">
                    <span className="text-white text-[10px] md:text-sm font-medium uppercase tracking-wider opacity-90">Kết thúc sau:</span>
                    <div className="flex gap-1 items-center">
                        <div className="countdown-box text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg text-lg md:text-xl font-bold min-w-[40px] md:min-w-[50px] text-center">
                            {formatTime(timeLeft.hours)}
                        </div>
                        <span className="text-white text-lg md:text-xl font-bold">:</span>
                        <div className="countdown-box text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg text-lg md:text-xl font-bold min-w-[40px] md:min-w-[50px] text-center">
                            {formatTime(timeLeft.minutes)}
                        </div>
                        <span className="text-white text-lg md:text-xl font-bold">:</span>
                        <div className="countdown-box text-white px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg text-lg md:text-xl font-bold min-w-[40px] md:min-w-[50px] text-center">
                            {formatTime(timeLeft.seconds)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-[#141414] p-2 md:p-4 rounded-b-xl border border-t-0 border-red-200 dark:border-red-900/30">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                    {flashProducts.map((product) => (
                        <Card
                            key={product.id}
                            hoverable
                            className="flash-card relative overflow-hidden transition-all duration-300 border-red-50 dark:border-gray-800"
                            onClick={() => navigate(`/product/${product.id}`)}
                            cover={
                                <div className="relative bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 h-32 sm:h-40 md:h-48 flex items-center justify-center overflow-hidden">
                                    {/* Flash Sale Badge */}
                                    <div className="absolute top-0 left-0 flash-badge text-white text-[9px] md:text-xs font-bold px-1.5 py-0.5 md:px-3 md:py-1 rounded-br-lg z-10 flex items-center gap-0.5 md:gap-1">
                                        <ThunderboltOutlined /> <span className="hidden xs:inline">FLASH</span>
                                    </div>

                                    {/* Extra Discount Badge */}
                                    <Badge.Ribbon
                                        text={<span className="font-bold text-[10px] md:text-sm">{product.extraDiscount}</span>}
                                        color="volcano"
                                        className="text-xs md:text-sm"
                                    />

                                    {/* Product Image */}
                                    {product.images?.[0] ? (
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-gray-100 dark:bg-gray-800 text-gray-300">
                                            <ThunderboltOutlined className="text-2xl md:text-3xl" />
                                        </div>
                                    )}
                                </div>
                            }
                            bodyStyle={{ padding: '8px md:12px' }}
                        >
                            <div className="space-y-1 md:space-y-2 text-left">
                                <Tooltip title={product.name}>
                                    <h3 className="text-[11px] md:text-sm font-medium line-clamp-2 h-8 md:h-10 cursor-help dark:text-gray-200">{product.name}</h3>
                                </Tooltip>

                                {/* Price Section */}
                                <div className="flex items-center justify-between gap-1">
                                    <div className="flex flex-col">
                                        <span className="text-red-600 font-bold text-xs md:text-base leading-none">{product.flashPrice}</span>
                                        <span className="text-gray-400 line-through text-[9px] md:text-xs">{product.price}</span>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <Button
                                        type="primary"
                                        icon={cartCounts[product.id] ? null : <PlusOutlined className="text-[10px] md:text-base" />}
                                        shape="circle"
                                        size="small"
                                        className={`btn-flash flex-shrink-0 w-6 h-6 md:w-8 md:h-8 min-w-0 ${addingId === product.id ? 'btn-adding' : ''}`}
                                        onClick={(e) => handleAddToCart(e, product)}
                                    >
                                        {cartCounts[product.id] ? <span className="font-bold text-[10px] md:text-sm">{cartCounts[product.id]}</span> : null}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FlashSale;
