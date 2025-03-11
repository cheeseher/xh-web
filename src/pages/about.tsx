import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <Layout title="关于我们 - 星海账户" description="了解星海账户的联系方式和服务协议">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">关于我们</h1>
        
        <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">联系方式</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              在线客服: <span className="text-blue-500">网页在线客服</span> (网页右下角图标)
            </li>
            <li>
              Email: <Link href="mailto:henduohao.aftersale@gmail.com" className="text-blue-500">henduohao.aftersale@gmail.com</Link>
            </li>
            <li>
              Telegram: <span className="text-blue-500">Auto Man</span> (近期有仿冒客服请注意分辨，见下图)
            </li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">售后咨询</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              客服在线时间: <span className="text-blue-500">09:30 - 2:30（次日）</span> 非在线时间回复需等明天，次日会第一时间回复。
            </li>
            <li>
              咨询问题之前，请务必先阅读<span className="text-blue-500">产品说明</span>，以及各大平台使用说明。
            </li>
            <li>
              提供购买订单号、提交问题账号等信息、对问题进行截图、环境信息（IP、语言、时区等）、整理成文件(Excel、txt)并附上问题原因<span className="text-blue-500">多必懂下面联系方式（推荐留邮箱）</span>。
            </li>
            <li>
              售后请确保自身订单是否在售后规则内，具体售后规则请查看各商品详情页（售后问题），对售后规则外的不予售后，感谢理解！
            </li>
            <li>
              客服不一定无时无刻都在线，在线后会第一时间处理所有的问题反馈，如果未能及时反馈请耐心等待一定时间，谢谢理解！
            </li>
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h2 className="text-xl font-bold mb-4">服务协议</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>本站不经营/提供/注册任何（中国）科技平台账号业务。</li>
            <li>本站所有账号为全球（非中国）各科技平台账号，中国地区无法使用，谨防区客户不要购买。</li>
            <li>本站商品为虚拟不可逆的商品，一旦售出且账号均为客户产品自提走，做不退换款，亦不会回收已售出账号；如不愿请不要购买，感谢理解。</li>
            <li>本站只是代注册国外外各科技平台账号，账号所有权归客户所有所有，使用需遵守各科技平台规则；账号只负责账号登录，不做目的性产品销售。</li>
            <li>本站所有账号均为国外各大科技平台子账作注册；所有账号均不包含任何支付信息；如科技平台需要支支付认证/手机认证等，请自行前往各个人支付信息；</li>
            <li>请自行保管好本平台信息，所有商品原装发货，普登后请自行修改本平台安全，本站没有获取保留权限，本站定期清理；另本站不提供任何商品使用咨询（谢谢理解）。</li>
            <li>售后请确保符合商品售后规则（详见商品页-售后说明）、且在售后规定时间内进行售后反馈；对于所有商品售后规则以外的使用而导致的问题，不负责售后（谢谢理解）。</li>
            <li>账照服务购买前请尽量保持联系，检查使用，购买超过售后时间都属于认为为已经接收使用，因使用而产生任何的问题均不售后；用途自理，不包长久登录；如使用一段时间出现封号等或者其他问题都属自理，不负责售后。</li>
            <li>售后不负任何技术/方法指导，售后只做账号售后是否自登有效，售后不包含帮助客户使用过程中的各种问题，使用遇到问题需自行阅读各大官方使用指南（谢谢理解）。</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 