import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Image } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { newsList } from '../NewsPage/constants';

const { Title, Paragraph } = Typography;

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const found = newsList.find((n) => n.id === id);
      if (found) setNewsItem(found);
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!newsItem) return <div className="p-20 text-center text-lg">Không tìm thấy bài viết!</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 text-left font-sans">
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className="mb-6 border-none shadow-none pl-0 hover:text-red-600 text-gray-500"
      >
        Quay lại danh sách
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Title level={2} className="!mb-4">{newsItem.title}</Title>
          <div className="flex items-center gap-4 text-gray-500 mb-6 text-sm border-b pb-4">
            <span className="flex items-center gap-1"><UserOutlined /> {newsItem.author}</span>
            <span className="flex items-center gap-1"><CalendarOutlined /> {newsItem.date}</span>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
            <Image src={newsItem.images[0]} alt={newsItem.title} className="w-full object-cover" />
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
            <Paragraph className="font-semibold text-gray-800">{newsItem.description}</Paragraph>
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          </div>
        </div>

        {/* Sidebar: Bài viết liên quan */}
        <div className="hidden lg:block">
          <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
            <Title level={5} className="!mb-4 uppercase tracking-wide border-b pb-2">Bài viết khác</Title>
            <div className="space-y-5">
              {newsList.filter(n => n.id !== newsItem.id).slice(0, 4).map(item => (
                <div key={item.id} className="flex gap-3 cursor-pointer group" onClick={() => navigate(`/news/${item.id}`)}>
                  <div className="w-20 h-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" loading='lazy' />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium group-hover:text-red-600 line-clamp-2 leading-snug">{item.title}</h4>
                    <span className="text-xs text-gray-400 mt-1 block">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
