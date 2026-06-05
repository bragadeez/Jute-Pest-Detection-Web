import { PredictionResponse } from '../types';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Uploads an image file to the FastAPI backend and returns the prediction results.
 */
export async function predictPest(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to detect pest. Please check your image format and try again.');
  }

  return response.json();
}

/**
 * Checks if the FastAPI backend is running and has loaded the VGG19 model.
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      const data = await response.json();
      return data.status === 'ok';
    }
    return false;
  } catch (error) {
    return false;
  }
}
