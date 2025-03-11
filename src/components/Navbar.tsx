import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaCaretDown, FaStar, FaCrown, FaWallet, FaKey, FaHistory, FaEnvelope } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();

  const menuItems = [
    { name: '账户商城', href: '/' },
    { name: '订单查询', href: '/orders/query' },
    { name: '实用工具', href: '/tools' },
    { name: '常见问题', href: '/help' },
    { name: '关于我们', href: '/about' },
  ];

  const isCurrentPage = (href: string) => {
    if (href === '/') {
      return router.pathname === href;
    }
    // 对于子路由，需要确保完全匹配或者是直接子路由
    const pathWithoutQuery = router.pathname.split('?')[0];
    if (href === pathWithoutQuery) return true;
    if (href !== '/') {
      const parentPath = href.endsWith('/') ? href : `${href}/`;
      return pathWithoutQuery.startsWith(parentPath) && 
             pathWithoutQuery.split('/').length <= href.split('/').length + 2;
    }
    return false;
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const VipBadge = () => (
    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 px-2 py-0.5 rounded-full shadow-sm">
      <FaCrown className="text-yellow-700" />
      <span className="ml-1 text-sm font-medium">VIP{user?.vipLevel}</span>
    </div>
  );

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="container-custom py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold flex items-center group transition-transform duration-200 hover:scale-105">
            <div className="w-8 h-8 flex items-center justify-center mr-2">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <span className="text-white">星海</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${isCurrentPage(item.href) ? 'text-white' : 'text-gray-300 hover:text-white'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* 充值按钮 */}
                <Link 
                  href="/user/recharge" 
                  className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-1 rounded transition-colors duration-200"
                >
                  充值
                </Link>
                
                {/* 用户信息 */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1 rounded-md"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{user.username}</span>
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-primary font-medium">余额：¥{user.balance}</div>
                      </div>
                      <Link
                        href="/user/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUser className="mr-2 text-gray-400" />
                        账户信息
                      </Link>
                      <Link
                        href="/user/password"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaKey className="mr-2 text-gray-400" />
                        修改密码
                      </Link>
                      <Link
                        href="/user/records"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaHistory className="mr-2 text-gray-400" />
                        我的记录
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FaTimes className="mr-2" />
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
                
                {/* VIP标识 */}
                {user.isVip && (
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">
                    VIP{user.vipLevel}
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-md hover:bg-white/10">
                  登录
                </Link>
                <Link href="/register" className="text-sm bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-md hover:shadow-lg">
                  注册
                </Link>
              </>
            )}
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
                {user ? (
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex items-center mb-4">
                      <div className="ml-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{user.username}</span>
                          {user.isVip && (
                            <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-2 py-1 rounded text-xs font-bold">
                              VIP{user.vipLevel}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-primary">余额：¥{user.balance}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href="/user/recharge"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaWallet className="mr-2 text-gray-400" />
                        充值
                      </Link>
                      <Link
                        href="/user/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUser className="mr-2 text-gray-400" />
                        账户信息
                      </Link>
                      <Link
                        href="/user/password"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaKey className="mr-2 text-gray-400" />
                        修改密码
                      </Link>
                      <Link
                        href="/user/records"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaHistory className="mr-2 text-gray-400" />
                        我的记录
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/login"
                      className="block w-full text-center px-4 py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      登录
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-center px-4 py-2 text-base font-medium text-white bg-primary hover:bg-primary-light rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      注册
                    </Link>
                  </div>
                )}
                <nav className="grid gap-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-base font-medium ${isCurrentPage(item.href) ? 'text-primary' : 'text-gray-900 hover:text-primary'} transition-colors duration-200`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                {user && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    <FaTimes className="mr-2" />
                    退出登录
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;