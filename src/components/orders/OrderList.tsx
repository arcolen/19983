import { motion } from 'framer-motion';
import { Receipt, ExternalLink, Copy, Check, Clock, CheckCircle2, XCircle } from 'lucide-react';
import type { Order } from '@/types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';
import { getSepoliaExplorerUrl } from '@/lib/ethereum';
import { useState } from 'react';

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const statusConfig = {
    pending: { label: '确认中', variant: 'warning' as const, icon: Clock },
    confirmed: { label: '已完成', variant: 'success' as const, icon: CheckCircle2 },
    failed: { label: '失败', variant: 'danger' as const, icon: XCircle },
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4 flex size-20 items-center justify-center rounded-2xl bg-[rgba(255,255,255,0.04)]"
        >
          <Receipt size={40} className="text-[#5A5A72]" />
        </motion.div>
        <h3 className="text-lg font-bold text-[#F0F0F5]">暂无订单</h3>
        <p className="mt-1 text-sm text-[#8E8EA0]">购买礼品卡后，订单将显示在这里</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#F0F0F5]">订单记录</h2>
      {orders.map((order, i) => {
        const status = statusConfig[order.status];
        const StatusIcon = status.icon;

        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-[#F0F0F5]">{order.productName}</h4>
                  <p className="text-xs text-[#5A5A72] font-mono">{order.id}</p>
                </div>
                <Badge variant={status.variant} size="sm">
                  <StatusIcon size={10} className="mr-1" />
                  {status.label}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-[#8E8EA0]">金额</span>
                  <span className="text-sm font-semibold text-[#F0F0F5]">${order.amount} {order.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#8E8EA0]">网络</span>
                  <span className="text-sm text-[#F0F0F5]">{order.network}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#8E8EA0]">兑换码</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-[#6C5CE7]">{order.redeemCode}</span>
                    <button
                      onClick={() => handleCopy(order.redeemCode, order.id)}
                      className="text-[#5A5A72] hover:text-[#F0F0F5] transition-colors"
                    >
                      {copied === order.id ? (
                        <Check size={14} className="text-[#00E676]" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {order.txHash && (
                <a
                  href={getSepoliaExplorerUrl(order.txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.04)] px-3 py-2 text-xs text-[#6C5CE7] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                >
                  <ExternalLink size={12} />
                  查看交易: {order.txHash.slice(0, 16)}...{order.txHash.slice(-8)}
                </a>
              )}

              <p className="mt-2 text-[10px] text-[#5A5A72]">
                {new Date(order.createdAt).toLocaleString('zh-CN')}
              </p>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
