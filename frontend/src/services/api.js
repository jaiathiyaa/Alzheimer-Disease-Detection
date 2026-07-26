import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 45000, // 45 seconds for ML model inference & Grad-CAM generation
});

/**
 * Health check endpoint
 * GET /health
 */
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('API Health Check Error:', error);
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
};

/**
 * Predict Alzheimer's Disease stage from MRI Scan Image
 * POST /predict
 * @param {File} file - Image File object (jpg, jpeg, png)
 */
export const predictImage = async (file) => {
  if (!file) {
    throw new Error('No image file selected.');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('API Prediction Error:', error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * Helper function to construct full absolute URL for heatmap images
 * @param {string} relativeOrAbsoluteUrl - e.g. "/outputs/123.jpg" or "http://127.0.0.1:8000/outputs/123.jpg"
 */
export const getHeatmapUrl = (heatmapPath) => {
  if (!heatmapPath) return '';
  if (heatmapPath.startsWith('http://') || heatmapPath.startsWith('https://')) {
    return heatmapPath;
  }
  const cleanPath = heatmapPath.startsWith('/') ? heatmapPath : `/${heatmapPath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

/**
 * Helper to produce clean user-facing error messages
 */
const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with a status code outside 2xx
    const detail = error.response.data?.detail || error.response.data?.message;
    return detail || `Server returned error status ${error.response.status}`;
  } else if (error.request) {
    // Request was made but no response was received
    return 'Backend server is unavailable. Please make sure FastAPI backend is running at http://127.0.0.1:8000';
  } else {
    // Something happened setting up the request
    return error.message || 'An unexpected error occurred while communicating with the API.';
  }
};

export default api;
