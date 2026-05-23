"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Check, Image as ImageIcon, Loader2, X } from "lucide-react";

interface ImageCropModalProps {
  file: File;
  onCancel: () => void;
  onCrop: (file: File) => void;
}

interface Size {
  width: number;
  height: number;
}

interface Offset {
  x: number;
  y: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
}

const OUTPUT_SIZE = 512;

export default function ImageCropModal({ file, onCancel, onCrop }: ImageCropModalProps) {
  const cropAreaRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [naturalSize, setNaturalSize] = useState<Size | null>(null);
  const [cropSize, setCropSize] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(typeof reader.result === "string" ? reader.result : null);
      setNaturalSize(null);
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);

    return () => {
      reader.abort();
    };
  }, [file]);

  useEffect(() => {
    const element = cropAreaRef.current;
    if (!element) return;

    const updateCropSize = () => setCropSize(element.getBoundingClientRect().width);
    updateCropSize();

    const resizeObserver = new ResizeObserver(updateCropSize);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  const baseScale = naturalSize && cropSize
    ? Math.max(cropSize / naturalSize.width, cropSize / naturalSize.height)
    : 1;

  const imageWidth = naturalSize ? naturalSize.width * baseScale : 0;
  const imageHeight = naturalSize ? naturalSize.height * baseScale : 0;

  const constrainOffset = useCallback((nextOffset: Offset, nextZoom = zoom) => {
    if (!naturalSize || !cropSize) return nextOffset;

    const scaledWidth = naturalSize.width * baseScale * nextZoom;
    const scaledHeight = naturalSize.height * baseScale * nextZoom;
    const maxX = Math.max(0, (scaledWidth - cropSize) / 2);
    const maxY = Math.max(0, (scaledHeight - cropSize) / 2);

    return {
      x: Math.min(maxX, Math.max(-maxX, nextOffset.x)),
      y: Math.min(maxY, Math.max(-maxY, nextOffset.y)),
    };
  }, [baseScale, cropSize, naturalSize, zoom]);

  useEffect(() => {
    setOffset((current) => constrainOffset(current, zoom));
  }, [constrainOffset, zoom]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    setOffset(constrainOffset({
      x: dragState.originX + event.clientX - dragState.startX,
      y: dragState.originY + event.clientY - dragState.startY,
    }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState?.pointerId === event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
      setDragState(null);
    }
  };

  const handleZoomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextZoom = Number(event.target.value);
    setZoom(nextZoom);
    setOffset((current) => constrainOffset(current, nextZoom));
  };

  const handleCrop = async () => {
    if (!imageSrc || !naturalSize || !cropSize) return;

    setIsCropping(true);
    try {
      const image = new window.Image();
      image.src = imageSrc;
      await image.decode();

      const canvas = document.createElement("canvas");
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;

      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is unavailable.");

      const scaledFactor = baseScale * zoom;
      const sourceSize = cropSize / scaledFactor;
      const sourceCenterX = naturalSize.width / 2 - offset.x / scaledFactor;
      const sourceCenterY = naturalSize.height / 2 - offset.y / scaledFactor;
      const sourceX = sourceCenterX - sourceSize / 2;
      const sourceY = sourceCenterY - sourceSize / 2;

      context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        OUTPUT_SIZE,
        OUTPUT_SIZE,
      );

      const outputType = file.type.startsWith("image/") ? file.type : "image/jpeg";
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, outputType, 0.92));
      if (!blob) throw new Error("Could not crop image.");

      const croppedFile = new File([blob], file.name, {
        type: blob.type || outputType,
        lastModified: Date.now(),
      });

      onCrop(croppedFile);
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <ImageIcon className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Crop profile photo</h2>
              <p className="text-xs text-gray-500">Drag to reposition and use zoom to fit.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close cropper"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div
          ref={cropAreaRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative mx-auto aspect-square w-full max-w-[320px] cursor-grab overflow-hidden rounded-full bg-gray-100 shadow-inner active:cursor-grabbing"
        >
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Selected profile preview"
              draggable={false}
              onLoad={(event) => {
                setNaturalSize({
                  width: event.currentTarget.naturalWidth,
                  height: event.currentTarget.naturalHeight,
                });
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
              style={{
                width: imageWidth ? `${imageWidth}px` : "auto",
                height: imageHeight ? `${imageHeight}px` : "auto",
                transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${zoom})`,
                transformOrigin: "center",
              }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/90 ring-offset-2 ring-offset-white" />
        </div>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
          Zoom
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={zoom}
            onChange={handleZoomChange}
            className="mt-2 w-full accent-blue-500"
          />
        </label>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCrop}
            disabled={!naturalSize || isCropping}
            className="flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
          >
            {isCropping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {isCropping ? "Cropping..." : "Use Photo"}
          </button>
        </div>
      </div>
    </div>
  );
}
