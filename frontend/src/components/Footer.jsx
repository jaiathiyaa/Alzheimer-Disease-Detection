import React from 'react';
import { FaBrain, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <FaBrain className="text-xl" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Alzheimer's Disease Detection System
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deep Learning & Grad-CAM Medical Diagnostics Platform
              </p>
            </div>
          </div>

          {/* Developer & Socials */}
          <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center space-x-1 text-xs">
              <span>Developed with</span>
              <FaHeart className="text-rose-500 text-xs animate-pulse" />
              <span>for Healthcare AI</span>
            </span>

            <div className="flex items-center space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Repository"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
              >
                <FaGithub className="text-base" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors"
              >
                <FaLinkedin className="text-base" />
              </a>
            </div>
          </div>

        </div>

        {/* Clinical Disclaimer */}
        <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400 dark:text-slate-500">
          <p>
            <strong className="text-slate-600 dark:text-slate-400">Medical Disclaimer:</strong> This artificial intelligence tool is designed for educational and research demonstration purposes only. It is not intended to replace professional neurological evaluation or clinical diagnosis.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
