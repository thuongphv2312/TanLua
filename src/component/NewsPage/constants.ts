// constants/newsCategory.ts
import { TL35X_IMAGES, TJ35_IMAGES } from './images';

const MACHINE_NAME = {
  MAY_CONG_NGHIEP: "Máy Công Nghiệp",
  MAY_PHAT_DIEN: "Máy Phát Điện",
  MAY_NONG_NGHIEP: "Máy Nông Nghiệp",
  THIET_BI_XIT_RUA: "Thiết Bị Xịt Rửa",
  MAY_BAN_COT: "Máy bắn cốt"
}

export const CATEGORIES = [
  { id: 1, name: MACHINE_NAME.MAY_NONG_NGHIEP, slug: "may-nong-nghiep" },
  { id: 2, name: MACHINE_NAME.MAY_CONG_NGHIEP, slug: "may-cong-nghiep" },
  { id: 3, name: MACHINE_NAME.THIET_BI_XIT_RUA, slug: "thiet-bi-xit-rua" },
  { id: 4, name: MACHINE_NAME.MAY_PHAT_DIEN, slug: "may-phat-dien" },
  { id: 5, name: MACHINE_NAME.MAY_BAN_COT, slug: "may-ban-cot" },
];

const calculateDiscount = (price: string, oldPrice: string) => {
  if (!oldPrice) return "";
  const priceNumber = parseInt(price.replace(/\D/g, ''));
  const oldPriceNumber = parseInt(oldPrice.replace(/\D/g, ''));
  if (!oldPriceNumber || priceNumber >= oldPriceNumber) return "";
  return `-${Math.round(((oldPriceNumber - priceNumber) / oldPriceNumber) * 100)}%`;
};

export const newsList = [
  {
    id: 1,
    title: "Máy băm thái chuối đa năng Bình Phước",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy nén khí có công dụng như thế nào với các garage xe...",
    images: ["https://picsum.photos/400/300?1", "https://picsum.photos/400/300?11", "https://picsum.photos/400/300?12"],
    categories: [1, 3], // 👈 quan trọng
    name: "Máy băm thái chuối đa năng Bình Phước",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 2,
    title: "Máy phun xịt rửa áp lực cao",
    author: "Tấn Lụa",
    date: "13/01/2021",
    description: "So sánh các dòng máy phun xịt phổ biến hiện nay...",
    images: ["https://picsum.photos/400/300?2", "https://picsum.photos/400/300?21"],
    categories: [3],
    name: "Máy phun xịt rửa áp lực cao",
    price: "1,800,000₫",
    oldPrice: "2,200,000₫",
    discount: "-18%",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 3,
    title: "Máy phát điện công nghiệp 50kVA",
    author: "Admin",
    date: "14/01/2021",
    description: "Máy phát điện dùng trong nhà xưởng...",
    images: ["https://picsum.photos/400/300?3", "https://picsum.photos/400/300?31"],
    categories: [2, 4],
    name: "Máy phát điện công nghiệp 50kVA",
    price: "150,000,000₫",
    oldPrice: "",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 4,
    title: "Máy băm thái chuối đa năng Bình Phước",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy nén khí có công dụng như thế nào với các garage xe...",
    images: ["https://picsum.photos/400/300?1"],
    categories: [1, 3], // 👈 quan trọng
    name: "Máy băm thái chuối đa năng Bình Phước",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    discount: "-17%",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 5,
    title: "Máy phun xịt rửa áp lực cao",
    author: "Tấn Lụa",
    date: "13/01/2021",
    description: "So sánh các dòng máy phun xịt phổ biến hiện nay...",
    images: ["https://picsum.photos/400/300?2"],
    categories: [3],
    name: "Máy phun xịt rửa áp lực cao",
    price: "1,800,000₫",
    oldPrice: "2,200,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 6,
    title: "Máy phát điện công nghiệp 50kVA",
    author: "Admin",
    date: "14/01/2021",
    description: "Máy phát điện dùng trong nhà xưởng...",
    images: ["https://picsum.photos/400/300?3"],
    categories: [2, 4],
    name: "Máy phát điện công nghiệp 50kVA",
    price: "150,000,000₫",
    oldPrice: "",
    discount: "",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 7,
    title: "Máy băm thái chuối đa năng Bình Phước",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy nén khí có công dụng như thế nào với các garage xe...",
    images: ["https://picsum.photos/400/300?1"],
    categories: [1, 3], // 👈 quan trọng
    name: "Máy băm thái chuối đa năng Bình Phước",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 8,
    title: "Máy phun xịt rửa áp lực cao",
    author: "Tấn Lụa",
    date: "13/01/2021",
    description: "So sánh các dòng máy phun xịt phổ biến hiện nay...",
    images: ["https://picsum.photos/400/300?2"],
    categories: [3],
    name: "Máy phun xịt rửa áp lực cao",
    price: "1,800,000₫",
    oldPrice: "2,200,000₫",
    discount: "-18%",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 9,
    title: "Máy phát điện công nghiệp 50kVA",
    author: "Admin",
    date: "14/01/2021",
    description: "Máy phát điện dùng trong nhà xưởng...",
    images: ["https://picsum.photos/400/300?3"],
    categories: [2, 4],
    name: "Máy phát điện công nghiệp 50kVA",
    price: "150,000,000₫",
    oldPrice: "",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 10,
    title: "Máy nén khí",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy nén khí có công dụng như thế nào với các garage xe...",
    images: ["https://picsum.photos/400/300?1"],
    categories: [1, 3], // 👈 quan trọng
    name: "Máy nén khí",
    price: "5,600,000₫",
    oldPrice: "6,500,000₫",
    discount: "-14%",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 11,
    title: "Máy cắt cỏ TL35X 4 thì xăng riêng nhớt riêng",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt cỏ TL35X 4 thì xăng riêng nhớt riêng",
    images: TL35X_IMAGES,
    categories: [1],
    name: "Máy cắt cỏ TL35X 4 thì xăng riêng nhớt riêng",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 12,
    title: "Máy cắt cỏ TJ35 4 thì xăng riêng nhớt riêng",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt cỏ TJ35 4 thì xăng riêng nhớt riêng",
    images: TJ35_IMAGES,
    categories: [1],
    name: "Máy cắt cỏ TJ35 4 thì xăng riêng nhớt riêng",
    price: "1,890,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
].map(item => ({
  ...item,
  discount: calculateDiscount(item.price, item.oldPrice)
}));
