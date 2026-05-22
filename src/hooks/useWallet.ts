import { useState, useCallback } from 'react';
import type { WalletState } from '../types';
import { createWallet, importWalletFromMnemonic, initTcxWasm } from '../lib/tcx-wasm';
import { getBalance } from '../lib/ethereum';
import { saveWalletData, getWalletData, clearWalletData } from '../lib/storage';

const initialState: WalletState = {
  isInitialized: false,
  address: '',
  balance: '0',
  network: 'sepolia',
  keystoreJson: '',
  mnemonic: '',
};

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = getWalletData();
    if (saved) {
      return {
        ...initialState,
        isInitialized: true,
        address: saved.address,
        keystoreJson: saved.keystoreJson,
        mnemonic: saved.mnemonic,
      };
    }
    return initialState;
  });

  const [isCreating, setIsCreating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNewWallet = useCallback(async (password: string) => {
    setIsCreating(true);
    setError(null);
    try {
      await initTcxWasm();
      const result = await createWallet(password);
      const balance = await getBalance(result.address);
      const newWallet: WalletState = {
        isInitialized: true,
        address: result.address,
        balance,
        network: 'sepolia',
        keystoreJson: result.keystoreJson,
        mnemonic: result.mnemonic,
      };
      setWallet(newWallet);
      saveWalletData({
        address: result.address,
        keystoreJson: result.keystoreJson,
        mnemonic: result.mnemonic,
      });
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to create wallet';
      setError(msg);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const importWallet = useCallback(async (mnemonic: string, password: string) => {
    setIsImporting(true);
    setError(null);
    try {
      await initTcxWasm();
      const result = await importWalletFromMnemonic(mnemonic, password);
      const balance = await getBalance(result.address);
      const newWallet: WalletState = {
        isInitialized: true,
        address: result.address,
        balance,
        network: 'sepolia',
        keystoreJson: result.keystoreJson,
        mnemonic: result.mnemonic,
      };
      setWallet(newWallet);
      saveWalletData({
        address: result.address,
        keystoreJson: result.keystoreJson,
        mnemonic: result.mnemonic,
      });
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to import wallet';
      setError(msg);
      throw err;
    } finally {
      setIsImporting(false);
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!wallet.address) return;
    try {
      const balance = await getBalance(wallet.address);
      setWallet(prev => ({ ...prev, balance }));
    } catch {
      // silently fail
    }
  }, [wallet.address]);

  const resetWallet = useCallback(() => {
    setWallet(initialState);
    clearWalletData();
  }, []);

  return {
    wallet,
    isCreating,
    isImporting,
    error,
    createNewWallet,
    importWallet,
    refreshBalance,
    resetWallet,
  };
}
