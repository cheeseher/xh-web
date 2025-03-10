import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: '如何购买账户？',
    answer: '选择您需要的账户，点击"加入购物车"或"立即购买"按钮，然后按照结账流程完成购买。',
    category: '购买流程',
  },
  {
    id: 2,
    question: '支持哪些支付方式？',
    answer: '我们支持支付宝、微信支付和银行卡支付等多种支付方式。',
    category: '支付问题',
  },
  {
    id: 3,
    question: '购买后多久能收到账户信息？',
    answer: '一般情况下，支付成功后系统会立即发送账户信息到您的邮箱。如有延迟，请联系客服。',
    category: '购买流程',
  },
  {
    id: 4,
    question: '账户有保障吗？',
    answer: '是的，我们所有账户均经过严格验证，确保安全可靠。同时，我们提供7天内账户问题免费更换服务。',
    category: '账户问题',
  },
  {
    id: 5,
    question: '如何修改账户密码？',
    answer: '收到账户信息后，您可以按照邮件中的指引登录账户并修改密码。具体步骤因不同平台而异。',
    category: '账户问题',
  },
  {
    id: 6,
    question: '购买后遇到问题怎么办？',
    answer: '您可以通过网站的"联系我们"页面提交问题，或直接联系我们的客服热线400-123-4567获取帮助。',
    category: '售后服务',
  },
  {
    id: 7,
    question: '是否支持退款？',
    answer: '由于账户商品的特殊性，一般情况下我们不支持退款。但如果账户存在问题，我们会提供更换服务。',
    category: '支付问题',
  },
  {
    id: 8,
    question: '账户可以转让给他人吗？',
    answer: '是的，您购买的账户可以自行转让给他人使用，但请注意保护账户安全和个人隐私。',
    category: '账户问题',
  },
  {
    id: 9,
    question: '如何查询订单状态？',
    answer: '登录您的账户，在"我的订单"页面可以查看所有订单的状态和详情。',
    category: '购买流程',
  },
  {
    id: 10,
    question: '账户有使用期限吗？',
    answer: '我们销售的账户一般没有使用期限，但部分特殊账户（如流媒体会员账户）可能有固定的有效期。',
    category: '账户问题',
  },
];

const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 获取所有分类
  const categories = ['all', ...new Set(faqItems.map((item) => item.category))];

  // 根据分类和搜索筛选FAQ项
  const filteredFaqItems = faqItems.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 切换FAQ项的展开/折叠状态
  const toggleItem = (id: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter((itemId) => itemId !== id)
        : [...prevOpenItems, id]
    );
  };

  // 分类名称格式化
  const formatCategoryName = (category: string) => {
    if (category === 'all') return '全部问题';
    return category;
  };

  return (
    <Layout title="常见问题 - 账户商城" description="浏览账户商城的常见问题解答">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8 text-center">常见问题</h1>

        {/* 搜索框 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索问题..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg
              className="absolute right-3 top-3 h-6 w-6 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 分类标签 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formatCategoryName(category)}
            </button>
          ))}
        </div>

        {/* FAQ列表 */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqItems.length > 0 ? (
            <div className="space-y-4">
              {filteredFaqItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-semibold text-lg">{item.question}</span>
                    {openItems.includes(item.id) ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                没有找到相关问题
              </h3>
              <p className="text-gray-500">
                请尝试使用其他关键词搜索，或浏览其他分类的问题。
              </p>
            </div>
          )}
        </div>

        {/* 联系我们 */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">没有找到您的问题？</h2>
          <p className="text-gray-600 mb-6">
            如果您有其他问题，请随时联系我们的客服团队。
          </p>
          <a
            href="/contact"
            className="btn btn-primary inline-block"
          >
            联系我们
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage; 