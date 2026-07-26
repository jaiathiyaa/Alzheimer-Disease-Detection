import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaShieldAlt } from 'react-icons/fa';

const PredictionCard = ({ prediction, confidence }) => {
  if (!prediction) return null;

  // Format stage names cleanly for UI presentation
  const getStageInfo = (predClass) => {
    const formatted = String(predClass).replace(/([A-Z])/g, ' $1').trim();
    
    switch (predClass) {
      case 'NonDemented':
        return {
          title: 'Non-Demented',
          badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          barGradient: 'from-emerald-500 to-teal-400',
          icon: FaCheckCircle,
          iconColor: 'text-emerald-500',
          severity: 'Normal Brain Structure',
          desc: 'No significant diagnostic indicators of cortical atrophy or cognitive impairment observed in the structural MRI analysis.',
        };
      case 'VeryMildDemented':
        return {
          title: 'Very Mild Demented',
          badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
          barGradient: 'from-amber-500 to-yellow-400',
          icon: FaInfoCircle,
          iconColor: 'text-amber-500',
          severity: 'Early Stage Signs Detected',
          desc: 'Minor hippocampal or cortical changes identified. Corresponds to early mild cognitive impairment (MCI). Clinical follow-up recommended.',
        };
      case 'MildDemented':
        return {
          title: 'Mild Demented',
          badgeBg: 'bg-orange-500/10 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30',
          barGradient: 'from-orange-500 to-amber-500',
          icon: FaExclamationTriangle,
          iconColor: 'text-orange-500',
          severity: 'Moderate Atrophy Indicators',
          desc: 'Moderate structural neurodegeneration patterns detected. Neuropsychological evaluation and specialist consultation advised.',
        };
      case 'ModerateDemented':
        return {
          title: 'Moderate Demented',
          badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30',
          barGradient: 'from-rose-600 to-red-500',
          icon: FaExclamationTriangle,
          iconColor: 'text-rose-500',
          severity: 'Significant Neurodegeneration',
          desc: 'Widespread ventricular enlargement and significant tissue volume reduction detected in MRI scan.',
        };
      default:
        return {
          title: formatted || 'Unclassified Stage',
          badgeBg: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
          barGradient: 'from-blue-600 to-indigo-600',
          icon: FaBrain,
          iconColor: 'text-blue-500',
          severity: 'Classification Result',
          desc: 'MRI classification complete.',
        };
    }
  };

  const info = getStageInfo(prediction);
  const IconComponent = info.icon;
  const numConfidence = parseFloat(confidence) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Diagnostic Output
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Neural Network Stage Classification Result
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-slate-700">
          FastAPI Model Verified
        </span>
      </div>

      {/* Main Prediction Highlight Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Stage Badge & Title */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center space-x-3">
            <IconComponent className={`text-3xl ${info.iconColor}`} />
            <div>
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider border ${info.badgeBg}`}>
                {info.severity}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {info.title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
            {info.desc}
          </p>
        </div>

        {/* Confidence Percentage Box */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1">
              <span>Model Confidence</span>
              <span className="text-blue-400 font-bold">Deep Neural Net</span>
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-blue-300 bg-clip-text text-transparent">
                {numConfidence.toFixed(1)}
              </span>
              <span className="text-xl font-bold text-blue-400">%</span>
            </div>
          </div>

          {/* Animated Confidence Bar */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(numConfidence, 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${info.barGradient}`}
              />
            </div>
            <p className="text-[11px] text-slate-400 text-right font-medium">
              Probability Certainty Metric
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default PredictionCard;
