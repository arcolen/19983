import type { AIIntent, ProductCategory } from '../types';
import { products } from '../data/products';

const categoryKeywords: Record<string, ProductCategory[]> = {
  '游戏': ['gaming'],
  'game': ['gaming'],
  'gaming': ['gaming'],
  'steam': ['gaming'],
  'playstation': ['gaming'],
  'xbox': ['gaming'],
  'nintendo': ['gaming'],
  '电影': ['entertainment'],
  'movie': ['entertainment'],
  'netflix': ['entertainment'],
  '视频': ['entertainment'],
  '购物': ['shopping'],
  'shop': ['shopping'],
  'amazon': ['shopping'],
  'apple': ['shopping'],
  '旅行': ['travel'],
  'travel': ['travel'],
  'uber': ['travel'],
  'airbnb': ['travel'],
  '餐': ['food'],
  'food': ['food'],
  'coffee': ['food'],
  'starbucks': ['food'],
  '咖啡': ['food'],
  '音乐': ['music'],
  'music': ['music'],
  'spotify': ['music'],
  '教育': ['education'],
  'learn': ['education'],
  'udemy': ['education'],
  '软件': ['software'],
  'software': ['software'],
  'microsoft': ['software'],
  '话费': ['phone'],
  'phone': ['phone'],
  'refill': ['phone'],
  '送礼': ['shopping', 'entertainment'],
  'gift': ['shopping', 'entertainment'],
  '朋友': ['shopping', 'entertainment'],
  'friend': ['shopping', 'entertainment'],
};

function extractAmount(input: string): number | undefined {
  const patterns = [
    /\$(\d+)/,
    /(\d+)\s*美元/,
    /(\d+)\s*USD/i,
    /(\d+)\s*dollar/i,
    /(\d+)\s*块/,
  ];
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return parseInt(match[1], 10);
  }
  return undefined;
}

function extractCategories(input: string): ProductCategory[] {
  const found: ProductCategory[] = [];
  const lower = input.toLowerCase();
  for (const [keyword, cats] of Object.entries(categoryKeywords)) {
    if (lower.includes(keyword)) {
      for (const cat of cats) {
        if (!found.includes(cat)) found.push(cat);
      }
    }
  }
  return found;
}

function extractProduct(input: string): string | undefined {
  const productNames = ['apple', 'steam', 'amazon', 'netflix', 'spotify', 'uber', 'starbucks', 'playstation', 'xbox', 'airbnb', 'nintendo', 'udemy', 'microsoft', 't-mobile'];
  const lower = input.toLowerCase();
  for (const name of productNames) {
    if (lower.includes(name)) return name;
  }
  return undefined;
}

export function parseIntent(input: string): AIIntent {
  const lower = input.toLowerCase();

  let action: AIIntent['action'] = 'browse';
  if (lower.includes('买') || lower.includes('购买') || lower.includes('buy') || lower.includes('get') || lower.includes('订购')) {
    action = 'buy';
  } else if (lower.includes('搜索') || lower.includes('找') || lower.includes('search') || lower.includes('查找')) {
    action = 'search';
  }

  const amount = extractAmount(input);
  const categories = extractCategories(input);
  const product = extractProduct(input);
  const hasRecipient = lower.includes('送') || lower.includes('朋友') || lower.includes('gift') || lower.includes('friend') || lower.includes('家人');

  let confidence = 0.5;
  if (action !== 'browse') confidence += 0.2;
  if (amount) confidence += 0.1;
  if (product) confidence += 0.1;
  if (categories.length > 0) confidence += 0.1;

  return {
    action,
    product,
    amount,
    category: categories[0],
    recipient: hasRecipient ? 'friend' : undefined,
    confidence: Math.min(confidence, 1),
  };
}

export function getRecommendedProducts(intent: AIIntent) {
  let filtered = [...products];

  if (intent.category) {
    filtered = filtered.filter(p => p.category === intent.category);
  }

  if (intent.product) {
    const nameMatch = products.filter(p =>
      p.name.toLowerCase().includes(intent.product!.toLowerCase()) ||
      p.nameZh.includes(intent.product!)
    );
    if (nameMatch.length > 0) {
      filtered = nameMatch;
    }
  }

  if (intent.amount) {
    filtered = filtered.filter(p => p.price <= intent.amount! * 1.2);
    filtered.sort((a, b) => {
      const diffA = Math.abs(a.price - intent.amount!);
      const diffB = Math.abs(b.price - intent.amount!);
      return diffA - diffB;
    });
  }

  if (filtered.length === 0) {
    filtered = products.filter(p => p.featured);
  }

  return filtered.slice(0, 6);
}

export function generateIntentResponse(intent: AIIntent): string {
  const parts: string[] = [];

  if (intent.action === 'buy') {
    parts.push('我理解您想要购买');
  } else if (intent.action === 'search') {
    parts.push('我为您搜索了');
  } else {
    parts.push('为您推荐');
  }

  if (intent.product) {
    parts.push(` ${intent.product} 相关产品`);
  }
  if (intent.amount) {
    parts.push(`，预算约 $${intent.amount}`);
  }
  if (intent.recipient) {
    parts.push('，用于送礼');
  }

  parts.push('。以下是精选推荐：');

  return parts.join('');
}
