import React from 'react';
import { categories } from '../utils/mockData';

interface CategoryIndexProps {
  onCategoryClick: (categoryId: string) => void;
  activeCategory: string;
}

// 按照指定顺序排列分类
const orderedCategories = [
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
  // 社交媒体类
  'instagram',
  'twitter',
  'facebook',
  'discord',
  'chatgpt',
  'tiktok',
  'yandex'
];

const CategoryIndex: React.FC<CategoryIndexProps> = ({ onCategoryClick, activeCategory }) => {
  // 按照指定顺序获取分类
  const getOrderedCategories = () => {
    return orderedCategories
      .map(id => categories.find(cat => cat.id === id))
      .filter(Boolean);
  };

  return (
    <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-50">
      <div 
        className="bg-white rounded-lg shadow-md p-2 max-h-[80vh] overflow-y-auto"
      >
        <div className="p-2 border-b border-gray-100 text-center">
          <h3 className="text-sm font-medium">索引</h3>
        </div>
        <ul className="space-y-1 pt-2">
          {getOrderedCategories().map((category) => (
            category && (
              <li key={category.id} className="px-2">
                <button
                  onClick={() => onCategoryClick(category.id)}
                  className={`w-full text-left flex items-center text-xs transition-colors py-1.5 ${
                    activeCategory === category.id
                      ? 'text-primary font-medium'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-1.5 flex-shrink-0"></span>
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

export default CategoryIndex; 