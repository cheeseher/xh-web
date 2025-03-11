import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import Link from 'next/link';
import Image from 'next/image';

const AccountDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  
  // 通知补货相关状态
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyQuantity, setNotifyQuantity] = useState('所需数量');
  const [notifyDescription, setNotifyDescription] = useState('');
  
  // 折扣信息弹窗状态
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  // 模拟账号数据
  const accountData = {
    id: id || 'gmail-1',
    title: 'Gmail邮箱-稳定可用（手工）',
    price: 4.20,
    originalPrice: 6.50,
    batchPrice: '≥500/¥3.99',
    image: '/images/gmail.png',
    stock: 420,
    sold: 387,
    description: [
      '高质量手工创建谷歌Gmail账号（未绑定手机）（1~90天+）。',
      '稳定耐用账号，多数为iPhone设备人工创建。',
      '创建地区为随机，账号间互不关联，使用稳定，用途自测。',
      '所有账号均经过严格测试，均可正常使用，每天都会上新，请放心购买。',
      '购买建议：请先尝试购买进行测试，再进行批量购买，批量购买自动优惠价。',
      '卡密格式：xxx@gmail.com----XXXXXXXX----xxxx@xxxx.com',
      '账号----密码----辅助邮箱（用于登录确认输入）',
      '登陆网址：gmail.com（包官方登录 第三方登录不上不售后）'
    ],
    notice: [
      '登录进去后显示，账号如果安全活动一律 选择是自己操作。'
    ],
    // 添加折扣信息
    discounts: [
      { quantity: '≥50', discount: '0.99', originalPrice: '210.00', unitPrice: '4.16', discountPrice: '207.90' },
      { quantity: '≥100', discount: '0.98', originalPrice: '420.00', unitPrice: '4.12', discountPrice: '411.60' },
      { quantity: '≥200', discount: '0.97', originalPrice: '840.00', unitPrice: '4.07', discountPrice: '814.80' },
      { quantity: '≥300', discount: '0.95', originalPrice: '1260.00', unitPrice: '3.99', discountPrice: '1197.00' },
      { quantity: '≥500', discount: '0.93', originalPrice: '2100.00', unitPrice: '3.91', discountPrice: '1953.00' },
      { quantity: '≥1000', discount: '0.90', originalPrice: '4200.00', unitPrice: '3.78', discountPrice: '3780.00' }
    ]
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (!agreed) {
      alert('请先阅读并承诺遵守本站 服务协议 及 隐私协议');
      return;
    }
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    // 模拟订单创建
    const orderId = `ORDER${Date.now()}`;
    router.push(`/payment?orderId=${orderId}&productId=${accountData.id}&quantity=${quantity}`);
  };

  const handleAddToCart = () => {
    if (!agreed) {
      alert('请先阅读并承诺遵守本站 服务协议 及 隐私协议');
      return;
    }
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    alert('已添加到购物车');
  };

  // 处理通知补货提交
  const handleSubmitNotify = () => {
    // 这里可以添加表单验证
    if (!notifyEmail) {
      alert('请填写邮箱');
      return;
    }
    
    // 模拟提交通知
    alert(`通知补货请求已提交！\n邮箱: ${notifyEmail}\n数量: ${notifyQuantity}\n说明: ${notifyDescription}`);
    
    // 关闭弹窗并重置表单
    setShowNotifyModal(false);
    setNotifyEmail('');
    setNotifyQuantity('');
    setNotifyDescription('');
  };

  // 在组件加载时，如果用户已登录，设置默认邮箱
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      setNotifyEmail(user.email);
    }
  }, [user]);

  // 处理通知补货数量输入，只允许数字
  const handleNotifyQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 只允许输入数字
    if (/^\d*$/.test(value)) {
      setNotifyQuantity(value);
    }
  };

  return (
    <Layout title={`${accountData.title} - 星海账户`}>
      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* 左侧产品图片 */}
          <div className="md:w-1/3">
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <div className="relative h-64 w-full">
                <Image
                  src={accountData.image}
                  alt={accountData.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          
          {/* 右侧产品信息 */}
          <div className="md:w-2/3">
            <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md mr-2">自动发货</span>
                  <h1 className="text-xl font-bold">{accountData.title}</h1>
                </div>
                <button
                  onClick={() => setShowNotifyModal(true)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  通知补货
                </button>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-md mb-4">
                <div className="flex items-baseline mb-2">
                  <span className="text-gray-600 mr-2">价 格：</span>
                  <span className="text-red-500 text-2xl font-bold">¥ {accountData.price.toFixed(2)}</span>
                  <span className="text-gray-400 line-through ml-2">¥{accountData.originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">批发价：</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">{accountData.batchPrice}</span>
                  <span 
                    className="ml-2 text-blue-500 cursor-pointer hover:underline"
                    onClick={() => setShowDiscountModal(true)}
                  >
                    查看更多优惠
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">数量：</span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">邮箱账户：</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="newshenghao@gmail.com"
                    disabled={user && user.email ? true : false}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${user && user.email ? 'bg-gray-100' : ''}`}
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-600 w-20">查询密码：</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="填写您于自身记忆的查询密码"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600">
                    我已阅读并承诺遵守本站 
                    <Link href="/terms" className="text-blue-500">服务协议</Link> 及 
                    <Link href="/privacy" className="text-blue-500">隐私协议</Link>
                  </label>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    立即购买
                  </button>
                </div>
              </div>
            </div>
            
            {/* 折扣信息弹窗 */}
            {showDiscountModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-md shadow-lg w-full max-w-md mx-4">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">折扣信息</h3>
                    <button 
                      onClick={() => setShowDiscountModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-2 text-left">数量</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">折扣</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">原价</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">单价</th>
                          <th className="border border-gray-200 px-4 py-2 text-left">折扣价</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accountData.discounts.map((discount, index) => (
                          <tr key={index}>
                            <td className="border border-gray-200 px-4 py-2">{discount.quantity}</td>
                            <td className="border border-gray-200 px-4 py-2">{discount.discount}</td>
                            <td className="border border-gray-200 px-4 py-2">{discount.originalPrice}元</td>
                            <td className="border border-gray-200 px-4 py-2">{discount.unitPrice}元</td>
                            <td className="border border-gray-200 px-4 py-2">{discount.discountPrice}元</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* 通知补货弹窗 */}
            {showNotifyModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-md shadow-lg w-full max-w-md mx-4">
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium">通知补货</h3>
                    <button 
                      onClick={() => setShowNotifyModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <span className="w-16 text-gray-600">邮箱</span>
                        <input
                          type="email"
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          placeholder="newshenghao@gmail.com"
                          disabled={user && user.email ? true : false}
                          className={`flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${user && user.email ? 'bg-gray-100' : ''}`}
                        />
                      </div>
                      
                      <div className="flex items-center mb-2">
                        <span className="w-16 text-gray-600">数量</span>
                        <input
                          type="text"
                          value={notifyQuantity}
                          onChange={handleNotifyQuantityChange}
                          placeholder="所需数量"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      
                      <div className="flex mb-2">
                        <span className="w-16 text-gray-600">说明</span>
                        <textarea
                          value={notifyDescription}
                          onChange={(e) => setNotifyDescription(e.target.value)}
                          placeholder="说明信息，例如：时间，或其他要求。"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={4}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowNotifyModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                      >
                        关闭
                      </button>
                      <button
                        onClick={handleSubmitNotify}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        提交通知
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-white p-6 rounded-md border border-gray-200">
              <div className="border-b border-gray-200 pb-2 mb-4">
                <h2 className="text-lg font-bold">商品描述</h2>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold">账号说明：</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {accountData.description.map((item, index) => (
                    <li key={index} className={item.includes('每天都会上新') ? 'text-red-500' : ''}>
                      {item}
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-bold">注意事项：</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {accountData.notice.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountDetailPage;