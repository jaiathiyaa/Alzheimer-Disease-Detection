import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaFileImage, FaTrash, FaPlay, FaSearchPlus } from 'react-icons/fa';

const UploadCard = ({
  selectedFile,
  previewUrl,
  onImageSelect,
  onRemoveImage,
  onPredict,
  isLoading,
  onOpenModal,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/tiff', 'image/tif'];

  const validateAndHandleFile = (file) => {
    if (!file) return;
    if (!allowedTypes.includes(file.type.toLowerCase()) && !file.name.match(/\.(jpg|jpeg|png|tif|tiff)$/i)) {
      alert('Invalid file format. Please upload a valid JPG, JPEG, or PNG image.');
      return;
    }
    // Max 15MB size check
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit. Please upload a smaller image.');
      return;
    }
    onImageSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Upload Brain MRI Scan
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Supported Formats: JPG, JPEG, PNG (Max 15MB)
            </p>
          </div>
        </div>
      </div>

      {/* Drag & Drop Area */}
      {!previewUrl ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-slate-50/80 dark:hover:bg-slate-900/60'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            className="hidden"
          />

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-md">
              <FaCloudUploadAlt className="text-3xl animate-bounce" />
            </div>

            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
                <span className="text-blue-600 dark:text-blue-400 underline decoration-2 underline-offset-4">
                  Click to browse
                </span>{' '}
                or drag & drop MRI image here
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                High resolution axial slice brain MRI recommended
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Image Preview Box */
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative rounded-2xl bg-slate-900/90 overflow-hidden border border-slate-700 p-4"
          >
            <div className="relative group max-h-[320px] flex items-center justify-center overflow-hidden rounded-xl bg-slate-950">
              <img
                src={previewUrl}
                alt="Selected MRI Preview"
                className="max-h-[300px] w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay Zoom Action */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => onOpenModal && onOpenModal(previewUrl, selectedFile?.name || 'MRI Scan Preview')}
                  className="p-3 bg-white/90 text-slate-900 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
                  title="Enlarge Image"
                >
                  <FaSearchPlus className="text-base" />
                </button>
              </div>
            </div>

            {/* File Info Bar */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <FaFileImage className="text-lg" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-slate-200 truncate">
                    {selectedFile?.name || 'Selected_MRI_Scan.jpg'}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {formatFileSize(selectedFile?.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onRemoveImage}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <FaTrash />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Submit / Predict Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onPredict}
          disabled={!previewUrl || isLoading}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
            !previewUrl || isLoading
              ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-600 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
          }`}
        >
          <FaPlay className="text-xs" />
          <span>{isLoading ? 'Analyzing...' : 'Predict & Generate Heatmap'}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default UploadCard;
