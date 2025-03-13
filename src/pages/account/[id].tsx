import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useUser } from '../../contexts/UserContext';
import Link from 'next/link';
import Image from 'next/image';
import { FaInfoCircle, FaShoppingCart, FaTag, FaPercent, FaGoogle, FaMicrosoft, FaInstagram, FaTwitter, FaFacebook, FaDiscord, FaRobot, FaGlobe } from 'react-icons/fa';

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
  
  // 协议弹窗状态
  const [showAgreementModal, setShowAgreementModal] = useState(false);
  const [agreementTimer, setAgreementTimer] = useState<NodeJS.Timeout | null>(null);
  const [canAgree, setCanAgree] = useState(false);
  const [countdown, setCountdown] = useState(3);

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

  const handleShowAgreement = () => {
    setShowAgreementModal(true);
    setCanAgree(false);
    setCountdown(3);
    
    // 倒计时
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setCanAgree(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // 保存定时器引用以便清除
    setAgreementTimer(countdownInterval);
  };
  
  const handleAgree = () => {
    setAgreed(true);
    setShowAgreementModal(false);
    
    // 清除定时器
    if (agreementTimer) {
      clearTimeout(agreementTimer);
    }
  };
  
  // 处理复选框点击
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止默认的复选框切换行为
    
    if (!agreed) {
      // 如果尚未同意，显示协议弹窗
      handleShowAgreement();
    } else {
      // 如果已经同意，直接取消同意
      setAgreed(false);
    }
  };

  useEffect(() => {
    // 组件卸载时清除定时器
    return () => {
      if (agreementTimer) {
        clearTimeout(agreementTimer);
      }
    };
  }, [agreementTimer]);

  return (
    <Layout title={accountData.title + ' - 星海账户'}>
      <div className="max-w-6xl mx-auto py-4 px-2 sm:px-4">
        {/* 面包屑导航 */}
        <div className="mb-4">
          <div className="flex items-center text-sm mb-2">
            <Link href="/" className="text-gray-600 hover:text-gray-800">谷歌邮箱</Link>
            <span className="text-gray-400 mx-2">›</span>
            <span className="text-gray-700">{accountData.title}</span>
          </div>
          <div className="flex items-center text-sm space-x-3">
            <span className="bg-[#009688] text-white text-xs px-2 py-1 rounded-md">自动发货</span>
            <span className="text-gray-700 font-medium">库存: <span className="text-green-600">{accountData.stock}</span></span>
            <span className="text-gray-300">|</span>
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
              <div className="w-full aspect-square flex items-center justify-center">
                {String(id).includes('gmail') && (
                  <FaGoogle className="text-6xl sm:text-7xl text-red-500" />
                )}
                {String(id).includes('outlook') && (
                  <FaMicrosoft className="text-6xl sm:text-7xl text-blue-500" />
                )}
                {String(id).includes('instagram') && (
                  <FaInstagram className="text-6xl sm:text-7xl text-pink-500" />
                )}
                {String(id).includes('twitter') && (
                  <FaTwitter className="text-6xl sm:text-7xl text-sky-400" />
                )}
                {String(id).includes('facebook') && (
                  <FaFacebook className="text-6xl sm:text-7xl text-blue-600" />
                )}
                {String(id).includes('discord') && (
                  <FaDiscord className="text-6xl sm:text-7xl text-indigo-500" />
                )}
                {String(id).includes('chatgpt') && (
                  <FaRobot className="text-6xl sm:text-7xl text-teal-500" />
                )}
                {!String(id).includes('gmail') && 
                 !String(id).includes('outlook') && 
                 !String(id).includes('instagram') && 
                 !String(id).includes('twitter') && 
                 !String(id).includes('facebook') && 
                 !String(id).includes('discord') && 
                 !String(id).includes('chatgpt') && (
                  <FaGlobe className="text-6xl sm:text-7xl text-gray-500" />
                )}
              </div>
            </div>
          </div>
          
          {/* 右侧产品信息 */}
          <div className="md:w-3/4">
            {/* 商品标题 */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{accountData.title}</h1>
            
            {/* 价格信息卡片 */}
            <div className="bg-[#fff2e8] p-5 rounded-lg shadow-sm mb-5">
              <div className="flex items-baseline mb-3">
                <span className="text-gray-600 mr-3 font-medium">价格</span>
                <span className="text-red-500 text-3xl font-bold">¥{accountData.price.toFixed(2)}</span>
                <span className="text-gray-400 line-through ml-3">¥{accountData.originalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-3 font-medium">批发价</span>
                <span className="bg-[#ef4444] text-white text-xs px-3 py-1 rounded-md">{accountData.batchPrice}</span>
                <span 
                  className="ml-3 text-gray-700 cursor-pointer hover:text-gray-900 flex items-center"
                  onClick={() => setShowDiscountModal(true)}
                >
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
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
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent ${user && user.email ? 'bg-gray-50' : ''}`}
                  />
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-700 w-24 font-medium">查询密码</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="填写您于自身记忆的查询密码"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009688] focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => {}} // 空的onChange处理器，实际逻辑在点击事件中处理
                    className="mr-2 h-4 w-4 text-[#009688] focus:ring-[#009688] border-gray-300 rounded cursor-pointer"
                    onClick={handleCheckboxClick}
                  />
                  <label htmlFor="agreement" className="text-sm text-gray-600 cursor-pointer" onClick={handleCheckboxClick}>
                    我已阅读并承诺遵守本站<span className="text-[#009688] font-medium">服务协议</span>及<span className="text-[#009688] font-medium">售后协议</span>
                  </label>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 bg-[#009688] text-white rounded-lg hover:bg-[#00897b] transition-colors duration-300 flex items-center justify-center"
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
                  className="flex-1 py-2 bg-[#009688] text-white rounded-lg hover:bg-[#00897b] transition-colors"
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

      {/* 协议弹窗 */}
      {showAgreementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-center items-center bg-white">
              <h3 className="text-xl font-bold text-red-500">服务协议</h3>
            </div>
            
            <div className="p-5 overflow-y-auto max-h-[65vh] bg-white">
              <div className="space-y-4 text-gray-700">
                <p>1. 本站不经营/提供/注册任何（中国）科技平台账号业务。</p>
                <p>2. 本站所有账号为全球（非中国）各科技平台账号，中国地区无法使用，该地区客户不要购买。</p>
                <p>3. 本站商品为虚拟卡密类的商品；一旦售出且账号均符合产品描述，概不退换退款，亦不会回收已售出账号；如不同意请不要购买，感谢理解。</p>
                <p>4. 本站只是代注册国外各科技平台账号，账号所有权归账号官网所有，使用需遵守各科技平台规则；我们只保证账号密码正确且符合产品描述。</p>
                <p>5. 本站所有账号均为国外各大科技平台于正常代注册；所有账号均不包含任何实名信息；如科技平台需要实名认证/手机认证等，请自行完善个人实名信息；</p>
                <p>6. 请自行保管购买卡密信息，所有商品质保首登，首登后请自行保证卡密安全，本站没有卡密保管义务，本站定期清理；另本站不提供任何商品使用咨询（谢谢理解）。</p>
                <p>7. 售后请确保符合商品售后规则（详见商品页-售后说明）、且在售后规定时间内进行售后反馈；对于所有商品售后规则以外的使用而导致的问题，不负责售后（谢谢理解）。</p>
                <p>8. 邮箱账号购买后请尽快登录、检查使用，购买超过售后时间都默认为已经使用，因使用而产生任的何问题均不售后；用途自测，不包长久登录；如使用一段时间出现封号或者其他问题风险自担，不负责售后。</p>
                <p>9. 售后不做任何技术/方法指导，售后只做邮箱账号是否首登有效，售后不包含邮箱账号使用后遇到的各种问题，使用遇到问题请自行阅读各大官网使用说明（谢谢理解）。</p>
                <p>10. 客户付款提货后为保证安全，请自行更改密码及密码保护资料等一切可以修改的信息。售后时间内，账号登录出现问题只退换有问题的账号，不对因使用账号产生的问题账号做任何售后。</p>
                <p>11. 请合法使用购买的账号，对非法使用造成的后果由购买人自行承担一切后果及法律责任，本站不承担任何法律及连带责任！。</p>
                <p>12. 严禁利用本站所购买之账号用于任何非法用途！其中包括：（诈骗信息推广，赌博信息推广，违规信息推广，虚假信息推广，影响网络环境，黄赌毒等以及其他任何非法用途等）。</p>
                <p>13. 严禁使用本站任何账号用于任何营销类、群发类、发信类、中国业务，该类业务客户请勿购买，一旦发现立马封号；只可用于游戏、娱乐、学习等其他个人正常合法用途。</p>
                <p>14. 本站出售账号仅可用于个人正规合法业务，严禁使用本站购买账号用于非法用途，请遵守各国地区法律法规。</p>
                <p>15. 本站所有商品禁止未成年用户购买，如未满足各个国家法定成年标准年龄，请自觉离开，感谢理解。</p>
                <p>16. 凡在本站购买的用户，一旦本站发现用于非法用途，本站将全力配合有关部门予以打击！</p>
                <p>17. 除非您已充分阅读、完全理解并接受本协议所有条款，否则您无权购买本站商品以及使用本站服务。您点击勾选同意，或您使用本站服务，或者以其他任何明示或者默示方式表示接受本协议的，均视为您已阅读并同意签署本协议。本协议即在您与本站之间产生法律效力，成为对双方均具有约束力的法律文件。</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-center items-center space-x-4">
              <button
                onClick={handleAgree}
                disabled={!canAgree}
                className={`px-8 py-2 rounded-md ${
                  canAgree 
                    ? 'bg-[#009688] text-white hover:bg-[#00796b]' 
                    : 'bg-gray-300 text-gray-700'
                } transition-all min-w-[120px]`}
              >
                {!canAgree ? `阅读剩余${countdown}秒` : '我同意'}
              </button>
              <button
                onClick={() => setShowAgreementModal(false)}
                className="px-8 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all min-w-[120px]"
              >
                我不同意
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AccountDetailPage;