import React, { useState, useEffect } from 'react';
import { FaComments, FaTelegramPlane, FaArrowUp } from 'react-icons/fa';

const FloatingButtons: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomerService = () => {
    // 移除跳转功能，为后续添加其他交互做准备
  };

  const handleTelegram = () => {
    // 移除跳转功能，为后续添加其他交互做准备
  };

  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
      {/* 在线客服按钮 */}
      <button
        onClick={handleCustomerService}
        className="bg-primary hover:bg-primary-dark text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="在线客服"
      >
        <FaComments className="text-2xl" />
      </button>

      {/* Telegram按钮 */}
      <button
        onClick={handleTelegram}
        className="bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Telegram"
      >
        <FaTelegramPlane className="text-2xl" />
      </button>

      {/* 回到顶部按钮 */}
      <button
        onClick={handleScrollTop}
        className={`bg-gray-700 hover:bg-gray-800 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
          showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="回到顶部"
      >
        <FaArrowUp className="text-2xl" />
      </button>
    </div>
  );
};

export default FloatingButtons;