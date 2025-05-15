import React, { useState, useCallback } from 'react';
import Notification from './Notification';
import './Notification.css';

/**
 * Componente que gestiona múltiples notificaciones
 */
const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);

  // Eliminar una notificación por su ID
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <div className="notifications-container">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => removeNotification(notification.id)}
          autoClose={notification.autoClose}
        />
      ))}
    </div>
  );
};

// Función para crear un ID único para cada notificación
const generateId = () => `notification-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// Objeto singleton para manejar notificaciones desde cualquier parte de la aplicación
export const notifyService = {
  _notificationQueue: [],
  _setNotifications: null,

  // Inicializar el servicio con la función setState de React
  init(setNotificationsFunction) {
    this._setNotifications = setNotificationsFunction;
    
    // Procesar cualquier notificación en cola antes de la inicialización
    if (this._notificationQueue.length > 0) {
      this._setNotifications(prev => [...prev, ...this._notificationQueue]);
      this._notificationQueue = [];
    }
  },

  // Mostrar una notificación
  show(message, type = 'info', autoClose = true) {
    const newNotification = {
      id: generateId(),
      message,
      type,
      autoClose
    };

    if (this._setNotifications) {
      // Si el servicio ya está inicializado, actualiza el estado de React
      this._setNotifications(prev => [...prev, newNotification]);
    } else {
      // Si no está inicializado, añade a la cola
      this._notificationQueue.push(newNotification);
    }

    return newNotification.id;
  },

  // Métodos específicos para diferentes tipos de notificaciones
  success(message, autoClose = true) {
    return this.show(message, 'success', autoClose);
  },

  error(message, autoClose = true) {
    return this.show(message, 'error', autoClose);
  },

  info(message, autoClose = true) {
    return this.show(message, 'info', autoClose);
  },

  warning(message, autoClose = true) {
    return this.show(message, 'warning', autoClose);
  },

  call(message, autoClose = true) {
    return this.show(message, 'call', autoClose);
  },

  // Eliminar una notificación específica
  remove(id) {
    if (this._setNotifications) {
      this._setNotifications(prev => prev.filter(n => n.id !== id));
    }
  },

  // Eliminar todas las notificaciones
  clear() {
    if (this._setNotifications) {
      this._setNotifications([]);
    }
  }
};

export default NotificationManager;
