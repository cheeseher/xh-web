import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-8 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">账户商城</h3>
            <p className="text-gray-400 text-sm mb-3">
              提供各类优质账户，安全可靠，价格合理。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">快速链接</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-primary">
                  全部分类
                </Link>
              </li>
              <li>
                <Link href="/accounts" className="text-gray-400 hover:text-primary">
                  全部账户
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary">
                  常见问题
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">账户分类</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/categories/email" className="text-gray-400 hover:text-primary">
                  邮箱账户
                </Link>
              </li>
              <li>
                <Link href="/categories/social" className="text-gray-400 hover:text-primary">
                  社交媒体
                </Link>
              </li>
              <li>
                <Link href="/categories/streaming" className="text-gray-400 hover:text-primary">
                  流媒体账户
                </Link>
              </li>
              <li>
                <Link href="/categories/gaming" className="text-gray-400 hover:text-primary">
                  游戏账户
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-300">联系我们</h3>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>客服邮箱: support@accountshop.com</li>
              <li>工作时间: 周一至周日 9:00-22:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-gray-500 text-xs">
          <p>&copy; {new Date().getFullYear()} 账户商城. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 