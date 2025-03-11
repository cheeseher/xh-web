import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: 'account',
    title: '账号相关',
    items: [
      {
        id: 'how-to-buy',
        question: '如何购买账号？',
        answer: '浏览商品列表，选择您需要的账号类型，点击商品进入详情页查看具体信息，确认无误后点击"立即购买"按钮...'
      },
      {
        id: 'usage-notice',
        question: '账号使用注意事项',
        answer: '请勿在同一时间多人登录使用，定期更改密码以确保账号安全，不要在不安全的设备上登录账号...'
      },
      {
        id: 'security-guide',
        question: '账号安全指南',
        answer: '使用强密码，包含字母、数字和特殊字符，定期更换密码，不同平台使用不同密码...'
      }
    ]
  },
  {
    id: 'service',
    title: '服务相关',
    items: [
      {
        id: 'faq',
        question: '常见问题解答',
        answer: '包含账号问题、支付问题、售后问题等常见问题的解答...'
      },
      {
        id: 'after-sales',
        question: '售后服务说明',
        answer: '我们提供账号登录问题处理、账号异常修复、技术支持服务等售后服务...'
      }
    ]
  },
  {
    id: 'tutorial',
    title: '教程指南',
    items: [
      {
        id: 'how-to-discord',
        question: '如何在Discord上赚钱',
        answer: 'Discord是一款流行数百万用户的即时通信软件，本文介绍如何在Discord上赚钱的方法...'
      }
    ]
  }
];

const FaqPage: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('account');

  // 切换分类的展开/折叠状态
  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <Layout title="常见问题 - 星海账户" description="浏览星海账户的常见问题解答">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">常见问题</h1>

        {/* FAQ分类列表 */}
        <div className="space-y-6">
          {faqCategories.map((category) => (
            <div
              key={category.id}
              className="border border-gray-200 rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full py-4 px-6 text-left flex justify-between items-center focus:outline-none bg-gray-50"
              >
                <span className="font-medium text-lg">{category.title}</span>
                <FaChevronRight 
                  className={`text-gray-400 transition-transform duration-200 ${
                    expandedCategory === category.id ? 'transform rotate-90' : ''
                  }`} 
                />
              </button>
              
              {expandedCategory === category.id && (
                <div className="p-6 space-y-4">
                  {category.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/help/${item.id}`}
                      className="block border-b border-gray-100 pb-4 hover:text-primary transition-colors"
                    >
                      <h3 className="font-medium mb-2">{item.question}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.answer}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage;