import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: '谷歌邮箱购买', href: '/products/gmail' },
    { name: 'Gmail', href: '/products/gmail' },
    { name: 'Outlook', href: '/products/outlook' },
    { name: 'Yahoo Mail', href: '/products/yahoo' },
    { name: 'Aol Mail', href: '/products/aol' },
    { name: 'Naver Mail', href: '/products/naver' },
    { name: 'Facebook', href: '/products/facebook' },
    { name: 'Twitter', href: '/products/twitter' },
    { name: 'Amazon', href: '/products/amazon' },
  ];

  const disclaimers = [
    '本站只是代注册各种账号，提供账号和密码，账号所有权归账号官网所有。我们只保证账号密码正确，特殊功能需少量购买后自行测试。',
    '客户付款提供后，为保证安全，项目可更改密码及密码保护资料等一切可以修改的信息。账号问题售后时间内只处理有问题的账号，不对因使用账户产生的问题做任何处理。',
    '请合法使用购买的账号，对非法使用造成的后果由购买人承担一切后果以及法律责任。'
  ];

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      {/* 免责声明 */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-700 rounded-lg p-4">
          {disclaimers.map((text, index) => (
            <div key={index} className="flex items-start mb-2 last:mb-0">
              <span className="mr-2">{index + 1}.</span>
              <p className="text-sm">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 快捷链接 */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <Link 
              key={index}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 版权信息 */}
        <div className="text-center text-gray-500 text-sm mt-8">
          © 2022 星海账户 | Powered by{' '}
          <a
            href="http://www.xinghai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.xinghai.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 