import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import Link from 'next/link';
import Image from 'next/image';
import { FaInfoCircle, FaShoppingCart, FaTag, FaPercent } from 'react-icons/fa';

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
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* 面包屑导航 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-sm">
            <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-md mr-2">自动发货</span>
            <Link href="/" className="text-gray-600 hover:text-gray-800">谷歌邮箱</Link>
            <span className="text-gray-400 mx-2">›</span>
            <span className="text-gray-700">{accountData.title}</span>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-700 font-medium">库存: <span className="text-green-600">{accountData.stock}</span></span>
            <span className="mx-3 text-gray-300">|</span>
            <span 
              className="text-gray-700 hover:text-gray-900 cursor-pointer hover:underline flex items-center" 
              onClick={() => setShowNotifyModal(true)}
            >
              <FaInfoCircle className="mr-1" />
              通知补货
            </span>
          </div>
        </div>
        
        {/* 上半部分：商品图片和输入区域 */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* 左侧产品图片 */}
          <div className="md:w-1/4 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full flex items-center justify-center">
              <div className="w-full relative" style={{ aspectRatio: '1/1' }}>
                <Image
                  src={accountData.image}
                  alt={accountData.title}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
          
          {/* 右侧产品信息 */}
          <div className="md:w-3/4">
            {/* 商品标题 */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{accountData.title}</h1>
            
            {/* 价格信息卡片 */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm mb-5">
              <div className="flex items-baseline mb-3">
                <span className="text-gray-600 mr-3 font-medium">价格</span>
                <span className="text-gray-800 text-3xl font-bold">¥{accountData.price.toFixed(2)}</span>
                <span className="text-gray-400 line-through ml-3">¥{accountData.originalPrice.toFixed(2)}</span>
                <span className="ml-3 bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {((1 - accountData.price / accountData.originalPrice) * 100).toFixed(0)}% 优惠
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-3 font-medium">批发价</span>
                <span className="bg-gray-700 text-white text-xs px-3 py-1 rounded-full">{accountData.batchPrice}</span>
                <span 
                  className="ml-3 text-gray-700 cursor-pointer hover:text-gray-900 flex items-center"
                  onClick={() => setShowDiscountModal(true)}
                >
                  <FaPercent className="mr-1 text-xs" />
                  <span className="underline">查看批发优惠</span>
                </span>
              </div>
            </div>
            
            {/* 购买信息表单 */}
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <div className="space-y-5">
                <div className="flex items-center">
                  <span className="text-gray-700 w-24 font-medium">数量</span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-700 w-24 font-medium">接收邮箱</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="账号密码将发送至此邮箱"
                    disabled={user && user.email ? true : false}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${user && user.email ? 'bg-gray-50' : ''}`}
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-700 w-24 font-medium">查询密码</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="填写您于自身记忆的查询密码"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mr-2 h-4 w-4 text-gray-700 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600">
                    我已阅读并承诺遵守本站 
                    <Link href="/terms" className="text-gray-700 font-medium hover:underline">服务协议</Link> 及 
                    <Link href="/privacy" className="text-gray-700 font-medium hover:underline">售后协议</Link>
                  </label>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <FaTag className="mr-2" />
                    立即购买
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 下半部分：商品描述 */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full">
          <div className="border-b border-gray-200 pb-3 mb-5">
            <h2 className="text-xl font-bold text-gray-800">商品描述</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-5 bg-gray-700 rounded-full mr-2"></span>
                账号说明
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {accountData.description.map((item, index) => (
                  <li key={index} className={item.includes('每天都会上新') ? 'text-gray-800 font-medium' : ''}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-1 h-5 bg-gray-700 rounded-full mr-2"></span>
                注意事项
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {accountData.notice.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 通知补货弹窗 */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">通知补货</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="notifyEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  您的邮箱
                </label>
                <input
                  type="email"
                  id="notifyEmail"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="请输入您的邮箱"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="notifyQuantity" className="block text-sm font-medium text-gray-700 mb-1">
                  需要数量
                </label>
                <input
                  type="text"
                  id="notifyQuantity"
                  value={notifyQuantity}
                  onChange={handleNotifyQuantityChange}
                  placeholder="请输入需要的数量"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="notifyDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  补充说明 (选填)
                </label>
                <textarea
                  id="notifyDescription"
                  value={notifyDescription}
                  onChange={(e) => setNotifyDescription(e.target.value)}
                  placeholder="请输入补充说明"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={handleSubmitNotify}
                  className="flex-1 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  提交
                </button>
                <button
                  onClick={() => setShowNotifyModal(false)}
                  className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 折扣信息弹窗 */}
      {showDiscountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">批发优惠详情</h3>
              <button 
                onClick={() => setShowDiscountModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">折扣</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">单价</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">原价</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">折后价</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {accountData.discounts.map((discount, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{discount.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{discount.discount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥{discount.unitPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¥{discount.originalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">¥{discount.discountPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>注：批发价格会在结算时自动计算，无需手动输入优惠码。</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AccountDetailPage;