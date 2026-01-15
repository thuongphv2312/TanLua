import { newsList } from '../component/NewsPage/constants';

// Seeded random để mỗi ngày random giống nhau
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

// Hàm hash chuỗi thành số để dùng cho seed
const stringToHash = (str: string | number) => {
    const s = String(str);
    let hash = 0;
    for (let i = 0; i < s.length; i++) {
        hash = ((hash << 5) - hash) + s.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
};

export const getFlashSaleProducts = () => {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    // Shuffle array với seed
    const shuffled = [...newsList].sort((a, b) => {
        return seededRandom(seed + stringToHash(a.id)) - seededRandom(seed + stringToHash(b.id));
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

export const isProductInFlashSale = (productId: string | number) => {
    const flashProducts = getFlashSaleProducts();
    return flashProducts.find(p => String(p.id) === String(productId));
};
