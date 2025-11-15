'use client';

import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';

interface TeaserModalProps {
  project: Project;
  onClose: () => void;
}

export default function TeaserModal({ project, onClose }: TeaserModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-gray-300/50 overflow-hidden"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
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
            {/* Icon - Construction/Work in Progress */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Message */}
            <div className="flex-1 pt-1">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                This project is currently <span className="font-semibold text-blue-600">under development</span>.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer with macOS style button */}
        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-200/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-[#007AFF] text-white text-sm font-medium rounded-md hover:bg-[#0051D5] transition-colors focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:ring-offset-2 shadow-sm"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
