// constants/newsCategory.ts
import { SLIDER_IMAGES } from './images';
import { CATEGORY_ID, HOST } from './config';
export { CATEGORY_ID, HOST };

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
  HANG_THANH_LY: "Hàng thanh lý",
  VAT_TU: "Vật tư"
}



// Thông tin liên hệ công ty
export const COMPANY_NAME = 'Công ty TNHH thương mại và dịch vụ Sang Phát';
export const HOTLINE = '0833.090.186';
export const EMAIL = 'tl0913992182@gmail.com';
export const RECRUITMENT_EMAIL = 'tuyendung@tanlua.com.vn';
export const ADDRESS = 'Nghĩa Thái, Nghĩa Hưng, Nam Định';


export const CATEGORIES = [
  { id: CATEGORY_ID.MAY_NONG_NGHIEP, name: MACHINE_NAME.MAY_NONG_NGHIEP, slug: "may-nong-nghiep", img: SLIDER_IMAGES[0] },
  { id: CATEGORY_ID.MAY_CONG_NGHIEP, name: MACHINE_NAME.MAY_CONG_NGHIEP, slug: "may-cong-nghiep", img: SLIDER_IMAGES[1] },
  { id: CATEGORY_ID.DUNG_CU_CAM_TAY, name: MACHINE_NAME.DUNG_CU_CAM_TAY, slug: "dung-cu-cam-tay", img: SLIDER_IMAGES[2] },
  { id: CATEGORY_ID.THIET_BI_XIT_RUA, name: MACHINE_NAME.THIET_BI_XIT_RUA, slug: "thiet-bi-xit-rua", img: SLIDER_IMAGES[3] },
  { id: CATEGORY_ID.MAY_PHAT_DIEN, name: MACHINE_NAME.MAY_PHAT_DIEN, slug: "may-phat-dien", img: SLIDER_IMAGES[4] },
  { id: CATEGORY_ID.MAY_BAN_COT, name: MACHINE_NAME.MAY_BAN_COT, slug: "may-ban-cot", img: SLIDER_IMAGES[5] },
  { id: CATEGORY_ID.MAY_CAT_CO, name: MACHINE_NAME.MAY_CAT_CO, slug: "may-cat-co", img: SLIDER_IMAGES[6] },
  { id: CATEGORY_ID.MAY_XOI_DAT, name: MACHINE_NAME.MAY_XOI_DAT, slug: "may-xoi-dat", img: SLIDER_IMAGES[7] },
  { id: CATEGORY_ID.MAY_BOM_NUOC, name: MACHINE_NAME.MAY_BOM_NUOC, slug: "may-bom-nuoc", img: SLIDER_IMAGES[8] },
  { id: CATEGORY_ID.MAY_NEN_KHI, name: MACHINE_NAME.MAY_NEN_KHI, slug: "may-nen-khi", img: SLIDER_IMAGES[9] },
  { id: CATEGORY_ID.HANG_THANH_LY, name: MACHINE_NAME.HANG_THANH_LY, slug: "hang-thanh-ly", img: SLIDER_IMAGES[10] },
  { id: CATEGORY_ID.VAT_TU, name: MACHINE_NAME.VAT_TU, slug: "vat-tu", img: SLIDER_IMAGES[11] },
];

