import React, { useState } from 'react';
import { Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
   ScissorOutlined,
   ThunderboltOutlined,
   DashboardOutlined,
   ToolOutlined,
   BuildOutlined,
   FormatPainterOutlined,
   FireOutlined,
   ArrowRightOutlined,
   AppstoreOutlined,
   CarOutlined,
   SafetyCertificateOutlined,
   CustomerServiceOutlined,
   GiftOutlined,
   SettingOutlined
} from '@ant-design/icons';
import { newsList, HOTLINE, CATEGORY_ID } from '../NewsPage/constants';

import img1 from '../../assets/sliders/slider_1.jpg';
import img2 from '../../assets/sliders/slider_2.jpg';
import img3 from '../../assets/sliders/slider_3.jpg';

interface SidebarCategory {
   id: number;
   name: string;
   slug: string;
   icon: React.ReactNode;
}

const sidebarCategories: SidebarCategory[] = [
   { id: CATEGORY_ID.MAY_CAT_CO, name: "Máy cắt cỏ", slug: "may-cat-co", icon: <ScissorOutlined /> },
   { id: CATEGORY_ID.THIET_BI_XIT_RUA, name: "Đầu xịt áp lực (Ty sứ/inox)", slug: "thiet-bi-xit-rua", icon: <ThunderboltOutlined /> },
   { id: CATEGORY_ID.MAY_NEN_KHI, name: "Máy nén khí", slug: "may-nen-khi", icon: <DashboardOutlined /> },
   { id: CATEGORY_ID.DUNG_CU_CAM_TAY, name: "Dụng cụ cầm tay", slug: "dung-cu-cam-tay", icon: <ToolOutlined /> },
   { id: CATEGORY_ID.MAY_XOI_DAT, name: "Máy xới đất", slug: "may-xoi-dat", icon: <BuildOutlined /> },
   { id: CATEGORY_ID.MAY_BOM_NUOC, name: "Máy bơm nước", slug: "may-bom-nuoc", icon: <FormatPainterOutlined /> },
   { id: CATEGORY_ID.DAU_NO, name: "Đầu nổ", slug: "dau-no", icon: <SettingOutlined /> },
   { id: CATEGORY_ID.HANG_THANH_LY, name: "Hàng thanh lý - Xả kho", slug: "hang-thanh-ly", icon: <FireOutlined /> }
];

interface PropertyFilter {
   label: string;
   key: string;
   options: string[];
}

const getCategoryPropertyFilters = (categoryId: number): PropertyFilter[] => {
   if (categoryId === 6) { // Máy cắt cỏ
      return [
         {
            label: "Động cơ",
            key: "engineType",
            options: ["2 thì", "4 thì"]
         },
         {
            label: "Nhiên liệu",
            key: "fuelType",
            options: ["Xăng pha nhớt", "Xăng riêng nhớt riêng"]
         }
      ];
   }
   if (categoryId === 3) { // Đầu xịt áp lực
      return [
         {
            label: "Piston (Ty)",
            key: "pistonType",
            options: ["Ty sứ", "Ty inox"]
         },
         {
            label: "Xilanh (Đường kính)",
            key: "pistonSize",
            options: ["22mm", "30mm"]
         }
      ];
   }
   if (categoryId === 10) { // Dụng cụ cầm tay
      return [
         {
            label: "Loại máy",
            key: "toolType",
            options: ["Máy khoan", "Máy hàn", "Siết bulong / Chuyên vít", "Máy mài / Cắt", "Máy thổi", "Phụ kiện / Pin sạc"]
         },
         {
            label: "Nguồn năng lượng",
            key: "powerSource",
            options: ["Dùng pin", "Dùng điện 220V"]
         }
      ];
   }
   if (categoryId === 9) { // Máy nén khí
      return [
         {
            label: "Kiểu động cơ",
            key: "compressorType",
            options: ["Không dầu", "Có dầu"]
         },
         {
            label: "Dung tích bình",
            key: "tankCapacity",
            options: ["12L", "30L"]
         }
      ];
   }
   if (categoryId === 7) { // Máy xới đất
      return [
         {
            label: "Động cơ",
            key: "engineType",
            options: ["Chạy xăng", "Chạy dầu"]
         },
         {
            label: "Kiểu máy",
            key: "tillerType",
            options: ["Máy xới đa năng", "Máy xới mini"]
         }
      ];
   }
   if (categoryId === 8) { // Máy bơm nước
      return [
         {
            label: "Loại bơm",
            key: "pumpType",
            options: ["Bơm tăng áp", "Bơm chìm", "Bơm đẩy cao"]
         },
         {
            label: "Điện áp / Nguồn",
            key: "powerSource",
            options: ["220V", "Dùng pin"]
         }
      ];
   }
   if (categoryId === CATEGORY_ID.DAU_NO) { // Đầu nổ
      return [
         {
            label: "Nhiên liệu",
            key: "engineType",
            options: ["Chạy xăng", "Chạy dầu"]
         },
         {
            label: "Vòng tua",
            key: "engineSpeed",
            options: ["1800rpm", "3600rpm"]
         }
      ];
   }
   return [];
};

