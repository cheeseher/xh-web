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
                      image={account.image}
                      category={account.categoryName}
                      stock={account.stock}
                    />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 为什么选择我们 */}
      <section className="py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-dark">为什么选择我们</h2>
            <p className="text-sm text-gray-600 mt-2">我们提供最优质的账户和最贴心的服务</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2">安全可靠</h3>
              <p className="text-xs text-gray-600">
                所有账户均经过严格验证，确保安全可靠，购买后即可放心使用。
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2">价格合理</h3>
              <p className="text-xs text-gray-600">
                我们提供最具竞争力的价格，确保您能以合理的价格获得优质账户。
              </p>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base font-semibold mb-2">7×24小时客服</h3>
              <p className="text-xs text-gray-600">
                我们提供全天候客服支持，随时解决您的问题，确保您的购买体验无忧。
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage; 