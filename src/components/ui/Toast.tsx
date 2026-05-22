import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

export function Toast({ message, type = 'info', isVisible, onClose }: ToastProps) {
  const icons = {
    success: <CheckCircle size={18} className="text-[#00E676]" />,
    error: <AlertCircle size={18} className="text-[#FF5252]" />,
    info: <Info size={18} className="text-[#40C4FF]" />,
  };

  const borderColors = {
    success: 'border-[#00E676]/30',
    error: 'border-[#FF5252]/30',
    info: 'border-[#40C4FF]/30',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-4 right-4 z-[100]"
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div
            className={`glass-card flex items-center gap-3 border px-4 py-3 ${borderColors[type]}`}
            onClick={onClose}
          >
            {icons[type]}
            <span className="text-sm text-[#F0F0F5]">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
