import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaHeartbeat, FaSun, FaMoon, FaRedo } from 'react-icons/fa';
import { HiShieldCheck, HiExclamationCircle } from 'react-icons/hi';

const Navbar = ({ isHealthy, isCheckingHealth, onCheckHealth, darkMode, setDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 glass-nav border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
            <FaBrain className="text-2xl text-blue-50 animate-pulse-slow" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-200 bg-clip-text text-transparent">
                NeuroAI
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                v1.0 ML
              </span>
            </div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Alzheimer's Disease Detection System
            </p>
          </div>
        </motion.div>

        {/* Action Controls & Health Status */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Backend Status Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2"
          >
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
              isHealthy 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60' 
                : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isHealthy ? 'bg-emerald-400' : 'bg-rose-400'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  isHealthy ? 'bg-emerald-500' : 'bg-rose-500'
                }`}></span>
              </span>
              <span className="hidden md:inline">
                {isHealthy ? 'Backend Connected' : 'API Offline'}
              </span>
              <span className="md:hidden">
                {isHealthy ? 'Online' : 'Offline'}
              </span>
              {isHealthy ? (
                <HiShieldCheck className="text-emerald-600 dark:text-emerald-400 text-sm hidden sm:inline" />
              ) : (
                <HiExclamationCircle className="text-rose-600 dark:text-rose-400 text-sm hidden sm:inline" />
              )}
            </div>

            <button
              onClick={onCheckHealth}
              disabled={isCheckingHealth}
              title="Refresh API Connection Status"
              className="p-2 rounded-lg text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
            >
              <FaRedo className={`text-xs ${isCheckingHealth ? 'animate-spin' : ''}`} />
            </button>
          </motion.div>

          {/* Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? (
              <FaSun className="text-amber-400 text-base" />
            ) : (
              <FaMoon className="text-slate-600 text-base" />
            )}
          </motion.button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
