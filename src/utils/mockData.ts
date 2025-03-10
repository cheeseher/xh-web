// 账户分类数据
export const categories = [
  {
    id: 'gmail',
    name: '谷歌邮箱',
    image: '/images/gmail.png',
    count: 13,
    description: '提供优质谷歌邮箱账户，已完成验证，可立即使用',
  },
  {
    id: 'outlook',
    name: '微软邮箱',
    image: '/images/outlook.png',
    count: 13,
    description: '提供优质微软邮箱账户，支持Office 365服务',
  },
  {
    id: 'yahoo',
    name: '雅虎邮箱',
    image: '/images/yahoo.png',
    count: 13,
    description: '提供优质雅虎邮箱账户，适合各类平台注册',
  },
  {
    id: 'gmx',
    name: 'GMX邮箱账号',
    image: '/images/gmx.png',
    count: 13,
    description: '提供优质GMX邮箱账户，德国知名邮箱服务',
  },
  {
    id: 'aol',
    name: '美国AOL邮箱',
    image: '/images/aol.png',
    count: 13,
    description: '提供优质AOL邮箱账户，美国老牌邮箱服务',
  },
  {
    id: 'protonmail',
    name: 'ProtonMail邮箱',
    image: '/images/protonmail.png',
    count: 13,
    description: '提供优质ProtonMail邮箱账户，注重隐私保护',
  },
  {
    id: 'mail',
    name: 'Mail.COM邮箱',
    image: '/images/mail.png',
    count: 13,
    description: '提供优质Mail.COM邮箱账户，国际化邮箱服务',
  },
  {
    id: 'naver',
    name: 'Naver邮箱',
    image: '/images/naver.png',
    count: 13,
    description: '提供优质Naver邮箱账户，韩国最大门户网站邮箱',
  },
  {
    id: 'rambler',
    name: '俄罗斯邮箱',
    image: '/images/rambler.png',
    count: 13,
    description: '提供优质俄罗斯邮箱账户，包括Rambler、Mail.ru等',
  },
  {
    id: 'german',
    name: '德国DE邮箱',
    image: '/images/german.png',
    count: 13,
    description: '提供优质德国DE邮箱账户，适合欧洲地区使用',
  },
  {
    id: 'other',
    name: '其他邮箱集合',
    image: '/images/other.png',
    count: 13,
    description: '提供其他各类优质邮箱账户',
  },
  {
    id: 'instagram',
    name: 'Instagram账号',
    image: '/images/instagram.png',
    count: 13,
    description: '提供优质Instagram账号，包含不同粉丝数量',
  },
  {
    id: 'twitter',
    name: 'Twitter账号',
    image: '/images/twitter.png',
    count: 13,
    description: '提供优质Twitter账号，包含不同粉丝数量',
  },
  {
    id: 'facebook',
    name: 'Facebook账号',
    image: '/images/facebook.png',
    count: 13,
    description: '提供优质Facebook账号，包含不同好友数量',
  },
  {
    id: 'discord',
    name: 'Discord账号',
    image: '/images/discord.png',
    count: 13,
    description: '提供优质Discord账号，包含Nitro会员',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT账号',
    image: '/images/chatgpt.png',
    count: 13,
    description: '提供优质ChatGPT账号，包含Plus会员',
  },
  {
    id: 'tiktok',
    name: 'TikTok账号',
    image: '/images/tiktok.png',
    count: 13,
    description: '提供优质TikTok账号，包含不同粉丝数量',
  },
  {
    id: 'amazon',
    name: '亚马逊账号',
    image: '/images/amazon.png',
    count: 13,
    description: '提供优质亚马逊账号，支持Prime会员',
  },
];

