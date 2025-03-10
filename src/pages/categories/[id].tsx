import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import AccountCard from '../../components/AccountCard';
import { categories, accounts } from '../../utils/mockData';
import Link from 'next/link';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // 查找当前分类
  const category = categories.find((cat) => cat.id === id);
  
  // 筛选当前分类的账户
  const categoryAccounts = accounts.filter((account) => account.category === id);

  // 如果分类不存在或正在加载
  if (!category && typeof id === 'string') {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold text-dark mb-4">分类不存在</h1>
          <p className="text-gray-600 mb-8">您查找的分类不存在或已被删除。</p>
          <Link href="/categories" className="btn btn-primary">
            返回分类列表
          </Link>
        </div>
      </Layout>
    );
  }

  // 如果路由还在加载中
  if (!category) {
    return (
      <Layout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold text-dark">加载中...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${category.name} - 账户商城`}
      description={category.description}
    >
      <div className="container-custom py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-dark">{category.name}</h1>
          <p className="text-gray-600 mt-2">{category.description}</p>
        </div>

        {categoryAccounts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryAccounts.map((account) => (
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
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-600 mb-4">
              该分类暂无账户
            </h2>
            <p className="text-gray-500 mb-8">
              我们正在努力添加更多账户，请稍后再来查看。
            </p>
            <Link href="/categories" className="btn btn-primary">
              浏览其他分类
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage; 