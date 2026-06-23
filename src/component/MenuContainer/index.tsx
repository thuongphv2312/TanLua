import React, { useEffect, useState } from 'react';
import { MenuOutlined, ArrowRightOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Grid, Button, Drawer, Divider, Space, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';

import { MENU_STRUCTURE, rawNewsList } from '../NewsPage/constants';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeToggle from '../ThemeToggle';



interface MobileMenuProps {
   isDarkMode?: boolean;
   onToggleTheme?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isDarkMode = false, onToggleTheme = () => { } }) => {
   const [drawerOpen, setDrawerOpen] = useState(false);
   const navigate = useNavigate();
   const { useBreakpoint } = Grid;
   const screens = useBreakpoint();

   useEffect(() => {
      const handleOpen = () => setDrawerOpen(true);
      window.addEventListener('open_mobile_menu', handleOpen);
      return () => window.removeEventListener('open_mobile_menu', handleOpen);
   }, []);



   if (screens.md) return null;

   return (
      <>
         <Button
            icon={<MenuOutlined style={{ fontSize: '24px', color: '#fff' }} />}
            onClick={() => setDrawerOpen(true)}
            type="text"
            className="flex items-center justify-center"
            style={{
               zIndex: 1000,
               height: '40px',
               width: '40px',
               marginRight: '8px',
            }}
         />
         <Drawer
            title="Danh mục sản phẩm"
            placement="left"
            onClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            width={280}
            styles={{ body: { padding: 0 } }}
         >
            <div style={{ borderRight: 'none' }} className="flex flex-col">
               {MENU_STRUCTURE.map((cat: any) => (
                  <div key={cat.id} className="p-3 border-b dark:border-gray-800">
                     <div className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-2 px-3">{cat.name}</div>
                     <div className="flex flex-col gap-1 pl-3">
                        {cat.subCategories.map((sub: any) => (
                           <div
                              key={sub.id}
                              onClick={() => {
                                 navigate(`/${sub.slug}`);
                                 setDrawerOpen(false);
                              }}
                              className="py-2 text-xs text-gray-600 dark:text-gray-400 hover:text-[#cb2b2b] cursor-pointer"
                           >
                              {sub.name}
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>

            {/* Theme Toggle Section */}
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ padding: '0 16px' }}>
               <div style={{ marginBottom: '8px', fontWeight: 500, color: isDarkMode ? '#aaa' : '#666' }}>
                  🌓 Chế độ giao diện
               </div>
               <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} isMobile={true} />
            </div>

            {/* Language Switcher Section */}
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ padding: '0 16px 16px' }}>
               <div style={{ marginBottom: '8px', fontWeight: 500, color: isDarkMode ? '#aaa' : '#666' }}>
                  🌐 Ngôn ngữ / Language
               </div>
               <LanguageSwitcher isMobile={true} />
            </div>
         </Drawer>
      </>
   );
};

// Helper trích xuất bộ lọc thuộc tính
const getCategoryPropertyFilters = (categoryId: number) => {
   if (categoryId === 6) { // Máy cắt cỏ
      return {
         label: "Động cơ",
         key: "engineType",
         options: ["2 thì", "4 thì"]
      };
   }
   if (categoryId === 3) { // Thiết bị xịt rửa / Đầu xịt
      return {
         label: "Piston (Ty)",
         key: "pistonType",
         options: ["Ty sứ", "Ty inox"]
      };
   }
   if (categoryId === 10) { // Dụng cụ cầm tay
      return {
         label: "Dòng máy / Pin",
         key: "batteryType",
         options: ["Pin 15 cell", "Pin 20 cell", "Thân máy", "Máy hàn"]
      };
   }
   if (categoryId === 9) { // Máy nén khí
      return {
         label: "Loại máy",
         key: "compressorType",
         options: ["Không dầu", "Có dầu"]
      };
   }
   return null;
};

// Helper lấy sản phẩm nổi bật làm dòng hàng
const getCategoryProducts = (categoryId: number) => {
   return rawNewsList
      .filter((p: any) => p.categories?.includes(categoryId))
      .slice(0, 8);
};

interface MegaMenuPanelProps {
   cat: any;
   onNavigate: (path: string, state?: any) => void;
}

const MegaMenuPanel: React.FC<MegaMenuPanelProps> = ({ cat, onNavigate }) => {
   const [hoveredSubId, setHoveredSubId] = useState<number>(() => {
      return cat.subCategories[0]?.id || 0;
   });

   useEffect(() => {
      if (cat.subCategories[0]) {
         setHoveredSubId(cat.subCategories[0].id);
      }
   }, [cat]);

   const currentSub = cat.subCategories.find((sub: any) => sub.id === hoveredSubId) || cat.subCategories[0];

   return (
      <div className="flex w-[820px] min-h-[380px] bg-white dark:bg-[#1f1f1f] text-left rounded-xl overflow-hidden shadow-xl border dark:border-gray-800">
         {/* Cột trái: Danh mục con dọc */}
         <div className="w-[240px] bg-gray-50/50 dark:bg-gray-900/30 border-r dark:border-gray-850 p-2 flex flex-col gap-1">
            {cat.subCategories.map((sub: any) => {
               const isActive = sub.id === hoveredSubId;
               return (
                  <div
                     key={sub.id}
                     onMouseEnter={() => setHoveredSubId(sub.id)}
                     onClick={() => onNavigate(`/${sub.slug}`)}
                     className={`px-4 py-3 rounded-lg cursor-pointer transition-all flex items-center justify-between group ${
                        isActive
                           ? 'bg-red-50 dark:bg-red-950/20 text-[#cb2b2b] font-semibold'
                           : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-850/40'
                     }`}
                  >
                     <span className="text-xs md:text-sm">{sub.name}</span>
                     <ArrowRightOutlined
                        className={`text-[10px] transition-all transform ${
                           isActive
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                        }`}
                     />
                  </div>
               );
            })}
         </div>

         {/* Cột phải: Bộ lọc thuộc tính và dòng hàng */}
         <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto max-h-[480px]">
            {currentSub && (
               <>
                  {/* Phần bộ lọc thuộc tính */}
                  {getCategoryPropertyFilters(currentSub.id) && (
                     <div className="space-y-2">
                        <div className="flex items-center justify-between border-b dark:border-gray-800 pb-1.5">
                           <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Thông số bộ lọc ({getCategoryPropertyFilters(currentSub.id)?.label})
                           </span>
                           <span 
                              onClick={() => onNavigate(`/${currentSub.slug}`)}
                              className="text-[11px] text-[#cb2b2b] hover:underline cursor-pointer font-semibold"
                           >
                              Xem thêm
                           </span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                           {getCategoryPropertyFilters(currentSub.id)?.options.map((opt: string) => (
                              <button
                                 key={opt}
                                 onClick={() => onNavigate(`/${currentSub.slug}`, { selectedProperty: opt })}
                                 className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-850 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-[#cb2b2b] rounded-md border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900/30 transition-all font-medium text-gray-700 dark:text-gray-300"
                              >
                                 {opt}
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Phần Dòng hàng (Sản phẩm nổi bật) */}
                  <div className="space-y-3 flex-1 flex flex-col pt-2">
                     <div className="flex items-center justify-between border-b dark:border-gray-800 pb-1.5">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                           Dòng sản phẩm
                        </span>
                        <span 
                           onClick={() => onNavigate(`/${currentSub.slug}`)}
                           className="text-[11px] text-[#cb2b2b] hover:underline cursor-pointer font-semibold"
                        >
                           Xem tất cả
                        </span>
                     </div>

                     {getCategoryProducts(currentSub.id).length === 0 ? (
                        <div className="flex items-center justify-center flex-1 py-8 text-gray-400 text-xs">
                           Không có sản phẩm nào trong danh mục này
                        </div>
                     ) : (
                        <div className="grid grid-cols-4 gap-3 pt-1">
                           {getCategoryProducts(currentSub.id).map((p: any) => (
                              <div
                                 key={p.id}
                                 onClick={() => onNavigate(`/product/${p.id}`)}
                                 className="p-2 border dark:border-gray-800 rounded-lg hover:border-red-200 dark:hover:border-red-900/40 hover:shadow-sm cursor-pointer transition-all flex flex-col items-center text-center group bg-white dark:bg-[#1f1f1f] hover:bg-gray-50 dark:hover:bg-gray-850/50"
                              >
                                 <div className="w-14 h-14 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded overflow-hidden mb-2 relative border dark:border-gray-800">
                                    {p.images?.[0] ? (
                                       <img
                                          src={p.images[0]}
                                          alt={p.name}
                                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                          loading="lazy"
                                       />
                                    ) : (
                                       <AppstoreOutlined className="text-gray-300 text-lg" />
                                    )}
                                 </div>
                                 <span className="text-[10px] font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight group-hover:text-[#cb2b2b] transition-colors">
                                    {p.name}
                                 </span>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

const MenuContainer: React.FC = () => {
   const navigate = useNavigate();
   const { useBreakpoint } = Grid;
   const screens = useBreakpoint();

   if (!screens.md) return null;

   return (
      <div className="hidden md:flex items-center bg-white dark:bg-[#1f1f1f] rounded-xl mb-4 px-6 py-3 border dark:border-gray-800 shadow-sm text-left">
         <Space size={32}>
            {/* Nút Trang chủ */}
            <span
               onClick={() => navigate('/')}
               className="font-bold text-gray-700 dark:text-gray-300 hover:text-[#cb2b2b] dark:hover:text-[#cb2b2b] cursor-pointer text-sm transition-colors"
            >
               Trang chủ
            </span>

            {MENU_STRUCTURE.map((cat: any) => (
               <Popover
                  key={cat.id}
                  content={
                     <MegaMenuPanel
                        cat={cat}
                        onNavigate={(path: string, state?: any) => {
                           navigate(path, { state });
                        }}
                     />
                  }
                  placement="bottomLeft"
                  trigger="hover"
                  overlayClassName="mega-menu-popover"
                  arrow={false}
                  overlayInnerStyle={{ padding: 0, borderRadius: '12px', overflow: 'hidden' }}
               >
                  <span
                     onClick={() => navigate(`/${cat.slug}`)}
                     className="font-bold text-gray-700 dark:text-gray-300 hover:text-[#cb2b2b] dark:hover:text-[#cb2b2b] cursor-pointer text-sm py-1 block transition-colors"
                  >
                     {cat.name}
                  </span>
               </Popover>
            ))}

            {/* Tin tức */}
            <span
               onClick={() => navigate('/news')}
               className="font-bold text-gray-700 dark:text-gray-300 hover:text-[#cb2b2b] dark:hover:text-[#cb2b2b] cursor-pointer text-sm transition-colors"
            >
               Tin tức
            </span>
         </Space>
      </div>
   );
};

export default MenuContainer;
