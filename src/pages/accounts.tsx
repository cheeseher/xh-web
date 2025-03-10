import React, { useState } from 'react';
import Layout from '../components/Layout';
import AccountCard from '../components/AccountCard';
import { accounts, categories } from '../utils/mockData';

const AccountsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // 根据分类筛选账户
  const filteredAccounts = selectedCategory === 'all'
    ? accounts
    : accounts.filter(account => account.category === selectedCategory);

  // 根据排序方式排序账户
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <Layout title="全部账户 - 账户商城" description="浏览我们提供的各类优质账户">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8">全部账户</h1>

        {/* 筛选和排序 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <label htmlFor="category" className="block text-gray-700 mb-2">
                按分类筛选
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">全部分类</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="block text-gray-700 mb-2">
                排序方式
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">默认排序</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
                <option value="name-asc">名称 A-Z</option>
                <option value="name-desc">名称 Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* 账户列表 */}
        {sortedAccounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedAccounts.map((account) => (
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
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              没有找到符合条件的账户
            </h2>
            <p className="text-gray-500">
              请尝试更改筛选条件或查看其他分类。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AccountsPage; 