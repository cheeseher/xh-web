import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaCaretDown, FaStar, FaCrown, FaWallet, FaKey, FaHistory, FaEnvelope } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // 处理点击事件，如果点击的是菜单外部，则关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className="px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-sm font-medium">
      VIP{user?.vipLevel}
    </div>
  );

  return (
    <header className="bg-gray-800 shadow-md relative z-40">
      {/* 主导航栏 */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <FaEnvelope className="text-gray-700 text-xl" />
              </div>
              <span className="ml-2 text-white text-lg font-bold hidden sm:block">星海</span>
            </Link>
          </div>

          {/* 桌面端导航 */}
          <nav className="hidden md:flex space-x-1">
            <Link href="/" className={`px-3 py-2 text-sm font-medium rounded-md ${router.pathname === '/' ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
              商品商城
            </Link>
            <Link href="/orders/query" className={`px-3 py-2 text-sm font-medium rounded-md ${router.pathname === '/orders/query' ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
              订单查询
            </Link>
            <Link href="/tools" className={`px-3 py-2 text-sm font-medium rounded-md ${router.pathname === '/tools' || router.pathname.startsWith('/tools/') ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
              实用工具
            </Link>
            <Link href="/help" className={`px-3 py-2 text-sm font-medium rounded-md ${router.pathname === '/help' || router.pathname.startsWith('/help/') ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
              帮助中心
            </Link>
            <Link href="/about" className={`px-3 py-2 text-sm font-medium rounded-md ${router.pathname === '/about' ? 'text-white bg-gray-700' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
              关于我们
            </Link>
          </nav>

          {/* 用户操作区 */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* 充值按钮 */}
                <Link href="/user/recharge" className="text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md text-sm font-medium transition-colors">
                  <FaWallet className="inline-block mr-1" /> 充值
                </Link>

                {/* 用户菜单 */}
                <div className="relative" ref={userMenuRef}>
                  <div
                    className="flex items-center text-gray-300 hover:text-white cursor-pointer"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <span className="mr-1 hover:text-white">{user.username}</span>
                    {user.vipLevel > 0 && (
                      <div className="px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-sm font-medium mr-2">
                        VIP{user.vipLevel}
                      </div>
                    )}
                    <FaCaretDown className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* 下拉菜单 */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.username}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-base font-semibold text-[#009688]">余额：¥{user.balance.toFixed(2)}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1"></p>
                      </div>
                      <Link
                        href="/user/account?tab=profile"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FaUser className="mr-2 text-gray-500" /> 我的账户
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 mt-1 border-t border-gray-100"
                      >
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
                  登录
                </Link>
                <Link href="/register" className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  注册
                </Link>
              </div>
            )}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端侧边菜单 */}
      <div
        className={`fixed inset-0 z-[999] ${isMenuOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {/* 背景遮罩 */}
        <div className="fixed inset-0 bg-black bg-opacity-50" />

        {/* 侧边栏内容 */}
        <div
          className="fixed left-0 top-0 bg-white h-full w-72 transform transition-transform duration-300 ease-in-out shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 pt-6 pb-6 space-y-6">
            {user ? (
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FaUser className="text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user.username}</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-gray-500">余额: ¥{user.balance.toFixed(2)}</p>
                      {user.vipLevel > 0 && (
                        <div className="px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded text-sm font-medium">
                          VIP{user.vipLevel}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Link
                  href="/user/recharge"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaWallet className="mr-2" /> 充值
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 border-b border-gray-200 pb-4">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  注册
                </Link>
              </div>
            )}

            <nav className="space-y-1">
              {[
                { name: '商品商城', href: '/' },
                { name: '订单查询', href: '/orders/query' },
                { name: '实用工具', href: '/tools' },
                { name: '帮助中心', href: '/help' },
                { name: '关于我们', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
                    router.pathname === item.href || (item.href !== '/' && router.pathname.startsWith(item.href))
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {user && (
              <div className="border-t border-gray-200 pt-4 space-y-1">
                <Link
                  href="/user/account?tab=profile"
                  className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="mr-3 text-gray-500" /> 我的账户
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md mt-2"
                >
                  退出登录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;