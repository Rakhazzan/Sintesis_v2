import React from "react";

/**
 * Utility to handle responsive design decisions
 */

// Las resoluciones móviles que deben preservar el diseño original
const PROTECTED_MOBILE_RESOLUTIONS = [
  { width: 360, height: 640 },
  { width: 375, height: 667 },
  { width: 360, height: 720 },
  { width: 375, height: 812 },
  { width: 411, height: 731 }
];

/**
 * Verifica si la resolución actual es una de las resoluciones móviles protegidas
 * @returns {boolean} True si la resolución actual coincide con una de las protegidas
 */
export const isProtectedMobileResolution = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  return PROTECTED_MOBILE_RESOLUTIONS.some(
    resolution => 
      Math.abs(resolution.width - width) <= 5 && 
      Math.abs(resolution.height - height) <= 5
  );
};

/**
 * Verifica si la pantalla actual es una pantalla de escritorio (≥1024px)
 * @returns {boolean} True si la pantalla es de escritorio
 */
export const isDesktopScreen = () => {
  return window.innerWidth >= 1024 && !isProtectedMobileResolution();
};

/**
 * Custom hook para detectar cambios en el tamaño de la pantalla
 * @returns {Object} Objeto con propiedades isDesktop y isMobileProtected
 */
export const useScreenType = () => {
  const [screenType, setScreenType] = React.useState({
    isDesktop: isDesktopScreen(),
    isMobileProtected: isProtectedMobileResolution()
  });

  React.useEffect(() => {
    const handleResize = () => {
      setScreenType({
        isDesktop: isDesktopScreen(),
        isMobileProtected: isProtectedMobileResolution()
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenType;
};
