import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaCaretDown, FaStar } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: '首页', href: '/' },
    { name: '订单查询', href: '/orders' },
    { name: '工具集合', href: '/toolset' },
    { name: '帮助须知', href: '/help' },
    { name: '关于我们', href: '/about' },
    { name: '联系客服', href: 'https://t.me/yourTelegramUsername', external: true },
  ];

  return (
    <nav className="bg-dark text-white shadow-md">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-2">
              <FaStar className="text-white text-lg" />
            </div>
            星海账户
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium ${
                  item.name === '联系客服' ? 'text-primary' : ''
                }`}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm hover:text-primary transition-colors">
              登录
            </Link>
            <Link href="/register" className="text-sm hover:text-primary transition-colors">
              注册
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 