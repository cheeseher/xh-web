import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-dark text-white shadow-md">
      <div className="container-custom py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            账户商城
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary transition-colors text-sm">
              首页
            </Link>
            <Link href="/categories" className="hover:text-primary transition-colors text-sm">
              全部分类
            </Link>
            <Link href="/accounts" className="hover:text-primary transition-colors text-sm">
              全部账户
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors text-sm">
              常见问题
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="hover:text-primary transition-colors">
              <FaShoppingCart className="text-lg" />
            </Link>
            <Link href="/account" className="hover:text-primary transition-colors">
              <FaUser className="text-lg" />
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
          <div className="md:hidden mt-3 pb-3">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </Link>
              <Link 
                href="/categories" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                全部分类
              </Link>
              <Link 
                href="/accounts" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                全部账户
              </Link>
              <Link 
                href="/faq" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                常见问题
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link 
                  href="/cart" 
                  className="hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaShoppingCart className="text-lg" />
                </Link>
                <Link 
                  href="/account" 
                  className="hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUser className="text-lg" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 