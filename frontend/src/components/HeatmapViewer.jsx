import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaSearchPlus, FaMicroscope, FaBrain } from 'react-icons/fa';
import { getHeatmapUrl } from '../services/api';

const HeatmapViewer = ({ originalPreview, heatmapPath, onOpenModal }) => {
  if (!heatmapPath && !originalPreview) return null;

  const fullHeatmapUrl = getHeatmapUrl(heatmapPath);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
            4
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <span>Grad-CAM Visual Attention Heatmap</span>
              <FaMicroscope className="text-purple-500 text-base" />
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explainable AI (XAI) feature activation map highlighting structural neural focus areas
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200 dark:border-purple-800">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></span>
          <span>Interpretability Model</span>
        </div>
      </div>

      {/* Side-by-Side Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Original MRI Image */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <FaBrain className="text-blue-500" />
              <span>Original Structural MRI Scan</span>
            </span>
            <span className="text-[11px] text-slate-400">Axial Slice</span>
          </div>

          <div
            onClick={() => onOpenModal && onOpenModal(originalPreview, 'Original Structural MRI Scan')}
            className="relative group rounded-2xl bg-slate-950 overflow-hidden border border-slate-700/80 shadow-md aspect-square flex items-center justify-center cursor-pointer"
          >
            {originalPreview ? (
              <img
                src={originalPreview}
                alt="Original MRI Scan"
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="text-slate-500 text-xs">No Original Image</div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
              <div className="px-4 py-2 bg-white/90 text-slate-900 rounded-full text-xs font-bold shadow-lg flex items-center space-x-2">
                <FaSearchPlus />
                <span>Click to Enlarge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grad-CAM Heatmap Image */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <FaEye className="text-purple-500" />
              <span>Grad-CAM Attention Heatmap</span>
            </span>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
              XAI Overlay
            </span>
          </div>

          <div
            onClick={() => fullHeatmapUrl && onOpenModal && onOpenModal(fullHeatmapUrl, 'Grad-CAM Attention Heatmap')}
            className="relative group rounded-2xl bg-slate-950 overflow-hidden border border-purple-500/40 shadow-lg shadow-purple-500/10 aspect-square flex items-center justify-center cursor-pointer"
          >
            {fullHeatmapUrl ? (
              <img
                src={fullHeatmapUrl}
                alt="Grad-CAM Heatmap"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = originalPreview; // fallback if image fails to load
                }}
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="text-slate-500 text-xs">Heatmap unavailable</div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
              <div className="px-4 py-2 bg-purple-600 text-white rounded-full text-xs font-bold shadow-lg flex items-center space-x-2">
                <FaSearchPlus />
                <span>Click to Enlarge Heatmap</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Grad-CAM Legend Explanation */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-slate-200 font-bold">
          <span>Grad-CAM Color Spectrum Guide:</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1 h-3 rounded-full bg-gradient-to-r from-blue-600 via-yellow-400 to-red-600 shadow-inner"></div>
        </div>
        <div className="flex justify-between text-[11px] font-medium text-slate-500">
          <span>Blue / Cyan: Low Relevance</span>
          <span>Yellow: Moderate Focus</span>
          <span className="text-rose-500 dark:text-rose-400 font-bold">Red / Magenta: High Feature Activation</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HeatmapViewer;
