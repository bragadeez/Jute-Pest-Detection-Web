import React, { useState, useEffect } from 'react';
import { ShieldCheck, Info, Flame, AlertCircle, RefreshCw, AlertOctagon, Eye, Image as ImageIcon } from 'lucide-react';
import { PredictionResponse } from '../types';
import { getPestDetails } from '../services/pestData';

interface ResultCardProps {
  prediction: PredictionResponse | null;
  isLoading: boolean;
  error: string | null;
  onReset: () => void;
  originalFile: File | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  prediction,
  isLoading,
  error,
  onReset,
  originalFile
}) => {
  const [activeTab, setActiveTab] = useState<'original' | 'lime'>('lime');
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const ESTIMATED_SEC = 12;

  // Track elapsed time during loading
  useEffect(() => {
    let timer: any;
    if (isLoading) {
      setElapsedTime(0);
      timer = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [isLoading]);

  // Generate local preview URL for original file
  useEffect(() => {
    if (originalFile) {
      const url = URL.createObjectURL(originalFile);
      setOriginalUrl(url);
      // Auto-focus on LIME explanation when a prediction is loaded
      setActiveTab('lime');
      return () => {
        URL.revokeObjectURL(url);
        setOriginalUrl(null);
      };
    } else {
      setOriginalUrl(null);
    }
  }, [originalFile, prediction]);

  const timeLeft = Math.max(0, ESTIMATED_SEC - elapsedTime);
  const progressPercent = Math.min(95, Math.round((elapsedTime / ESTIMATED_SEC) * 100));

  if (isLoading) {
    return (
      <div className="clay-card" style={{ minHeight: '400px', justifyContent: 'center' }}>
        <div className="loading-orb-container">
          <div className="loading-orb">
            <RefreshCw className="spinner" size={60} />
            <p style={{ fontFamily: 'var(--font-headings)', fontSize: '1.25rem' }}>Running JutePest Classification...</p>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)', fontWeight: 600 }}>
              Applying VGG-19 Classification + LIME XAI
            </span>
            
            <div className="loading-progress-container">
              <div className="loading-timer-text">
                <span>Elapsed: {elapsedTime}s</span>
                <span>{timeLeft > 0 ? `Est. Remaining: ${timeLeft}s` : 'Finalizing analysis...'}</span>
              </div>
              <div className="loading-progress-track">
                <div 
                  className="loading-progress-bar" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="clay-card" style={{ minHeight: '400px', gap: '2rem' }}>
        <h2 className="card-title" style={{ color: 'var(--color-destructive)' }}>
          <AlertCircle size={24} />
          Diagnostic Failed
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem', backgroundColor: 'var(--color-input-bg)', borderRadius: '24px', boxShadow: 'var(--shadow-pressed)' }}>
          <AlertOctagon size={48} style={{ color: 'var(--color-destructive)' }} />
          <p style={{ textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-foreground)', fontWeight: 700 }}>
            {error}
          </p>
        </div>
        <button className="clay-btn clay-btn-secondary" onClick={onReset}>
          <RefreshCw size={18} /> Upload New Sample
        </button>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="clay-card" style={{ minHeight: '400px', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
        <div className="upload-icon-orb" style={{ width: '80px', height: '80px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
          <Info size={36} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', fontFamily: 'var(--font-headings)' }}>Awaiting Pest Image</h3>
          <p style={{ color: 'var(--color-muted-foreground)', maxWidth: '300px', fontSize: '0.95rem', margin: '0 auto', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
            Select or drag a pest image on the left to activate VGG-19 classification and LIME XAI feature segmentation.
          </p>
        </div>
      </div>
    );
  }

  const details = getPestDetails(prediction.pest);
  const initials = prediction.pest.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase();

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'High': return 'severity-high';
      case 'Medium': return 'severity-medium';
      default: return 'severity-low';
    }
  };

  return (
    <div className="clay-card">
      <h2 className="card-title">
        <ShieldCheck size={24} style={{ color: 'var(--color-primary)' }} />
        Diagnostic & XAI Report
      </h2>

      {/* LIME / Original Image Tabs */}
      <div className="xai-tabs-container">
        <button 
          className={`xai-tab-btn ${activeTab === 'lime' ? 'xai-tab-btn-active' : ''}`}
          onClick={() => setActiveTab('lime')}
        >
          <Eye size={16} />
          AI Explanation (LIME)
        </button>
        <button 
          className={`xai-tab-btn ${activeTab === 'original' ? 'xai-tab-btn-active' : ''}`}
          onClick={() => setActiveTab('original')}
        >
          <ImageIcon size={16} />
          Original Photo
        </button>
      </div>

      <div className="result-container">
        {/* Render Active Tab Image */}
        <div className="preview-container" style={{ width: '100%', marginBottom: '1rem', aspectRatio: '4/3' }}>
          {activeTab === 'lime' && prediction.explanation ? (
            <img 
              src={prediction.explanation} 
              alt="LIME feature boundaries" 
              className="preview-image" 
              style={{ transform: 'none' }} // LIME output is generated as a structured map, keep straight
            />
          ) : (
            originalUrl && (
              <img 
                src={originalUrl} 
                alt="Original crop upload" 
                className="preview-image"
              />
            )
          )}
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
          <div className="result-orb" style={{ width: '100px', height: '100px', animation: 'none' }}>
            <span className="result-pest-initials" style={{ fontSize: '1.5rem' }}>{initials}</span>
          </div>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <span className="pest-name" style={{ fontSize: '1.5rem', lineHeight: '1.2' }}>{prediction.pest}</span>
            <span className="confidence-badge" style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>
              {prediction.confidence.toFixed(1)}% Match
            </span>
          </div>
        </div>

        <div style={{ alignSelf: 'center' }}>
          <span className={`severity-pill ${getSeverityClass(details.severity)}`}>
            {details.severity} Severity Threat
          </span>
        </div>

        <div className="info-section">
          <div className="info-item">
            <Info className="info-icon" size={18} />
            <div className="info-text-container">
              <span className="info-label">Description</span>
              <p className="info-desc">{details.description}</p>
            </div>
          </div>

          <div className="info-item">
            <Flame className="info-icon" size={18} style={{ color: 'var(--color-secondary)' }} />
            <div className="info-text-container">
              <span className="info-label">Visual Symptoms</span>
              <p className="info-desc">{details.symptoms}</p>
            </div>
          </div>

          <div className="info-item">
            <ShieldCheck className="info-icon" size={18} style={{ color: 'var(--color-primary)' }} />
            <div className="info-text-container">
              <span className="info-label">Recommended Treatment</span>
              <p className="info-desc">{details.treatment}</p>
            </div>
          </div>
        </div>

        <button className="clay-btn clay-btn-secondary" onClick={onReset}>
          <RefreshCw size={18} /> Analyze Another Image
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
