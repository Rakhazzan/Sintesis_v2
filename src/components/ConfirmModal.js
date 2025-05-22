import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ConfirmModal.css';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animación de entrada
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.set(contentRef.current, { scale: 0.8, opacity: 0 });
      
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, { 
        duration: 0.3, 
        opacity: 1 
      })
      .to(contentRef.current, {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)"
      });
    } else {
      // Animación de salida
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        }
      });
      
      tl.to(contentRef.current, {
        duration: 0.3,
        scale: 0.8,
        opacity: 0
      })
      .to(overlayRef.current, { 
        duration: 0.2, 
        opacity: 0 
      });
    }
  }, [isOpen]);

  return (
    <div className="confirm-modal" ref={modalRef} style={{ display: 'none' }}>
      <div className="confirm-modal-overlay" ref={overlayRef}></div>
      <div className="confirm-modal-content" ref={contentRef}>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button 
            className="confirm-modal-button confirm" 
            onClick={onConfirm}
          >
            Aceptar
          </button>
          <button 
            className="confirm-modal-button cancel" 
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
