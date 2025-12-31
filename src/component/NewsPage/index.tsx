import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Pagination, Divider, List } from 'antd';
import { HomeOutlined, RightOutlined } from '@ant-design/icons';
import { CATEGORIES, newsList } from './constants';
import { filterByCategory } from './utils';

// --- Sub-Component: Thẻ bài viết ---
const NewsCard = ({ images, title, author, date, description, onClick }: any) => (
  <div className="flex flex-col group cursor-pointer" onClick={onClick}>
    <div className="overflow-hidden rounded-md mb-3 aspect-[4/3]">
      <img
        src={images?.[0]}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h3 className="text-[15px] font-bold leading-tight mb-2 line-clamp-2 group-hover:text-red-600">
      {title}
    </h3>
    <div className="text-gray-400 text-[11px] mb-2">
      <span>{author}</span> <span className="mx-1">-</span> <span>{date}</span>
    </div>
    <p className="text-gray-600 text-sm line-clamp-3 mb-2">
      {description}
    </p>
    <a className="text-red-500 text-xs font-semibold hover:underline">Đọc tiếp</a>
  </div>
);

// --- Component Chính ---
const NewsPage: React.FC = () => {

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filteredNews = filterByCategory(newsList, activeCategory);

  const PAGE_SIZE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const dataSource = filteredNews ?? newsList;

  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return dataSource.slice(startIndex, endIndex);
  }, [currentPage, dataSource]);

  const hanlderCategory = (cat: any) => {
    setActiveCategory(cat.id);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  return (
    <div className="w-full mx-auto font-sans">

      <h2 className="text-xl font-bold mb-5 text-left">TIN TỨC</h2>

      <div className="flex flex-col md:flex-row gap-10">

        {/* CỘT TRÁI (70%) - DANH SÁCH TIN */}
        <div className="w-full md:w-[75%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {paginatedNews.map((news) => (
              <NewsCard key={news.id} {...news} onClick={() => navigate(`/news/${news.id}`)} />
            ))}
          </div>

          {/* Pagination */}
          {dataSource.length > PAGE_SIZE && (
            <div className="mt-12 flex justify-center">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={dataSource.length}
                showSizeChanger={false}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </div>


        {/* CỘT PHẢI (25%) - SIDEBAR */}
        <div className="w-full md:w-[25%] space-y-10">

          {/* Danh mục tin tức */}
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 border-b pb-2">Danh mục tin tức</h2>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 4).map((cat, idx) => (
                <li onClick={() => hanlderCategory(cat)} key={idx} className="flex justify-between items-center text-sm text-gray-700 hover:text-red-600 cursor-pointer py-1">
                  {cat.name}
                  {/* {idx < 4 && <RightOutlined className="text-[10px]" />} */}
                </li>
              ))}
            </ul>
          </div>

          {/* Tin nổi bật */}
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase mb-4 border-b pb-2">Tin nổi bật</h2>
            <div className="space-y-4">
              {newsList.slice(0, 4).map((news, idx) => (
                <div key={idx} className="flex gap-3 items-start group cursor-pointer" onClick={() => navigate(`/news/${news.id}`)}>
                  <img src={news.images[0]} className="w-16 h-16 object-cover rounded shadow-sm" alt="" />
                  <h4 className="text-left text-[13px] font-semibold leading-snug group-hover:text-red-600 line-clamp-3">
                    {news.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsPage;
