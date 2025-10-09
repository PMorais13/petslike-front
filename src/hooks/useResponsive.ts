// ============================================
// HOOK DE RESPONSIVIDADE
// ============================================

import { useState, useEffect } from 'react';

interface UseResponsiveReturn {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  windowWidth: number;
}

// ========== BREAKPOINTS ==========
const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

export const useResponsive = (): UseResponsiveReturn => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowWidth < BREAKPOINTS.MOBILE,
    isTablet: windowWidth >= BREAKPOINTS.MOBILE && windowWidth < BREAKPOINTS.TABLET,
    isDesktop: windowWidth >= BREAKPOINTS.TABLET,
    windowWidth,
  };
};
