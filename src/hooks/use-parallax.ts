'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseParallaxProps {
  sequenceUrl: string;
  frameCount: number;
}

const SCROLL_FACTOR = 2.0; // Determines how much scroll distance is needed for the full animation
const INTRO_ANIMATION_DURATION = 3000; // 3 seconds for the intro animation

export function useParallax({ sequenceUrl, frameCount }: UseParallaxProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const image_cache = useRef<{ [key: string]: HTMLImageElement[] }>({});
  const animationFrameId = useRef<number>();
  const introStartTime = useRef<number | null>(null);
  const hasPlayedIntro = useRef(false);

  const getFrameUrl = useCallback((baseUrl: string, frame: number) => {
    return baseUrl.replace('000', frame.toString().padStart(3, '0'));
  }, []);

  useEffect(() => {
    setIsLoaded(false);
    setLoadingProgress(0);
    hasPlayedIntro.current = false;
    introStartTime.current = null;

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
        loadedCount++;
        if (loadedCount === frameCount) {
          image_cache.current[cacheKey] = imagesArray;
          setImages(imagesArray);
          setIsLoaded(true);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequenceUrl, frameCount, getFrameUrl]);

  const drawImage = useCallback(
    (time?: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      let frameIndex;
      const scrollY = window.scrollY;

      if (!hasPlayedIntro.current && scrollY === 0) {
        if (!introStartTime.current) {
          introStartTime.current = time || performance.now();
        }
        const elapsedTime = (time || performance.now()) - introStartTime.current;
        const introProgress = Math.min(elapsedTime / INTRO_ANIMATION_DURATION, 1);
        frameIndex = Math.floor(introProgress * (frameCount - 1));

        if (introProgress >= 1) {
          hasPlayedIntro.current = true;
        }
      } else {
        // If the user starts scrolling, stop the intro and switch to scroll control
        if (!hasPlayedIntro.current) {
          hasPlayedIntro.current = true;
        }
        const maxScroll = window.innerHeight * SCROLL_FACTOR;
        const scrollFraction = Math.min(1, scrollY / maxScroll);
        frameIndex = Math.floor(scrollFraction * (frameCount - 1));
      }

      frameIndex = Math.max(0, Math.min(frameIndex, frameCount - 1));

      const image = images[frameIndex];
      if (image && image.complete && image.naturalHeight !== 0) {
        const hRatio = canvas.width / image.naturalWidth;
        const vRatio = canvas.height / image.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - image.naturalWidth * ratio) / 2;
        const centerShift_y = (canvas.height - image.naturalHeight * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
          centerShift_x,
          centerShift_y,
          image.naturalWidth * ratio,
          image.naturalHeight * ratio
        );
      }
      
      if (!hasPlayedIntro.current) {
        animationFrameId.current = requestAnimationFrame(drawImage);
      }
    },
    [images, frameCount]
  );

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImage();
    }
  }, [drawImage]);

  const handleScroll = useCallback(() => {
    if (hasPlayedIntro.current) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      drawImage();
    }
  }, [drawImage]);
  

  useEffect(() => {
    if (!isLoaded) return;
    
    handleResize(); // Initial draw and resize

    if (!hasPlayedIntro.current) {
      animationFrameId.current = requestAnimationFrame(drawImage);
    }
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoaded, handleResize, handleScroll, drawImage]);

  return { canvasRef, loadingProgress, isLoaded };
}
