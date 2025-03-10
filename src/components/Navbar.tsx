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
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center group transition-transform duration-200 hover:scale-105">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-400 rounded-full flex items-center justify-center mr-3 shadow-lg group-hover:shadow-primary/50 transition-shadow duration-200">
              <FaStar className="text-white text-xl" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">星海账户</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-white/10"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-md hover:bg-white/10">
              登录
            </Link>
            <Link href="/register" className="text-sm bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
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
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMenuOpen(false)}></div>
            <div className="relative bg-white z-50 h-full w-64 transform transition-transform duration-300 ease-in-out">
              <div className="px-4 pt-5 pb-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-xl font-bold text-gray-900">星海账户</Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base font-medium text-gray-900 hover:text-primary transition-colors duration-200"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="space-y-4">
                  <Link href="/login" className="block w-full text-center px-4 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors duration-200">
                    登录
                  </Link>
                  <Link href="/register" className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary hover:bg-primary-light rounded-md transition-colors duration-200">
                    注册
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;