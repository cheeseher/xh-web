// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    email: 'test@example.com',
    password: 'test123',
    username: 'test',
    avatar: '/images/default-avatar.png',
    isVip: true,
    vipLevel: 2,
    balance: 1000.00,
    createdAt: new Date().toISOString(),
  }
];

export const login = async (email: string, password: string) => {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));

  // 创建演示用户数据
  const demoUser = {
    id: Math.random().toString(36).substr(2, 9),
    email: email,
    username: email.split('@')[0],
    avatar: '/images/default-avatar.png',
    isVip: true,
    vipLevel: 1,
    balance: 1000.00,
    createdAt: new Date().toISOString(),
  };

  return demoUser;
};

export const checkAuth = () => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}; 