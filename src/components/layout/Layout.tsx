import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShoppingBag, MessageSquare, Shield, Receipt } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  hasWallet: boolean;
}

const navItems = [
  { id: 'home', label: '首页', icon: ShoppingBag },
  { id: 'ai', label: 'AI 助手', icon: MessageSquare },
  { id: 'security', label: '安全', icon: Shield },
  { id: 'orders', label: '订单', icon: Receipt },
  { id: 'wallet', label: '钱包', icon: Wallet },
];

export function Layout({ children, currentPage, onNavigate, hasWallet }: LayoutProps) {
  return (
    <div className="min-h-screen animated-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,15,0.8)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#6C5CE7] to-[#00D2FF] text-lg font-bold text-white">
              淘
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text">淘比 TaoBi</h1>
              <p className="text-[10px] text-[#5A5A72]">Premium Crypto Payment Butler</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-[#FFB74D]/20 bg-[#FFB74D]/10 px-2 py-0.5 text-[10px] font-medium text-[#FFB74D]">
              Sepolia 测试网
            </span>
            {hasWallet && (
              <span className="rounded-full border border-[#00E676]/20 bg-[#00E676]/10 px-2 py-0.5 text-[10px] font-medium text-[#00E676]">
                已连接
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,15,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-all duration-200
                  ${isActive ? 'text-[#6C5CE7]' : 'text-[#5A5A72] hover:text-[#8E8EA0]'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#00D2FF]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom spacer for nav */}
      <div className="h-20" />
    </div>
  );
}
