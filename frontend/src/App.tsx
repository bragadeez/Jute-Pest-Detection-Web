import React, { useState, useEffect } from 'react';
import { Leaf, Sun, Moon, Wifi, WifiOff, BookOpen } from 'lucide-react';
import BackgroundBlobs from './components/BackgroundBlobs';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import { predictPest, checkBackendHealth } from './services/api';
import { PredictionResponse } from './types';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean | null>(null);

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Check backend health periodically
  useEffect(() => {
    const verifyHealth = async () => {
      const connected = await checkBackendHealth();
      setIsBackendConnected(connected);
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 10000); // Check every 10s
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await predictPest(selectedFile);
      setPrediction(result);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during prediction.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <>
      <BackgroundBlobs />
      <div className="app-container">
        {/* Navigation Header */}
        <header>
          <div className="logo-container">
            <div className="logo-icon-orb">
              <Leaf size={24} />
            </div>
            <div>
              <h1 className="logo-text">JutePest Detector</h1>
              <div className="logo-tagline">Jute Pest Classifier</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Backend connection indicator */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.78rem',
                fontWeight: 800,
                padding: '0.45rem 0.9rem',
                backgroundColor: 'var(--color-input-bg)',
                borderRadius: '9999px',
                border: '1.5px solid var(--color-border)',
                boxShadow: 'var(--shadow-soft)'
              }}
              title={isBackendConnected ? "AI Predictor Server Online" : "AI Predictor Server Offline"}
            >
              {isBackendConnected === null ? (
                <>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)' }} />
                  <span style={{ color: 'var(--color-muted-foreground)' }}>Connecting...</span>
                </>
              ) : isBackendConnected ? (
                <>
                  <Wifi size={14} style={{ color: 'var(--color-primary)' }} />
                  <span style={{ color: 'var(--color-primary)' }}>API Online</span>
                </>
              ) : (
                <>
                  <WifiOff size={14} style={{ color: 'var(--color-destructive)' }} />
                  <span style={{ color: 'var(--color-destructive)' }}>API Offline</span>
                </>
              )}
            </div>

            {/* Light/Dark Toggle */}
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle light/dark theme">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div style={{ marginBottom: '3rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h2 className="hero-title">
              Deep Learning <span className="gradient-text">Jute Pest</span> Classification
            </h2>
            <p className="hero-subtitle">
              Upload an image of a jute pest to instantly identify its category and get treatment recommendations, backed by VGG-19 deep learning and LIME Explainable AI.
            </p>
          </div>
          <div>
            <a 
              href="https://ieeexplore.ieee.org/document/10723939" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="clay-btn clay-btn-secondary" 
              style={{ width: 'auto', height: '48px', padding: '0 1.5rem', fontSize: '0.9rem', display: 'inline-flex', gap: '0.5rem' }}
            >
              <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
              Read IEEE Research Paper
            </a>
          </div>
        </div>

        {/* Main Grid */}
        <main className="main-grid">
          <UploadZone
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onClear={handleReset}
            isPredicting={isLoading}
            onPredict={handlePredict}
          />
          <ResultCard
            prediction={prediction}
            isLoading={isLoading}
            error={error}
            onReset={handleReset}
            originalFile={selectedFile}
          />
        </main>

        {/* Footer */}
        <footer>
          <p>
            © {new Date().getFullYear()} JutePest Detector. Developed to support explainable agriculture (ICCCNT 2024).
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;

