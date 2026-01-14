import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Slider from './component/Slider';
import FeaturedCategories from './component/FeaturedCategories';
import Products from './component/Products';
import NewsPage from './component/NewsPage';
import AboutSection from './component/About';
import CartPage from './component/CartPage';
import CheckoutPage from './component/CheckoutPage';
import SearchResults from './component/SearchResults';
import ProductDetailPage from './component/ProductDetailPage';
import { ROUTE_MAP } from './constants';
import { newsList, CATEGORIES } from './component/NewsPage/constants';
import banner from '../src/assets/section_hot.jpg';
import NewsDetailPage from './component/NewsPage/NewsDetailPage';
import PartnerPage from './component/Partner';
import CareersPage from './component/CareersPage';
import ShippingPolicyPage from './component/ShippingPolicyPage';
import PrivacyPolicyPage from './component/PrivacyPolicyPage';
import WarrantyPolicyPage from './component/WarrantyPolicyPage';
import ReturnPolicyPage from './component/ReturnPolicyPage';
import PaymentSupportPage from './component/PaymentSupportPage';
import SEO from './component/SEO';

interface AppRoutesProps {
  cartCounts: { [key: number]: number };
  onUpdateCart: (productId: number) => void;
  onDecreaseCart: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void;
  onClearCart: () => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({
  cartCounts,
  onUpdateCart,
  onDecreaseCart,
  onRemoveFromCart,
  onClearCart,
}) => {
  return (
    <Routes>
      <Route path="/" element={<>
        <SEO
          title="Tấn Lụa - Máy móc Công Nông nghiệp | Máy hàn, Máy cắt cỏ, Dụng cụ cầm tay chính hãng"
          description="Tấn Lụa (TanLua) - Chuyên phân phối máy móc công nông nghiệp chính hãng: Máy hàn, Máy cắt cỏ, Máy xới đất, Máy rửa xe, Máy khoan pin, Dụng cụ cầm tay. Giá tốt nhất - Bảo hành uy tín - Giao hàng toàn quốc."
          keywords="tanlua, tấn lụa, máy hàn, máy cắt cỏ, máy xới đất, máy rửa xe, máy khoan pin, dụng cụ cầm tay, máy nông nghiệp, máy công nghiệp, HUKAN, OSHIMA, GREEKMAN"
        />
        <Slider />
        <FeaturedCategories />
        <Products
          title='🔥 HÀNG THANH LÝ - XẢ KHO GIÁ SỐC'
          bannerImage="https://i.ibb.co/8DGkmWJG/z7429088691186-0fcc4934dd141cccd0b59a3718d2b50d.jpg"
          lstProducts={newsList}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={99}
        />
        <Products
          title='MÁY NÔNG NGHIỆP'
          lstProducts={newsList}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={1}
        />
        <Products
          title='MÁY CÔNG NGHIỆP'
          lstProducts={newsList}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={2}
        />
        <Products
          title='DỤNG CỤ CẦM TAY'
          bannerImage={banner}
          lstProducts={newsList}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={10}
        />
        <NewsPage />
        <AboutSection />
      </>} />
      <Route path={ROUTE_MAP['NEWS']} element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetailPage />} />
      <Route path="/tuyen-dung" element={<CareersPage />} />
      <Route path="/chinh-sach-giao-hang" element={<ShippingPolicyPage />} />
      <Route path="/chinh-sach-bao-mat" element={<PrivacyPolicyPage />} />
      <Route path="/chinh-sach-bao-hanh" element={<WarrantyPolicyPage />} />
      <Route path="/chinh-sach-doi-tra-hang" element={<ReturnPolicyPage />} />
      <Route path="/huong-dan-thanh-toan" element={<PaymentSupportPage />} />
      <Route path="/tro-thanh-doi-tac" element={<PartnerPage />} />
      <Route path="/lien-he-quang-cao" element={<PartnerPage />} />
      <Route path={ROUTE_MAP['CART']} element={
        <CartPage
          cartCounts={cartCounts}
          productList={newsList}
          onIncrease={onUpdateCart}
          onDecrease={onDecreaseCart}
          onRemove={onRemoveFromCart}
        />
      } />
      <Route path="/cart/checkout" element={
        <CheckoutPage
          cartCounts={cartCounts}
          productList={newsList}
          onClearCart={onClearCart}
        />
      } />
      <Route path={ROUTE_MAP['SEARCH']} element={
        <SearchResults
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
        />
      } />
      <Route path="/product/:id" element={
        <ProductDetailPage
          onAddToCart={onUpdateCart}
        />
      } />
      {CATEGORIES.map((category) => (
        <Route
          key={category.id}
          path={`/${category.slug}`}
          element={<Products
            title={category.name.toUpperCase()}
            lstProducts={newsList}
            cartCounts={cartCounts}
            onAddToCart={onUpdateCart}
            categoryId={category.id}
          />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
