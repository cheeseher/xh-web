# 账户销售网站

## 部署状态
[![Vercel Production Deployment](https://img.shields.io/github/deployments/yourusername/xinghaiqiantai/Production?label=vercel&logo=vercel&logoColor=white)](https://vercel.com/dashboard)

## 自动部署说明
本项目使用 Vercel 进行自动部署：
- 当代码推送到 main 分支时，自动触发生产环境部署
- 所有分支都会生成预览部署
- 可在 Vercel Dashboard 查看部署历史和状态

## 项目概述
这是一个展示和销售各类账户（如邮箱、社交媒体等）的网站前端项目。网站提供直观的界面，让用户可以浏览和购买各种类型的账户。

## 注意
该项目的目的是制作高保真的演示原型，并不涉及后端开发。所有的数据和功能都为模拟数据，用于展示UI效果。

## 技术栈
- 前端框架：React.js + Next.js
- UI组件库：Tailwind CSS
- 状态管理：React Context API
- 图标库：React Icons

## 功能特点
- 账户分类展示
- 账户详情页
- 购物车功能
- 结账流程
- 响应式设计，适配各种设备

## 项目结构
```
/
├── public/            # 静态资源
├── src/
│   ├── components/    # 可复用组件
│   ├── pages/         # 页面组件
│   ├── styles/        # 样式文件
│   ├── context/       # 上下文状态管理
│   └── utils/         # 工具函数
└── package.json       # 项目依赖
```

## 开发指南
1. 安装依赖：`npm install`
2. 启动开发服务器：`npm run dev`
3. 构建生产版本：`npm run build`
4. 启动生产服务器：`npm start`

## 页面说明
- 首页：展示所有账户类别和热门账户
- 分类页：展示特定类别的账户
- 详情页：展示账户的详细信息
- 购物车页：管理已选账户
- 结账页：完成购买流程
- 关于我们：介绍网站的故事和使命
- 联系我们：提供联系方式和留言表单
- 常见问题：解答用户常见疑问

## 已完成功能
- [x] 首页布局和设计
- [x] 账户分类展示
- [x] 账户详情页
- [x] 购物车功能
- [x] 结账流程
- [x] 关于我们页面
- [x] 联系我们页面
- [x] 常见问题页面
- [x] 响应式设计

## 待改进功能
- [ ] 用户登录和注册功能
- [ ] 个人中心页面
- [ ] 订单管理功能
- [ ] 搜索功能优化
- [ ] 多语言支持
- [ ] 暗黑模式
- [ ] 性能优化
- [ ] 单元测试和集成测试
- [ ] SEO优化

## 项目反思
在开发过程中，我们遇到了一些挑战和学习了一些经验：

1. **TypeScript集成**：在项目中使用TypeScript提高了代码质量，但也带来了一些类型定义的挑战。未来可以考虑使用更完善的类型定义文件。

2. **状态管理**：使用React Context API管理购物车状态，对于中小型应用来说足够了。如果应用规模扩大，可以考虑使用Redux或MobX等更强大的状态管理库。

3. **组件复用**：我们创建了多个可复用组件，如AccountCard、CategoryCard等，提高了开发效率和代码一致性。

4. **响应式设计**：使用Tailwind CSS的响应式类，使网站在各种设备上都能良好显示。

5. **用户体验**：通过添加加载状态、表单验证等功能，提升了用户体验。

## 注意事项
本项目专注于前端展示功能，不涉及实际的后端接口实现。所有数据均为模拟数据，用于展示UI效果。

## 如何贡献
1. Fork本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个Pull Request 