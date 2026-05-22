import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'primary' | 'secondary' | 'none';
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  hover = false,
  glow = 'none',
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        glass-card p-6
        ${hover ? 'glass-card-hover cursor-pointer transition-all duration-300' : ''}
        ${glow === 'primary' ? 'glow-primary' : ''}
        ${glow === 'secondary' ? 'glow-secondary' : ''}
        ${className}
      `}
      whileHover={hover ? { y: -2, scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
