import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface MediaCarouselProps {
  images: string[];
  onLike?: () => void;
  isLiked?: boolean;
  className?: string;
}

export function MediaCarousel({ images, onLike, isLiked, className = '' }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextImage();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevImage();
    }
  };

  const handleDoubleClick = () => {
    if (onLike) {
      onLike();
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
    }
  };

  const getImageStyles = (src: string) => {
    return new Promise<{ objectFit: 'contain' | 'cover'; aspectRatio?: string }>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        if (aspectRatio < 0.8) {
          // Vertical image - use contain to show full image
          resolve({ objectFit: 'contain' });
        } else if (aspectRatio > 1.5) {
          // Horizontal image - use cover to fill width nicely
          resolve({ objectFit: 'cover' });
        } else {
          // Square-ish image - use contain
          resolve({ objectFit: 'contain' });
        }
      };
      img.src = src;
    });
  };

  if (images.length === 0) return null;

  return (
    <div className={`relative w-full h-full bg-gray-900 flex items-center justify-center ${className}`}>
      {/* Main Image */}
      <div 
        className="relative w-full h-full flex items-center justify-center overflow-hidden p-[0px]"
        onDoubleClick={handleDoubleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]}
          alt={`Imagem ${currentIndex + 1} de ${images.length}`}
          className="object-contain"
          style={{
            maxWidth: '100%',
            maxHeight: window.innerWidth >= 1024 ? '90vh' : '70vh',
            height: 'auto'
          }}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement;
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            
            if (aspectRatio < 0.8) {
              // Vertical image
              img.style.objectFit = 'contain';
            } else if (aspectRatio > 1.5) {
              // Horizontal image
              img.style.objectFit = 'contain';
              img.style.width = window.innerWidth >= 1024 ? '500px' : '100%';
              img.style.maxHeight = window.innerWidth >= 1024 ? '90vh' : '70vh';
            } else {
              // Square-ish image
              img.style.objectFit = 'contain';
            }
          }}
        />

        {/* Like Animation */}
        {showLikeAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="animate-ping">
              <svg 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                className="text-purple-500 opacity-80"
                fill="currentColor"
              >
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9C22.1 9 23 9.9 23 11C23 12.1 22.1 13 21 13C19.9 13 19 12.1 19 11C19 9.9 19.9 9 21 9ZM3 9C4.1 9 5 9.9 5 11C5 12.1 4.1 13 3 13C1.9 13 1 12.1 1 11C1 9.9 1.9 9 3 9ZM19 20C19 18.9 18.1 18 17 18C15.9 18 15 18.9 15 20C15 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20ZM9 20C9 18.9 8.1 18 7 18C5.9 18 5 18.9 5 20C5 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20ZM12 13C15.31 13 18 15.69 18 19C18 19.83 17.67 20.6 17.1 21.2C16.45 21.85 15.55 22.2 14.6 22.2H9.4C8.45 22.2 7.55 21.85 6.9 21.2C6.33 20.6 6 19.83 6 19C6 15.69 8.69 13 12 13Z"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Arrows - Desktop only */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none hidden lg:flex w-10 h-10 rounded-full p-0"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white border-none hidden lg:flex w-10 h-10 rounded-full p-0"
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}

      {/* Position Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir para imagem ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}