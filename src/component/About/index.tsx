import { useState, useRef } from 'react';
import { PhoneOutlined, HomeOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import banner from '../../assets/banner-tanlua_2048x2048.png';
import { EMAIL, HOTLINE, COMPANY_NAME, ADDRESS, HOST } from '../NewsPage/constants';

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="about-section" className="w-full mx-auto" ref={containerRef}>
      {/* Header */}
      <h2 className="text-xl font-bold mb-5 mt-10 text-left">GIỚI THIỆU</h2>

      {/* Company Info */}
      <div className="mb-4 text-left">
        <h2 className="text-base font-bold mb-3 uppercase">
          {COMPANY_NAME}
        </h2>

        {/* Locations - compact format */}
        <div className="space-y-2 text-md leading-relaxed">
          <div>
            <HomeOutlined className="text-red-600 mr-1" />
            <span className="font-semibold">Địa chỉ:</span> {ADDRESS}
            <br />
            <span className="">
              <PhoneOutlined className="mr-1" />
              Điện thoại: {HOTLINE}  Thời gian phục vụ: Từ 8h - 18h30 hàng ngày
            </span>
          </div>

          {/* <div>
            <HomeOutlined className="text-red-600 mr-1" />
            <span className="font-semibold">Địa chỉ Tại Quận Tân Phú, Tp.Hồ Chí Minh:</span> 539/47C Lũy Bán Bích, Phường Phú Thạnh, Quận Tân Phú, Tp. Hồ Chí Minh
            <br />
            <span className="">
              <PhoneOutlined className="mr-1" />
              Điện thoại: 028.3606.0006  Thời gian phục vụ: Từ 8h - 20h hàng ngày
            </span>
          </div>

          <div>
            <HomeOutlined className="text-red-600 mr-1" />
            <span className="font-semibold">Địa chỉ Tại Quận Bình Tân, Tp. Hồ Chí Minh:</span> 98 Đường 5A, Phường Bình Hưng Hòa A, Quận Bình Tân, Tp. Hồ Chí Minh
            <br />
            <span className="">
              <PhoneOutlined className="mr-1" />
              Điện thoại: 028.3973.7777  Thời gian phục vụ: Từ 8h - 20h hàng ngày
            </span>
          </div> */}
        </div>

        {/* Contact Info */}
        <div className="mt-2 text-md">
          <span>+) Email: <a href={`mailto:${EMAIL}`} className="text-blue-600">{EMAIL}</a></span>
          <span className="ml-3">+) Website: <a href="http://www.tanlua.com.vn" className="text-blue-600">{HOST}</a></span>
        </div>
      </div>

      <div className="flex overflow-hidden transition">
        <div className="relative h-[190px] w-full"> {/* Khóa chiều cao cố định */}
          <img
            src={banner}
            // alt={img.title}
            className="w-full h-full object-fill"
            loading='lazy'
          />
        </div>
      </div>

      {/* Expanded Content */}
      <div className={`relative ${isExpanded ? '' : 'max-h-[200px] overflow-hidden'}`}>
        <div className="text-md leading-relaxed space-y-3 text-left">
          <p>
            <strong>{COMPANY_NAME}</strong> là công ty hàng đầu cả nước về cung cấp những sản phẩm chính hãng như các loại máy chuyên dụng, nông cụ, công cụ, các sản phẩm điện cơ, điện lực. Chúng tôi tự hào là đơn vị tin cậy hàng đầu của nhiều gia đình và doanh nghiệp tại Việt Nam.
          </p>

          <p>
            Hệ thống sản xuất tập trung được công nghệ mới, cùng với công tác kiểm soát chất lượng nghiêm ngặt tại từng công đoạn sản xuất đã cho ra những sản phẩm có chất lượng ổn định và bền vững. Về sản phẩm dễ sử dụng, phạm vi ứng dụng đa dạng, sản phẩm nhiều loại, có tính cạnh tranh cao về giá cả trên thị trường. Về hình thức bên ngoài đẹp, cấu tạo chặt chẽ khoa học với tính hợp lý, thiết kế kín có bộ làm mát cao cấp và giảm được tiếng ồn. Điều đó làm cho hiệu quả công tác tăng nhiều với cường độ lao động thấp hơn đồng thời tăng khả năng ứng dụng công nghệ, mỗi việc, cuối cùng sản phẩm đã được sự chấp nhận đáng giá của người tiêu dùng. Những ưu điểm hữu ích trên mà chúng tôi đã tạo ra là rất hài lòng với chất lượng của {COMPANY_NAME}.
          </p>

          <p className="font-semibold">Tầm nhìn và sứ mệnh:</p>
          <p>Trở thành nhà cung cấp hàng đầu về máy móc và thiết bị chuyên dụng tại Việt Nam.</p>

          <p className="font-semibold uppercase">Mục tiêu chiến lược</p>
          <div className="space-y-3 mt-3">
            <div>
              <p className="font-semibold">Khách hàng là trọng tâm:</p>
              <p>Không ngừng nâng cao chất lượng dịch vụ để tri ân và mang lại giá trị bền vững cho các nhà đầu tư, đối tác.</p>
            </div>

            <div>
              <p className="font-semibold">Sáng tạo sản phẩm:</p>
              <p>Tập trung nghiên cứu và cải tiến kỹ thuật nhằm cung ứng các sản phẩm hoàn thiện, đạt tiêu chuẩn chất lượng cao và khắc phục mọi nhược điểm thị trường.</p>
            </div>

            <div>
              <p className="font-semibold">Mở rộng quy mô:</p>
              <p>Phát triển mạng lưới cửa hàng và hệ thống phân phối rộng khắp; chuẩn hóa quy trình ký kết để sẵn sàng hội nhập và phản hồi nhanh chóng nhu cầu thị trường.</p>
            </div>

            <div>
              <p className="font-semibold">Phát triển nhân lực:</p>
              <p>Xây dựng môi trường làm việc chuyên nghiệp, hỗ trợ tối đa đội ngũ nhân sự và sẵn sàng đồng hành cùng sự phát triển của từng cá nhân.</p>
            </div>

            <div>
              <p className="font-semibold">Lợi thế cạnh tranh:</p>
              <p>Tối ưu hóa mô hình vận hành và các dịch vụ hậu mãi để tạo ra sự khác biệt và hiệu quả kinh tế vượt trội.</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-300">
            <p className="font-semibold mb-2">Chương trình ưu đãi trong tháng:</p>
            <div className="grid grid-cols-2 gap-2 text-md">
              <div>⚡ Giảm giá đến 15% cho máy hàn điện Oshima</div>
              <div>⚡ Giảm giá đến 15% cho máy cắt cỏ Oshima</div>
              <div>⚡ Giảm giá đến 10% cho máy cưa xích Oshima</div>
              <div>⚡ Giảm giá đến 10% cho máy bơm nước Oshima</div>
              <div>⚡ Giảm giá đến 10% cho máy xịt áp lực Oshima</div>
              <div>⚡ Giảm 50 cái cho máy cắt cỏ Oshima</div>
              <div>⚡ Tặng kèm cày công nghiệp trị giá 5.000.000đ</div>
              <div>⚡ Tặng lưỡi cưa</div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Button
              type="primary"
              danger
              shape="round"
              size="middle"
              onClick={() => {
                setIsExpanded(false);
                containerRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Thu gọn giới thiệu <UpOutlined />
            </Button>
          </div>
        </div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-50 via-white/60 to-transparent flex items-end justify-center pb-4">
            <Button
              type="primary"
              danger
              shape="round"
              size="middle"
              className="px-6 shadow-lg"
              onClick={() => setIsExpanded(true)}
            >
              Xem toàn bộ Giới thiệu <DownOutlined />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
