import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Product, ProductCategory } from '@/types';
import { products, categories } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  onSelectProduct: (product: Product) => void;
}

export function ProductList({ onSelectProduct }: ProductListProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.nameZh.includes(search) ||
      p.tags.some((t) => t.includes(search.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featured = products.filter((p) => p.featured);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5A5A72]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索礼品卡、充值卡..."
          className="w-full rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] py-3 pl-11 pr-12 text-[#F0F0F5] placeholder-[#5A5A72] focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7] transition-all duration-200"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 transition-colors ${
            showFilters ? 'bg-[#6C5CE7]/20 text-[#6C5CE7]' : 'text-[#5A5A72] hover:text-[#8E8EA0]'
          }`}
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Category Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 pb-2">
              <button
                onClick={() => setActiveCategory('all')}
                className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-[#6C5CE7] text-white'
                    : 'bg-[rgba(255,255,255,0.04)] text-[#8E8EA0] hover:bg-[rgba(255,255,255,0.08)]'
                }`}
              >
                全部
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as ProductCategory)}
                  className={`rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-[#6C5CE7] text-white'
                      : 'bg-[rgba(255,255,255,0.04)] text-[#8E8EA0] hover:bg-[rgba(255,255,255,0.08)]'
                  }`}
                >
                  {cat.icon} {cat.nameZh}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Section */}
      {!search && activeCategory === 'all' && (
        <div>
          <h2 className="mb-4 text-xl font-bold text-[#F0F0F5]">热门推荐</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* All / Filtered Products */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-[#F0F0F5]">
          {search ? `搜索结果 (${filtered.length})` : activeCategory !== 'all' ? `${categories.find(c => c.id === activeCategory)?.nameZh || ''}分类` : '全部商品'}
        </h2>
        {filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-[#5A5A72]">没有找到匹配的商品</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
