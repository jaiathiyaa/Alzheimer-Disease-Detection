import React from 'react';
import { motion } from 'framer-motion';
import { FaMicroscope, FaBrain, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Hero = ({ onScrollToUpload }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const badges = [
    { icon: FaBrain, title: "4 Clinical Stages", text: "Non, Very Mild, Mild, & Moderate", color: "from-blue-500 to-indigo-600" },
    { icon: FaMicroscope, title: "Grad-CAM AI", text: "Spatial Visual Attention Maps", color: "from-indigo-500 to-purple-600" },
    { icon: FaChartLine, title: "Confidence Metrics", text: "Probability Distribution Analysis", color: "from-blue-600 to-cyan-600" },
    { icon: FaShieldAlt, title: "Clinical Support", text: "AI Diagnostic Assistance", color: "from-emerald-500 to-teal-600" },
  ];

  return (
    <section className="relative overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-blue-50/50 via-white to-gray-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      
      {/* Decorative background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-400/15 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          {/* Medical AI Pill Tag */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80 text-xs sm:text-sm font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping"></span>
            <span>AI Diagnostic Medical Imaging System</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Early <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">Alzheimer's Detection</span> using Deep Learning
          </motion.h1>

          {/* Subtitle Description */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Upload structural brain MRI scan images to receive instantaneous neural classification, stage probability distributions, and interpretative Grad-CAM heatmaps highlighting critical neurodegenerative regions.
          </motion.p>

          {/* CTA Action */}
          <motion.div variants={itemVariants} className="pt-2 flex justify-center">
            <button
              onClick={onScrollToUpload}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center space-x-3 group"
            >
              <span>Analyze MRI Scan Now</span>
              <FaBrain className="text-lg group-hover:rotate-12 transition-transform duration-300" />
            </button>
          </motion.div>

          {/* Statistics & Feature Cards */}
          <motion.div variants={itemVariants} className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="glass-card p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-soft hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${badge.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{badge.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{badge.text}</p>
                </div>
              );
            })}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
