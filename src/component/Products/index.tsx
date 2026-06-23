import React, { useState, useEffect, useMemo } from 'react';
import { SearchOutlined, ThunderboltOutlined, FilterOutlined } from '@ant-design/icons';
import { Card, Badge, Button, Empty, Tooltip, Select, Drawer, Radio, Divider } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES, HOST } from '../NewsPage/constants';
import { ProductGridSkeleton } from '../ui/SkeletonComponents';
import SEO, { CATEGORY_SEO } from '../SEO';
import { isProductInFlashSale } from '../../utils/flashSale';


interface Product {
  id: string | number;
  name: string;
  images: string[];
  price: string;
  oldPrice?: string;
  discount?: string;
  url?: string;
  categories?: number[];
  isSoldOut?: boolean;
  author?: string;
  description?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  img: string;
}

interface ProductsProps {
  title?: string;
  lstProducts?: Product[];
  bannerImage?: string;
  categoryId?: number;
  isLoading?: boolean;
}

const Products: React.FC<ProductsProps> = ({
  title = '',
  lstProducts = [],
  bannerImage,
  categoryId,
  isLoading = false
}) => {
  const [activeCategory, setActiveCategory] = useState(() => {
    if (categoryId) return categoryId;
    if (lstProducts.length > 0) {
      const firstItem = lstProducts[0];
      const match = CATEGORIES.find((c: Category) => firstItem.categories?.includes(c.id));
      if (match) return match.id;
    }
    return CATEGORIES[0].id;
  });
  const [visibleCount, setVisibleCount] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  // State Lọc
  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedProperties, setSelectedProperties] = useState<Record<string, string>>({});
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Get current category info for SEO
  const currentCategory = CATEGORIES.find((c: Category) => c.id === activeCategory);
  const categorySlug = currentCategory?.slug || '';
  const categorySEO = CATEGORY_SEO[categorySlug as keyof typeof CATEGORY_SEO];

  useEffect(() => {
    if (categoryId) {
      setActiveCategory(categoryId);
      setVisibleCount(10);
    } else if (lstProducts.length > 0) {
      const firstItem = lstProducts[0];
      const match = CATEGORIES.find((c: Category) => firstItem.categories?.includes(c.id));
      if (match) {
        setActiveCategory(match.id);
      }
    }
    
    // Nhận filter từ router state chuyển sang từ Mega Menu hoặc Slider
    const routerState = location.state as { selectedFilters?: Record<string, string>; selectedBrand?: string } | null;
    setSelectedBrand(routerState?.selectedBrand || 'ALL');
    setSelectedPriceRange('ALL');
    setSelectedStatus('ALL');
    setSelectedProperties(routerState?.selectedFilters || {});
  }, [title, categoryId, lstProducts, location.state]);

  // Trích xuất thương hiệu duy nhất cho toàn bộ sản phẩm
  const brands = useMemo(() => {
     const allBrands = lstProducts.map((p: Product) => {
        if (p.author && p.author !== 'Tấn Lụa' && p.author !== 'Admin' && p.author !== 'Tấn Lụa Admin') return p.author;
        if (p.name.toUpperCase().includes("TJ35")) return "TOJIKO";
        const bList = ["HUKAN", "OSHIMA", "GREEKMAN", "MITSUKAISHO", "NAKAWA", "TALU", "HANKOCK", "ROMANO", "ANOVI", "TOJIKO", "DRAGON", "TAL", "CALI", "MULINSEN", "KMX"];
        for (const b of bList) {
           if (p.name.toUpperCase().includes(b)) return b;
        }
        return "Khác";
     });
     return ['ALL', ...Array.from(new Set(allBrands))];
  }, [lstProducts]);

  // Trích xuất các thuộc tính lọc động dựa trên Category hiện tại (Properties)
  const propertyFiltersConfig = useMemo(() => {
    interface FilterConfig {
      key: string;
      label: string;
      options: string[];
    }
    
    const configs: FilterConfig[] = [];
    
    if (activeCategory === 6) { // CATEGORY_ID.MAY_CAT_CO = 6
      configs.push({
        key: "engineType",
        label: "Động cơ",
        options: ["2 thì", "4 thì"]
      });
      configs.push({
        key: "fuelType",
        label: "Nhiên liệu",
        options: ["Xăng pha nhớt", "Xăng riêng nhớt riêng"]
      });
    } else if (activeCategory === 3) { // CATEGORY_ID.THIET_BI_XIT_RUA = 3
      configs.push({
        key: "pistonType",
        label: "Loại piston (Ty)",
        options: ["Ty sứ", "Ty inox"]
      });
      configs.push({
        key: "pistonSize",
        label: "Xilanh (Đường kính)",
        options: ["22mm", "30mm"]
      });
    } else if (activeCategory === 10) { // CATEGORY_ID.DUNG_CU_CAM_TAY = 10
      configs.push({
        key: "toolType",
        label: "Loại máy",
        options: ["Máy khoan", "Máy hàn", "Siết bulong / Chuyên vít", "Máy mài / Cắt", "Máy thổi", "Phụ kiện / Pin sạc"]
      });
      configs.push({
        key: "powerSource",
        label: "Nguồn năng lượng",
        options: ["Dùng pin", "Dùng điện 220V"]
      });
    } else if (activeCategory === 9) { // CATEGORY_ID.MAY_NEN_KHI = 9
      configs.push({
        key: "compressorType",
        label: "Kiểu động cơ",
        options: ["Không dầu", "Có dầu"]
      });
      configs.push({
        key: "tankCapacity",
        label: "Dung tích bình",
        options: ["12L", "30L"]
      });
    } else if (activeCategory === 7) { // CATEGORY_ID.MAY_XOI_DAT = 7
      configs.push({
        key: "engineType",
        label: "Động cơ",
        options: ["Chạy xăng", "Chạy dầu"]
      });
      configs.push({
        key: "tillerType",
        label: "Kiểu máy",
        options: ["Máy xới đa năng", "Máy xới mini"]
      });
    } else if (activeCategory === 8) { // CATEGORY_ID.MAY_BOM_NUOC = 8
      configs.push({
        key: "pumpType",
        label: "Loại bơm",
        options: ["Bơm tăng áp", "Bơm chìm", "Bơm đẩy cao"]
      });
      configs.push({
        key: "powerSource",
        label: "Điện áp / Nguồn",
        options: ["220V", "Dùng pin"]
      });
    }

    return configs.map(config => ({
      ...config,
      options: ['ALL', ...config.options]
    }));
  }, [activeCategory]);

  // Lọc sản phẩm
  const filteredData = useMemo(() => {
    let result = lstProducts.filter((item: Product) => item.categories?.includes(activeCategory));

    // Lọc theo thương hiệu
    if (selectedBrand !== 'ALL') {
       result = result.filter((p: Product) => {
          const pBrand = (p.author && p.author !== 'Tấn Lụa' && p.author !== 'Admin' && p.author !== 'Tấn Lụa Admin') ? p.author : null;
          if (pBrand) return pBrand === selectedBrand;
          if (p.name.toUpperCase().includes("TJ35")) return "TOJIKO" === selectedBrand;
          
          const bList = ["HUKAN", "OSHIMA", "GREEKMAN", "MITSUKAISHO", "NAKAWA", "TALU", "HANKOCK", "ROMANO", "ANOVI", "TOJIKO", "DRAGON", "TAL", "CALI", "MULINSEN", "KMX"];
          for (const b of bList) {
             if (p.name.toUpperCase().includes(b)) return b === selectedBrand;
          }
          return selectedBrand === 'Khác';
       });
    }

    // Lọc theo khoảng giá
    if (selectedPriceRange !== 'ALL') {
      result = result.filter((p: Product) => {
        const priceNum = parseInt(p.price.replace(/\D/g, '')) || 0;
        if (selectedPriceRange === 'UNDER_1M') return priceNum < 1000000;
        if (selectedPriceRange === '1M_3M') return priceNum >= 1000000 && priceNum <= 3000000;
        if (selectedPriceRange === 'OVER_3M') return priceNum > 3000000;
        return true;
      });
    }

    // Lọc theo trạng thái
    if (selectedStatus !== 'ALL') {
      result = result.filter((p: Product) => {
        if (selectedStatus === 'IN_STOCK') return !p.isSoldOut;
        if (selectedStatus === 'LIQUIDATED') return p.categories?.includes(99);
        if (selectedStatus === 'PROMOTION') return !!p.oldPrice;
        return true;
      });
    }

    // Lọc theo các thuộc tính động (Properties)
    if (propertyFiltersConfig.length > 0) {
      Object.entries(selectedProperties).forEach(([key, val]) => {
        if (val && val !== 'ALL') {
          result = result.filter((p: Product) => {
            const text = `${p.name} ${p.description || ''}`.toLowerCase();
            if (key === "engineType") {
              if (val === "Chạy xăng") return text.includes("xăng") || text.includes("xdx");
              if (val === "Chạy dầu") return text.includes("dầu") || text.includes("173") || text.includes("178") || text.includes("186");
              return text.includes(val.toLowerCase());
            }
            if (key === "pistonType") {
              return text.includes(val.toLowerCase());
            }
            if (key === "toolType") {
              if (val === "Máy khoan") return text.includes("khoan");
              if (val === "Máy hàn") return text.includes("máy hàn") || text.includes("hàn");
              if (val === "Siết bulong / Chuyên vít") return text.includes("siết bu lông") || text.includes("chuyên vít") || text.includes("bulong") || text.includes("vít") || text.includes("bắt vít");
              if (val === "Máy mài / Cắt") return text.includes("mài") || text.includes("cắt");
              if (val === "Máy thổi") return text.includes("thổi");
              if (val === "Phụ kiện / Pin sạc") return text.includes("pin") || text.includes("sạc") || text.includes("phụ kiện") || text.includes("lam cưa") || text.includes("bắt cỏ") || text.includes("đầu chuyển");
              return text.includes(val.toLowerCase());
            }
            if (key === "powerSource") {
              if (val === "Dùng pin") return text.includes("pin");
              if (val === "Dùng điện 220V") return text.includes("220v") || text.includes("điện") || text.includes("w") || text.includes("vữa");
            }
            if (key === "compressorType") {
              return text.includes(val.toLowerCase());
            }
            if (key === "tankCapacity") {
              return text.includes(val.toLowerCase());
            }
            if (key === "fuelType") {
              if (val === "Xăng pha nhớt") return text.includes("pha nhớt") || text.includes("2 thì") || text.includes("xăng");
              if (val === "Xăng riêng nhớt riêng") return text.includes("xăng riêng") || text.includes("4 thì");
            }
            if (key === "pistonSize") {
              return text.includes(val.toLowerCase());
            }
            if (key === "tillerType") {
              if (val === "Máy xới đa năng") return text.includes("173") || text.includes("178") || text.includes("dầu") || text.includes("đa năng");
              if (val === "Máy xới mini") return text.includes("mini") || text.includes("xăng") || !text.includes("dầu");
              return text.includes(val.toLowerCase());
            }
            if (key === "pumpType") {
              if (val === "Bơm tăng áp") return text.includes("tăng áp") || text.includes("mini");
              if (val === "Bơm chìm") return text.includes("chìm") || text.includes("tõm") || text.includes("hỏa tiễn");
              if (val === "Bơm đẩy cao") return text.includes("đẩy cao") || text.includes("ly tâm");
              return text.includes(val.toLowerCase());
            }
            return text.includes(val.toLowerCase());
          });
        }
      });
    }

    return result;
  }, [lstProducts, activeCategory, selectedBrand, selectedPriceRange, selectedStatus, selectedProperties, propertyFiltersConfig]);

  const dataToDisplay = filteredData;
  const visibleData = dataToDisplay.slice(0, visibleCount);

  return (
    <div className="w-full mx-auto mb-8">
      {/* SEO for Category Pages */}
      {categoryId && categorySEO && (
        <SEO
          title={categorySEO.title}
          description={categorySEO.description}
          keywords={categorySEO.keywords}
          url={`https://${HOST}/${categorySlug}`}
          image={currentCategory?.img}
        />
      )}

      <style>{`
        @keyframes fire {
          0% { text-shadow: 0 0 2px #fff, 0 -1px 2px #ffeb3b, 0 -2px 4px #ff5722; }
          50% { text-shadow: 0 0 2px #fff, 0 -2px 4px #ffeb3b, 0 -3px 6px #ff5722; }
          100% { text-shadow: 0 0 2px #fff, 0 -1px 2px #ffeb3b, 0 -2px 4px #ff5722; }
        }
        .fire-text {
          color: #f5222d;
          font-weight: 800;
          font-size: 14px;
          animation: fire 0.3s ease-in-out infinite alternate;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          display: block;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(203, 43, 43, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(203, 43, 43, 0.5);
        }
        .custom-scrollbar {
          -ms-overflow-style: auto;
          scrollbar-width: thin;
        }
        @keyframes click-bounce {
          0% { transform: scale(1); }
          40% { transform: scale(0.75); }
          100% { transform: scale(1); }
        }
        .btn-adding {
          animation: click-bounce 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          background-color: #52c41a !important;
          border-color: #52c41a !important;
        }
      `}</style>
      {/* Header with Title & Filter Button on Mobile */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-base md:text-xl font-bold text-left ${title.includes('THANH LÝ') ? 'fire-text !text-2xl uppercase' : ''}`}>
          {title}
        </h2>
        {/* Nút lọc hiển thị trên Mobile */}
        <Button
          type="default"
          icon={<FilterOutlined />}
          onClick={() => setFilterDrawerOpen(true)}
          className="md:hidden flex items-center gap-1 rounded-full border-gray-300 text-xs"
        >
          Lọc
        </Button>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 custom-scrollbar">
         {CATEGORIES.map((category: Category) => (
            <Button
               key={category.id}
               type={activeCategory === category.id ? 'primary' : 'default'}
               danger={activeCategory === category.id}
               shape="round"
               onClick={() => {
                  setActiveCategory(category.id);
                  setVisibleCount(10);
               }}
               className="whitespace-nowrap text-xs md:text-sm"
            >
               {category.name}
            </Button>
         ))}
      </div>

      {/* Bộ lọc nhanh trên Desktop (PC) */}
      <div className="hidden md:flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900/40 rounded-xl border border-gray-100/80 dark:border-gray-800/30 shadow-sm shadow-gray-100/40 dark:shadow-none text-left">
         <span className="font-semibold text-gray-500 dark:text-gray-400 text-sm">Bộ lọc nhanh:</span>
         
         {/* Lọc Thương hiệu */}
         <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Thương hiệu:</span>
            <Select
               value={selectedBrand}
               onChange={(val) => setSelectedBrand(val)}
               style={{ width: 140 }}
               className="text-xs"
               options={brands.map((b: string) => ({ value: b, label: b === 'ALL' ? 'Tất cả' : b }))}
            />
         </div>

         {/* Lọc Giá */}
         <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Khoảng giá:</span>
            <Select
               value={selectedPriceRange}
               onChange={(val) => setSelectedPriceRange(val)}
               style={{ width: 160 }}
               options={[
                  { value: 'ALL', label: 'Tất cả giá' },
                  { value: 'UNDER_1M', label: 'Dưới 1,000,000₫' },
                  { value: '1M_3M', label: '1,000,000₫ - 3,000,000₫' },
                  { value: 'OVER_3M', label: 'Trên 3,000,000₫' },
               ]}
            />
         </div>

         {/* Lọc Trạng thái */}
         <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Trạng thái:</span>
            <Select
               value={selectedStatus}
               onChange={(val) => setSelectedStatus(val)}
               style={{ width: 150 }}
               options={[
                  { value: 'ALL', label: 'Tất cả sản phẩm' },
                  { value: 'IN_STOCK', label: 'Còn hàng' },
                  { value: 'LIQUIDATED', label: 'Hàng xả kho' },
                  { value: 'PROMOTION', label: 'Đang khuyến mãi' },
               ]}
            />
         </div>

         {/* Lọc Thuộc tính động (Properties) */}
         {propertyFiltersConfig.map((filter) => (
            <div key={filter.key} className="flex items-center gap-2">
               <span className="text-xs text-gray-400">{filter.label}:</span>
               <Select
                  value={selectedProperties[filter.key] || 'ALL'}
                  onChange={(val) => setSelectedProperties(prev => ({ ...prev, [filter.key]: val }))}
                  style={{ width: 140 }}
                  className="text-xs"
                  options={filter.options.map((opt: string) => ({
                     value: opt,
                     label: opt === 'ALL' ? 'Tất cả' : opt
                  }))}
               />
            </div>
         ))}

         {/* Reset button nếu có lọc */}
         {(selectedBrand !== 'ALL' || selectedPriceRange !== 'ALL' || selectedStatus !== 'ALL' || Object.values(selectedProperties).some(v => v !== 'ALL')) && (
            <Button
               type="text"
               danger
               onClick={() => {
                  setSelectedBrand('ALL');
                  setSelectedPriceRange('ALL');
                  setSelectedStatus('ALL');
                  setSelectedProperties({});
               }}
               className="text-xs font-semibold"
            >
               Xoá bộ lọc
            </Button>
         )}
      </div>

      {/* Drawer Bộ lọc trên Mobile (Mobile App style) */}
      <Drawer
         title={<span className="font-bold">Bộ lọc sản phẩm</span>}
         placement="right"
         onClose={() => setFilterDrawerOpen(false)}
         open={filterDrawerOpen}
         width={280}
         styles={{ body: { padding: '20px' } }}
         extra={
            <Button
               type="text"
               danger
               onClick={() => {
                  setSelectedBrand('ALL');
                  setSelectedPriceRange('ALL');
                  setSelectedStatus('ALL');
                  setSelectedProperties({});
                  setFilterDrawerOpen(false);
               }}
               className="text-xs font-semibold"
            >
               Reset
            </Button>
         }
      >
         <div className="space-y-6 text-left">
            {/* Lọc Thương hiệu */}
            <div>
               <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-sm">Thương hiệu</h4>
               <Radio.Group
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="flex flex-col gap-2"
               >
                  {brands.map((b: string) => (
                     <Radio key={b} value={b} className="text-xs">
                        {b === 'ALL' ? 'Tất cả thương hiệu' : b}
                     </Radio>
                  ))}
               </Radio.Group>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            {/* Lọc Giá */}
            <div>
               <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-sm">Khoảng giá</h4>
               <Radio.Group
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="flex flex-col gap-2"
               >
                  <Radio value="ALL" className="text-xs">Tất cả giá</Radio>
                  <Radio value="UNDER_1M" className="text-xs">Dưới 1,000,000₫</Radio>
                  <Radio value="1M_3M" className="text-xs">1,000,000₫ - 3,000,000₫</Radio>
                  <Radio value="OVER_3M" className="text-xs">Trên 3,000,000₫</Radio>
               </Radio.Group>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            {/* Lọc Trạng thái */}
            <div>
               <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-sm">Trạng thái</h4>
               <Radio.Group
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="flex flex-col gap-2"
               >
                  <Radio value="ALL" className="text-xs">Tất cả sản phẩm</Radio>
                  <Radio value="IN_STOCK" className="text-xs">Còn hàng</Radio>
                  <Radio value="LIQUIDATED" className="text-xs">Hàng xả kho</Radio>
                  <Radio value="PROMOTION" className="text-xs">Đang khuyến mãi</Radio>
               </Radio.Group>
            </div>

             {/* Lọc Thuộc tính động (Properties) */}
             {propertyFiltersConfig.map((filter) => (
                <div key={filter.key}>
                   <Divider style={{ margin: '12px 0' }} />
                   <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-3 text-sm">
                      {filter.label}
                   </h4>
                   <Radio.Group
                      value={selectedProperties[filter.key] || 'ALL'}
                      onChange={(e) => setSelectedProperties(prev => ({ ...prev, [filter.key]: e.target.value }))}
                      className="flex flex-col gap-2"
                   >
                      {filter.options.map((opt: string) => (
                         <Radio key={opt} value={opt} className="text-xs">
                            {opt === 'ALL' ? 'Tất cả' : opt}
                         </Radio>
                      ))}
                   </Radio.Group>
                </div>
             ))}

            <Button
               type="primary"
               danger
               block
               onClick={() => setFilterDrawerOpen(false)}
               className="mt-6 h-10 font-bold rounded-lg"
            >
               ÁP DỤNG BỘ LỌC
            </Button>
         </div>
      </Drawer>

      {/* Product Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={10} />
      ) : dataToDisplay.length === 0 ? (
        <div className="py-10">
          <Empty description="Không tìm thấy sản phẩm" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {bannerImage && (
            <div className="col-span-2 h-full transition-transform duration-300 hover:scale-[1.02] shadow-sm hover:shadow">
              <img
                src={bannerImage}
                alt="Banner"
                className="w-full h-full object-cover rounded-lg shadow-sm"
                loading='lazy'
              />
            </div>
          )}
          {visibleData.map((product: Product) => {
            const flashProduct = isProductInFlashSale(product.id);
            const displayPrice = flashProduct ? flashProduct.flashPrice : product.price;
            const displayOldPrice = flashProduct ? (product.oldPrice || product.price) : product.oldPrice;

            return (
              <Card
                key={product.id}
                hoverable
                className="relative overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-sm hover:shadow border-gray-150 dark:border-gray-850"
                onClick={() => navigate(`/product/${product.id}`)}
                cover={
                  <div className={`relative h-48 flex items-center justify-center ${flashProduct ? 'bg-gradient-to-br from-red-50 to-orange-50' : 'bg-gradient-to-br from-green-100 to-green-50'}`}>
                    {/* Flash Sale Badge */}
                    {flashProduct && (
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 flex items-center gap-1 animate-pulse">
                        <ThunderboltOutlined /> FLASH SALE
                      </div>
                    )}

                    {/* Liquidated Badge */}
                    {(activeCategory === 99 || product.categories?.includes(99)) && (
                      <div
                        className={`absolute left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 animate-pulse ${flashProduct ? 'top-[26px]' : 'top-0'}`}
                      >
                        XẢ KHO
                      </div>
                    )}

                    {/* Discount Badge */}
                    {product.discount && !flashProduct && (
                      <Badge.Ribbon
                        text={<span className={parseInt(product.discount.replace(/\D/g, '')) >= 40 ? "fire-text text-sm scale-125" : "fire-text"}>{product.discount}</span>}
                        color="transparent"
                        className="text-xs font-bold"
                      />
                    )}

                    {/* Sold Out Overlay */}
                    {product.isSoldOut && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 transition-all duration-300">
                        <div className="bg-red-600 text-white font-bold px-3 py-1.5 rounded border-2 border-white shadow-xl transform -rotate-12 scale-110 tracking-wider">
                          HẾT HÀNG
                        </div>
                      </div>
                    )}

                    {/* Product Image Placeholder */}
                    {product.images?.[0] ? (
                      <img src={product.images[0]} alt={product.name} className={`w-full h-full object-cover ${product.isSoldOut ? 'grayscale transition-all duration-500' : ''}`} loading='lazy' />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-300">
                        <SearchOutlined style={{ fontSize: '32px' }} />
                      </div>
                    )}

                    {/* Watermark */}
                    <div className="absolute bottom-2 left-2 text-xs text-gray-400 font-mono">
                      {product.url}
                    </div>
                  </div>
                }
                bodyStyle={{ padding: '12px' }}
              >
                {/* Product Info */}
                <div className="space-y-2">
                  <Tooltip title={product.name}>
                    <h3 className="text-sm font-medium line-clamp-2 h-10 cursor-help">{product.name}</h3>
                  </Tooltip>

                  {/* Price Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className={`font-bold text-base ${flashProduct ? 'text-red-600' : 'text-red-500'}`}>
                        {flashProduct && <ThunderboltOutlined className="mr-1" />}
                        {displayPrice}
                      </span>
                      {displayOldPrice && (
                        <span className="text-gray-400 line-through text-xs font-normal">{displayOldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {dataToDisplay.length > 10 && (
        <div className="text-center mt-8">
          {visibleCount < dataToDisplay.length ? (
            <Button
              type="default"
              size="large"
              shape="round"
              className="px-8"
              onClick={() => setVisibleCount(prev => prev + 10)}
            >
              Xem thêm sản phẩm
            </Button>
          ) : (
            <Button
              type="default"
              size="large"
              shape="round"
              className="px-8"
              onClick={() => setVisibleCount(10)}
            >
              Thu gọn
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
