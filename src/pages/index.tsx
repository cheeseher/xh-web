import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import AccountCard from '../components/AccountCard';
import CategoryIndex from '../components/CategoryIndex';
import { accounts, categories } from '../utils/mockData';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || '');
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 设置ref的回调函数
  const setCategoryRef = (id: string) => (el: HTMLDivElement | null) => {
    categoryRefs.current[id] = el;
  };

  // 滚动到指定分类
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const yOffset = -80; // 考虑导航栏的高度
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(categoryId);
    }
  };

  // 监听滚动事件，更新当前活动分类
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // 找到当前在视口中的分类
      let currentCategory = categories[0]?.id;
      for (const categoryId in categoryRefs.current) {
        const element = categoryRefs.current[categoryId];
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= 100 && bottom >= 100) {
            currentCategory = categoryId;
            break;
          }
        }
      }
      
      if (currentCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 标题样式
  const sectionTitleStyle = "text-lg font-medium text-gray-700 border-l-4 border-primary pl-3";

  return (
    <Layout>
      {/* 分类索引导航 */}
      <CategoryIndex onCategoryClick={scrollToCategory} activeCategory={activeCategory} />

      <div className="container-custom py-6">
        {/* 按分类展示账户 */}
        {categories.map((category) => {
          const categoryAccounts = accounts.filter(account => account.category === category.id);
          
          if (categoryAccounts.length === 0) return null;
          
          return (
            <section 
              key={category.id} 
              className={`py-6 ${categories.indexOf(category) % 2 === 0 ? '' : 'bg-gray-50'} rounded-lg mb-6`}
              ref={setCategoryRef(category.id)}
              id={`category-${category.id}`}
            >
              <div className="px-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className={sectionTitleStyle}>{category.name}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categoryAccounts.slice(0, 8).map((account) => (
                    <AccountCard
                      key={account.id}
                      id={account.id}
                      title={account.title}
                      price={account.price}
                      originalPrice={account.originalPrice}
                      image={account.image}
                      category={account.category}
                      stock={account.stock}
                      batchPrice={account.batchPrice}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 为什么选择我们 */}
      <section className="bg-gray-50 py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">为什么选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">品质保证</h3>
              <p className="text-gray-600">所有账户经过严格测试，确保质量可靠</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">即时发货</h3>
              <p className="text-gray-600">支付成功后立即自动发货，无需等待</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">售后无忧</h3>
              <p className="text-gray-600">专业客服团队，为您解决各种问题</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage; 