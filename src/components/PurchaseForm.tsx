import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaInfoCircle, FaUser } from 'react-icons/fa';
import { useUser } from '../contexts/UserContext';

interface PurchaseFormProps {
  onSubmit: (formData: any) => void;
  price: number;
  isLoading: boolean;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ onSubmit, price, isLoading }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    quantity: 1,
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      email: user?.email, // 使用用户的注册邮箱
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 邮箱字段（只读） */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          接收邮箱
        </label>
        <div className="relative">
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full px-4 py-2 border rounded-md bg-gray-50 cursor-not-allowed"
          />
          <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
        </div>
        <p className="mt-1 text-sm text-gray-500 flex items-center">
          <FaInfoCircle className="mr-1" />
          账号将发送到您的注册邮箱
        </p>
      </div>

      {/* 购买数量 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          购买数量
        </label>
        <input
          type="number"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* 总价显示 */}
      <div className="bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">单价：</span>
          <span className="font-medium">¥{price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2 text-lg font-bold">
          <span>总价：</span>
          <span className="text-primary">¥{(price * formData.quantity).toFixed(2)}</span>
        </div>
      </div>

      {/* 同意条款 */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          required
        />
        <label className="ml-2 block text-sm text-gray-700">
          我已阅读并同意
          <a href="/terms" className="text-primary hover:text-primary-dark" target="_blank">
            《服务条款》
          </a>
        </label>
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={isLoading || !formData.agreeToTerms}
        className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${
          (isLoading || !formData.agreeToTerms) ? 'opacity-75 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? '处理中...' : '确认购买'}
      </button>
    </form>
  );
};

export default PurchaseForm; 