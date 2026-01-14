import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { CATEGORIES } from "../NewsPage/constants";

// Import Swiper styles
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';

export default function FeaturedCategories() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full py-12 select-none overflow-hidden group/slider">
      <style>{`
        .categories-swiper {
          padding-bottom: 50px !important;
          padding-top: 10px !important;
        }
        .categories-swiper .swiper-pagination-bullet {
          background: #f59e0b;
          opacity: 0.3;
        }
        .categories-swiper .swiper-pagination-bullet-active {
          background: #ef4444;
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }
        
        /* Custom Navigation Buttons */
        .nav-btn {
          position: absolute;
          top: 45%;
          transform: translateY(-50%);
          z-index: 50;
          cursor: pointer;
          color: #ccc;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
        }
        .nav-btn:hover {
          color: #ef4444;
          transform: translateY(-50%) scale(1.2);
        }
        .nav-btn.swiper-button-disabled {
          opacity: 0;
          pointer-events: none;
        }
        .nav-prev { left: 0px; }
        .nav-next { right: 0px; }

        @media (max-width: 1024px) {
          .nav-btn {
            display: none !important;
          }
        }
        .category-item:hover .img-container {
          border-color: #ef4444;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
          transform: translateY(-8px);
        }
        .category-item:hover img {
          transform: scale(1.1);
        }
      `}</style>

      {/* Title */}
      <div className="flex items-center justify-between mb-8 px-2 uppercase">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-3">
          <span className="w-2 h-8 bg-red-600 rounded-full"></span>
          DANH MỤC NỔI BẬT
        </h2>
      </div>

      <div className="relative px-2">
        {/* Custom Navigation Icons */}
        <div className="nav-btn nav-prev custom-prev">
          <LeftOutlined style={{ fontSize: '18px' }} />
        </div>
        <div className="nav-btn nav-next custom-next">
          <RightOutlined style={{ fontSize: '18px' }} />
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 8,
              spaceBetween: 30,
            },
          }}
          className="categories-swiper"
        >
          {CATEGORIES.map((item, i) => (
            <SwiperSlide key={i}>
              <div
                className="category-item group flex flex-col items-center cursor-pointer transition-all duration-300"
                onClick={() => navigate(`/${item.slug}`)}
              >
                <div className="img-container relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 rounded-full border-2 border-orange-200 dark:border-gray-700 flex items-center justify-center transition-all duration-500 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <p className="mt-4 text-[13px] md:text-sm font-bold text-center text-gray-700 dark:text-gray-300 group-hover:text-red-600 transition-colors line-clamp-2 px-1">
                  {item.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