export const MENU_STRUCTURE = [
  {
    id: CATEGORY_ID.MAY_NONG_NGHIEP,
    name: "MÁY NÔNG NGHIỆP",
    slug: "may-nong-nghiep",
    subCategories: [
      { id: CATEGORY_ID.MAY_CAT_CO, name: "Máy cắt cỏ", slug: "may-cat-co", desc: "Máy cắt cỏ 2 thì, 4 thì công suất lớn" },
      { id: CATEGORY_ID.MAY_XOI_DAT, name: "Máy xới đất", slug: "may-xoi-dat", desc: "Máy xới đất mini chạy xăng, dầu" },
      { id: CATEGORY_ID.MAY_BOM_NUOC, name: "Máy bơm nước", slug: "may-bom-nuoc", desc: "Máy bơm nước tăng áp, bơm chìm" }
    ]
  },
  {
    id: CATEGORY_ID.MAY_CONG_NGHIEP,
    name: "MÁY CÔNG NGHIỆP",
    slug: "may-cong-nghiep",
    subCategories: [
      { id: CATEGORY_ID.MAY_NEN_KHI, name: "Máy nén khí", slug: "may-nen-khi", desc: "Máy nén khí có dầu, không dầu Oshima" },
      { id: CATEGORY_ID.MAY_CONG_NGHIEP, name: "Máy xây dựng", slug: "may-cong-nghiep", desc: "Đầm thước, máy xoa vữa chính hãng" }
    ]
  },
  {
    id: CATEGORY_ID.THIET_BI_XIT_RUA,
    name: "THIẾT BỊ XỊT RỬA",
    slug: "thiet-bi-xit-rua",
    subCategories: [
      { id: CATEGORY_ID.THIET_BI_XIT_RUA, name: "Đầu xịt áp lực", slug: "thiet-bi-xit-rua", desc: "Đầu xịt rửa xe ty sứ, ty inox" }
    ]
  },
  {
    id: CATEGORY_ID.DUNG_CU_CAM_TAY,
    name: "DỤNG CỤ CẦM TAY",
    slug: "dung-cu-cam-tay",
    subCategories: [
      { id: CATEGORY_ID.DUNG_CU_CAM_TAY, name: "Dụng cụ cầm tay", slug: "dung-cu-cam-tay", desc: "Máy khoan, máy siết bulong, máy hàn" }
    ]
  }
];

const calculateDiscount = (price: string, oldPrice: string) => {
  if (!oldPrice) return "";
  const priceNumber = parseInt(price.replace(/\D/g, ''));
  const oldPriceNumber = parseInt(oldPrice.replace(/\D/g, ''));
  if (!oldPriceNumber || priceNumber >= oldPriceNumber) return "";
  return `-${Math.round(((oldPriceNumber - priceNumber) / oldPriceNumber) * 100)}%`;
};

import type { NewsItem } from './type';

const CATEGORY_DISCOUNTS: { [key: number]: number } = {};



import { rawNewsList } from './rawNewsList';
export { rawNewsList };

// Helper function để tạo ID ổn định từ tên sản phẩm
// Giúp tránh việc mất giỏ hàng khi load lại trang do ID bị random lại
const generateStableId = (title: string): string => {
  if (!title) return 'unknown';
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đÐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const newsList: NewsItem[] = rawNewsList.map((item) => {
  let { price, oldPrice } = item;
  let discount = "";
  const id = item.id || generateStableId(item.title);

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
      discount = `- ${categoryDiscount} % `;
    }
  } else {
    // Mặc định: Tính % giảm dựa trên price và oldPrice có sẵn
    discount = calculateDiscount(price, oldPrice || "");
  }

  // Tự động thêm vào danh mục "Hàng thanh lý" (CATEGORY_ID.HANG_THANH_LY) nếu giảm giá >= 40%
  if (discount) {
    const discountValue = parseInt(discount.replace(/\D/g, ''));
    if (discountValue >= 40 && !item.categories.includes(CATEGORY_ID.HANG_THANH_LY)) {
      item.categories.push(CATEGORY_ID.HANG_THANH_LY);
    }
  }

  return {
    ...item,
    price,
    oldPrice,
    discount,
    id: id,
    content: `
  <p>Sản phẩm <strong>${item.name}</strong> hiện đang được phân phối chính hãng tại ${COMPANY_NAME} với mức giá ưu đãi.</p>
  <p><strong>Giá bán: <span style="color: #d32f2f; font-size: 1.2em;">${price}</span></strong> ${oldPrice ? `<span style="text-decoration: line-through; color: #999; margin-left: 10px;">${oldPrice}</span>` : ''}</p>
  <p>Để biết thêm thông tin chi tiết về sản phẩm và các chương trình khuyến mãi, quý khách vui lòng liên hệ hotline: <b>${HOTLINE}</b> hoặc đến trực tiếp cửa hàng để được tư vấn tốt nhất.</p>
    `
  } as NewsItem;
});

