export interface NewsItem {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  images: string[];
  categories: number[];
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  url: string;
  content?: string;
}