const getCategoryProducts = (categoryId: number) => {
   return newsList
      .filter((p: any) => p.categories?.includes(categoryId));
};

const Slider: React.FC = () => {
   const navigate = useNavigate();
   const [hoveredSubId, setHoveredSubId] = useState<number | null>(null);

   const sliderData = [
      { id: 1, src: img1, title: 'Khám phá thiên nhiên' },
      { id: 2, src: img2, title: 'Công nghệ mới 2025' },
      { id: 3, src: img3, title: 'Giải pháp tối ưu' },
   ];

   const handleNavigate = (path: string, state?: any) => {
      navigate(path, { state });
   };

   const currentSub = sidebarCategories.find((sub: SidebarCategory) => sub.id === hoveredSubId);
   const propFilters = currentSub ? getCategoryPropertyFilters(currentSub.id) : [];
   const products = currentSub ? getCategoryProducts(currentSub.id) : [];

   return (
      <div
         className="pt-3 pb-3 mx-auto text-left relative"
         onMouseLeave={() => setHoveredSubId(null)}
      >
         {/* Container chính: Grid 12 cột */}
         <div className="grid grid-cols-12 gap-2 md:gap-4 relative">

            {/* CỘT 1: Sidebar danh mục dọc (4/12 cột trên Mobile, 3/12 cột trên PC) */}
            <div className="col-span-4 md:col-span-3 bg-white dark:bg-[#1f1f1f] rounded-xl border border-gray-100 dark:border-gray-800/30 shadow-md shadow-gray-100/50 dark:shadow-none overflow-hidden flex flex-col gap-1 p-2 h-[260px] sm:h-[320px] md:h-[400px]">
               <div className="px-2 py-2 md:px-4 md:py-3 border-b border-gray-50 dark:border-gray-800/30 font-bold text-[10px] sm:text-xs md:text-sm text-gray-800 dark:text-gray-200 flex items-center gap-1.5 md:gap-2">
                  <AppstoreOutlined className="text-[#cb2b2b] text-xs md:text-sm" />
                  <span>DANH MỤC SẢN PHẨM</span>
               </div>
               <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                  {sidebarCategories.map((sub: SidebarCategory) => {
                     const isActive = sub.id === hoveredSubId;
                     return (
                        <div
                           key={sub.id}
                           onMouseEnter={() => setHoveredSubId(sub.id)}
                           onClick={() => handleNavigate(`/${sub.slug}`)}
                           className={`px-2 py-1.5 md:px-4 md:py-2.5 rounded-md cursor-pointer transition-all flex items-center justify-between group text-[10px] sm:text-xs font-semibold ${isActive
                              ? 'bg-red-50 dark:bg-red-950/20 text-[#cb2b2b]'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/20'
                              }`}
                        >
                           <div className="flex items-center gap-1.5 md:gap-2.5">
                              <span className={`text-xs md:text-sm ${isActive ? 'text-[#cb2b2b]' : 'text-gray-400 dark:text-gray-550'}`}>
                                 {sub.icon}
                              </span>
                              <span>
                                 {sub.name.includes(" (") ? (
                                    <>
                                       <span className="inline md:hidden">{sub.name.split(" (")[0]}</span>
                                       <span className="hidden md:inline">{sub.name}</span>
                                    </>
                                 ) : (
                                    sub.name
                                 )}
                              </span>
                           </div>
                           <ArrowRightOutlined
                              className={`text-[9px] md:text-[10px] transition-all transform ${isActive
                                 ? 'opacity-100 translate-x-0'
                                 : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                                 }`}
                           />
                        </div>
                     );
                  })}
               </div>
            </div>

            {/* VÙNG BÊN PHẢI (8/12 cột trên Mobile, 9/12 cột trên PC) */}
            <div className="col-span-8 md:col-span-9 h-[260px] sm:h-[320px] md:h-[400px] relative rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800/30 shadow-md shadow-gray-100/50 dark:shadow-none bg-white dark:bg-[#1f1f1f]">

               {/* LỚP 1: Carousel & Cột Chính sách (Hiển thị khi hoveredSubId === null) */}
               <div className={`absolute inset-0 grid grid-cols-12 gap-1 sm:gap-2 md:gap-4 p-0 transition-opacity duration-300 ${hoveredSubId === null ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                  }`}>
                  {/* Banner Carousel */}
                  <div className="col-span-12 md:col-span-9 h-full overflow-hidden">
                     <Carousel autoplay autoplaySpeed={4000} speed={500} dotPlacement="bottom" className="h-full">
                        {sliderData.map((img: { id: number; src: string; title: string }, index: number) => (
                           <div key={index} className="h-full">
                              <div className="relative h-[260px] sm:h-[320px] md:h-[400px]">
                                 <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full h-full object-cover"
                                    loading='lazy'
                                 />
                              </div>
                           </div>
                        ))}
                     </Carousel>
                  </div>

                  {/* Cột Chính sách dịch vụ (Xếp dọc trên cả PC và Mobile) */}
                  <div className="hidden md:flex col-span-4 md:col-span-3 flex-col gap-1.5 sm:gap-2 md:gap-2.5 p-1.5 sm:p-2 md:p-3 h-full bg-gray-50/50 dark:bg-gray-900/30 border-l border-gray-100/60 dark:border-gray-800/30 overflow-hidden">
                     {/* Dịch vụ 1 */}
                     <div className="flex-1 flex items-center gap-1 sm:gap-2 md:gap-3 p-1 sm:p-1.5 md:p-2.5 bg-white dark:bg-[#1f1f1f] rounded-lg md:rounded-xl border border-gray-100 dark:border-gray-800/20 shadow-sm hover:shadow-md hover:border-red-100 dark:hover:border-red-950/20 transition-all duration-300 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-red-50 dark:bg-red-950/20 text-[#cb2b2b] flex items-center justify-center text-[10px] sm:text-xs md:text-base flex-shrink-0">
                           <CarOutlined />
                        </div>
                        <div className="flex flex-col min-w-0">
                           <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Giao hàng toàn quốc</span>
                           <span className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-400 dark:text-gray-550 truncate leading-snug">Miễn phí cho đơn lớn</span>
                        </div>
                     </div>

                     {/* Dịch vụ 2 */}
                     <div className="flex-1 flex items-center gap-1 sm:gap-2 md:gap-3 p-1 sm:p-1.5 md:p-2.5 bg-white dark:bg-[#1f1f1f] rounded-lg md:rounded-xl border border-gray-100 dark:border-gray-800/20 shadow-sm hover:shadow-md hover:border-red-100 dark:hover:border-red-950/20 transition-all duration-300 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-red-50 dark:bg-red-950/20 text-[#cb2b2b] flex items-center justify-center text-[10px] sm:text-xs md:text-base flex-shrink-0">
                           <SafetyCertificateOutlined />
                        </div>
                        <div className="flex flex-col min-w-0">
                           <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Bảo hành chính hãng</span>
                           <span className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-400 dark:text-gray-550 truncate leading-snug">Cam kết 100% chính hãng</span>
                        </div>
                     </div>

                     {/* Dịch vụ 3 */}
                     <div className="flex-1 flex items-center gap-1 sm:gap-2 md:gap-3 p-1 sm:p-1.5 md:p-2.5 bg-white dark:bg-[#1f1f1f] rounded-lg md:rounded-xl border border-gray-100 dark:border-gray-800/20 shadow-sm hover:shadow-md hover:border-red-100 dark:hover:border-red-950/20 transition-all duration-300 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-red-50 dark:bg-red-950/20 text-[#cb2b2b] flex items-center justify-center text-[10px] sm:text-xs md:text-base flex-shrink-0">
                           <CustomerServiceOutlined />
                        </div>
                        <div className="flex flex-col min-w-0">
                           <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Hỗ trợ 24/7</span>
                           <span className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-400 dark:text-gray-550 truncate leading-snug">Hotline: {HOTLINE}</span>
                        </div>
                     </div>

                     {/* Dịch vụ 4 */}
                     <div className="flex-1 flex items-center gap-1 sm:gap-2 md:gap-3 p-1 sm:p-1.5 md:p-2.5 bg-white dark:bg-[#1f1f1f] rounded-lg md:rounded-xl border border-gray-100 dark:border-gray-800/20 shadow-sm hover:shadow-md hover:border-red-100 dark:hover:border-red-950/20 transition-all duration-300 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9 rounded-full bg-red-50 dark:bg-red-950/20 text-[#cb2b2b] flex items-center justify-center text-[10px] sm:text-xs md:text-base flex-shrink-0">
                           <GiftOutlined />
                        </div>
                        <div className="flex flex-col min-w-0">
                           <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Ưu đãi đặc biệt</span>
                           <span className="text-[7px] sm:text-[8px] md:text-[10px] text-gray-400 dark:text-gray-500 truncate leading-snug">Giảm đến 30% khách quen</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* LỚP 2: Panel thuộc tính & Dòng hàng (Hiển thị đè lên khi hoveredSubId !== null) */}
               {currentSub && (
                  <div className={`absolute inset-0 bg-white dark:bg-[#1f1f1f] p-4 md:p-5 flex flex-col gap-4 md:gap-5 overflow-y-auto transition-all duration-300 ${hoveredSubId !== null ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                     }`}>

                     {/* Phần bộ lọc thuộc tính */}
                     {propFilters.length > 0 && (
                        <div className="space-y-3 border-b border-gray-50 dark:border-gray-800/20 pb-3">
                           {propFilters.map((filter) => (
                              <div key={filter.key} className="space-y-1.5">
                                 <div className="flex items-center justify-between">
                                    <span className="text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider">
                                       Bộ lọc {filter.label}
                                    </span>
                                 </div>
                                 <div className="flex flex-wrap gap-1.5 pt-0.5">
                                    {filter.options.map((opt: string) => (
                                       <button
                                          key={opt}
                                          onClick={() => handleNavigate(`/${currentSub.slug}`, { selectedFilters: { [filter.key]: opt } })}
                                          className="px-2 md:px-3 py-1 md:py-1.5 text-[9px] md:text-xs bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-[#cb2b2b] rounded-md border border-gray-100 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900/30 transition-all font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow"
                                       >
                                          {opt}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}

                     {/* Phần Dòng hàng (Sản phẩm nổi bật) */}
                     <div className="space-y-3 flex-1 flex flex-col pt-1">
                        <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800/20 pb-1.5">
                           <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Danh sách sản phẩm {currentSub.name}
                           </span>
                           <span
                              onClick={() => handleNavigate(`/${currentSub.slug}`)}
                              className="text-[11px] text-[#cb2b2b] hover:underline cursor-pointer font-semibold"
                           >
                              Xem thêm
                           </span>
                        </div>

                        {products.length === 0 ? (
                           <div className="flex items-center justify-center flex-1 py-8 text-gray-400 text-xs">
                              Không có sản phẩm nào trong danh mục này
                           </div>
                        ) : (
                           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 pt-1">
                              {products.map((p: any) => (
                                 <div
                                    key={p.id}
                                    onClick={() => handleNavigate(`/product/${p.id}`)}
                                    className="p-1.5 md:p-2 border border-gray-100 dark:border-gray-800/20 rounded-xl hover:border-red-200/60 dark:hover:border-red-900/40 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 flex flex-col items-center text-center group bg-white dark:bg-[#1f1f1f] hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                 >
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded overflow-hidden mb-1.5 md:mb-2 relative border border-gray-50 dark:border-gray-800/20">
                                       {p.images?.[0] ? (
                                          <img
                                             src={p.images[0]}
                                             alt={p.name}
                                             className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                             loading="lazy"
                                          />
                                       ) : (
                                          <AppstoreOutlined className="text-gray-300 text-sm md:text-lg" />
                                       )}
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight group-hover:text-[#cb2b2b] transition-colors">
                                       {p.name}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                  </div>
               )}

            </div>

         </div>
      </div>
   );
};

export default Slider;