// 账户数据
export const accounts = [
  {
    id: 'gmail-1',
    title: 'Gmail邮箱-稳定可用（手工）',
    price: 4.20,
    originalPrice: 6.50,
    image: '/images/gmail.png',
    category: 'gmail',
    categoryName: '谷歌邮箱',
    stock: 427,
    batchPrice: '≥500/¥3.99',
    description: '账号密码将发送至此邮箱',
    features: [
      '全新注册，从未使用',
      '支持所有谷歌服务',
      '可用于各类平台注册',
      '24小时自动发货',
      '专业售后支持'
    ],
    deliveryMethod: '自动发货',
    verificationMethod: '填写便于自己记忆的查询密码'
  },
  // Gmail 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `gmail-${index + 1}`,
    title: `Gmail账户 ${['标准版', '高级版', '企业版'][index % 3]}`,
    price: [15.99, 25.99, 35.99][index % 3],
    image: '/images/gmail.png',
    category: 'gmail',
    categoryName: '谷歌邮箱',
    stock: 20,
    description: `优质Gmail账户，${['已完成手机验证，可立即使用', '已使用6个月以上，已完成所有验证', '已使用1年以上，适合商业用途'][index % 3]}`,
    features: [
      '已完成手机验证',
      '无需恢复邮箱',
      '可修改密码',
      '支持两步验证',
      ['账户年龄1个月+', '账户年龄6个月+', '账户年龄1年+'][index % 3],
    ],
  })),

  // Outlook 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `outlook-${index + 1}`,
    title: `微软邮箱账户 ${['基础版', '高级版', 'Office365版'][index % 3]}`,
    price: [12.99, 22.99, 32.99][index % 3],
    image: '/images/outlook.png',
    category: 'outlook',
    categoryName: '微软邮箱',
    stock: 20,
    description: `优质Outlook账户，${['已完成基础验证', '已使用6个月以上', '包含Office365订阅'][index % 3]}`,
    features: [
      '已完成邮箱验证',
      '可修改密码',
      '支持两步验证',
      ['基础存储空间', '5GB存储空间', '1TB OneDrive空间'][index % 3],
    ],
  })),

  // Yahoo 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `yahoo-${index + 1}`,
    title: `雅虎邮箱账户 ${['入门版', '标准版', '高级版'][index % 3]}`,
    price: [14.99, 24.99, 34.99][index % 3],
    image: '/images/yahoo.png',
    category: 'yahoo',
    categoryName: '雅虎邮箱',
    stock: 20,
    description: `优质Yahoo账户，${['基础验证完成', '使用记录6个月+', '高级账户状态'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['1GB存储空间', '5GB存储空间', '无限存储空间'][index % 3],
    ],
  })),

  // GMX 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `gmx-${index + 1}`,
    title: `GMX邮箱账户 ${['基础版', '标准版', '专业版'][index % 3]}`,
    price: [16.99, 26.99, 36.99][index % 3],
    image: '/images/gmx.png',
    category: 'gmx',
    categoryName: 'GMX邮箱账号',
    stock: 20,
    description: `德国GMX邮箱账户，${['基础功能完整', '已验证6个月+', '专业版特权'][index % 3]}`,
    features: [
      '德国IP注册',
      '已完成验证',
      '支持安全登录',
      ['2GB存储空间', '10GB存储空间', '50GB存储空间'][index % 3],
    ],
  })),

  // AOL 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `aol-${index + 1}`,
    title: `AOL邮箱账户 ${['基础版', '高级版', 'VIP版'][index % 3]}`,
    price: [13.99, 23.99, 33.99][index % 3],
    image: '/images/aol.png',
    category: 'aol',
    categoryName: '美国AOL邮箱',
    stock: 20,
    description: `美国AOL邮箱账户，${['基础验证完成', '使用超过6个月', 'VIP账户状态'][index % 3]}`,
    features: [
      '美国IP注册',
      '已完成验证',
      '可修改密码',
      ['基础功能', '高级功能', 'VIP特权'][index % 3],
    ],
  })),

  // ProtonMail 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `protonmail-${index + 1}`,
    title: `ProtonMail账户 ${['免费版', 'Plus版', 'Professional版'][index % 3]}`,
    price: [19.99, 29.99, 39.99][index % 3],
    image: '/images/protonmail.png',
    category: 'protonmail',
    categoryName: 'ProtonMail邮箱',
    stock: 20,
    description: `安全的ProtonMail账户，${['基础加密保护', 'Plus会员特权', '专业版特权'][index % 3]}`,
    features: [
      '端到端加密',
      '瑞士服务器',
      '匿名邮箱',
      ['500MB存储空间', '5GB存储空间', '20GB存储空间'][index % 3],
    ],
  })),

  // Mail.COM 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `mail-${index + 1}`,
    title: `Mail.COM账户 ${['基础版', '高级版', '商业版'][index % 3]}`,
    price: [11.99, 21.99, 31.99][index % 3],
    image: '/images/mail.png',
    category: 'mail',
    categoryName: 'Mail.COM邮箱',
    stock: 20,
    description: `优质Mail.COM账户，${['基础功能完整', '已验证6个月+', '商业版特权'][index % 3]}`,
    features: [
      '国际化邮箱',
      '已完成验证',
      '支持安全登录',
      ['2GB存储空间', '10GB存储空间', '50GB存储空间'][index % 3],
    ],
  })),

  // Naver 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `naver-${index + 1}`,
    title: `Naver账户 ${['基础版', '高级版', 'Premium版'][index % 3]}`,
    price: [15.99, 25.99, 35.99][index % 3],
    image: '/images/naver.png',
    category: 'naver',
    categoryName: 'Naver邮箱',
    stock: 20,
    description: `韩国Naver账户，${['基础功能完整', '已验证6个月+', 'Premium特权'][index % 3]}`,
    features: [
      '韩国IP注册',
      '已完成验证',
      '支持安全登录',
      ['2GB存储空间', '10GB存储空间', '30GB存储空间'][index % 3],
    ],
  })),

  // Rambler 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `rambler-${index + 1}`,
    title: `俄罗斯邮箱账户 ${['基础版', '高级版', 'VIP版'][index % 3]}`,
    price: [14.99, 24.99, 34.99][index % 3],
    image: '/images/rambler.png',
    category: 'rambler',
    categoryName: '俄罗斯邮箱',
    stock: 20,
    description: `俄罗斯邮箱账户，${['基础功能完整', '已验证6个月+', 'VIP特权'][index % 3]}`,
    features: [
      '俄罗斯IP注册',
      '已完成验证',
      '支持安全登录',
      ['5GB存储空间', '15GB存储空间', '100GB存储空间'][index % 3],
    ],
  })),

  // German DE 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `german-${index + 1}`,
    title: `德国DE邮箱账户 ${['基础版', '高级版', '商业版'][index % 3]}`,
    price: [16.99, 26.99, 36.99][index % 3],
    image: '/images/german.png',
    category: 'german',
    categoryName: '德国DE邮箱',
    stock: 20,
    description: `德国DE邮箱账户，${['基础功能完整', '已验证6个月+', '商业版特权'][index % 3]}`,
    features: [
      '德国IP注册',
      '已完成验证',
      '支持安全登录',
      ['2GB存储空间', '10GB存储空间', '50GB存储空间'][index % 3],
    ],
  })),

  // 其他邮箱账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `other-${index + 1}`,
    title: `其他邮箱账户 ${['基础版', '高级版', '特殊版'][index % 3]}`,
    price: [12.99, 22.99, 32.99][index % 3],
    image: '/images/other.png',
    category: 'other',
    categoryName: '其他邮箱集合',
    stock: 20,
    description: `其他类型邮箱账户，${['基础功能完整', '高级功能已开通', '特殊功能已开通'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持安全登录',
      ['基础存储空间', '扩展存储空间', '高级存储空间'][index % 3],
    ],
  })),

  // Instagram 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `instagram-${index + 1}`,
    title: `Instagram账号 ${['基础版', '高级版', '商业版'][index % 3]}`,
    price: [19.99, 29.99, 39.99][index % 3],
    image: '/images/instagram.png',
    category: 'instagram',
    categoryName: 'Instagram账号',
    stock: 20,
    description: `优质Instagram账号，${['基础功能完整', '已验证6个月+', '商业版认证'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['100+粉丝', '1000+粉丝', '5000+粉丝'][index % 3],
    ],
  })),

  // Twitter 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `twitter-${index + 1}`,
    title: `Twitter账号 ${['基础版', '高级版', '认证版'][index % 3]}`,
    price: [18.99, 28.99, 38.99][index % 3],
    image: '/images/twitter.png',
    category: 'twitter',
    categoryName: 'Twitter账号',
    stock: 20,
    description: `优质Twitter账号，${['基础功能完整', '已验证6个月+', '蓝V认证'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['200+粉丝', '2000+粉丝', '10000+粉丝'][index % 3],
    ],
  })),

  // Facebook 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `facebook-${index + 1}`,
    title: `Facebook账号 ${['基础版', '高级版', '商业版'][index % 3]}`,
    price: [17.99, 27.99, 37.99][index % 3],
    image: '/images/facebook.png',
    category: 'facebook',
    categoryName: 'Facebook账号',
    stock: 20,
    description: `优质Facebook账号，${['基础功能完整', '已验证6个月+', '商业版认证'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['300+好友', '3000+好友', '5000+好友'][index % 3],
    ],
  })),

  // Discord 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `discord-${index + 1}`,
    title: `Discord账号 ${['基础版', 'Nitro版', 'Nitro Pro版'][index % 3]}`,
    price: [12.99, 22.99, 32.99][index % 3],
    image: '/images/discord.png',
    category: 'discord',
    categoryName: 'Discord账号',
    stock: 20,
    description: `优质Discord账号，${['基础功能完整', 'Nitro会员', 'Nitro Pro会员'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['基础功能', 'Nitro特权', 'Nitro Pro特权'][index % 3],
    ],
  })),

  // ChatGPT 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `chatgpt-${index + 1}`,
    title: `ChatGPT账号 ${['基础版', 'Plus版', 'Team版'][index % 3]}`,
    price: [29.99, 39.99, 49.99][index % 3],
    image: '/images/chatgpt.png',
    category: 'chatgpt',
    categoryName: 'ChatGPT账号',
    stock: 20,
    description: `优质ChatGPT账号，${['基础功能完整', 'Plus会员', 'Team会员'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['基础模型', 'GPT-4访问', 'GPT-4团队版'][index % 3],
    ],
  })),

  // TikTok 账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `tiktok-${index + 1}`,
    title: `TikTok账号 ${['基础版', '高级版', '商业版'][index % 3]}`,
    price: [16.99, 26.99, 36.99][index % 3],
    image: '/images/tiktok.png',
    category: 'tiktok',
    categoryName: 'TikTok账号',
    stock: 20,
    description: `优质TikTok账号，${['基础功能完整', '已验证6个月+', '商业版认证'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['500+粉丝', '5000+粉丝', '20000+粉丝'][index % 3],
    ],
  })),

  // 亚马逊账户 - 13个
  ...Array(13).fill(null).map((_, index) => ({
    id: `amazon-${index + 1}`,
    title: `亚马逊账号 ${['基础版', 'Prime版', '企业版'][index % 3]}`,
    price: [24.99, 44.99, 89.99][index % 3],
    image: '/images/amazon.png',
    category: 'amazon',
    categoryName: '亚马逊账号',
    stock: 20,
    description: `亚马逊账号，${['基础购物功能', 'Prime会员特权', '企业购物特权'][index % 3]}`,
    features: [
      '已完成验证',
      '可修改密码',
      '支持双重认证',
      ['基础功能', 'Prime特权', '企业特权'][index % 3],
    ],
  })),
];

// 热门账户数据
export const featuredAccounts = [
  accounts.find(acc => acc.id === 'gmail-1'),
  accounts.find(acc => acc.id === 'outlook-1'),
  accounts.find(acc => acc.id === 'instagram-1'),
  accounts.find(acc => acc.id === 'twitter-1'),
  accounts.find(acc => acc.id === 'facebook-1'),
  accounts.find(acc => acc.id === 'discord-1'),
  accounts.find(acc => acc.id === 'chatgpt-1'),
  accounts.find(acc => acc.id === 'amazon-1'),
].filter(Boolean); 