import type { Order } from '../types';

const STORAGE_KEY = 'taobi_orders';
const WALLET_KEY = 'taobi_wallet';

export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWalletData(data: {
  address: string;
  keystoreJson: string;
  mnemonic: string;
}): void {
  localStorage.setItem(WALLET_KEY, JSON.stringify(data));
}

export function getWalletData(): {
  address: string;
  keystoreJson: string;
  mnemonic: string;
} | null {
  try {
    const data = localStorage.getItem(WALLET_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearWalletData(): void {
  localStorage.removeItem(WALLET_KEY);
}

export function generateRedeemCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments: string[] = [];
  for (let i = 0; i < 4; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join('-');
}

export function generateOrderId(): string {
  return 'TBO' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}
