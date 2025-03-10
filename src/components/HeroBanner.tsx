import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BannerItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
}

const bannerItems: BannerItem[] = [
  {
    id: 1,
    title: '高质量邮箱账户',
    description: '提供各类优质邮箱账户，安全可靠，价格合理',
    buttonText: '立即购买',
    buttonLink: '/categories/email',
    bgColor: 'bg-blue-500',
  },
  {
    id: 2,
    title: '热门社交媒体账户',
    description: '获取Instagram、Twitter等热门社交媒体账户',
    buttonText: '查看详情',
    buttonLink: '/categories/social',
    bgColor: 'bg-purple-500',
  },
  {
    id: 3,
    title: '流媒体账户特惠',
    description: '限时特惠，各类流媒体账户低至7折',
    buttonText: '抢购优惠',
    buttonLink: '/categories/streaming',
    bgColor: 'bg-red-500',
  },
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      {bannerItems.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } ${item.bgColor}`}
        >
          <div className="container-custom text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">{item.description}</p>
            <Link href={item.buttonLink} className="btn bg-white text-dark hover:bg-gray-100">
              {item.buttonText}
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {bannerItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner; 