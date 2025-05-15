import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './Notification.css';

/**
 * Componente de notificación que muestra mensajes elegantes en lugar de alerts
 */
const Notification = ({ message, type = 'info', onClose, autoClose = true }) => {
  const notificationRef = useRef(null);
  const timeoutRef = useRef(null);

  // Tipos de notificaciones y sus clases/iconos
  const notificationTypes = {
    success: { className: 'success', icon: '✓' },
    error: { className: 'error', icon: '✕' },
    info: { className: 'info', icon: 'ℹ' },
    warning: { className: 'warning', icon: '⚠' },
    call: { className: 'call', icon: '📞' }
  };

  const { className, icon } = notificationTypes[type] || notificationTypes.info;

  // Función para cerrar la notificación con animación
  const closeNotification = useCallback(() => {
    const notification = notificationRef.current;
    
    gsap.to(notification, { 
      y: -50, 
      opacity: 0, 
      duration: 0.3, 
      ease: "power2.in",
      onComplete: () => {
        if (onClose) onClose();
      }
    });
  }, [onClose]);

  // Animación de entrada y salida con GSAP
  useEffect(() => {
    const notification = notificationRef.current;
    
    console.log('Rendering notification of type:', type);
  
  // Animación de entrada simplificada pero efectiva
  if (type === 'error') {
    // Para errores, una animación más llamativa
    gsap.fromTo(notification, 
      { y: -50, opacity: 0, scale: 0.8 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
    
    // Efecto de atención (shake) después de la entrada
    gsap.to(notification, {
      x: 10, 
      duration: 0.1, 
      repeat: 5, 
      yoyo: true,
      delay: 0.5
    });
    
    // Pulso para resaltar aún más
    gsap.to(notification, {
      boxShadow: '0 0 20px rgba(255, 0, 0, 0.6)',
      duration: 0.3,
      repeat: 1,
      yoyo: true,
      delay: 1
    });
    
    // Verificar si es el error específico de correo no confirmado
    if (message.includes('correo electrónico') || message.includes('Email not confirmed')) {
      // Pulso adicional para enfatizar
      gsap.to(notification, {
        scale: 1.05,
        duration: 0.3,
        repeat: 2,
        yoyo: true,
        delay: 1.5
      });
    }
  } else {
    // Animación estándar para otros tipos de notificaciones
    gsap.fromTo(notification, 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }

    // Auto-cierre después de 3 segundos (o 5 para errores)
    if (autoClose) {
      const closeDelay = type === 'error' ? 5000 : 3000;
      timeoutRef.current = setTimeout(() => {
        closeNotification();
      }, closeDelay);
    }

    // Limpiar timeouts y animaciones al desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Matar todas las animaciones GSAP asociadas a este elemento
      gsap.killTweensOf(notification);
    };
  }, [autoClose, closeNotification, type, message]);

  return (
    <div className={`notification ${className}`} ref={notificationRef}>
      <div className="notification-icon">{icon}</div>
      <div className="notification-message">{message}</div>
      <button className="notification-close" onClick={closeNotification}>✕</button>
    </div>
  );
};

export default Notification;
