import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FaChevronRight } from 'react-icons/fa';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: '使用Google Voice 注册第三方平台的常见问题有哪些？',
    answer: '在基于云的电话系统的世界中，Google Voice 登录语音是最好的。它提供出色的音质、变更价格、让您有各种服务限制家庭或办公室电话。',
  },
  {
    id: 2,
    question: '使用Google Voice 注册第三方平台的常见问题有哪些？',
    answer: '在基于云的电话系统的世界中，Google Voice 登录语音是最好的。它提供出色的音质、变更价格、让您有各种服务限制家庭或办公室电话。',
  },
  {
    id: 3,
    question: '使用Google Voice 注册第三方平台的常见问题有哪些？',
    answer: '在基于云的电话系统的世界中，Google Voice 登录语音是最好的。它提供出色的音质、变更价格、让您有各种服务限制家庭或办公室电话。',
  },
  {
    id: 4,
    question: '使用Google Voice 注册第三方平台的常见问题有哪些？',
    answer: '在基于云的电话系统的世界中，Google Voice 登录语音是最好的。它提供出色的音质、变更价格、让您有各种服务限制家庭或办公室电话。',
  },
];

const FaqPage: React.FC = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);

  // 切换FAQ项的展开/折叠状态
  const toggleItem = (id: number) => {
    setOpenItemId(openItemId === id ? null : id);
  };

  return (
    <Layout title="常见问题 - 星海账户" description="浏览星海账户的常见问题解答">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">常见问题</h1>

        {/* FAQ列表 */}
        <div className="space-y-1">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-medium">{item.question}</span>
                <FaChevronRight 
                  className={`text-gray-400 transition-transform duration-200 ${
                    openItemId === item.id ? 'transform rotate-90' : ''
                  }`} 
                />
              </button>
              {openItemId === item.id && (
                <div className="pb-4 text-gray-600 text-sm">
                  <p>{item.answer}</p>
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