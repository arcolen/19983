import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className={`relative w-full ${sizeClasses[size]} glass-card p-0 overflow-hidden`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] px-6 py-4">
              <h3 className="text-lg font-semibold text-[#F0F0F5]">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-[#5A5A72] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F0F0F5] transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SecurityAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  level: 'info' | 'warning' | 'danger';
  title: string;
  description: string;
}

export function SecurityAlertModal({
  isOpen,
  onClose,
  onConfirm,
  level,
  title,
  description,
}: SecurityAlertModalProps) {
  const icons = {
    info: <Info size={20} className="text-[#40C4FF]" />,
    warning: <AlertTriangle size={20} className="text-[#FFB74D]" />,
    danger: <ShieldAlert size={20} className="text-[#FF5252]" />,
  };

  const borderColors = {
    info: 'border-[#40C4FF]/30',
    warning: 'border-[#FFB74D]/30',
    danger: 'border-[#FF5252]/30',
  };

  const bgColors = {
    info: 'bg-[#40C4FF]/5',
    warning: 'bg-[#FFB74D]/5',
    danger: 'bg-[#FF5252]/5',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="安全提示" size="sm">
      <div className={`rounded-xl border p-4 ${borderColors[level]} ${bgColors[level]} mb-4`}>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">{icons[level]}</div>
          <div>
            <h4 className="font-semibold text-[#F0F0F5]">{title}</h4>
            <p className="mt-1 text-sm text-[#8E8EA0]">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] px-4 py-2.5 text-sm font-medium text-[#F0F0F5] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
        >
          取消
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors ${
            level === 'danger'
              ? 'bg-[#FF5252] hover:bg-[#FF1744]'
              : 'bg-gradient-to-r from-[#6C5CE7] to-[#A855F7] hover:brightness-110'
          }`}
        >
          我已了解，继续
        </button>
      </div>
    </Modal>
  );
}
