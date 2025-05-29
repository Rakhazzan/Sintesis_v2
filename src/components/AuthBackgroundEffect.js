import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AuthAnimation.css';

const AuthBackgroundEffect = () => {
  const backgroundRef = useRef(null);
  
  useEffect(() => {
    // Capturar la referencia dentro del efecto
    const container = backgroundRef.current;
    
    if (container) {
      // Crea los elementos de animación
      const count = 20;
      
      // Limpia el contenedor antes de añadir nuevos elementos
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Crea los elementos animados
      for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.className = 'animated-element';
        
        // Variar tamaños aleatorios
        const size = Math.random() * 100 + 50;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Posiciones iniciales aleatorias
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        element.style.left = `${x}vw`;
        element.style.top = `${y}vh`;
        
        // Opacidad aleatoria
        element.style.opacity = Math.random() * 0.3 + 0.1;
        
        container.appendChild(element);
        
        // Animación con GSAP para cada elemento
        gsap.to(element, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          rotation: Math.random() * 360,
          duration: Math.random() * 20 + 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }
    
    // Limpieza al desmontar el componente
    return () => {
      if (container) {
        gsap.killTweensOf(container.children);
      }
    };
  }, []);
  
  return (
    <div className="auth-background" ref={backgroundRef}></div>
  );
};

export default AuthBackgroundEffect;
