// constants/newsCategory.ts
import { TL35X_IMAGES, TJ35_IMAGES, SLIDER_IMAGES, G2TPLF1_IMAGES, CS260, CS226, G1BCN02147, LAMCX12INCH, COMBOPIN0805, COMBOPIN4505, COMBOCVHM21G2CVX230N, SV21VNG230ND1, DAMDUIDIEN7508501000W, DAYXITTANGAP10M, DAYXITTANGAP15M, DAYXITTANGAP20M, DAYXITTANGAP50M, DAMDUIPINDV01, DAMTHUOCDIENTALDTD220, DAMTHUOCXANGDTXT35PRO, DAUXITTL22TH, DAUXITTL22STH, DAUXITTL22T, DAUXITTL30T, DAUXITTL30STH, SACDOIG2S20X2, THANMAYKHOANG1D55, THANMAYKHOANGG2Z1300, GIABATCOBANHXE, HANCOHK30ST2HP, KHOANBETONGK90, KHOANBETONGK96, MAYBOMTANGAPMINIG1B001TB, MAYBOMTANGAPMININK159A20M3H220V125MM, MAYMAIAG5055CT, MAYCATSATBAN2400S, MAYCATSATBANOS2000, MAYCANMUCCM5X1, MAYCANMUCCM5X2, MAYCANMUCCM5X2LS, MAYCANMUCCM5XLS, MAYCANMUCCM5XSS, MAYCANMUCCM5XCS, MAYCANMUCCM5XSPX, COMBOCVGRCV381, COMBOCVGRCV173, G3HUK35, GRMMAMMA200EMINI, MKSMMA200EMINI, MKSMMA200EV2, OSHIMAMMA200A, OSHIMAMMA250A, G2RH2601, K2626P, RH2066X, RH2900BL, G3STOM02, AG6101J, TLP35, PHUNXA3WF3A43 } from './images';

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
  MAY_NEN_KHI: "Máy nén khí",
  HANG_THANH_LY: "Hàng thanh lý"
}

