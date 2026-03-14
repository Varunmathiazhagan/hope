import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

/**
 * Toast Notification Component
 * Displays temporary notification messages (success, error, info)
 * 
 * Usage:
 * const [toasts, setToasts] = useState([]);
 * const showNotification = (type, message) => {
 *   const id = Date.now();
 *   setToasts(prev => [...prev, { id, type, message }]);
 *   setTimeout(() => {
 *     setToasts(prev => prev.filter(t => t.id !== id));
 *   }, 5000);
 * };
 * 
 * <NotificationContainer toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
 */

const Toast = ({ id, type = 'info', message, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const typeConfig = {
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      icon: FiCheckCircle,
      color: 'text-green-400'
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      icon: FiAlertCircle,
      color: 'text-red-400'
    },
    info: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-500/50',
      icon: FiInfo,
      color: 'text-blue-400'
    }
  };

  const config = typeConfig[type] || typeConfig.info;
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`${config.bg} border ${config.border} rounded-lg p-4 flex items-start gap-3 backdrop-blur-sm min-w-[300px]`}
      role="alert"
    >
      <IconComponent className={`${config.color} flex-shrink-0 mt-0.5`} size={20} />
      <p className="text-white text-sm flex-1">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <FiX size={18} />
      </button>
    </motion.div>
  );
};

const NotificationContainer = ({ toasts = [], onRemove }) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-3"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            onRemove={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export { Toast, NotificationContainer };
export default NotificationContainer;
