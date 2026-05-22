import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} relative`}>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[rgba(108,92,231,0.2)]"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#6C5CE7]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {text && <p className="text-sm text-[#8E8EA0]">{text}</p>}
    </div>
  );
}
