import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Info, ShieldAlert, Lock, Eye, Key } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { securityAlerts } from '@/data/security';

export function SecurityPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D2FF]/10"
        >
          <Shield size={40} className="text-[#6C5CE7]" />
        </motion.div>
        <h2 className="text-2xl font-bold text-[#F0F0F5]">安全中心</h2>
        <p className="mt-2 text-sm text-[#8E8EA0]">基于 Token UI Security 材料构建的风险防护体系</p>
      </div>

      {/* Sovereignty Card */}
      <GlassCard glow="primary">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6C5CE7]/20 to-[#A855F7]/10">
            <Key size={24} className="text-[#6C5CE7]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#F0F0F5]">钱包主权</h3>
            <p className="mt-1 text-sm text-[#8E8EA0]">
              您的私钥由 Token Core (tcx-wasm) 在本地 WebAssembly 环境中管理，永不离开设备。
              所有交易签名均在本地完成，确保您对资产的完全控制权。
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="primary">自托管签名</Badge>
              <Badge variant="success">本地密钥管理</Badge>
              <Badge variant="neutral">零服务器依赖</Badge>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Security Principles */}
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Lock size={20} className="text-[#00D2FF]" />
            <h4 className="font-semibold text-[#F0F0F5]">签名安全</h4>
          </div>
          <ul className="space-y-2 text-sm text-[#8E8EA0]">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              签名前完整解码并展示交易意图
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              多层安全审查确认机制
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              防止盲签（Blind Signing）攻击
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              Token Core WASM 沙箱签名
            </li>
          </ul>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Eye size={20} className="text-[#00D2FF]" />
            <h4 className="font-semibold text-[#F0F0F5]">交易透明</h4>
          </div>
          <ul className="space-y-2 text-sm text-[#8E8EA0]">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              完整展示收款地址和金额
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              Gas 费用预估和确认
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              合约交互风险提示
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#6C5CE7]" />
              ERC-20 授权金额展示
            </li>
          </ul>
        </GlassCard>
      </div>

      {/* Security Alerts */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-[#F0F0F5]">风险提示</h3>
        <div className="space-y-3">
          {securityAlerts.map((alert, i) => (
            <motion.div
              key={alert.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-4 ${
                alert.level === 'info'
                  ? 'border-[#40C4FF]/20 bg-[#40C4FF]/5'
                  : alert.level === 'warning'
                  ? 'border-[#FFB74D]/20 bg-[#FFB74D]/5'
                  : 'border-[#FF5252]/20 bg-[#FF5252]/5'
              }`}
            >
              <div className="flex items-start gap-3">
                {alert.level === 'info' && <Info size={18} className="mt-0.5 shrink-0 text-[#40C4FF]" />}
                {alert.level === 'warning' && <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#FFB74D]" />}
                {alert.level === 'danger' && <ShieldAlert size={18} className="mt-0.5 shrink-0 text-[#FF5252]" />}
                <div>
                  <h4 className="font-semibold text-[#F0F0F5]">{alert.title}</h4>
                  <p className="mt-1 text-sm text-[#8E8EA0]">{alert.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testnet Notice */}
      <GlassCard className="border-[#FFB74D]/20">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-[#FFB74D]" />
          <div>
            <h4 className="font-semibold text-[#FFB74D]">测试网演示项目</h4>
            <p className="mt-1 text-sm text-[#8E8EA0]">
              本项目运行在 Sepolia 测试网上，不涉及真实资产。所有交易均为测试性质。
              请勿将真实助记词或私钥输入到本应用中。
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
