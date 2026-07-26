import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaSearchPlus } from 'react-icons/fa';

const ImageModal = ({ isOpen, imageUrl, title, onClose }) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 flex items-center justify-between border-b border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
              <FaSearchPlus className="text-blue-400" />
              <span>{title || 'Image Viewer Lightbox'}</span>
            </h3>

            <div className="flex items-center space-x-2">
              <a
                href={imageUrl}
                target="_blank"
                rel="noreferrer"
                download="mri_scan.jpg"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-sm"
                title="Open in new tab / Download"
              >
                <FaDownload />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors text-sm"
                title="Close Lightbox"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Image Display */}
          <div className="p-4 sm:p-8 flex items-center justify-center overflow-auto max-h-[75vh] bg-slate-950">
            <img
              src={imageUrl}
              alt={title || 'Enlarged View'}
              className="max-h-[65vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Footer Note */}
          <div className="p-3 text-center bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
            Use scroll or mouse to inspect structural details. Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300">Esc</kbd> or click background to close.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageModal;
