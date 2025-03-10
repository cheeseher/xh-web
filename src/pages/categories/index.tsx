import React from 'react';
import Layout from '../../components/Layout';
import CategoryCard from '../../components/CategoryCard';
import { categories } from '../../utils/mockData';

const CategoriesPage: React.FC = () => {
  return (
    <Layout title="全部分类 - 账户商城" description="浏览我们提供的各类优质账户分类">
      <div className="container-custom py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-dark">全部分类</h1>
          <p className="text-gray-600 mt-2">浏览我们提供的各类优质账户</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage; 