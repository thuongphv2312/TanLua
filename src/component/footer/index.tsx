import React, { useState } from 'react';
import { Modal, Divider, Input, Button } from 'antd'; // Giữ lại AntD Component phức tạp nếu cần, hoặc thay Input bằng HTML thường
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  FacebookFilled,
  InstagramOutlined,
} from '@ant-design/icons';
import { HOTLINE, ADDRESS, EMAIL, COMPANY_NAME } from '../NewsPage/constants';
import GoogleMap from '../GoogleMap';

const AppFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const LinkItem = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: React.MouseEventHandler }) => (
    <a
      href={href}
      onClick={onClick}
      className="block mb-2 text-gray-600 text-sm hover:text-red-600 transition-colors duration-200"
    >
      {children}
    </a>
  );

  return (
    <footer className="bg-gray-100 pt-16 pb-8 px-5 md:px-10 lg:px-24 font-sans border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* CỘT 1: VỀ CHÚNG TÔI */}
        <div className="flex flex-col items-start text-left">
          <h4 className="text-lg font-bold mb-5 text-gray-800 uppercase">Về chúng tôi</h4>
          <div className="mb-5 w-full">
            <img
              src="https://i.ibb.co/YF9VJFMg/logo.png/src/assets/logo.png"
              alt="Tấn Lụa Logo"
              className="max-w-[80%] mb-4 h-auto"
              loading='lazy'
            />
            <p className="text-sm font-semibold text-gray-700">
              Cung cấp sản phẩm chất lượng từ các thương hiệu hàng đầu.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600 w-full">
            <div className="flex items-start gap-3">
              <EnvironmentOutlined className="text-gray-800 mt-1 flex-shrink-0" />
              <span className="cursor-pointer hover:text-red-600 transition-colors" onClick={showModal}>
                <span className="font-semibold text-gray-800">Địa chỉ:</span> {ADDRESS}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneOutlined className="text-gray-800 flex-shrink-0" />
              <span>
                <span className="font-semibold text-gray-800">Số điện thoại:</span>{' '}
                <a href={`tel:${HOTLINE.replace(/\./g, '')}`} className="hover:text-red-600 transition-colors">
                  {HOTLINE}
                </a>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MailOutlined className="text-gray-800 flex-shrink-0" />
              <span>
                <span className="font-semibold text-gray-800">Email:</span>{' '}
                <a href={`mailto:${EMAIL}`} className="hover:text-red-600 transition-colors">
                  {EMAIL}
                </a>
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <FacebookFilled className="text-2xl text-[#3b5998] cursor-pointer hover:opacity-80 transition-opacity" />
            <div className="w-6 h-6 bg-[#0068ff] rounded text-white text-center font-bold text-xs flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              Z
            </div>
            <InstagramOutlined className="text-2xl text-[#e4405f] cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>

        {/* CỘT 2: CHÍNH SÁCH */}
        <div className="flex flex-col items-start text-left">
          <h4 className="text-lg font-bold mb-5 text-gray-800 uppercase">Chính sách</h4>
          <LinkItem
            href="#about-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('about-section');
            }}
          >
            Giới thiệu về công ty
          </LinkItem>
          <LinkItem href="/tuyen-dung">Cơ hội việc làm</LinkItem>
          <LinkItem href="/lien-he-quang-cao">Liên hệ quảng cáo</LinkItem>
          <LinkItem href="/tro-thanh-doi-tac">Hợp tác cùng công ty</LinkItem>
          <LinkItem href="#" onClick={(e) => { e.preventDefault(); showModal(); }}>Đường đến {COMPANY_NAME}</LinkItem>
        </div>

        {/* CỘT 3: HỖ TRỢ KHÁCH HÀNG */}
        <div className="flex flex-col items-start text-left">
          <h4 className="text-lg font-bold mb-5 text-gray-800 uppercase">Hỗ trợ khách hàng</h4>
          <LinkItem href="/chinh-sach-giao-hang">Chính sách giao hàng</LinkItem>
          <LinkItem href="/chinh-sach-bao-mat">Chính sách bảo mật</LinkItem>
          <LinkItem href="/chinh-sach-bao-hanh">Chính sách bảo hành</LinkItem>
          <LinkItem href="/chinh-sach-doi-tra-hang">Chính sách đổi trả hàng</LinkItem>
          <LinkItem href="/huong-dan-thanh-toan">Hướng dẫn thanh toán</LinkItem>
        </div>

        {/* CỘT 4: ĐĂNG KÝ NHẬN TIN & THANH TOÁN */}
        <div className="flex flex-col items-start text-left">
          <h4 className="text-lg font-bold mb-5 text-gray-800 uppercase">Đăng ký nhận tin</h4>
          <div style={{ display: 'flex', marginBottom: '30px', width: '100%' }}>
            <Input placeholder="Nhập địa chỉ email" style={{ borderRadius: '4px 0 0 4px', height: '40px' }} />
            <Button
              style={{
                backgroundColor: '#daca72',
                borderColor: '#daca72',
                color: '#000',
                borderRadius: '0 4px 4px 0',
                fontWeight: 'bold',
                height: '40px'
              }}
            >
              Đăng ký
            </Button>
          </div>

          <h4 className="text-lg font-bold mb-5 text-gray-800 uppercase">Phương thức thanh toán</h4>
          <div className="bg-white p-3 rounded-lg shadow-sm inline-block w-full sm:w-auto">
            <div className="flex gap-3 flex-wrap">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6 w-auto" loading='lazy' />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 w-auto" loading='lazy' />
              <img src="https://i.ibb.co/RTWJtVbF/images.png" alt="Momo" className="h-6 w-auto" loading='lazy' />
              <img src="https://media.loveitopcdn.com/3807/logo-zalopay1-compressed.jpg" alt="VNPay" className="h-6 w-auto" loading='lazy' />
            </div>
          </div>

          <div className="mt-6">
            <img
              src="https://i.ibb.co/pB4gs0Nz/logo-bct.png"
              alt="Đã thông báo bộ công thương"
              className="h-16 w-auto object-contain"
              loading='lazy'
            />
          </div>
        </div>
      </div>

      <Divider className="my-8 border-gray-300" />

      <div className="text-center text-gray-500 text-sm italic">
        © Bản quyền thuộc về {COMPANY_NAME}
      </div>

      <Modal
        title={<span className="text-lg font-bold">Địa chỉ công ty</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="font-sans"
      >
        <div className="mb-4 text-base">
          <p><strong className="font-semibold">Địa chỉ:</strong> {ADDRESS}</p>
        </div>
        <div className="w-full h-[450px]">
          <GoogleMap />
        </div>
      </Modal>
    </footer>
  );
};

export default AppFooter;
