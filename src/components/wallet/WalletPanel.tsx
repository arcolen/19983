import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Key, Eye, EyeOff, Copy, Check, ExternalLink, RefreshCw, Trash2, Shield, ArrowRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { getAddressExplorerUrl } from '@/lib/ethereum';

interface WalletPanelProps {
  address: string;
  balance: string;
  mnemonic: string;
  isCreating: boolean;
  isImporting: boolean;
  error: string | null;
  onCreateWallet: (password: string) => Promise<void>;
  onImportWallet: (mnemonic: string, password: string) => Promise<void>;
  onRefreshBalance: () => Promise<void>;
  onResetWallet: () => void;
}

export function WalletPanel({
  address,
  balance,
  mnemonic,
  isCreating,
  isImporting,
  error,
  onCreateWallet,
  onImportWallet,
  onRefreshBalance,
  onResetWallet,
}: WalletPanelProps) {
  const [mode, setMode] = useState<'idle' | 'create' | 'import'>('idle');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [importMnemonic, setImportMnemonic] = useState('');
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const hasWallet = !!address;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCreate = async () => {
    if (!password || password.length < 6) return;
    if (password !== confirmPassword) return;
    await onCreateWallet(password);
    setMode('idle');
    setPassword('');
    setConfirmPassword('');
  };

  const handleImport = async () => {
    if (!importMnemonic.trim()) return;
    if (!password || password.length < 6) return;
    await onImportWallet(importMnemonic.trim(), password);
    setMode('idle');
    setImportMnemonic('');
    setPassword('');
  };

  // No wallet - show create/import
  if (!hasWallet) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-auto mb-4 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C5CE7]/20 to-[#00D2FF]/10"
          >
            <Wallet size={40} className="text-[#6C5CE7]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#F0F0F5]">创建您的钱包</h2>
          <p className="mt-2 text-sm text-[#8E8EA0]">
            使用 Token Core (tcx-wasm) 在本地创建自托管钱包
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <GlassCard hover onClick={() => setMode('create')} className="group">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6C5CE7]/20 to-[#A855F7]/10">
                    <Key size={24} className="text-[#6C5CE7]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F0F0F5] group-hover:text-[#6C5CE7] transition-colors">
                      创建新钱包
                    </h3>
                    <p className="text-sm text-[#8E8EA0]">生成新的助记词和钱包地址</p>
                  </div>
                  <ArrowRight size={16} className="text-[#5A5A72] group-hover:text-[#6C5CE7] transition-colors" />
                </div>
              </GlassCard>

              <GlassCard hover onClick={() => setMode('import')} className="group">
                <div className="flex items-center gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00D2FF]/20 to-[#6C5CE7]/10">
                    <Shield size={24} className="text-[#00D2FF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#F0F0F5] group-hover:text-[#00D2FF] transition-colors">
                      导入已有钱包
                    </h3>
                    <p className="text-sm text-[#8E8EA0]">使用助记词恢复钱包</p>
                  </div>
                  <ArrowRight size={16} className="text-[#5A5A72] group-hover:text-[#00D2FF] transition-colors" />
                </div>
              </GlassCard>

              <div className="rounded-xl border border-[#FFB74D]/20 bg-[#FFB74D]/5 p-3">
                <p className="text-xs text-[#FFB74D]">
                  ⚠️ 测试网演示项目 — 请勿输入真实资产的助记词
                </p>
              </div>
            </motion.div>
          )}

          {mode === 'create' && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <GlassCard>
                <h3 className="mb-4 text-lg font-semibold text-[#F0F0F5]">创建新钱包</h3>
                <div className="space-y-4">
                  <Input
                    label="设置密码（至少6位）"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="输入钱包密码"
                  />
                  <Input
                    label="确认密码"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="再次输入密码"
                    error={confirmPassword && password !== confirmPassword ? '密码不一致' : undefined}
                  />
                  {error && <p className="text-sm text-[#FF5252]">{error}</p>}
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setMode('idle')}>返回</Button>
                    <Button
                      variant="primary"
                      onClick={handleCreate}
                      disabled={isCreating || !password || password.length < 6 || password !== confirmPassword}
                      fullWidth
                    >
                      {isCreating ? <LoadingSpinner size="sm" /> : '创建钱包'}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {mode === 'import' && (
            <motion.div
              key="import"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <GlassCard>
                <h3 className="mb-4 text-lg font-semibold text-[#F0F0F5]">导入钱包</h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-[#8E8EA0]">助记词</label>
                    <textarea
                      value={importMnemonic}
                      onChange={(e) => setImportMnemonic(e.target.value)}
                      placeholder="输入12个助记词，用空格分隔"
                      className="w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[#F0F0F5] placeholder-[#5A5A72] focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7] transition-all duration-200 min-h-[80px] resize-none"
                    />
                  </div>
                  <Input
                    label="设置密码（至少6位）"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="输入钱包密码"
                  />
                  {error && <p className="text-sm text-[#FF5252]">{error}</p>}
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setMode('idle')}>返回</Button>
                    <Button
                      variant="secondary"
                      onClick={handleImport}
                      disabled={isImporting || !importMnemonic.trim() || !password || password.length < 6}
                      fullWidth
                    >
                      {isImporting ? <LoadingSpinner size="sm" /> : '导入钱包'}
                    </Button>
                  </div>
                </div>
              </GlassCard>

              <div className="rounded-xl border border-[#FF5252]/20 bg-[#FF5252]/5 p-3">
                <p className="text-xs text-[#FF5252]">
                  ⚠️ 请勿在此输入包含真实资产的助记词。本应用为测试网演示项目。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Has wallet - show wallet info
  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <GlassCard glow="primary" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7]/10 to-[#00D2FF]/5" />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet size={20} className="text-[#6C5CE7]" />
              <span className="text-sm font-medium text-[#8E8EA0]">我的钱包</span>
            </div>
            <Badge variant="primary" size="sm">Sepolia</Badge>
          </div>

          <div className="mb-4">
            <p className="text-sm text-[#8E8EA0]">余额</p>
            <p className="text-3xl font-bold gradient-text">{balance} ETH</p>
          </div>

          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-[rgba(255,255,255,0.06)] px-3 py-2 text-sm text-[#F0F0F5]">
              {address}
            </code>
            <button
              onClick={() => handleCopy(address, 'address')}
              className="shrink-0 rounded-lg bg-[rgba(255,255,255,0.06)] p-2 text-[#5A5A72] hover:text-[#F0F0F5] transition-colors"
            >
              {copied === 'address' ? <Check size={16} className="text-[#00E676]" /> : <Copy size={16} />}
            </button>
            <a
              href={getAddressExplorerUrl(address)}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg bg-[rgba(255,255,255,0.06)] p-2 text-[#5A5A72] hover:text-[#F0F0F5] transition-colors"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={onRefreshBalance}>
              <RefreshCw size={14} /> 刷新余额
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Mnemonic Section */}
      <GlassCard>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key size={16} className="text-[#FFB74D]" />
            <span className="font-semibold text-[#F0F0F5]">助记词</span>
          </div>
          <button
            onClick={() => setShowMnemonic(!showMnemonic)}
            className="flex items-center gap-1 rounded-lg bg-[rgba(255,255,255,0.06)] px-2 py-1 text-xs text-[#8E8EA0] hover:text-[#F0F0F5] transition-colors"
          >
            {showMnemonic ? <EyeOff size={12} /> : <Eye size={12} />}
            {showMnemonic ? '隐藏' : '显示'}
          </button>
        </div>

        {showMnemonic ? (
          <div className="space-y-3">
            <div className="rounded-xl bg-[rgba(255,82,82,0.05)] border border-[#FF5252]/20 p-3">
              <p className="text-xs text-[#FF5252] mb-2">⚠️ 请勿将助记词分享给任何人或输入到不受信任的环境中</p>
              <div className="flex flex-wrap gap-2">
                {mnemonic.split(' ').map((word, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-[rgba(255,255,255,0.06)] px-2.5 py-1 text-sm font-mono text-[#F0F0F5]"
                  >
                    <span className="text-[#5A5A72] mr-1">{i + 1}.</span>
                    {word}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleCopy(mnemonic, 'mnemonic')}>
              {copied === 'mnemonic' ? <Check size={14} className="text-[#00E676]" /> : <Copy size={14} />}
              {copied === 'mnemonic' ? '已复制' : '复制助记词'}
            </Button>
          </div>
        ) : (
          <p className="text-sm text-[#5A5A72]">点击"显示"查看助记词</p>
        )}
      </GlassCard>

      {/* Danger Zone */}
      <GlassCard className="border-[#FF5252]/10">
        <h4 className="mb-2 font-semibold text-[#FF5252]">危险操作</h4>
        <p className="mb-3 text-sm text-[#8E8EA0]">清除本地钱包数据。此操作不可恢复，请确保已备份助记词。</p>
        <Button variant="danger" size="sm" onClick={onResetWallet}>
          <Trash2 size={14} /> 清除钱包
        </Button>
      </GlassCard>
    </div>
  );
}
