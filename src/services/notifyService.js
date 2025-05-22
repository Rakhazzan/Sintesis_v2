/**
 * Servicio para manejar notificaciones en la aplicación
 * Usa CSS para animaciones sin dependencias externas
 */

class NotificationService {
  constructor() {
    this.container = null;
    this.timeout = 3000; // Duración predeterminada de las notificaciones
    this.init();
  }

  // Inicializar el contenedor de notificaciones
  init() {
    // Crear el contenedor si no existe
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'notification-container';
      document.body.appendChild(this.container);

      // Estilos para el contenedor y las notificaciones
      const style = document.createElement('style');
      style.textContent = `
        .notification-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .notification {
          padding: 12px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          min-width: 280px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          animation: notificationFadeIn 0.3s forwards;
        }
        .notification.hiding {
          animation: notificationFadeOut 0.3s forwards;
        }
        .notification::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 3px;
          width: 100%;
          background-color: rgba(255, 255, 255, 0.3);
          animation: notificationProgress 3s linear forwards;
        }
        .notification.success {
          background-color: #4caf50;
        }
        .notification.error {
          background-color: #f44336;
        }
        .notification.info {
          background-color: #2196f3;
        }
        .notification.warning {
          background-color: #ff9800;
        }
        @keyframes notificationFadeIn {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes notificationFadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(50px);
          }
        }
        @keyframes notificationProgress {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // Crear y animar una notificación
  createNotification(message, type) {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    this.container.appendChild(notification);

    // Configurar el temporizador para remover la notificación
    setTimeout(() => {
      this.removeNotification(notification);
    }, this.timeout);

    // Agregar evento de click para eliminar la notificación
    notification.addEventListener('click', () => {
      this.removeNotification(notification);
    });
  }

  // Eliminar una notificación
  removeNotification(notification) {
    notification.classList.add('hiding');
    
    // Esperar a que termine la animación antes de eliminar el elemento
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300); // Duración de la animación de salida
  }

  // Métodos públicos para diferentes tipos de notificaciones
  success(message) {
    this.createNotification(message, 'success');
  }

  error(message) {
    this.createNotification(message, 'error');
  }

  info(message) {
    this.createNotification(message, 'info');
  }

  warning(message) {
    this.createNotification(message, 'warning');
  }
}

export const notifyService = new NotificationService();
