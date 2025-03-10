import React, { useState } from 'react';
import Layout from '../components/Layout';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除错误
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的邮箱';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = '请选择主题';
    }
    if (!formData.message.trim()) {
      newErrors.message = '请输入您的留言';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // 模拟提交表单
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <Layout title="联系我们 - 账户商城" description="联系账户商城，获取帮助和支持">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-dark mb-8 text-center">联系我们</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">电子邮件</h3>
            <p className="text-gray-600">
              <a href="mailto:support@accountshop.com" className="hover:text-primary">
                support@accountshop.com
              </a>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FaPhone className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">电话</h3>
            <p className="text-gray-600">
              <a href="tel:+8610123456789" className="hover:text-primary">
                +86 (10) 1234-5678
              </a>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMapMarkerAlt className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">地址</h3>
            <p className="text-gray-600">
              北京市朝阳区<br />
              科技园区123号<br />
              邮编: 100000
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-semibold mb-6">给我们留言</h2>
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6">
                  <h3 className="font-semibold text-lg mb-2">感谢您的留言！</h3>
                  <p>
                    我们已收到您的留言，将尽快回复您。如有紧急事项，请直接致电我们的客服热线。
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="请输入您的邮箱"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label htmlFor="subject" className="block text-gray-700 mb-2">
                      主题
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">请选择主题</option>
                      <option value="general">一般咨询</option>
                      <option value="support">技术支持</option>
                      <option value="billing">账单问题</option>
                      <option value="feedback">意见反馈</option>
                      <option value="other">其他</option>
                    </select>
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 mb-2">
                      留言
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="请输入您的留言"
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '提交中...' : '提交留言'}
                  </button>
                </form>
              )}
            </div>
            <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">工作时间</h3>
                <div className="space-y-2 text-gray-700">
                  <p>周一至周五: 9:00 - 18:00</p>
                  <p>周六: 10:00 - 16:00</p>
                  <p>周日: 休息</p>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">客服热线</h3>
                  <p className="text-2xl font-bold text-primary">400-123-4567</p>
                  <p className="text-gray-600 mt-2">7×24小时服务</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage; 