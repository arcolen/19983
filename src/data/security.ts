import type { SecurityAlert } from '../types';

export const securityAlerts: SecurityAlert[] = [
  {
    level: 'info',
    title: '测试网演示项目',
    description: '本项目运行在 Sepolia 测试网上，不涉及真实资产。所有交易均为测试性质。',
    category: 'system',
  },
  {
    level: 'info',
    title: '自托管签名',
    description: '所有交易签名均通过 Token Core (tcx-wasm) 在本地完成，私钥永不离开您的设备。',
    category: 'sovereignty',
  },
  {
    level: 'warning',
    title: '合约交互风险',
    description: '与未知合约交互可能导致资产损失。请确认合约地址来源可信，避免盲签（Blind Signing）。',
    category: 'contract',
  },
  {
    level: 'warning',
    title: '授权风险提示',
    description: 'ERC-20 Approve 授权可能允许合约转移您的全部代币。建议仅授权所需金额，避免无限授权。',
    category: 'approval',
  },
  {
    level: 'danger',
    title: '钓鱼攻击防范',
    description: '切勿在非官方渠道输入助记词或私钥。任何索要助记词的行为都是诈骗。',
    category: 'phishing',
  },
  {
    level: 'danger',
    title: '私钥安全',
    description: '助记词和私钥是您资产的唯一凭证。请妥善备份，切勿分享给任何人或输入到不受信任的环境中。',
    category: 'key-security',
  },
];

export const preSignChecks = [
  {
    id: 'address-verify',
    label: '收款地址验证',
    description: '请仔细核对收款地址是否正确，防范地址替换攻击',
    required: true,
  },
  {
    id: 'amount-verify',
    label: '金额确认',
    description: '确认支付金额与预期一致，无异常扣费',
    required: true,
  },
  {
    id: 'network-verify',
    label: '网络确认',
    description: '确认交易网络为 Sepolia 测试网',
    required: true,
  },
  {
    id: 'contract-risk',
    label: '合约风险评估',
    description: '如涉及合约交互，请确认合约已通过安全审计',
    required: false,
  },
  {
    id: 'gas-verify',
    label: 'Gas 费用确认',
    description: '确认 Gas 费用在合理范围内，避免异常高 Gas 消耗',
    required: true,
  },
];

export function getSecurityAlertsForAction(action: string): SecurityAlert[] {
  switch (action) {
    case 'sign':
      return securityAlerts.filter(a => a.category === 'sovereignty' || a.category === 'contract');
    case 'approve':
      return securityAlerts.filter(a => a.category === 'approval' || a.category === 'contract');
    case 'import':
      return securityAlerts.filter(a => a.category === 'phishing' || a.category === 'key-security');
    default:
      return securityAlerts.filter(a => a.category === 'system');
  }
}
