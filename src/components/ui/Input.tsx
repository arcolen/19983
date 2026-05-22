import { motion } from 'framer-motion';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'number';
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function Input({
  value,
  onChange,
  placeholder,
  type = 'text',
  label,
  error,
  className = '',
  icon,
}: InputProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[#8E8EA0]">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5A72]">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full rounded-xl border bg-[rgba(255,255,255,0.04)] px-4 py-3
            text-[#F0F0F5] placeholder-[#5A5A72]
            border-[rgba(255,255,255,0.1)]
            focus:border-[#6C5CE7] focus:outline-none focus:ring-1 focus:ring-[#6C5CE7]
            transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-[#FF5252]' : ''}
          `}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-[#FF5252]"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
