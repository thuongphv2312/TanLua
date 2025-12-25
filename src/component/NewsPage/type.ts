export interface NewsItem {
  id: number;
  title: string;
  author: string;
  date: string;
  description: string;
  images: string[];
  categories: number[];
  name?: string;
  price?: string;
  oldPrice?: string;
  discount?: string;
  url?: string;
}
