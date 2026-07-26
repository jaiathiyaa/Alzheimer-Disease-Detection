import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import UploadCard from '../components/UploadCard';
import PredictionCard from '../components/PredictionCard';
import ProbabilityChart from '../components/ProbabilityChart';
import HeatmapViewer from '../components/HeatmapViewer';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import ImageModal from '../components/ImageModal';
import { checkHealth, predictImage } from '../services/api';

const Home = () => {
  // State Management
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [error, setError] = useState('');
  
  // Health & Dark Mode State
  const [isHealthy, setIsHealthy] = useState(true);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Lightbox Modal State
  const [modalState, setModalState] = useState({
    isOpen: false,
    url: '',
    title: '',
  });

  const uploadSectionRef = useRef(null);
  const resultSectionRef = useRef(null);

  // Handle Dark Mode toggle class on <html> document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initial Health Check on component mount
  const handleHealthCheck = async () => {
    setIsCheckingHealth(true);
    try {
      const res = await checkHealth();
      setIsHealthy(res.success);
      if (!res.success) {
        console.warn("Backend API not reachable at http://127.0.0.1:8000");
      }
    } catch (err) {
      setIsHealthy(false);
    } finally {
      setIsCheckingHealth(false);
    }
  };

  useEffect(() => {
    handleHealthCheck();
  }, []);

  // Handle Image Selection & Preview Generation
  const handleImageSelect = (file) => {
    setSelectedFile(file);
    setError('');
    setPredictionData(null);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  // Handle Image Removal
  const handleRemoveImage = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    setPredictionData(null);
    setError('');
  };

  // Scroll Helper
  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle Predict Trigger
  const handlePredict = async () => {
    if (!selectedFile) {
      setError('Please select or upload a brain MRI scan first.');
      return;
    }

    setIsLoading(true);
    setError('');
    setPredictionData(null);

    try {
      const result = await predictImage(selectedFile);
      if (result.success && result.data) {
        setPredictionData(result.data);
        // Smooth scroll to prediction results section
        setTimeout(() => {
          resultSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else {
        throw new Error('Prediction API returned an invalid response structure.');
      }
    } catch (err) {
      console.error('Prediction failed:', err);
      setError(err.message || 'Failed to analyze MRI image. Please check API server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Lightbox Modal Controls
  const openModal = (url, title) => {
    setModalState({ isOpen: true, url, title });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, url: '', title: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Toast Notification Alert */}
      <Toast message={error} onClose={() => setError('')} />

      {/* Lightbox Zoom Modal */}
      <ImageModal
        isOpen={modalState.isOpen}
        imageUrl={modalState.url}
        title={modalState.title}
        onClose={closeModal}
      />

      {/* Sticky Glass Navbar */}
      <Navbar
        isHealthy={isHealthy}
        isCheckingHealth={isCheckingHealth}
        onCheckHealth={handleHealthCheck}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="flex-grow">
        {/* Animated Hero Section */}
        <Hero onScrollToUpload={scrollToUpload} />

        {/* Diagnostic Workflow Container */}
        <div ref={uploadSectionRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
          
          {/* Step 1: Upload Card */}
          <UploadCard
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onImageSelect={handleImageSelect}
            onRemoveImage={handleRemoveImage}
            onPredict={handlePredict}
            isLoading={isLoading}
            onOpenModal={openModal}
          />

          {/* Loader Component while analyzing */}
          <AnimatePresence>
            {isLoading && <Loader />}
          </AnimatePresence>

          {/* Prediction Results & Visualizations */}
          {predictionData && !isLoading && (
            <motion.div
              ref={resultSectionRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              {/* Step 2: Prediction Card */}
              <PredictionCard
                prediction={predictionData.prediction}
                confidence={predictionData.confidence}
              />

              {/* Step 3: Recharts Probability Visualization */}
              <ProbabilityChart
                probabilities={predictionData.probabilities}
                darkMode={darkMode}
              />

              {/* Step 4: Grad-CAM Side-by-Side Heatmap */}
              <HeatmapViewer
                originalPreview={previewUrl}
                heatmapPath={predictionData.heatmap}
                onOpenModal={openModal}
              />
            </motion.div>
          )}

        </div>
      </main>

      {/* Footer Component */}
      <Footer />

    </div>
  );
};

export default Home;
