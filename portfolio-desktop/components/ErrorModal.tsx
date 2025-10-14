'use client';

import { motion } from 'framer-motion';

interface ErrorModalProps {
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

export default function ErrorModal({ title, message, buttonText, onClose }: ErrorModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#2d2d2d]/95 backdrop-blur-lg text-white rounded-xl w-full max-w-md shadow-2xl border border-white/10"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="px-6 py-3 border-b border-white/10">
          <h2 className="text-lg font-semibold text-center">{title}</h2>
        </div>

        {/* Body */}
        <div className="p-6 flex items-center gap-4">
          <div className="text-5xl">⚠️</div>
          <p className="text-gray-200">{message}</p>
        </div>

        {/* Footer with Button */}
        <div className="px-6 py-4 flex justify-end bg-black/20 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {buttonText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}