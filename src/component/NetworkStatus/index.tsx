import React, { useState, useEffect } from 'react';
import { WifiOutlined, DisconnectOutlined } from '@ant-design/icons';

const NetworkStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    // Mặc định là false để không hiện khi vừa tải trang
    const [showBackOnline, setShowBackOnline] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowBackOnline(true);

            // Chỉ hiện thông báo "Đã kết nối" trong 3 giây
            setTimeout(() => {
                setShowBackOnline(false);
            }, 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowBackOnline(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (isOnline && !showBackOnline) return null;

    return (
        <div
            className={`fixed top-32 right-4 z-[99999] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}
            style={{
                animation: 'slideInToast 0.3s ease-out',
                maxWidth: '90vw'
            }}
        >
            <style>
                {`
                    @keyframes slideInToast {
                        from { transform: translateY(-100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>

            {isOnline ? (
                <>
                    <WifiOutlined className="text-xl animate-pulse" />
                    <div>
                        <h4 className="font-bold text-sm m-0">Đã khôi phục kết nối</h4>
                        <p className="text-xs m-0 text-green-100">Hệ thống đang hoạt động bình thường.</p>
                    </div>
                </>
            ) : (
                <>
                    <DisconnectOutlined className="text-xl" />
                    <div>
                        <h4 className="font-bold text-sm m-0">Mất kết nối mạng</h4>
                        <p className="text-xs m-0 text-red-100">Vui lòng kiểm tra đường truyền.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default NetworkStatus;
