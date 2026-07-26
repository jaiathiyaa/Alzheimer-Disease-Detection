import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle, FaTimes, FaWifi, FaServer } from 'react-icons/fa';

const Toast = ({ message, type = 'error', onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-24 right-4 sm:right-8 z-50 max-w-md w-full"
      >
        <div className="bg-rose-900/90 dark:bg-rose-950/95 text-rose-50 p-4 rounded-2xl shadow-2xl border border-rose-700/80 backdrop-blur-lg flex items-start space-x-3">
          <div className="p-2 rounded-xl bg-rose-800 text-rose-200 mt-0.5 flex-shrink-0">
            <FaExclamationTriangle className="text-lg animate-pulse" />
          </div>

          <div className="flex-1 space-y-1">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>Diagnostic System Alert</span>
            </h4>
            <p className="text-xs text-rose-100/90 leading-relaxed">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-800/60 transition-colors"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
