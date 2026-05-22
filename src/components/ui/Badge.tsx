import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'gold';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'primary', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-[#6C5CE7]/15 text-[#6C5CE7] border-[#6C5CE7]/20',
    success: 'bg-[#00E676]/15 text-[#00E676] border-[#00E676]/20',
    warning: 'bg-[#FFB74D]/15 text-[#FFB74D] border-[#FFB74D]/20',
    danger: 'bg-[#FF5252]/15 text-[#FF5252] border-[#FF5252]/20',
    neutral: 'bg-[rgba(255,255,255,0.06)] text-[#8E8EA0] border-[rgba(255,255,255,0.1)]',
    gold: 'bg-[#F6D365]/15 text-[#F6D365] border-[#F6D365]/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded-full border font-medium ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
