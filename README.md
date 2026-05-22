# 淘比 TaoBi — Premium Bitrefill Crypto Payment Butler

> imToken 10周年 AI 共创活动 · Bitrefill 合作伙伴赛道参赛作品

## 🌟 项目简介

**淘比（TaoBi）** 是一款高端、专业、极具质感的 Bitrefill 电商助手钱包。采用深色高级科技风设计，打造"私人支付管家"形象，帮助用户优雅、安全地完成礼品卡、充值等支付，重点体现高端用户体验和钱包主权。

**TaoBi** is a premium Bitrefill e-commerce assistant wallet featuring a dark, high-tech aesthetic design. It serves as a "Private Payment Butler," helping users elegantly and securely complete gift card purchases and top-ups, emphasizing premium user experience and wallet sovereignty.

## ✨ 核心特性

### 🎨 高端视觉与交互
- 深色渐变 + 玻璃态（Glassmorphism）+ 微光影高级 UI
- 流畅动画（Framer Motion）+ 高级排版
- 类高端银行 App / 奢侈品数字体验的设计语言

### 🛍️ 商品浏览与智能推荐
- 高质量商品展示（Mock 数据）
- 热门推荐 + 分类浏览 + 搜索
- 场景化推荐（旅行、送礼、娱乐等）

### 🤖 自然语言意图支付
- 输入如"买一张 100 美元 Apple 礼品卡送朋友"
- AI 智能识别意图并推荐匹配商品

### 🔐 完整测试网交易流程
- 使用 Token Core (tcx-wasm) 创建钱包 + 导入
- 支付前多层安全审查（深度使用 Security 材料）
- Token Core 自托管签名
- **真实广播到 Sepolia 测试网**，显示交易哈希 + 区块链浏览器链接

### 🎉 支付成功高级体验
- 优雅的成功动画
- 显示模拟兑换码（高端卡片样式）
- 完整订单记录

## 🛡️ 安全设计

- **自托管签名**：所有交易签名通过 Token Core (tcx-wasm) 在本地 WebAssembly 环境中完成，私钥永不离开设备
- **多层安全审查**：支付前强制完成地址验证、金额确认、网络确认、Gas 费用确认等安全检查
- **风险提示体系**：基于 Token UI Security 材料构建，涵盖合约风险、授权风险、钓鱼防范等
- **测试网标注**：明确标注"测试网演示项目"，防止误操作

## 🏗️ 技术栈

- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS 4 + Glassmorphism
- **Animation**: Framer Motion
- **Wallet**: Token Core (tcx-wasm) — 自托管签名
- **Network**: Sepolia 测试网
- **Icons**: Lucide React

## 📁 项目结构

```
src/
├── components/
│   ├── ai/           # AI 智能助手
│   ├── layout/       # 布局组件
│   ├── orders/       # 订单列表
│   ├── payment/      # 支付流程
│   ├── products/     # 商品展示
│   ├── security/     # 安全中心
│   ├── ui/           # 基础 UI 组件
│   └── wallet/       # 钱包管理
├── data/             # Mock 数据
├── hooks/            # React Hooks
├── lib/              # 核心库
│   ├── ai-intent.ts  # AI 意图解析
│   ├── ethereum.ts   # 以太坊 RPC
│   ├── storage.ts    # 本地存储
│   └── tcx-wasm.ts   # Token Core 集成
├── styles/           # 全局样式
└── types/            # TypeScript 类型
```

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 预览
npm run preview
```

## 🌐 部署

### Vercel
```bash
npm run build
# 将 dist 目录部署到 Vercel
```

### Netlify
```bash
npm run build
# 将 dist 目录部署到 Netlify
# 添加 _redirects 文件：/* /index.html 200
```

## 📝 创作笔记

### 主权设计理念
淘比的核心设计理念是"钱包主权"——用户对自己的资产拥有完全控制权。通过 Token Core (tcx-wasm) 实现本地签名，私钥永不离开用户设备，真正实现了"Not your keys, not your coins"的原则。

### 测试网交易流程
完整的交易流程包括：商品选择 → 安全审查 → 本地签名 → 网络广播 → 交易确认。每一步都有清晰的 UI 反馈和安全提示，确保用户始终了解交易状态。

### UI 设计理念
参考高端银行 App 和奢侈品数字体验的设计语言，采用深色渐变 + 玻璃态 + 微光影的组合，营造"私人支付管家"的高端形象。每一个交互细节都经过精心设计，从按钮的微动画到成功页面的脉冲光环效果。

## ⚠️ 免责声明

本项目为 imToken 10周年 AI 共创活动的参赛作品，运行在 Sepolia 测试网上，**不涉及任何真实资产**。请勿将包含真实资产的助记词或私钥输入到本应用中。

## 📄 License

MIT
