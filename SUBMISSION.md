# 淘比 TaoBi — 提交材料

## 中文简介

**淘比（TaoBi）** 是一款面向 Bitrefill 生态的高端加密支付助手钱包。采用深色科技风 + 玻璃态设计语言，打造"私人支付管家"形象。核心功能包括：商品浏览与场景化推荐、自然语言意图支付、Token Core (tcx-wasm) 自托管签名、完整 Sepolia 测试网交易流程、多层安全审查体系。所有交易签名在本地 WebAssembly 环境中完成，私钥永不离开设备，充分体现钱包主权理念。

## English Introduction

**TaoBi** is a premium crypto payment butler for the Bitrefill ecosystem. Featuring a dark tech aesthetic with glassmorphism design language, it serves as a "Private Payment Butler." Core features include: product browsing with scene-based recommendations, natural language intent payment, Token Core (tcx-wasm) self-custody signing, complete Sepolia testnet transaction flow, and multi-layer security review system. All transaction signing is performed locally in a WebAssembly environment — private keys never leave the device, fully embodying wallet sovereignty.

## 创作笔记

### 1. 主权设计（Sovereignty by Design）

淘比的核心设计理念是"钱包主权"。我们深度集成了 Token Core (tcx-wasm)，确保所有交易签名在本地 WebAssembly 环境中完成。这意味着：

- 私钥生成、存储、使用全在本地完成
- 签名过程不依赖任何远程服务
- 用户可以验证每一步操作的安全性
- 即使应用服务器被攻破，用户资产仍然安全

这种设计参考了 Token UI 的安全理念，将"用户对自己资产的完全控制权"作为不可妥协的原则。

### 2. 测试网交易流程

我们实现了完整的端到端交易流程：

1. **钱包创建/导入**：通过 tcx-wasm 生成助记词和密钥对
2. **商品选择**：浏览、搜索、AI 推荐多种方式
3. **安全审查**：5 项强制检查（地址验证、金额确认、网络确认、合约风险、Gas 确认）
4. **本地签名**：tcx-wasm 在浏览器中完成交易签名
5. **网络广播**：将签名后的交易广播到 Sepolia 测试网
6. **交易确认**：显示交易哈希和 Etherscan 链接

### 3. UI 设计理念

参考高端银行 App（如 Revolut、N26）和奢侈品数字体验的设计语言：

- **深色渐变背景**：营造专业、高端的视觉氛围
- **玻璃态卡片**：半透明 + 模糊效果，增加层次感
- **微光影效果**：品牌色光晕，突出重要元素
- **流畅动画**：Framer Motion 驱动的页面切换和交互反馈
- **高级排版**：Inter + Noto Sans SC 字体组合，确保中英文都优雅

### 4. 安全材料深度使用

我们深度参考了 Token UI 的 Security 材料，构建了完整的安全提示体系：

- 6 类安全提示（系统、主权、合约、授权、钓鱼、密钥安全）
- 支付前 5 项强制安全审查
- 每项审查都有详细说明，帮助用户理解风险
- 明确标注"测试网演示项目"，防止误操作

### 5. AI 意图支付

自然语言意图解析系统支持：
- 中英文混合输入
- 金额提取（$100、100 美元、100块）
- 商品关键词匹配
- 场景识别（送礼、旅行等）
- 智能推荐排序
