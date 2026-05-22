import { motion } from 'framer-motion';
import { Star, ShoppingCart, Tag } from 'lucide-react';
import type { Product } from '@/types';
import { GlassCard } from '../ui/GlassCard';
import { Badge } from '../ui/Badge';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onSelect, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <GlassCard hover onClick={() => onSelect(product)} className="group relative overflow-hidden">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute right-3 top-3">
            <Badge variant="gold" size="sm">-{product.discount}%</Badge>
          </div>
        )}

        {/* Product Image/Icon */}
        <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgba(108,92,231,0.15)] to-[rgba(0,210,255,0.1)] text-3xl shadow-inner">
          {product.image}
        </div>

        {/* Product Info */}
        <h3 className="font-semibold text-[#F0F0F5] group-hover:text-[#6C5CE7] transition-colors line-clamp-1">
          {product.nameZh}
        </h3>
        <p className="mt-1 text-xs text-[#8E8EA0] line-clamp-2">{product.descriptionZh}</p>

        {/* Price & Rating */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold gradient-text">${product.price}</span>
            <span className="text-xs text-[#5A5A72]">{product.currency}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="text-[#F6D365] fill-[#F6D365]" />
            <span className="text-xs text-[#8E8EA0]">{product.rating}</span>
          </div>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="flex items-center gap-0.5 rounded-md bg-[rgba(255,255,255,0.04)] px-1.5 py-0.5 text-[10px] text-[#5A5A72]">
                <Tag size={8} />{tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-center gap-2 bg-gradient-to-t from-[rgba(108,92,231,0.9)] to-[rgba(108,92,231,0.6)] px-4 py-3 text-sm font-medium text-white backdrop-blur-sm">
            <ShoppingCart size={14} /> 立即购买
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
