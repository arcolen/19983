import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = `
    relative font-semibold rounded-xl transition-all duration-300
    flex items-center justify-center gap-2
    disabled:opacity-40 disabled:cursor-not-allowed
    overflow-hidden
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    hero: 'px-8 py-4 text-lg',
  };

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-[#6C5CE7] to-[#A855F7]
      text-white shadow-[0_0_20px_rgba(108,92,231,0.3)]
      hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] hover:brightness-110
    `,
    secondary: `
      bg-gradient-to-r from-[#00D2FF] to-[#6C5CE7]
      text-white shadow-[0_0_20px_rgba(0,210,255,0.2)]
      hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:brightness-110
    `,
    outline: `
      border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)]
      text-[#F0F0F5] hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.25)]
    `,
    ghost: `
      text-[#8E8EA0] hover:text-[#F0F0F5] hover:bg-[rgba(255,255,255,0.06)]
    `,
    danger: `
      bg-gradient-to-r from-[#FF5252] to-[#FF1744]
      text-white shadow-[0_0_20px_rgba(255,82,82,0.3)]
      hover:shadow-[0_0_30px_rgba(255,82,82,0.5)]
    `,
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.button>
  );
}
