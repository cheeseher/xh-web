import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

// 模拟文章数据
const articles = [
  {
    id: 1,
    title: '如何购买账号？',
    slug: 'how-to-buy'
  },
  {
    id: 2,
    title: '账号使用注意事项',
    slug: 'usage-notice'
  },
  {
    id: 3,
    title: '常见问题解答',
    slug: 'faq'
  },
  {
    id: 4,
    title: '售后服务说明',
    slug: 'after-sales'
  },
  {
    id: 5,
    title: '账号安全指南',
    slug: 'security-guide'
  }
];

const HelpPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">帮助须知</h1>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link 
              href={`/help/${article.slug}`} 
              key={article.id}
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4 flex items-center justify-between">
                <h2 className="text-lg text-gray-700 hover:text-primary transition-colors duration-200">
                  {article.title}
                </h2>
                <FaChevronRight className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage; 