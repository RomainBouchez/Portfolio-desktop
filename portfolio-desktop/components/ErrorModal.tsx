'use client';

import { motion } from 'framer-motion';
import LiquidGlass from '@/components/LiquidGlass';

interface ErrorModalProps {
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

export default function ErrorModal({ title, message, buttonText, onClose }: ErrorModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <LiquidGlass
          radius={14}
          blur={24}
          tint="rgba(255,255,255,0.72)"
          strokeColor="0,0,0"
          strokeEdge={0.04}
          strokeMid={0.12}
          highlight={0.5}
          shade={0.06}
          className="w-full"
        >
          {/* Header with Traffic Lights - macOS style */}
          <div className="relative bg-gray-100/80 px-4 py-2.5 flex items-center gap-2 border-b border-gray-300/50">
            <div 
              className="flex items-center gap-2 group/buttons cursor-pointer traffic-lights-container p-1 -m-1"
              onClick={onClose}
            >
              {/* Bouton Fermer */}
              <div
                className="w-3 h-3 rounded-full bg-[#FF5F56] flex items-center justify-center 
                          group-hover/buttons:before:text-[#8B0000] before:transition-colors"
                aria-label="Close"
              />

              {/* Bouton Minimiser */}
              <div
                className="w-3 h-3 rounded-full bg-[#FFBD2E] flex items-center justify-center
                          group-hover/buttons:before:text-[#8B5A00] before:transition-colors"
                aria-label="Minimize"
              />

              {/* Bouton Maximiser */}
              <div
                className="w-3 h-3 rounded-full bg-[#27C93F] flex items-center justify-center
                          group-hover/buttons:before:text-[#006400] before:transition-colors"
                aria-label="Maximize"
              />
            </div>
          </div>

          {/* Body - macOS Alert Style */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* Warning Icon - macOS style */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-amber-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              
              {/* Message */}
              <div className="flex-1 pt-1">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
              </div>
            </div>
          </div>

          {/* Footer with macOS style button */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-[#007AFF] text-white text-sm font-medium rounded-md hover:bg-[#0051D5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 shadow-sm"
            >
              {buttonText}
            </button>
          </div>
        </LiquidGlass>
        </motion.div>
      </motion.div>
  );
}