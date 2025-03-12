import React, { useState, useRef, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import AccountCard from '../components/AccountCard';
import CategoryIndex from '../components/CategoryIndex';
import { accounts, categories } from '../utils/mockData';
import Link from 'next/link';
import { FaCheckCircle, FaClock, FaHeadset, FaSearch, FaChevronRight, FaShieldAlt, FaBolt, FaRegThumbsUp, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

// 按照指定顺序排列分类
const orderedCategories = [
  // 社交媒体类
  'instagram',
  'twitter',
  'facebook',
  'discord',
  'chatgpt',
  'tiktok',
  // 邮箱类
  'gmail',
  'outlook',
  'yahoo',
  'gmx',
  'aol',
  'protonmail',
  'mail',
  'naver',
  'rambler',
  'german',
  'other',
  'yandex'
];

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // 处理分类数据
  const categoryAccounts = useMemo(() => {
    // 按照指定顺序获取分类
    const orderedCats = orderedCategories
      .map(id => categories.find(cat => cat.id === id))
      .filter(Boolean) as typeof categories;
    
    return orderedCats.map(category => ({
      category,
      accounts: accounts.filter(account => account.category === category.id)
    })).filter(item => item.accounts.length > 0);
  }, []);

  // 过滤账户
  const filteredCategoryAccounts = useMemo(() => {
    if (!searchTerm.trim()) return categoryAccounts;
    
    return categoryAccounts.map(categoryAccount => ({
      category: categoryAccount.category,
      accounts: categoryAccount.accounts.filter(account => 
        account.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryAccount.category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(item => item.accounts.length > 0);
  }, [categoryAccounts, searchTerm]);

  // 设置ref的回调函数
  const setCategoryRef = (id: string) => (el: HTMLDivElement | null) => {
    categoryRefs.current[id] = el;
  };

  // 滚动到指定分类
  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      // 考虑移动端和桌面端不同的偏移量
      const isMobile = window.innerWidth < 768;
      const yOffset = isMobile ? -120 : -80; // 移动端考虑顶部分类栏的高度
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveCategory(categoryId);
    }
  };

  // 监听滚动事件，更新当前活动分类
  useEffect(() => {
    const handleScroll = () => {
      // 考虑移动端和桌面端不同的偏移量
      const isMobile = window.innerWidth < 768;
      const scrollOffset = isMobile ? 150 : 100;
      const scrollPosition = window.scrollY + scrollOffset;
      
      // 找到当前在视口中的分类
      let currentCategory = categories[0]?.id;
      for (const categoryId in categoryRefs.current) {
        const element = categoryRefs.current[categoryId];
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          if (top <= scrollOffset && bottom >= scrollOffset) {
            currentCategory = categoryId;
            break;
          }
        }
      }
      
      if (currentCategory && currentCategory !== activeCategory) {
        setActiveCategory(currentCategory);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // 初始化时设置第一个分类为活动状态
    if (filteredCategoryAccounts.length > 0 && !activeCategory) {
      setActiveCategory(filteredCategoryAccounts[0].category.id);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeCategory, filteredCategoryAccounts]);

  // 标题样式
  const sectionTitleStyle = "text-xl font-bold text-gray-800 border-l-4 border-indigo-600 pl-3";

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        {/* 提醒区域 */}
        {showAlert && (
          <div className="bg-[#009688]/10 border-l-4 border-[#009688] px-4 py-3 relative">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-[#009688]">
                <FaCheckCircle className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  欢迎来到星海账号商城！我们提供优质的账号服务，支持批发和零售。
                </p>
              </div>
              <button 
                onClick={() => setShowAlert(false)}
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
        
        {/* 搜索栏 - 大面积深色带渐变效果 */}
        <div className={`${showAlert ? '' : '-mt-4 sm:-mt-8'} px-3 sm:px-6 pt-16 pb-8 sm:pt-20 sm:pb-12 bg-gradient-to-b from-gray-900 to-gray-800 shadow-md`}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">寻找优质账号，从这里开始</h2>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="搜索账号类型、品牌或关键词..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-10 rounded-2xl border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009688] shadow-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
          {/* 分类索引 */}
          <CategoryIndex onCategoryClick={scrollToCategory} activeCategory={activeCategory} />

          {/* 商品列表 */}
          <div className="space-y-6 sm:space-y-8">
            {filteredCategoryAccounts.map((categoryAccount) => (
              <div 
                key={categoryAccount.category.id} 
                ref={setCategoryRef(categoryAccount.category.id)}
                id={`category-${categoryAccount.category.id}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 border-l-4 border-gray-700 pl-2">{categoryAccount.category.name}</h2>
                  <span className="text-sm text-gray-500 hidden sm:block">{categoryAccount.category.description}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {categoryAccount.accounts.map((account) => (
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
            ))}
          </div>

          {/* 为什么选择我们 */}
          <div className="mt-8 sm:mt-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-4 sm:mb-6">为什么选择我们</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    <FaShieldAlt className="text-gray-700 text-sm" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">安全保障</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">所有账号均经过严格测试，确保质量可靠，交易安全有保障。</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    <FaBolt className="text-gray-700 text-sm" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">极速发货</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">自动发货系统，下单后秒级到账，让您立即获得所需账号。</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    <FaHeadset className="text-gray-700 text-sm" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">贴心服务</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">专业客服团队，7×24小时在线，随时解答您的问题和疑虑。</p>
              </div>
              
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                    <FaRegThumbsUp className="text-gray-700 text-sm" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">品质保证</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">严选优质账号，稳定可靠，使用无忧，让您的体验更加出色。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 