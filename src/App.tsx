import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { WalletPanel } from './components/wallet/WalletPanel';
import { ProductList } from './components/products/ProductList';
import { SceneRecommendations } from './components/products/SceneRecommendations';
import { AIAssistant } from './components/ai/AIAssistant';
import { PaymentFlow } from './components/payment/PaymentFlow';
import { SecurityPanel } from './components/security/SecurityPanel';
import { OrderList } from './components/orders/OrderList';
import { useWallet } from './hooks/useWallet';
import { useOrders } from './hooks/useOrders';
import { Toast } from './components/ui/Toast';
import type { Product } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [walletPassword, setWalletPassword] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const {
    wallet,
    isCreating,
    isImporting,
    error: walletError,
    createNewWallet,
    importWallet,
    refreshBalance,
    resetWallet,
  } = useWallet();

  const { orders, addOrder } = useOrders();

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCreateWallet = useCallback(async (password: string) => {
    await createNewWallet(password);
    setWalletPassword(password);
    showToast('钱包创建成功！', 'success');
  }, [createNewWallet, showToast]);

  const handleImportWallet = useCallback(async (mnemonic: string, password: string) => {
    await importWallet(mnemonic, password);
    setWalletPassword(password);
    showToast('钱包导入成功！', 'success');
  }, [importWallet, showToast]);

  const handleSelectProduct = useCallback((product: Product) => {
    if (!wallet.isInitialized) {
      showToast('请先创建或导入钱包', 'error');
      setCurrentPage('wallet');
      return;
    }
    setSelectedProduct(product);
  }, [wallet.isInitialized, showToast]);

  const handlePaymentComplete = useCallback((txHash: string, redeemCode: string) => {
    if (selectedProduct) {
      addOrder({
        productId: selectedProduct.id,
        productName: selectedProduct.nameZh,
        amount: selectedProduct.price,
        currency: selectedProduct.currency,
        txHash,
        status: 'confirmed',
        network: 'sepolia',
      });
      showToast('支付成功！兑换码已生成', 'success');
    }
  }, [selectedProduct, addOrder, showToast]);

  const handleNavigate = useCallback((page: string) => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    setCurrentPage(page);
  }, [selectedProduct]);

  const renderPage = () => {
    // If a product is selected, show payment flow
    if (selectedProduct) {
      return (
        <motion.div
          key="payment"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <PaymentFlow
            product={selectedProduct}
            walletAddress={wallet.address}
            keystoreJson={wallet.keystoreJson}
            walletPassword={walletPassword}
            onPaymentComplete={handlePaymentComplete}
            onCancel={() => setSelectedProduct(null)}
          />
        </motion.div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6C5CE7]/20 via-[#A855F7]/10 to-[#00D2FF]/20 p-8">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold gradient-text">用 Crypto 优雅支付</h2>
                <p className="mt-2 text-[#8E8EA0]">Bitrefill 礼品卡 · 充值 · 自托管签名</p>
                {!wallet.isInitialized && (
                  <button
                    onClick={() => setCurrentPage('wallet')}
                    className="mt-4 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#A855F7] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all"
                  >
                    创建钱包开始体验
                  </button>
                )}
              </div>
              <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#6C5CE7]/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 size-40 rounded-full bg-[#00D2FF]/10 blur-3xl" />
            </div>

            {/* Scene Recommendations */}
            <SceneRecommendations onSelectScene={() => {}} />

            {/* Product List */}
            <ProductList onSelectProduct={handleSelectProduct} />
          </motion.div>
        );

      case 'ai':
        return (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AIAssistant onSelectProduct={handleSelectProduct} />
          </motion.div>
        );

      case 'security':
        return (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SecurityPanel />
          </motion.div>
        );

      case 'orders':
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <OrderList orders={orders} />
          </motion.div>
        );

      case 'wallet':
        return (
          <motion.div
            key="wallet"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <WalletPanel
              address={wallet.address}
              balance={wallet.balance}
              mnemonic={wallet.mnemonic}
              isCreating={isCreating}
              isImporting={isImporting}
              error={walletError}
              onCreateWallet={handleCreateWallet}
              onImportWallet={handleImportWallet}
              onRefreshBalance={refreshBalance}
              onResetWallet={resetWallet}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      hasWallet={wallet.isInitialized}
    >
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>

      <Toast
        message={toast?.message || ''}
        type={toast?.type || 'info'}
        isVisible={!!toast}
        onClose={() => setToast(null)}
      />
    </Layout>
  );
}
