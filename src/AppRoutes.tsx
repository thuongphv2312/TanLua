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
        <Slider />
        <FeaturedCategories />
        <Products
          title='MÁY NÔNG NGHIỆP'
          lstProducts={newsList.filter(item => item.categories.includes(1)) as any}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={1}
        />
        <Products
          title='MÁY CÔNG NGHIỆP'
          lstProducts={newsList.filter(item => item.categories.includes(2)) as any}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={2}
        />
        <Products
          title='DỤNG CỤ CẦM TAY'
          bannerImage={banner}
          lstProducts={newsList.filter(item => item.categories.includes(10)) as any}
          cartCounts={cartCounts}
          onAddToCart={onUpdateCart}
          categoryId={10}
        />
        <NewsPage />
        <AboutSection />
      </>} />
      <Route path={ROUTE_MAP['NEWS']} element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsDetailPage />} />
      <Route path="/tro-thanh-doi-tac" element={<PartnerPage />} />
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
            lstProducts={newsList.filter(item => item.categories.includes(category.id)) as any}
            cartCounts={cartCounts}
            onAddToCart={onUpdateCart}
            categoryId={category.id}
          />} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
