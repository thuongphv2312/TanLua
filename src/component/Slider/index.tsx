import React from 'react';
// import type { CarouselProps } from 'antd';
import { Carousel } from 'antd';
import img1 from '../../assets/sliders/slider_1.jpg';
import img2 from '../../assets/sliders/slider_2.jpg';
import img3 from '../../assets/sliders/slider_3.jpg';
import img4 from '../../assets/sliders/right_banner_1.jpg';
import img5 from '../../assets/sliders/right_banner_2.jpg';

// type DotPlacement = CarouselProps['dotPlacement'];



const Slider: React.FC = () => {
  // const [dotPlacement] = useState<DotPlacement>('bottom');

  const sliderData = [
    { id: 1, src: img1, title: 'Khám phá thiên nhiên' },
    { id: 2, src: img2, title: 'Công nghệ mới 2025' },
    { id: 3, src: img3, title: 'Giải pháp tối ưu' },
  ];

  return (
    <div className="pt-3 pb-3 mx-auto">
      {/* Container chính: 2 cột tỉ lệ 7/3 */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* CỘT 1: Chiếm 80% (w-7/10 hoặc md:w-[70%]) */}
        <div className="w-full md:w-[80%] overflow-hidden rounded-lg shadow-lg cursor-pointer">
          <Carousel autoplay arrows speed={500} dotPlacement="bottom">
            {sliderData.map((img, index) => (
              <div key={index}>
                <div className="relative h-[400px]"> {/* Khóa chiều cao cố định */}
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-fill"
                    loading='lazy'
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* CỘT 2: Chiếm 20% và chia làm 2 hàng */}
        <div className="w-full md:w-[20%] flex flex-col gap-4">

          {/* Hàng 1 của cột 2 */}
          <div className="flex-1 bg-blue-50 rounded-lg border border-blue-100 shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition">
            <div className="relative h-[190px]"> {/* Khóa chiều cao cố định */}
              <img
                src={img4}
                // alt={img.title}
                className="w-full h-full object-fill"
                loading='lazy'
              />
            </div>
          </div>

          {/* Hàng 2 của cột 2 */}
          <div className="flex-1 bg-green-50 rounded-lg border border-green-100 shadow-sm overflow-hidden cursor-pointer hover:scale-105 transition">
            <div className="relative h-[190px]"> {/* Khóa chiều cao cố định */}
              <img
                src={img5}
                // alt={img.title}
                className="w-full h-full object-fill"
                loading='lazy'
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Slider;