// Thông tin liên hệ công ty
export const COMPANY_NAME = 'Công ty TNHH thương mại và dịch vụ Sang Phát';
export const HOTLINE = '0833.090.186';
export const EMAIL = 'tl0913992182@gmail.com';
export const RECRUITMENT_EMAIL = 'tuyendung@tanlua.com.vn';
export const ADDRESS = 'Nghĩa Thái, Nghĩa Hưng, Nam Định';
export const HOST = 'tanlua.vercel.app'

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
  { id: 99, name: MACHINE_NAME.HANG_THANH_LY, slug: "hang-thanh-ly", img: SLIDER_IMAGES[10] },
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
    title: "Dây xịt tăng áp ANOVI 15M 230BAR Loại xịn",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Dây xịt tăng áp ANOVI 15M 230BAR Loại xịn có công dụng như thế nào với công việc của bạn...",
    images: DAYXITTANGAP15M,
    categories: [1, 3],
    name: "Dây xịt tăng áp ANOVI 15M 230BAR Loại xịn",
    price: "260,000₫",
    oldPrice: "390,000₫",
    url: HOST
  },
  {
    id: 2,
    title: "Đầu xịt Talu TL22-TH xilanh 22mm ty inox",
    author: "Tấn Lụa",
    date: "13/01/2021",
    description: "Đầu xịt Talu TL22-TH xilanh 22mm ty inox So sánh các dòng máy phun xịt phổ biến hiện nay...",
    images: DAUXITTL22TH,
    categories: [1, 3],
    name: "Đầu xịt Talu TL22-TH xilanh 22mm ty inox",
    price: "1,100,000₫",
    oldPrice: "2,250,000₫",
    url: HOST
  },
  {
    id: 3,
    title: "Đầu xịt Talu TL22T xilanh 22mm ty inox",
    author: "Admin",
    date: "14/01/2021",
    description: "Đầu xịt Talu TL22T xilanh 22mm ty inox dùng cho xịt rửa áp lực cao, có công dụng như thế nào với công việc của bạn...",
    images: DAUXITTL22T,
    categories: [1, 3],
    name: "Đầu xịt Talu TL22T xilanh 22mm ty inox",
    price: "1,050,000₫",
    oldPrice: "1,950,000đ",
    url: HOST
  },
  {
    id: 4,
    title: "Dây xịt tăng áp ANOVI 20M 230BAR Loại xịn",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Dây xịt tăng áp ANOVI 20M 230BAR Loại xịn có công dụng như thế nào với công việc của bạn...",
    images: DAYXITTANGAP20M,
    categories: [1, 3],
    name: "Dây xịt tăng áp ANOVI 20M 230BAR Loại xịn",
    price: "320,000₫",
    oldPrice: "590,000₫",
    url: HOST
  },
  {
    id: 5,
    title: "Đầu xịt Talu TL30T xilanh 30mm ty inox",
    author: "Tấn Lụa",
    date: "13/01/2021",
    description: "Đầu xịt Talu TL30T xilanh 30mm ty inox dùng cho xịt rửa áp lực cao, có công dụng như thế nào với công việc của bạn...",
    images: DAUXITTL30T,
    categories: [1, 3],
    name: "Đầu xịt Talu TL30T xilanh 30mm ty inox",
    price: "1,350,000₫",
    oldPrice: "1,780,000₫",
    url: HOST
  },
  {
    id: 6,
    title: "Thân máy khoan G1-D55",
    author: "Admin",
    date: "14/01/2021",
    description: "Thân máy khoan G1-D55 có công dụng như thế nào với công việc của bạn...",
    images: THANMAYKHOANG1D55,
    categories: [10],
    name: "Thân máy khoan G1-D55",
    price: "550,000₫",
    oldPrice: "620,000₫",
    url: HOST
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
    price: "850,000₫",
    oldPrice: "980,000₫",
    url: HOST
  },
  {
    id: 8,
    title: "Đầu xịt Talu TL30STH xilanh 30mm ty inox",
    author: "Tấn Lụa",
    date: "13/01/2021",
    description: "Đầu xịt Talu TL30STH xilanh 30mm ty inox dùng cho xịt rửa áp lực cao, có công dụng như thế nào với công việc của bạn...",
    images: DAUXITTL30STH,
    categories: [1, 3],
    name: "Đầu xịt Talu TL30STH xilanh 30mm ty inox",
    price: "2,200,000₫",
    oldPrice: "2,870,000₫",
    url: HOST
  },
  {
    id: 9,
    title: "Sạc đôi HUKAN G2-S20X2",
    author: "Admin",
    date: "14/01/2021",
    description: "Sạc đôi HUKAN G2-S20X2 có công dụng như thế nào với công việc của bạn...",
    images: SACDOIG2S20X2,
    categories: [10],
    name: "Sạc đôi HUKAN G2-S20X2",
    price: "560,000₫",
    oldPrice: "620,000₫",
    url: HOST
  },
  {
    id: 10,
    title: "Dây xịt tăng áp ANOVI 50M 230BAR Loại xịn",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Dây xịt tăng áp ANOVI 50M 230BAR Loại xịn có công dụng như thế nào với công việc của bạn...",
    images: DAYXITTANGAP50M,
    categories: [1, 3],
    name: "Dây xịt tăng áp ANOVI 50M 230BAR Loại xịn",
    price: "590,000₫",
    oldPrice: "980,000₫",
    url: HOST
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
    price: "1,980,000₫",
    oldPrice: "3,050,000₫",
    url: HOST
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
    price: "2,850,000₫",
    oldPrice: "4,750,000₫",
    url: HOST
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
    price: "1,700,000₫",
    oldPrice: "2,850,000₫",
    url: HOST
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
    price: "3,780,000đ",
    oldPrice: "4,725,000₫",
    url: HOST
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
    price: "310,000₫",
    oldPrice: "480,000₫",
    url: HOST
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
    price: "230,000₫",
    oldPrice: "295,000₫",
    url: HOST
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
    price: "1,250,000₫",
    oldPrice: "1,980,000₫",
    url: HOST
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
    price: "795,000₫",
    oldPrice: "920,000₫",
    url: HOST
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
    price: "2,150,000₫",
    oldPrice: "3,080,000₫",
    url: HOST
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
    price: "1,750,000₫",
    oldPrice: "2,500,000₫",
    url: HOST
  },
  {
    id: 20,
    title: "Đầm dùi TALU 750W 850W 1000W",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Đầm dùi TALU 750W 850W 1000W có công dụng như thế nào với công việc của bạn...",
    images: DAMDUIDIEN7508501000W,
    categories: [10],
    name: "Đầm dùi TALU 750W 850W 1000W",
    price: "650,000₫",
    oldPrice: "680,000₫",
    url: HOST
  },
  {
    id: 22,
    title: "Dây xịt tăng áp ANOVI 10M 230BAR Loại xịn",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Dây xịt tăng áp ANOVI 10M 230BAR Loại xịn có công dụng như thế nào với công việc của bạn...",
    images: DAYXITTANGAP10M,
    categories: [1, 3],
    name: "Dây xịt tăng áp ANOVI 10M 230BAR Loại xịn",
    price: "190,000₫",
    oldPrice: "230,000₫",
    url: HOST
  },
  {
    id: 23,
    title: "Thân Đầm dùi PIN TALU DV01 450W",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Thân Đầm dùi PIN TALU DV01 450W có công dụng như thế nào với công việc của bạn...",
    images: DAMDUIPINDV01,
    categories: [10],
    name: "Thân Đầm dùi PIN TALU DV01 450W",
    price: "810,000₫",
    oldPrice: "960,000₫",
    url: HOST
  },
  {
    id: 24,
    title: "Đầm thước điện TAL DTD-220",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Đầm thước điện TAL DTD-220 có công dụng như thế nào với công việc của bạn...",
    images: DAMTHUOCDIENTALDTD220,
    categories: [2],
    name: "Đầm thước điện TAL DTD-220",
    price: "1,820,000₫",
    oldPrice: "3,050,000₫",
    url: HOST
  },
  {
    id: 25,
    title: "Đầm thước xăng TAL DTX-T35PRO",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Đầm thước xăng TAL DTX-T35PRO có công dụng như thế nào với công việc của bạn...",
    images: DAMTHUOCXANGDTXT35PRO,
    categories: [2],
    name: "Đầm thước xăng TAL DTX-T35PRO",
    price: "3,045,000₫",
    oldPrice: "6,000,000₫",
    url: HOST
  },
  {
    id: 26,
    title: "Đầu xịt Talu TL22S-TH xilanh 22mm ty sứ",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Đầu xịt Talu TL22S-TH xilanh 22mm ty sứ có công dụng như thế nào với công việc của bạn...",
    images: DAUXITTL22STH,
    categories: [1, 3],
    name: "Đầu xịt Talu TL22S-TH xilanh 22mm ty sứ",
    price: "1,780,000₫",
    oldPrice: "3,500,000₫",
    url: HOST
  },
  {
    id: 27,
    title: "Thân máy khoan G2-Z1300 chính hãng hukan 60N.M 3 chế độ",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Thân máy khoan G2-Z1300 chính hãng hukan 60N.M 3 chế độ có công dụng như thế nào với công việc của bạn...",
    images: THANMAYKHOANGG2Z1300,
    categories: [10],
    name: "Thân máy khoan G2-Z1300 chính hãng hukan 60N.M 3 chế độ",
    price: "690,000₫",
    oldPrice: "820,000₫",
    url: HOST
  },
  {
    id: 28,
    title: "Giá bắt có bánh xe khung inox",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Giá bắt có bánh xe khung inox có công dụng như thế nào với công việc của bạn...",
    images: GIABATCOBANHXE,
    categories: [1, 3],
    name: "Giá bắt có bánh xe khung inox",
    price: "2,500,000₫",
    oldPrice: "3,000,000₫",
    url: HOST
  },
  {
    id: 29,
    title: "Đầu xịt rửa Hankock HK30ST 2HP hồi ngoài ty sứ",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Đầu xịt rửa Hankock HK30ST 2HP hồi ngoài ty sứ có công dụng như thế nào với công việc của bạn...",
    images: HANCOHK30ST2HP,
    categories: [1, 3],
    name: "Đầu xịt rửa Hankock HK30ST 2HP hồi ngoài ty sứ",
    price: "2,146,000₫",
    oldPrice: "3,250,000₫",
    url: HOST
  },
  {
    id: 30,
    title: "Khoan bê tông K90 chính hãng HUKAN 1020W 3.0J 3 chức năng",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Khoan bê tông K90 chính hãng HUKAN 1020W 3.0J 3 chức năng có công dụng như thế nào với công việc của bạn...",
    images: KHOANBETONGK90,
    categories: [10],
    name: "Khoan bê tông K90 chính hãng HUKAN 1020W 3.0J 3 chức năng",
    price: "1,150,000₫",
    oldPrice: "1,360,000₫",
    url: HOST
  },
  {
    id: 31,
    title: "Khoan bê tông K96 chính hãng HUKAN 1050W 3.2J 3 chức năng",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Khoan bê tông K96 chính hãng HUKAN 1050W 3.2J 3 chức năng có công dụng như thế nào với công việc của bạn...",
    images: KHOANBETONGK96,
    categories: [10],
    name: "Khoan bê tông K96 chính hãng HUKAN 1050W 3.2J 3 chức năng",
    price: "1,250,000₫",
    oldPrice: "1,890,000₫",
    url: HOST
  },
  {
    id: 32,
    title: "Máy bơm tăng áp mini G1-B001TB chính hãng HUKAN 30L/phút 220V 7400RPM",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy bơm tăng áp mini G1-B001TB chính hãng HUKAN 30L/phút 220V 7400RPM có công dụng như thế nào với công việc của bạn...",
    images: MAYBOMTANGAPMINIG1B001TB,
    categories: [8],
    name: "Máy bơm tăng áp mini G1-B001TB chính hãng HUKAN 30L/phút 220V 7400RPM",
    price: "860,000₫",
    oldPrice: "980,000₫",
    url: HOST
  },
  {
    id: 33,
    title: "Máy bơm tăng áp mini NK 15-9A 2.0 M3/H 220V 12.5MM chính hãng NAKAWA",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy bơm tăng áp mini NK 15-9A 2.0 M3/H 220V 12.5MM chính hãng NAKAWA có công dụng như thế nào với công việc của bạn...",
    images: MAYBOMTANGAPMININK159A20M3H220V125MM,
    categories: [8],
    name: "Máy bơm tăng áp mini NK 15-9A 2.0 M3/H 220V 12.5MM chính hãng NAKAWA",
    price: "870,000₫",
    oldPrice: "980,000₫",
    url: HOST
  },
  {
    id: 34,
    title: "Máy mài chính hãng HUKAN G2-AG5055CT 900W 100MM 220V 11000RPM",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy mài chính hãng HUKAN G2-AG5055CT 900W 100MM 220V 11000RPM có công dụng như thế nào với công việc của bạn...",
    images: MAYMAIAG5055CT,
    categories: [10],
    name: "Máy mài chính hãng HUKAN G2-AG5055CT 900W 100MM 220V 11000RPM",
    price: "690,000₫",
    oldPrice: "980,000₫",
    url: HOST
  },
  {
    id: 35,
    title: "Máy cắt sắt bàn G1-MCS2400S chính hãng HUKAN 2400W 3800v/phút 11kg",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt sắt bàn G1-MCS2400S chính hãng HUKAN 2400W 3800v/phút 11kg có công dụng như thế nào với công việc của bạn...",
    images: MAYCATSATBAN2400S,
    categories: [10],
    name: "Máy cắt sắt bàn G1-MCS2400S chính hãng HUKAN 2400W 3800v/phút 11kg",
    price: "1,885,000₫",
    oldPrice: "2,150,000₫",
    url: HOST
  },
  {
    id: 36,
    title: "Máy cắt sắt bàn OS2000 2000W 220V 3800r/phút 16kg chính hãng OSHIMA",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cắt sắt bàn OS2000 2000W 220V 3800r/phút 16kg chính hãng OSHIMA có công dụng như thế nào với công việc của bạn...",
    images: MAYCATSATBANOS2000,
    categories: [10],
    name: "Máy cắt sắt bàn OS2000 2000W 220V 3800r/phút 16kg chính hãng OSHIMA",
    price: "3,190,000₫",
    oldPrice: "3,780,000₫",
    url: HOST
  },
  {
    id: 37,
    title: "Máy cân mực OSHIMA CM5X-1 LD 532nm xanh 5 tia 30-50m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-1 LD 532nm xanh 5 tia 30-50m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5X1,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-1 LD 532nm xanh 5 tia 30-50m",
    price: "1,050,000₫",
    oldPrice: "1,180,000₫",
    url: HOST
  },
  {
    id: 38,
    title: "Máy cân mực OSHIMA CM5X-2 LD 532nm xanh 5 tia 30-50m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-2 LD 532nm xanh 5 tia 30-50m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5X2,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-2 LD 532nm xanh 5 tia 30-50m",
    price: "1,065,000₫",
    oldPrice: "1,190,000₫",
    url: HOST
  },
  {
    id: 39,
    title: "Máy cân mực OSHIMA CM5X-2LS LD 532nm xanh 5 tia 30-50m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-2LS LD 532nm xanh 5 tia 30-50m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5X2LS,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-2LS LD 532nm xanh 5 tia 30-50m",
    price: "1,080,000₫",
    oldPrice: "1,250,000₫",
    url: HOST
  },
  {
    id: 40,
    title: "Máy cân mực OSHIMA CM5X-LS bản cao cấp LD 532nm xanh 5 tia 40-60m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-LS bản cao cấp LD 532nm xanh 5 tia 40-60m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5XLS,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-LS bản cao cấp LD 532nm xanh 5 tia 40-60m",
    price: "2,410,000₫",
    oldPrice: "2,850,000₫",
    url: HOST
  },
  {
    id: 41,
    title: "Máy cân mực OSHIMA CM5X-SS bản cao cấp LD 532nm xanh 5 tia 40-60m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-SS bản cao cấp LD 532nm xanh 5 tia 40-60m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5XSS,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-SS bản cao cấp LD 532nm xanh 5 tia 40-60m",
    price: "2,100,000₫",
    oldPrice: "2,750,000₫",
    url: HOST
  },
  {
    id: 42,
    title: "Máy cân mực OSHIMA CM5X-CS bản cao cấp LD 532nm xanh 5 tia 40-60m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-CS bản cao cấp LD 532nm xanh 5 tia 40-60m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5XCS,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-CS bản cao cấp LD 532nm xanh 5 tia 40-60m",
    price: "1,218,000₫",
    oldPrice: "1,480,000₫",
    url: HOST
  },
  {
    id: 43,
    title: "Máy cân mực OSHIMA CM5X-SP-X bản cao cấp LD 515nm xanh 5 tia 40-60m",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy cân mực OSHIMA CM5X-SP-X bản cao cấp LD 515nm xanh 5 tia 40-60m có công dụng như thế nào với công việc của bạn...",
    images: MAYCANMUCCM5XSPX,
    categories: [5],
    name: "Máy cân mực OSHIMA CM5X-SP-X bản cao cấp LD 515nm xanh 5 tia 40-60m",
    price: "1,800,000₫",
    oldPrice: "2,150,000₫",
    url: HOST
  },
  {
    id: 44,
    title: "Combo máy chuyên vít GR-CV381 330N.W 6.35MM chính hãng GREEKMAN",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo máy chuyên vít GR-CV381 330N.W 6.35MM chính hãng GREEKMAN có công dụng như thế nào với công việc của bạn...",
    images: COMBOCVGRCV381,
    categories: [10],
    name: "Combo máy chuyên vít GR-CV381 330N.W 6.35MM chính hãng GREEKMAN",
    price: "1,200,000₫",
    oldPrice: "2,580,000₫",
    url: HOST
  },
  {
    id: 45,
    title: "Combo máy chuyên vít GR-V173 200N.W 6.35MM 1600v/ phút chính hãng GREEKMAN",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo máy chuyên vít GR-V173 200N.W 6.35MM 1600v/ phút chính hãng GREEKMAN có công dụng như thế nào với công việc của bạn...",
    images: COMBOCVGRCV173,
    categories: [10],
    name: "Combo máy chuyên vít GR-V173 200N.W 6.35MM 1600v/ phút chính hãng GREEKMAN",
    price: "1,200,000₫",
    oldPrice: "2,450,000₫",
    url: HOST
  },
  {
    id: 46,
    title: "Máy đục bê tông G3-HUK35 16J 2900BPM 1600W 1150V/ phút chính hãng HUKAN",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy đục bê tông G3-HUK35 16J 2900BPM 1600W 1150V/ phút chính hãng HUKAN có công dụng như thế nào với công việc của bạn...",
    images: G3HUK35,
    categories: [10],
    name: "Máy đục bê tông G3-HUK35 16J 2900BPM 1600W 1150V/ phút chính hãng HUKAN",
    price: "2,436,000₫",
    oldPrice: "2,850,000₫",
    url: HOST
  },
  {
    id: 47,
    title: "Máy hàn Greekman GR-MMA200E Mini 5.6KW 28V 1.6-3.2mm 35A chính hãng GREEkMAN",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy hàn Greekman GR-MMA200E Mini 5.6KW 28V 1.6-3.2mm 35A chính hãng GREEkMAN có công dụng như thế nào với công việc của bạn...",
    images: GRMMAMMA200EMINI,
    categories: [10],
    name: "Máy hàn Greekman GR-MMA200E Mini 5.6KW 28V 1.6-3.2mm 35A chính hãng GREEkMAN",
    price: "880,000₫",
    oldPrice: "1,180,000₫",
    url: HOST
  },
  {
    id: 48,
    title: "Máy hàn mitsukaisho MMA-200 Mini 5KVA 20-200A 1.6-3.2mm ARC chính hãng Mitsukaisho",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy hàn mitsukaisho MMA-200 Mini 5KVA 20-200A 1.6-3.2mm ARC chính hãng Mitsukaisho có công dụng như thế nào với công việc của bạn...",
    images: MKSMMA200EMINI,
    categories: [10],
    name: "Máy hàn mitsukaisho MMA-200 Mini 5KVA 20-200A 1.6-3.2mm ARC chính hãng Mitsukaisho",
    price: "1,580,000₫",
    oldPrice: "1,800,000₫",
    url: HOST
  },
  {
    id: 49,
    title: "Máy hàn mitsukaisho MMA-200 5KVA 20-200A 1.6-3.2mm ARC chính hãng Mitsukaisho",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy hàn mitsukaisho MMA-200 5KVA 20-200A 1.6-3.2mm ARC chính hãng Mitsukaisho có công dụng như thế nào với công việc của bạn...",
    images: MKSMMA200EV2,
    categories: [10],
    name: "Máy hàn mitsukaisho MMA-200 5KVA 20-200A 1.6-3.2mm ARC chính hãng Mitsukaisho",
    price: "1,450,000₫",
    oldPrice: "1,800,000₫",
    url: HOST
  },
  {
    id: 50,
    title: "Máy hàn OSHIMA MMA-200A 7.1KVA 20-200A 1.6-4.0MM 4.2KG",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy hàn OSHIMA MMA-200A 7.1KVA 20-200A 1.6-4.0MM 4.2KG có công dụng như thế nào với công việc của bạn...",
    images: OSHIMAMMA200A,
    categories: [10],
    name: "Máy hàn OSHIMA MMA-200A 7.1KVA 20-200A 1.6-4.0MM 4.2KG",
    price: "2,710,000₫",
    oldPrice: "3,200,000₫",
    url: HOST
  },
  {
    id: 51,
    title: "Máy hàn OSHIMA MMA-250A 9.6KVA 20-250A 1.6-5.0MM 5.5KG",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy hàn OSHIMA MMA-250A 9.6KVA 20-250A 1.6-5.0MM 5.5KG có công dụng như thế nào với công việc của bạn...",
    images: OSHIMAMMA250A,
    categories: [10],
    name: "Máy hàn OSHIMA MMA-250A 9.6KVA 20-250A 1.6-5.0MM 5.5KG",
    price: "3,450,000₫",
    oldPrice: "5,200,000₫",
    url: HOST
  },
  {
    id: 52,
    title: "Combo máy khoan đục G2-RH2601 26MM 21V 3.2J 5500BPM 1600v/ phút chính hãng HUKAn",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo máy khoan đục G2-RH2601 26MM 21V 3.2J 5500BPM 1600v/ phút chính hãng HUKAn có công dụng như thế nào với công việc của bạn...",
    images: G2RH2601,
    categories: [10],
    name: "Combo máy khoan đục G2-RH2601 26MM 21V 3.2J 5500BPM 1600v/ phút chính hãng HUKAn",
    price: "2,280,000₫",
    oldPrice: "3,200,000₫",
    url: HOST
  },
  {
    id: 53,
    title: "Thân máy khoan GR-K2626P 2.8J 21V 5000BPM 0-980v/ phút chính hãng GREEKMAN",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Thân máy khoan GR-K2626P 2.8J 21V 5000BPM 0-980v/ phút chính hãng GREEKMAN có công dụng như thế nào với công việc của bạn...",
    images: K2626P,
    categories: [10],
    name: "Thân máy khoan GR-K2626P 2.8J 21V 5000BPM 0-980v/ phút chính hãng GREEKMAN",
    price: "580,000₫",
    oldPrice: "620,000₫",
    url: HOST
  },
  {
    id: 54,
    title: "Máy khoan bê tông G2-RH2066X 1020W 220V 3.5J 4400v/ phút tốc độ búa và 780V/ phút tốc độ không tải",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy khoan bê tông G2-RH2066X 1020W 220V 3.5J 4400v/ phút tốc độ búa và 780V/ phút tốc độ không tải có công dụng như thế nào với công việc của bạn...",
    images: RH2066X,
    categories: [10],
    name: "Máy khoan bê tông G2-RH2066X 1020W 220V 3.5J 4400v/ phút tốc độ búa và 780V/ phút tốc độ không tải",
    price: "1,400,000₫",
    oldPrice: "1,580,000₫",
    url: HOST
  },
  {
    id: 55,
    title: "Combo máy khoan đục HK-RH2900BL 26MM 21V 2.8J 4800v/ phút chính hãng HUKAN",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo máy khoan đục HK-RH2900BL 26MM 21V 2.8J 4800v/ phút chính hãng HUKAN có công dụng như thế nào với công việc của bạn...",
    images: RH2900BL,
    categories: [10],
    name: "Combo máy khoan đục HK-RH2900BL 26MM 21V 2.8J 4800v/ phút chính hãng HUKAN",
    price: "3,225,000₫",
    oldPrice: "3,500,000₫",
    url: HOST
  },
  {
    id: 56,
    title: "Máy khoan đục bê tông G3-STOM02 2.9J 22MM 5500v/ phút tần số tác động và 1700v/ phút tốc độ không tải",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy khoan đục bê tông G3-STOM02 2.9J 22MM 5500v/ phút tần số tác động và 1700v/ phút tốc độ không tải có công dụng như thế nào với công việc của bạn...",
    images: G3STOM02,
    categories: [10],
    name: "Máy khoan đục bê tông G3-STOM02 2.9J 22MM 5500v/ phút tần số tác động và 1700v/ phút tốc độ không tải",
    price: "3,190,000đ",
    oldPrice: "3,500,000₫",
    url: HOST
  },
  {
    id: 57,
    title: "Combo máy mài cắt HUKAN G1-AG6101J 21V 100MM 7300v/ phút chân pin phổ thông",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Combo máy mài cắt HUKAN G1-AG6101J 21V 100MM 7300v/ phút chân pin phổ thông có công dụng như thế nào với công việc của bạn...",
    images: AG6101J,
    categories: [10],
    name: "Combo máy mài cắt HUKAN G1-AG6101J 21V 100MM 7300v/ phút chân pin phổ thông",
    price: "1,250,000đ",
    oldPrice: "1,468,000₫",
    url: HOST
  },
  {
    id: 58,
    title: "Máy phun xạ hạt, sương, thuốc trừ sâu, thổi bụi, đa chức năng TLP35 chạy xăng 13.5Kg động cơ 4 thì chính hãng TALU",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy phun xạ hạt, sương, thuốc trừ sâu, thổi bụi, đa chức năng TLP35 chạy xăng 13.5Kg động cơ 4 thì chính hãng TALU có công dụng như thế nào với công việc của bạn...",
    images: TLP35,
    categories: [1],
    name: "Máy phun xạ hạt, sương, thuốc trừ sâu, thổi bụi, đa chức năng TLP35 chạy xăng 13.5Kg động cơ 4 thì chính hãng TALU",
    price: "3,360,000đ",
    oldPrice: "6,250,000đ",
    url: HOST
  },
  {
    id: 59,
    title: "Máy phun xạ hạt, sương, thuốc trừ sâu, thổi bụi, đa chức năng OSHIMA 3WF-3A-43 chạy xăng dung tích 26L 13.6Kg động cơ 2 thì",
    author: "Tấn Lụa",
    date: "12/01/2021",
    description: "Máy phun xạ hạt, sương, thuốc trừ sâu, thổi bụi, đa chức năng OSHIMA 3WF-3A-43 chạy xăng dung tích 26L 13.6Kg động cơ 2 thì có công dụng như thế nào với công việc của bạn...",
    images: PHUNXA3WF3A43,
    categories: [1],
    name: "Máy phun xạ hạt, sương, thuốc trừ sâu, thổi bụi, đa chức năng OSHIMA 3WF-3A-43 chạy xăng dung tích 26L 13.6Kg động cơ 2 thì",
    price: "3,360,000đ",
    oldPrice: "6,250,000đ",
    url: HOST
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

  // Tự động thêm vào danh mục "Hàng thanh lý" (ID: 99) nếu giảm giá >= 40%
  if (discount) {
    const discountValue = parseInt(discount.replace(/\D/g, ''));
    if (discountValue >= 40 && !item.categories.includes(99)) {
      item.categories.push(99);
    }
  }

  return {
    ...item,
    price,
    oldPrice,
    discount,
    content: `
    <p>Sản phẩm <strong>${item.name}</strong> hiện đang được phân phối chính hãng tại ${COMPANY_NAME} với mức giá ưu đãi.</p>
    <p><strong>Giá bán: <span style="color: #d32f2f; font-size: 1.2em;">${price}</span></strong> ${oldPrice ? `<span style="text-decoration: line-through; color: #999; margin-left: 10px;">${oldPrice}</span>` : ''}</p>
    <p>Để biết thêm thông tin chi tiết về sản phẩm và các chương trình khuyến mãi, quý khách vui lòng liên hệ hotline: <b>${HOTLINE}</b> hoặc đến trực tiếp cửa hàng để được tư vấn tốt nhất.</p>
  `
  };
});
