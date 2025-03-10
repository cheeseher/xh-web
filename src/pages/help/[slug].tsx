import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

// 模拟文章内容数据
const articleContents = {
  'how-to-buy': {
    title: '如何购买账号？',
    content: `
      <h2>购买流程</h2>
      <p>1. 浏览商品列表，选择您需要的账号类型</p>
      <p>2. 点击商品，进入详情页查看具体信息</p>
      <p>3. 确认无误后，点击"立即购买"按钮</p>
      <p>4. 选择支付方式，完成支付</p>
      <p>5. 支付成功后，系统会自动发送账号信息到您的邮箱</p>
      
      <h2>注意事项</h2>
      <p>• 购买前请仔细阅读商品描述和使用说明</p>
      <p>• 确保您的联系方式准确无误</p>
      <p>• 如遇问题请及时联系客服</p>
    `
  },
  'usage-notice': {
    title: '账号使用注意事项',
    content: `
      <h2>基本须知</h2>
      <p>1. 请勿在同一时间多人登录使用</p>
      <p>2. 定期更改密码以确保账号安全</p>
      <p>3. 不要在不安全的设备上登录账号</p>
      
      <h2>安全提醒</h2>
      <p>• 请勿将账号信息分享给他人</p>
      <p>• 使用完毕后请及时退出登录</p>
      <p>• 如发现异常请立即联系客服</p>
    `
  },
  'faq': {
    title: '常见问题解答',
    content: `
      <h2>账号问题</h2>
      <p>Q: 账号无法登录怎么办？</p>
      <p>A: 请先检查账号密码是否正确，如确认无误请联系客服处理</p>
      
      <h2>支付问题</h2>
      <p>Q: 支持哪些支付方式？</p>
      <p>A: 目前支持支付宝、微信支付等主流支付方式</p>
      
      <h2>售后问题</h2>
      <p>Q: 购买后多久可以收到账号？</p>
      <p>A: 支付成功后系统会立即发送账号信息到您的邮箱</p>
    `
  },
  'after-sales': {
    title: '售后服务说明',
    content: `
      <h2>服务范围</h2>
      <p>1. 账号登录问题处理</p>
      <p>2. 账号异常修复</p>
      <p>3. 技术支持服务</p>
      
      <h2>服务时间</h2>
      <p>• 7*24小时在线客服</p>
      <p>• 工作日优先处理</p>
      
      <h2>联系方式</h2>
      <p>• 在线客服：点击右上角"联系客服"</p>
      <p>• 处理时效：一般问题24小时内解决</p>
    `
  },
  'security-guide': {
    title: '账号安全指南',
    content: `
      <h2>密码管理</h2>
      <p>1. 使用强密码，包含字母、数字和特殊字符</p>
      <p>2. 定期更换密码</p>
      <p>3. 不同平台使用不同密码</p>
      
      <h2>登录安全</h2>
      <p>• 避免在公共场所登录</p>
      <p>• 及时清除浏览记录</p>
      <p>• 开启二次验证功能</p>
      
      <h2>防范提示</h2>
      <p>• 警惕钓鱼网站</p>
      <p>• 不要点击来源不明的链接</p>
      <p>• 定期检查账号活动记录</p>
    `
  }
};

const ArticlePage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const article = articleContents[slug as keyof typeof articleContents];

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
    <Layout>
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
        
        <article className="prose prose-lg max-w-none">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{article.title}</h1>
          <div 
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default ArticlePage; 