import { newsList } from '../component/NewsPage/constants';

// Seeded random để mỗi ngày random giống nhau
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

export const getFlashSaleProducts = () => {
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

export const isProductInFlashSale = (productId: number) => {
    const flashProducts = getFlashSaleProducts();
    return flashProducts.find(p => p.id === productId);
};
