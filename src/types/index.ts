export interface Product {
  id: string;
  name: string;
  nameZh: string;
  category: ProductCategory;
  price: number;
  currency: string;
  image: string;
  description: string;
  descriptionZh: string;
  rating: number;
  sales: number;
  tags: string[];
  region: string;
  discount?: number;
  featured?: boolean;
}

export type ProductCategory =
  | 'gaming'
  | 'entertainment'
  | 'shopping'
  | 'travel'
  | 'food'
  | 'education'
  | 'music'
  | 'software'
  | 'phone'
  | 'other';

export interface WalletState {
  isInitialized: boolean;
  address: string;
  balance: string;
  network: 'sepolia';
  keystoreJson: string;
  mnemonic: string;
}

export interface TransactionPayload {
  to: string;
  value: string;
  gasPrice: string;
  gasLimit: string;
  nonce: string;
  chainId: number;
  data?: string;
}

export interface SignedTransaction {
  rawTx: string;
  txHash: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  amount: number;
  currency: string;
  txHash: string;
  redeemCode: string;
  status: 'pending' | 'confirmed' | 'failed';
  createdAt: number;
  network: string;
}

export interface SecurityAlert {
  level: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
  category: string;
}

export interface AIIntent {
  action: 'buy' | 'search' | 'browse';
  product?: string;
  amount?: number;
  recipient?: string;
  category?: ProductCategory;
  confidence: number;
}

export interface SceneRecommendation {
  id: string;
  title: string;
  titleZh: string;
  icon: string;
  description: string;
  products: string[];
}
