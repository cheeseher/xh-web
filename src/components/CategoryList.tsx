import React from 'react';
import { categories } from '../utils/mockData';

interface CategoryListProps {
  onCategoryClick?: (categoryId: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryClick }) => {
  const handleClick = (categoryId: string) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-base font-medium text-center">索引</h2>
      </div>
      <ul className="p-3">
        {categories.map((category) => (
          <li key={category.id} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => handleClick(category.id)}
              className="w-full text-left flex items-center text-sm text-gray-700 hover:text-primary transition-colors py-2"
            >
              <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList; 