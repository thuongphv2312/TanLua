// constants/newsCategory.ts
import { TL35X_IMAGES, TJ35_IMAGES, SLIDER_IMAGES, G2TPLF1_IMAGES, CS260, CS226, G1BCN02147, LAMCX12INCH, COMBOPIN0805, COMBOPIN4505, COMBOCVHM21G2CVX230N, SV21VNG230ND1, DAMDUIDIEN7508501000W, DAYXITTANGAP10M } from './images';

const MACHINE_NAME = {
  MAY_CONG_NGHIEP: "Máy Công Nghiệp",
  MAY_NONG_NGHIEP: "Máy Nông Nghiệp",
  DUNG_CU_CAM_TAY: "Dụng cụ cầm tay",
  MAY_PHAT_DIEN: "Máy Phát Điện",
  THIET_BI_XIT_RUA: "Thiết Bị Xịt Rửa",
  MAY_BAN_COT: "Máy bắn cốt",
  MAY_CAT_CO: "Máy cắt cỏ",
  MAY_XOI_DAT: "Máy xới đất",
  MAY_BOM_NUOC: "Máy bơm nước",
  MAY_NEN_KHI: "Máy nén khí"
}

// Thông tin liên hệ công ty
export const HOTLINE = '0833.090.186';
export const EMAIL = 'info@tanlua.com';
export const RECRUITMENT_EMAIL = 'tuyendung@tanlua.com.vn';
export const ADDRESS = 'Nghĩa Thái, Nghĩa Hưng, Nam Định';

export const CATEGORIES = [
  { id: 1, name: MACHINE_NAME.MAY_NONG_NGHIEP, slug: "may-nong-nghiep", img: SLIDER_IMAGES[0] },
  { id: 2, name: MACHINE_NAME.MAY_CONG_NGHIEP, slug: "may-cong-nghiep", img: SLIDER_IMAGES[1] },
  { id: 10, name: MACHINE_NAME.DUNG_CU_CAM_TAY, slug: "dung-cu-cam-tay", img: SLIDER_IMAGES[2] },
  { id: 3, name: MACHINE_NAME.THIET_BI_XIT_RUA, slug: "thiet-bi-xit-rua", img: SLIDER_IMAGES[3] },
  { id: 4, name: MACHINE_NAME.MAY_PHAT_DIEN, slug: "may-phat-dien", img: SLIDER_IMAGES[4] },
  { id: 5, name: MACHINE_NAME.MAY_BAN_COT, slug: "may-ban-cot", img: SLIDER_IMAGES[5] },
  { id: 6, name: MACHINE_NAME.MAY_CAT_CO, slug: "may-cat-co", img: SLIDER_IMAGES[6] },
  { id: 7, name: MACHINE_NAME.MAY_XOI_DAT, slug: "may-xoi-dat", img: SLIDER_IMAGES[7] },
  { id: 8, name: MACHINE_NAME.MAY_BOM_NUOC, slug: "may-bom-nuoc", img: SLIDER_IMAGES[8] },
  { id: 9, name: MACHINE_NAME.MAY_NEN_KHI, slug: "may-nen-khi", img: SLIDER_IMAGES[9] },
];

const calculateDiscount = (price: string, oldPrice: string) => {
  if (!oldPrice) return "";
  const priceNumber = parseInt(price.replace(/\D/g, ''));
  const oldPriceNumber = parseInt(oldPrice.replace(/\D/g, ''));
  if (!oldPriceNumber || priceNumber >= oldPriceNumber) return "";
  return `-${Math.round(((oldPriceNumber - priceNumber) / oldPriceNumber) * 100)}%`;
};

