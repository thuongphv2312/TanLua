import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { CATEGORIES } from "../NewsPage/constants";

export default function FeaturedCategories() {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(6);
  const maxIndex = Math.max(0, CATEGORIES.length - itemsPerView);

  useEffect(() => {
  if (maxIndex === 0) return;

  const timer = setInterval(() => {
    setIndex((prev) => {
      if (prev >= maxIndex) return 0; // quay lại đầu
      return prev + 1;
    });
  }, 3000);

  return () => clearInterval(timer);
}, [maxIndex]);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(3);
      else if (window.innerWidth < 1024) setItemsPerView(5);
      else setItemsPerView(8);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="relative w-full py-10">
      {/* Title */}
      <h2 className="text-xl font-bold mb-10 text-left">DANH MỤC NỔI BẬT</h2>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${index * (100 / itemsPerView)}%)`,
          }}
        >
          {CATEGORIES.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center cursor-pointer"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="xs:w-10 xs:h-10 sm:w-15 sm:h-15 md:w-25 md:h-25 rounded-full border-2 border-amber-500 flex items-center justify-center hover:scale-104 transition overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-fill"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-center">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prev Button – chỉ hiện mobile */}
      <button
        style={{ backgroundColor: 'transparent', padding: '10px', outline: 'none'}}
        onClick={prev}
        disabled={index === 0}
        className="
    flex lg:hidden
    absolute left-2 top-40 -translate-y-1/2 z-20
    disabled:opacity-30
  "
      >
        <LeftOutlined style={{ fontSize: '18px', color: 'red', display: 'flex' }}/>
      </button>

      {/* Next Button – chỉ hiện mobile */}
      <button
        style={{ backgroundColor: 'transparent', padding: '10px', outline: 'none' }}
        onClick={next}
        disabled={index >= maxIndex}
        className="
    flex lg:hidden
    absolute right-2 top-40 -translate-y-1/2 z-20
    disabled:opacity-30
  "
      >
        <RightOutlined style={{ fontSize: '18px', color: 'red', display: 'flex'}}/>
      </button>
    </div>
  );
}
