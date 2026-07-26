import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaMicroscope, FaCog } from 'react-icons/fa';

const Loader = () => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "Analyzing MRI Scan...",
    "Preprocessing Axial MRI Slice...",
    "Executing Deep CNN Model Inference...",
    "Computing Class Probability Vector...",
    "Generating Grad-CAM Heatmap Visualizations..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card rounded-3xl p-10 shadow-2xl border border-blue-200/80 dark:border-blue-900/50 text-center max-w-xl mx-auto my-8 relative overflow-hidden"
    >
      {/* Background Animated Gradient Ring */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-blue-500/5 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        
        {/* Pulsing Brain Scanner Circle */}
        <div className="relative flex items-center justify-center w-24 h-24">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 animate-ping"></span>
          <span className="absolute inline-flex h-20 w-20 rounded-full bg-indigo-500 opacity-30 animate-pulse"></span>
          
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40">
            <FaBrain className="text-3xl animate-bounce" />
          </div>
        </div>

        {/* Status Text & Dynamic Steps */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {steps[stepIndex]}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Please wait while the AI neural net evaluates structural brain changes.
          </p>
        </div>

        {/* Progress Bar Shimmer */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400"
            initial={{ width: "10%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 8, ease: "easeInOut" }}
          />
        </div>

        {/* Diagnostic Tags */}
        <div className="flex items-center space-x-4 text-xs text-slate-400 dark:text-slate-500 pt-2">
          <span className="flex items-center space-x-1">
            <FaMicroscope className="text-blue-500" />
            <span>Grad-CAM Active</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <FaCog className="animate-spin text-indigo-500" />
            <span>FastAPI Inference</span>
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default Loader;