// Cấu hình giảm giá ưu tiên theo danh mục (Category ID -> % Giảm)
// Nếu sản phẩm thuộc danh mục có trong này, hệ thống sẽ tự động tính toán giá giảm dựa trên % được cấu hình, ưu tiên hơn giá thủ công.
const CATEGORY_DISCOUNTS: { [key: number]: number } = {
  // 10: 15, // Ví dụ: Bỏ comment dòng này để giảm 15% cho tất cả sản phẩm thuộc danh mục ID 10 (Dụng cụ cầm tay)
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
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 7,
    title: "Thân máy thổi G2-TPLF1",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Thân máy thổi G2-TPLF1 có công dụng như thế nào với công việc của bạn...",
    images: G2TPLF1_IMAGES,
    categories: [10],
    name: "Thân máy thổi G2-TPLF1",
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
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 11,
    title: "Máy cắt cỏ TL35X 4 thì xăng riêng nhớt riêng",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt cỏ TL35X 4 thì xăng riêng nhớt riêng",
    images: TL35X_IMAGES,
    categories: [1, 6],
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
    categories: [1, 6],
    name: "Máy cắt cỏ TJ35 4 thì xăng riêng nhớt riêng",
    price: "1,890,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 13,
    title: "Máy cắt cỏ CS260 2 thì xăng pha nhớt",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt cỏ CS260 2 thì xăng pha nhớt",
    images: CS260,
    categories: [1, 6],
    name: "Máy cắt cỏ CS260 2 thì xăng pha nhớt",
    price: "1,890,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 14,
    title: "Máy cắt cỏ CS226 2 thì xăng pha nhớt",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt cỏ CS226 2 thì xăng pha nhớt",
    images: CS226,
    categories: [1, 6],
    name: "Máy cắt cỏ CS226 2 thì xăng pha nhớt",
    price: "1,890,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 15,
    title: "Bộ chuyển đổi nguồn G1-BCN0214",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Bộ chuyển đổi nguồn G1-BCN0214 có công dụng như thế nào với công việc của bạn...",
    images: G1BCN02147,
    categories: [10],
    name: "Bộ chuyển đổi nguồn G1-BCN0214",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 16,
    title: "Bộ lam cưa xích 12inch",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Bộ lam cưa xích 12inch có công dụng như thế nào với công việc của bạn...",
    images: LAMCX12INCH,
    categories: [10],
    name: "Bộ lam cưa xích 12inch",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 21,
    title: "Combo pin sạc G1-P0805 20cell 8Ah 21V 1.5A",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo pin sạc G1-P0805 20cell 8Ah 21V có công dụng như thế nào với công việc của bạn...",
    images: COMBOPIN0805,
    categories: [10],
    name: "Combo pin sạc G1-P0805 20cell 8Ah 21V 1.5A",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 17,
    title: "Combo pin sạc G1-CBP4505 15cell 4.5Ah 21V 1.5A",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo pin sạc G1-CBP4505 15cell 4.5Ah 21V 1.5A có công dụng như thế nào với công việc của bạn...",
    images: COMBOPIN4505,
    categories: [10],
    name: "Combo pin sạc G1-CBP4505 15cell 4.5Ah 21V 1.5A",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 18,
    title: "Combo chuyên vít HM21-G2CVX230N",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo chuyên vít HM21-G2CVX230N có công dụng như thế nào với công việc của bạn...",
    images: COMBOCVHM21G2CVX230N,
    categories: [10],
    name: "Combo chuyên vít HM21-G2CVX230N",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 19,
    title: "Combo chuyên vít OSHIMA SV21V-NG230N-D1",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo chuyên OSHIMA vít SV21V-NG230N-D1 có công dụng như thế nào với công việc của bạn...",
    images: SV21VNG230ND1,
    categories: [10],
    name: "Combo chuyên vít OSHIMA SV21V-NG230N-D1",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 20,
    title: "Thân đầm dùi TALU 750W 850W 1000W",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Thân đầm dùi TALU 750W 850W 1000W có công dụng như thế nào với công việc của bạn...",
    images: DAMDUIDIEN7508501000W,
    categories: [10],
    name: "Thân đầm dùi TALU 750W 850W 1000W",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
  {
    id: 22,
    title: "Dây xịt tăng áp ANOVI 10M 230BAR Loại xịn",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Dây xịt tăng áp ANOVI 10M 230BAR Loại xịn có công dụng như thế nào với công việc của bạn...",
    images: DAYXITTANGAP10M,
    categories: [3],
    name: "Dây xịt tăng áp ANOVI 10M 230BAR Loại xịn",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: "WWW.TANLUAVIETNAM.COM",
  },
].map(item => {
  let { price, oldPrice } = item;
  let discount = "";

  // Tính giảm giá ưu tiên theo danh mục
  const categoryDiscount = item.categories.reduce((max, catId) => {
    return Math.max(max, CATEGORY_DISCOUNTS[catId] || 0);
  }, 0);

  if (categoryDiscount > 0) {
    // Logic: Nếu có cấu hình giảm giá danh mục -> Tự động tính giá mới từ giá gốc (ưu tiên oldPrice nếu có)
    const originalPriceStr = (oldPrice && oldPrice.trim() !== "") ? oldPrice : price;
    const originalPrice = parseInt(originalPriceStr.replace(/\D/g, ''));

    if (originalPrice) {
      const newPrice = originalPrice * (1 - categoryDiscount / 100);
      price = Math.round(newPrice).toLocaleString('en-US') + '₫';
      oldPrice = originalPriceStr;
      discount = `-${categoryDiscount}%`;
    }
  } else {
    // Mặc định: Tính % giảm dựa trên price và oldPrice có sẵn
    discount = calculateDiscount(price, oldPrice || "");
  }

  return {
    ...item,
    price,
    oldPrice,
    discount,
    content: `
    <p>Sản phẩm <strong>${item.name}</strong> hiện đang được phân phối chính hãng tại Tấn Lụa Việt Nam với mức giá ưu đãi.</p>
    <p><strong>Giá bán: <span style="color: #d32f2f; font-size: 1.2em;">${price}</span></strong> ${oldPrice ? `<span style="text-decoration: line-through; color: #999; margin-left: 10px;">${oldPrice}</span>` : ''}</p>
    <p>Để biết thêm thông tin chi tiết về sản phẩm và các chương trình khuyến mãi, quý khách vui lòng liên hệ hotline: <b>${HOTLINE}</b> hoặc đến trực tiếp cửa hàng để được tư vấn tốt nhất.</p>
  `
  };
});
