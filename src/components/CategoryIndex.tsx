import React, { useState } from 'react';
import { categories } from '../utils/mockData';

interface CategoryIndexProps {
  onCategoryClick: (categoryId: string) => void;
  activeCategory: string;
}

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

const CategoryIndex: React.FC<CategoryIndexProps> = ({ onCategoryClick, activeCategory }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // 按照指定顺序获取分类
  const getOrderedCategories = () => {
    return orderedCategories
      .map(id => categories.find(cat => cat.id === id))
      .filter(Boolean);
  };

  // 移动端下拉菜单
  const renderMobileDropdown = () => {
    const activeCategoryName = categories.find(cat => cat.id === activeCategory)?.name || '选择分类';
    
    return (
      <div className="relative">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-md shadow-sm border border-gray-200"
        >
          <span>{activeCategoryName}</span>
          <svg
            className={`w-5 h-5 transition-transform ${showMobileMenu ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showMobileMenu && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-y-auto">
            {getOrderedCategories().map((category) => (
              category && (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryClick(category.id);
                    setShowMobileMenu(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    activeCategory === category.id
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              )
            ))}
          </div>
        )}
      </div>
    );
  };

  // 移动端水平滚动栏
  const renderMobileScrollbar = () => {
    return (
      <div className="overflow-x-auto whitespace-nowrap py-2 px-4 bg-white shadow-sm">
        {getOrderedCategories().map((category) => (
          category && (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`inline-block px-3 py-1.5 mx-1 text-sm rounded-full ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          )
        ))}
      </div>
    );
  };

  // 桌面端垂直索引
  const renderDesktopIndex = () => {
    return (
      <div className="fixed top-[45%] transform -translate-y-1/2 z-50 hidden md:block" style={{ right: '20px' }}>
        <div 
          className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-2 max-h-[70vh] overflow-y-auto hover:bg-white transition-colors duration-200"
          style={{ width: '130px' }}
        >
          <div className="p-1 border-b border-gray-100 text-center">
            <h3 className="text-xs font-medium">索引</h3>
          </div>
          <ul className="space-y-0.5 pt-1">
            {getOrderedCategories().map((category) => (
              category && (
                <li key={category.id} className="px-1">
                  <button
                    onClick={() => onCategoryClick(category.id)}
                    className={`w-full text-left flex items-center text-xs transition-colors py-1 ${
                      activeCategory === category.id
                        ? 'text-primary font-medium'
                        : 'text-gray-600 hover:text-primary'
                    }`}
                  >
                    <span className="w-1 h-1 bg-primary rounded-full mr-1.5 flex-shrink-0"></span>
                    {category.name}
                  </button>
                </li>
              )
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* 移动端分类选择 */}
      <div className="sticky top-0 z-40 md:hidden">
        {renderMobileScrollbar()}
      </div>
      
      {/* 桌面端分类索引 */}
      {renderDesktopIndex()}
    </>
  );
};

export default CategoryIndex;