'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Props {
  file: File;
  aspectRatio: number;
  onCrop: (croppedFile: File) => void;
  onCancel: () => void;
}

export default function ImageCropper({ file, aspectRatio, onCrop, onCancel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });

  // Crop box dimensions within the container
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Load image from file
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };
    img.src = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(img.src);
  }, [file]);

  // Calculate crop box and initial zoom when image loads or container resizes
  useEffect(() => {
    if (!imageLoaded || !containerRef.current || !imgRef.current) return;

    const container = containerRef.current;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    setContainerSize({ w: cw, h: ch });

    // Fit crop box within container with padding
    const padding = 24;
    const maxW = cw - padding * 2;
    const maxH = ch - padding * 2;

    let boxW: number, boxH: number;
    if (maxW / maxH > aspectRatio) {
      boxH = maxH;
      boxW = boxH * aspectRatio;
    } else {
      boxW = maxW;
      boxH = boxW / aspectRatio;
    }

    setCropBox({
      x: (cw - boxW) / 2,
      y: (ch - boxH) / 2,
      w: boxW,
      h: boxH,
    });

    // Set initial zoom so image covers the crop box
    const img = imgRef.current;
    const scaleX = boxW / img.naturalWidth;
    const scaleY = boxH / img.naturalHeight;
    const initialZoom = Math.max(scaleX, scaleY);
    setZoom(initialZoom);
    setOffset({ x: 0, y: 0 });
  }, [imageLoaded, aspectRatio]);

  // Draw the preview canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !imageLoaded) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = containerSize.w;
    canvas.height = containerSize.h;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image centered in container with zoom and offset
    const drawW = img.naturalWidth * zoom;
    const drawH = img.naturalHeight * zoom;
    const drawX = (containerSize.w - drawW) / 2 + offset.x;
    const drawY = (containerSize.h - drawH) / 2 + offset.y;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Dark overlay outside crop box
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    // Top
    ctx.fillRect(0, 0, canvas.width, cropBox.y);
    // Bottom
    ctx.fillRect(0, cropBox.y + cropBox.h, canvas.width, canvas.height - cropBox.y - cropBox.h);
    // Left
    ctx.fillRect(0, cropBox.y, cropBox.x, cropBox.h);
    // Right
    ctx.fillRect(cropBox.x + cropBox.w, cropBox.y, canvas.width - cropBox.x - cropBox.w, cropBox.h);

    // Crop border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 2;
    ctx.strokeRect(cropBox.x, cropBox.y, cropBox.w, cropBox.h);

    // Rule of thirds grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      const gx = cropBox.x + (cropBox.w / 3) * i;
      const gy = cropBox.y + (cropBox.h / 3) * i;
      ctx.beginPath();
      ctx.moveTo(gx, cropBox.y);
      ctx.lineTo(gx, cropBox.y + cropBox.h);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cropBox.x, gy);
      ctx.lineTo(cropBox.x + cropBox.w, gy);
      ctx.stroke();
    }
  }, [imageLoaded, zoom, offset, cropBox, containerSize]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Clamp offset so image always covers crop box
  const clampOffset = useCallback((ox: number, oy: number, currentZoom: number) => {
    const img = imgRef.current;
    if (!img) return { x: ox, y: oy };

    const drawW = img.naturalWidth * currentZoom;
    const drawH = img.naturalHeight * currentZoom;
    const imgLeft = (containerSize.w - drawW) / 2 + ox;
    const imgTop = (containerSize.h - drawH) / 2 + oy;
    const imgRight = imgLeft + drawW;
    const imgBottom = imgTop + drawH;

    let cx = ox;
    let cy = oy;

    if (imgLeft > cropBox.x) cx = ox - (imgLeft - cropBox.x);
    if (imgTop > cropBox.y) cy = oy - (imgTop - cropBox.y);
    if (imgRight < cropBox.x + cropBox.w) cx = ox + (cropBox.x + cropBox.w - imgRight);
    if (imgBottom < cropBox.y + cropBox.h) cy = oy + (cropBox.y + cropBox.h - imgBottom);

    return { x: cx, y: cy };
  }, [containerSize, cropBox]);

  // Mouse/touch handlers for panning
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const newOffset = clampOffset(offsetStart.current.x + dx, offsetStart.current.y + dy, zoom);
    setOffset(newOffset);
  };

  const handlePointerUp = () => {
    setDragging(false);
  };

  // Zoom handler
  const handleZoomChange = (newZoom: number) => {
    const img = imgRef.current;
    if (!img) return;

    // Minimum zoom: image must cover crop box
    const minZoomX = cropBox.w / img.naturalWidth;
    const minZoomY = cropBox.h / img.naturalHeight;
    const minZoom = Math.max(minZoomX, minZoomY);
    const clampedZoom = Math.max(minZoom, Math.min(newZoom, minZoom * 5));

    const newOffset = clampOffset(offset.x, offset.y, clampedZoom);
    setZoom(clampedZoom);
    setOffset(newOffset);
  };

  // Export cropped image
  const handleCrop = () => {
    const img = imgRef.current;
    if (!img) return;

    // Calculate which part of the source image is in the crop box
    const drawW = img.naturalWidth * zoom;
    const drawH = img.naturalHeight * zoom;
    const imgLeft = (containerSize.w - drawW) / 2 + offset.x;
    const imgTop = (containerSize.h - drawH) / 2 + offset.y;

    // Source rect in natural image pixels
    const srcX = (cropBox.x - imgLeft) / zoom;
    const srcY = (cropBox.y - imgTop) / zoom;
    const srcW = cropBox.w / zoom;
    const srcH = cropBox.h / zoom;

    // Output resolution
    const maxOutputW = aspectRatio >= 1 ? 1920 : 800;
    const outW = Math.min(Math.round(srcW), maxOutputW);
    const outH = Math.round(outW / aspectRatio);

    const offscreen = document.createElement('canvas');
    offscreen.width = outW;
    offscreen.height = outH;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outW, outH);

    offscreen.toBlob(
      (blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), {
          type: 'image/jpeg',
        });
        onCrop(croppedFile);
      },
      'image/jpeg',
      0.9
    );
  };

  const minZoom = (() => {
    const img = imgRef.current;
    if (!img || !cropBox.w) return 0.1;
    return Math.max(cropBox.w / img.naturalWidth, cropBox.h / img.naturalHeight);
  })();

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-black/90">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/50 text-white">
        <h3 className="text-sm font-medium">Crop Image</h3>
        <span className="text-xs text-gray-400">
          {aspectRatio >= 1
            ? `${Math.round(aspectRatio * 9)}:9 (Landscape)`
            : `3:${Math.round(3 / aspectRatio)} (Portrait)`}
        </span>
      </div>

      {/* Canvas area */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            Loading...
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="px-4 py-4 bg-black/50 space-y-3">
        {/* Zoom slider */}
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
          <input
            type="range"
            min={minZoom}
            max={minZoom * 5}
            step={0.001}
            value={zoom}
            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            className="flex-1 accent-teal-500"
          />
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="flex-1 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            Crop & Upload
          </button>
        </div>
      </div>
    </div>
  );
}
