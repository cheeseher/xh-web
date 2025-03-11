import React, { useState } from 'react';
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
              <div className="flex items-center mb-4">
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md mr-2">自动发货</span>
                <h1 className="text-xl font-bold">{accountData.title}</h1>
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
                  <span className="ml-2 text-gray-600">查看更多优惠</span>
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                    className="flex-1 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    立即购买
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    订购通知
                  </button>
                </div>
              </div>
            </div>
            
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