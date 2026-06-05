import React, { useRef, useState } from 'react';
import { UploadCloud, FileImage, X, Sprout } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  isPredicting: boolean;
  onPredict: () => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFileSelect,
  selectedFile,
  onClear,
  isPredicting,
  onPredict
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClear();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="clay-card">
      <h2 className="card-title">
        <Sprout className="logo-icon" size={24} style={{ color: 'var(--color-primary)' }} />
        Select Pest Image
      </h2>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.95rem', marginTop: '-0.5rem' }}>
        Upload a clear close-up image of a jute pest to identify its category and get target control instructions.
      </p>

      {!selectedFile ? (
        <div
          className="upload-dropzone"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          style={{
            borderColor: isDragActive ? 'var(--color-accent-primary)' : 'rgba(124, 58, 237, 0.15)',
            backgroundColor: isDragActive ? 'rgba(124, 58, 237, 0.05)' : 'var(--color-input-bg)'
          }}
        >
          <div className="upload-icon-orb">
            <UploadCloud size={32} />
          </div>
          <div>
            <p>
              Drag and drop your image here, or <span>browse files</span>
            </p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
              Supports JPG, JPEG, or PNG
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="preview-container">
            {previewUrl && (
              <img src={previewUrl} alt="Jute plant preview" className="preview-image" />
            )}
            <button className="remove-btn" onClick={handleRemove} title="Remove image">
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', backgroundColor: 'var(--color-input-bg)', padding: '0.75rem 1rem', borderRadius: '16px' }}>
            <FileImage size={20} style={{ color: 'var(--color-accent-primary)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
              {selectedFile.name}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>

          <button
            className="clay-btn clay-btn-primary"
            onClick={onPredict}
            disabled={isPredicting}
          >
            {isPredicting ? 'Inference Running...' : 'Identify Jute Pest'}
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadZone;
