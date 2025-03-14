import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Captcha from '@/components/Captcha';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 清除对应字段的错误信息
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // 验证昵称
    if (!formData.nickname.trim()) {
      newErrors.nickname = '请输入昵称';
    }

    // 验证邮箱
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    // 验证密码
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6 || formData.password.length > 16) {
      newErrors.password = '密码长度应为6-16个字符';
    }

    // 验证确认密码
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }

    // 验证验证码
    if (!formData.captcha.trim()) {
      newErrors.captcha = '请输入验证码';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // TODO: 实现注册逻辑
      await new Promise(resolve => setTimeout(resolve, 1000));
      // 注册成功后跳转
      router.push('/login');
    } catch (error) {
      console.error('注册失败:', error);
      setErrors(prev => ({
        ...prev,
        submit: '注册失败，请稍后重试'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaRefresh = () => {
    setFormData(prev => ({ ...prev, captcha: '' }));
  };

  return (
    <Layout title="注册 - 星海账户" hidePageTitle={true}>
      <div className="min-h-[600px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* 标题 */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                账户注册
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                已有账号？
                <Link href="/login" className="text-[#009688] hover:text-[#00796b] ml-1">
                  立即登录
                </Link>
              </p>
            </div>
            
            {/* 注册表单 */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errors.submit && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md text-sm">
                  {errors.submit}
                </div>
              )}

              {/* 昵称 */}
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                  昵称
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 h-[42px] border ${errors.nickname ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent`}
                    placeholder="请输入昵称"
                  />
                  <FaUser className="absolute right-3 top-3.5 text-gray-400" />
                  {errors.nickname && (
                    <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>
                  )}
                </div>
              </div>

              {/* 邮箱 */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  邮箱
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 h-[42px] border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent`}
                    placeholder="请输入邮箱"
                  />
                  <FaEnvelope className="absolute right-3 top-3.5 text-gray-400" />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* 密码 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  密码
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 h-[42px] border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent`}
                    placeholder="6-16个字符"
                  />
                  <FaLock className="absolute right-3 top-3.5 text-gray-400" />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
              </div>

              {/* 确认密码 */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  确认密码
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-4 h-[42px] border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent`}
                    placeholder="请再次输入密码"
                  />
                  <FaLock className="absolute right-3 top-3.5 text-gray-400" />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* 验证码 */}
              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                  验证码
                </label>
                <div className="mt-1 flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="captcha"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      className={`appearance-none block w-full px-4 h-[42px] border ${errors.captcha ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent`}
                      placeholder="请输入验证码"
                    />
                    {errors.captcha && (
                      <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>
                    )}
                  </div>
                  <div className="w-32 h-[42px] bg-gray-100 rounded-md overflow-hidden">
                    <Captcha onRefresh={handleCaptchaRefresh} />
                  </div>
                </div>
              </div>

              {/* 服务条款 */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#009688] focus:ring-[#009688] border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  我已阅读并同意
                  <a href="#" className="text-[#009688] hover:text-[#00796b]">《服务条款》</a>
                  和
                  <a href="#" className="text-[#009688] hover:text-[#00796b]">《隐私政策》</a>
                </label>
              </div>

              {/* 注册按钮 */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center h-[42px] px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#009688] hover:bg-[#00796b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009688] ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? '注册中...' : '注册'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;