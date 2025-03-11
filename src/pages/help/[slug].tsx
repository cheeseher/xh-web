import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FaArrowLeft, FaChevronRight } from 'react-icons/fa';

// 模拟文章内容数据
const articleContents = {
  'how-to-discord': {
    title: '如何在Discord上赚钱',
    content: `
      <h2 id="discord-intro">Discord介绍</h2>
      <p>Discord 是一款流行数百万用户的即时通信软件，该软件兼容用的操作系统可以在任何设备上运行。Discord 是为玩家和创作者打造的通讯平台，连接其聊天服务器，并进行一对一聊天。</p>
      <p>据说Discord 最初是为了解决玩家们创建的，但很多已经使用它的用户发现，因此企业（包括Discord 官方也）都在使用Discord 上赚钱。</p>
      
      <h2 id="discord-dc">Discord(DC)账号购买</h2>
      <p>如果你还没有 Discord(DC)账号，推荐：Discord账号官网，Discord-2FA账号，Discord-美国账号，Discord-老套号 等。</p>
      <p>更多详见：Discord账号购买。</p>
      
      <h2 id="discord-make-money">如何在 Discord 上赚钱</h2>
      <h3 id="discord-sell-products">1.销售产品或服务</h3>
      <p>在 Discord 上赚钱的简单的方法之一就是使用销售产品或服务。</p>
      <p>你可以使用 Shopify 或 WooCommerce 等插件在 Discord 创建店上开店铺，这使你可以直接向 Discord 用户销售实物或数字产品。</p>
      <p>要在 Discord 上销售产品或服务，需要先需决定要卖哪些产品。Discord 上畅销的商品包括：帐饰品、衣服商品、数位插画等。数码摄影生活中的事情：StockX Discord 创建群</p>
      <p>StockX Discord 创建群是一个由志同道合的个人人组成的社区，他们聚集在一起讨论潮流动态、收藏品和相的所有事情（我们还是建议StockX官方合法进行了解）。最初是一个小型社区和讨论地点出现的商品，现已发展为拥有超过 44,000 名成员的Discord 网络社区群。</p>
    `,
    toc: [
      { id: 'discord-intro', title: 'Discord介绍' },
      { id: 'discord-dc', title: 'Discord(DC)账号购买' },
      { id: 'discord-make-money', title: '如何在 Discord 上赚钱' },
      { id: 'discord-sell-products', title: '1.销售产品或服务' }
    ]
  },
  'how-to-buy': {
    title: '如何购买账号？',
    content: `
      <h2 id="purchase-process">购买流程</h2>
      <p>1. 浏览商品列表，选择您需要的账号类型</p>
      <p>2. 点击商品，进入详情页查看具体信息</p>
      <p>3. 确认无误后，点击"立即购买"按钮</p>
      <p>4. 选择支付方式，完成支付</p>
      <p>5. 支付成功后，系统会自动发送账号信息到您的邮箱</p>
      
      <h2 id="precautions">注意事项</h2>
      <p>• 购买前请仔细阅读商品描述和使用说明</p>
      <p>• 确保您的联系方式准确无误</p>
      <p>• 如遇问题请及时联系客服</p>
    `,
    toc: [
      { id: 'purchase-process', title: '购买流程' },
      { id: 'precautions', title: '注意事项' }
    ]
  },
  'usage-notice': {
    title: '账号使用注意事项',
    content: `
      <h2 id="basic-knowledge">基本须知</h2>
      <p>1. 请勿在同一时间多人登录使用</p>
      <p>2. 定期更改密码以确保账号安全</p>
      <p>3. 不要在不安全的设备上登录账号</p>
      
      <h2 id="security-reminder">安全提醒</h2>
      <p>• 请勿将账号信息分享给他人</p>
      <p>• 使用完毕后请及时退出登录</p>
      <p>• 如发现异常请立即联系客服</p>
    `,
    toc: [
      { id: 'basic-knowledge', title: '基本须知' },
      { id: 'security-reminder', title: '安全提醒' }
    ]
  },
  'faq': {
    title: '常见问题解答',
    content: `
      <h2 id="account-issues">账号问题</h2>
      <p>Q: 账号无法登录怎么办？</p>
      <p>A: 请先检查账号密码是否正确，如确认无误请联系客服处理</p>
      
      <h2 id="payment-issues">支付问题</h2>
      <p>Q: 支持哪些支付方式？</p>
      <p>A: 目前支持USDT和其他支付方式</p>
      
      <h2 id="after-sales-issues">售后问题</h2>
      <p>Q: 购买后多久可以收到账号？</p>
      <p>A: 支付成功后系统会立即发送账号信息到您的邮箱</p>
    `,
    toc: [
      { id: 'account-issues', title: '账号问题' },
      { id: 'payment-issues', title: '支付问题' },
      { id: 'after-sales-issues', title: '售后问题' }
    ]
  },
  'after-sales': {
    title: '售后服务说明',
    content: `
      <h2 id="service-scope">服务范围</h2>
      <p>1. 账号登录问题处理</p>
      <p>2. 账号异常修复</p>
      <p>3. 技术支持服务</p>
      
      <h2 id="service-time">服务时间</h2>
      <p>• 7*24小时在线客服</p>
      <p>• 工作日优先处理</p>
      
      <h2 id="contact-info">联系方式</h2>
      <p>• 在线客服：点击右上角"联系客服"</p>
      <p>• 处理时效：一般问题24小时内解决</p>
    `,
    toc: [
      { id: 'service-scope', title: '服务范围' },
      { id: 'service-time', title: '服务时间' },
      { id: 'contact-info', title: '联系方式' }
    ]
  },
  'security-guide': {
    title: '账号安全指南',
    content: `
      <h2 id="password-management">密码管理</h2>
      <p>1. 使用强密码，包含字母、数字和特殊字符</p>
      <p>2. 定期更换密码</p>
      <p>3. 不同平台使用不同密码</p>
      
      <h2 id="login-security">登录安全</h2>
      <p>• 避免在公共场所登录</p>
      <p>• 及时清除浏览记录</p>
      <p>• 开启二次验证功能</p>
      
      <h2 id="prevention-tips">防范提示</h2>
      <p>• 警惕钓鱼网站</p>
      <p>• 不要点击来源不明的链接</p>
      <p>• 定期检查账号活动记录</p>
    `,
    toc: [
      { id: 'password-management', title: '密码管理' },
      { id: 'login-security', title: '登录安全' },
      { id: 'prevention-tips', title: '防范提示' }
    ]
  }
};

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const article = slug ? articleContents[slug as keyof typeof articleContents] : null;

  // 监听滚动，更新当前活动的目录项
  useEffect(() => {
    if (!article) return;

    const handleScroll = () => {
      const sections = article.toc.map(item => document.getElementById(item.id));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [article, slug]);

  // 点击目录项滚动到对应位置
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  if (!article) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">文章不存在</h1>
            <Link href="/help" className="text-primary hover:underline mt-4 inline-block">
              返回帮助中心
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`${article.title} - 星海账户`}>
      <div className="container-custom py-8">
        <div className="mb-6">
          <Link 
            href="/help" 
            className="inline-flex items-center text-gray-600 hover:text-primary"
          >
            <FaArrowLeft className="mr-2" />
            返回帮助中心
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* 主要内容区域 */}
          <article className="prose prose-lg max-w-none md:w-3/4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{article.title}</h1>
            <div 
              className="mt-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
          
          {/* 右侧悬浮索引菜单 */}
          <div className="md:w-1/4">
            <div className="sticky top-24 bg-white p-4 border border-gray-200 rounded-md">
              <h3 className="font-bold mb-4">索引</h3>
              <ul className="space-y-2">
                {article.toc.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center text-sm hover:text-primary transition-colors ${
                        activeSection === item.id ? 'text-primary font-medium' : 'text-gray-700'
                      }`}
                    >
                      <FaChevronRight className={`mr-2 text-xs ${
                        activeSection === item.id ? 'text-primary' : 'text-gray-400'
                      }`} />
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ArticlePage; 