'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseParallaxProps {
  sequenceUrl: string;
  frameCount: number;
}

const SCROLL_FACTOR = 2.0; // Determines how much scroll distance is needed for the full animation

export function useParallax({ sequenceUrl, frameCount }: UseParallaxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const image_cache = useRef<{[key: string]: HTMLImageElement[]}>({});

  const getFrameUrl = useCallback((baseUrl: string, frame: number) => {
    return baseUrl.replace('000', frame.toString().padStart(3, '0'));
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    setLoadingProgress(0);

    const cacheKey = sequenceUrl;
    if (image_cache.current[cacheKey]) {
      setImages(image_cache.current[cacheKey]);
      setLoadingProgress(100);
      setIsLoaded(true);
      return;
    }

    let loadedCount = 0;
    const imagesArray: HTMLImageElement[] = [];
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const url = getFrameUrl(sequenceUrl, i);
      img.src = url;
      imagesArray.push(img);
      img.onload = () => {
        loadedCount++;
        setLoadingProgress((loadedCount / frameCount) * 100);
        if (loadedCount === frameCount) {
          image_cache.current[cacheKey] = imagesArray;
          setImages(imagesArray);
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        // Silently fail for now, but could add more robust error handling
        loadedCount++;
        if (loadedCount === frameCount) {
          image_cache.current[cacheKey] = imagesArray;
          setImages(imagesArray);
          setIsLoaded(true);
        }
      };
    }
  }, [sequenceUrl, frameCount, getFrameUrl]);

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * SCROLL_FACTOR;
    const scrollFraction = Math.min(1, scrollY / maxScroll);
    let frameIndex = Math.floor(scrollFraction * (frameCount - 1));
    frameIndex = Math.max(0, Math.min(frameIndex, frameCount - 1));

    const image = images[frameIndex];
    if (image && image.complete && image.naturalHeight !== 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const hRatio = canvas.width / image.naturalWidth;
      const vRatio = canvas.height / image.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - image.naturalWidth * ratio) / 2;
      const centerShift_y = (canvas.height - image.naturalHeight * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image, 0, 0, image.naturalWidth, image.naturalHeight,
        centerShift_x, centerShift_y, image.naturalWidth * ratio, image.naturalHeight * ratio
      );
    }
  }, [images, frameCount]);

  useEffect(() => {
    drawImage();
    window.addEventListener('scroll', drawImage);
    window.addEventListener('resize', drawImage);
    
    return () => {
      window.removeEventListener('scroll', drawImage);
      window.removeEventListener('resize', drawImage);
    };
  }, [drawImage]);

  return { canvasRef, loadingProgress, isLoaded };
}
