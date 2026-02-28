'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/content';
import ImageCropper from './ImageCropper';

interface Props {
  currentImage?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  password: string;
  label?: string;
  aspectRatio?: number;
}

export default function ImageUpload({ currentImage, onUpload, onRemove, password, label = 'Upload Image', aspectRatio }: Props) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [cropFile, setCropFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doUpload = async (file: File) => {
    setUploading(true);
    const url = await uploadImage(file, password);
    setUploading(false);

    if (url) {
      onUpload(url);
    } else {
      alert('Upload failed. Please try again.');
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Maximum size is 5MB.');
      return;
    }

    if (aspectRatio) {
      setCropFile(file);
    } else {
      doUpload(file);
    }
  };

  const handleCrop = (croppedFile: File) => {
    setCropFile(null);
    doUpload(croppedFile);
  };

  const handleCropCancel = () => {
    setCropFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {currentImage && (
        <div className="mb-2 relative group inline-block">
          <img src={currentImage} alt="Current" className="h-32 w-auto rounded-lg object-cover" />
          {onRemove && (
            <button
              onClick={onRemove}
              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove"
            >
              &times;
            </button>
          )}
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-brand-teal bg-brand-teal/5'
            : 'border-gray-300 hover:border-brand-teal/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </div>
        ) : (
          <div className="text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Drag & drop an image or click to browse</p>
            <p className="text-xs text-gray-400 mt-1">Max 5MB - JPG, PNG, WebP</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {cropFile && aspectRatio && (
        <ImageCropper
          file={cropFile}
          aspectRatio={aspectRatio}
          onCrop={handleCrop}
          onCancel={handleCropCancel}
        />
      )}
    </div>
  );
}
