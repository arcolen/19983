import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User } from 'lucide-react';
import type { Product, AIIntent } from '@/types';
import { parseIntent, getRecommendedProducts, generateIntentResponse } from '@/lib/ai-intent';
import { ProductCard } from '../products/ProductCard';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface AIAssistantProps {
  onSelectProduct: (product: Product) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  intent?: AIIntent;
  products?: Product[];
}

const suggestions = [
  '买一张 100 美元 Apple 礼品卡送朋友',
  '推荐一些游戏相关的礼品卡',
  '50 美元以内的 Netflix 或 Spotify',
  '旅行需要什么礼品卡？',
];

export function AIAssistant({ onSelectProduct }: AIAssistantProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '您好！我是淘比 AI 助手。告诉我您想买什么，例如："买一张 100 美元 Apple 礼品卡送朋友"',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
    };

    const intent = parseIntent(input);
    const recommended = getRecommendedProducts(intent);
    const response = generateIntentResponse(intent);

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response,
      intent,
      products: recommended,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-180px)] flex-col">
      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-[#6C5CE7] to-[#A855F7]'
                  : 'bg-gradient-to-br from-[#00D2FF] to-[#6C5CE7]'
              }`}>
                {msg.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
              </div>
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#6C5CE7]/20 text-[#F0F0F5]'
                    : 'glass-card text-[#F0F0F5]'
                }`}>
                  {msg.content}
                </div>
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {msg.products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={onSelectProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-xs text-[#8E8EA0] hover:bg-[rgba(255,255,255,0.08)] hover:text-[#F0F0F5] transition-colors"
            >
              <Sparkles size={10} className="mr-1 inline" />
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-2 border-t border-[rgba(255,255,255,0.06)] pt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入您的需求，如：买一张 50 美元 Steam 卡..."
          className="flex-1 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-3 text-[#F0F0F5] placeholder-[#5A5A72] focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7] transition-all duration-200"
        />
        <Button variant="primary" size="md" onClick={handleSend} disabled={!input.trim()}>
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
}
