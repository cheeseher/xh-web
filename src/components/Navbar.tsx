import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaCaretDown, FaStar, FaCrown, FaWallet, FaKey, FaHistory } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();

  const menuItems = [
    { name: '首页', href: '/' },
    { name: '订单查询', href: '/orders/query' },
    { name: '工具合集', href: '/tools' },
    { name: '常见问题', href: '/help' },
    { name: '关于我们', href: '/about' },
    { name: '充值', href: '/user/recharge' },
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
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isCurrentPage(item.href) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* 用户信息 */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2 rounded-md hover:bg-white/10"
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar || '/images/default-avatar.png'}
                        alt="用户头像"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-2">{user.username}</span>
                      {user.isVip && <VipBadge />}
                    </div>
                    <FaCaretDown />
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
                        修改昵称
                      </Link>
                      <Link
                        href="/user/password"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaKey className="mr-2 text-gray-400" />
                        修改密码
                      </Link>
                      <Link
                        href="/user/order-records"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaHistory className="mr-2 text-gray-400" />
                        订单记录
                      </Link>
                      <Link
                        href="/user/bill-records"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaHistory className="mr-2 text-gray-400" />
                        账单记录
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

                {/* 充值按钮 */}
                <Link
                  href="/user/recharge"
                  className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full hover:shadow-lg transition-shadow duration-200"
                >
                  <FaWallet className="text-sm" />
                  <span className="font-medium">充值</span>
                </Link>
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
                      <img
                        src={user.avatar || '/images/default-avatar.png'}
                        alt="用户头像"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{user.username}</span>
                          {user.isVip && <VipBadge />}
                        </div>
                        <div className="text-sm text-primary">余额：¥{user.balance}</div>
                      </div>
                    </div>
                    <Link
                      href="/user/recharge"
                      className="flex items-center justify-center w-full space-x-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full hover:shadow-lg transition-shadow duration-200 mb-4"
                    >
                      <FaWallet className="text-sm" />
                      <span className="font-medium">充值</span>
                    </Link>
                    <div className="space-y-2">
                      <Link
                        href="/user/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaUser className="mr-2 text-gray-400" />
                        修改昵称
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
                        href="/user/order-records"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaHistory className="mr-2 text-gray-400" />
                        订单记录
                      </Link>
                      <Link
                        href="/user/bill-records"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <FaHistory className="mr-2 text-gray-400" />
                        账单记录
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