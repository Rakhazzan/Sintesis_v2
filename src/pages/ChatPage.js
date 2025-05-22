import React, { useRef, useEffect } from "react";
import "../components/ChatPage.css";

const mockMessages = [
  { from: "other", text: "Hola, ¿cómo te encuentras hoy?", time: "10:30" },
  { from: "me", text: "Hola, doctora. Bastante mejor, gracias.", time: "10:31" },
  { from: "other", text: "Recuerda tomar tu medicación.", time: "10:32" },
  { from: "me", text: "¡Por supuesto!", time: "10:32" }
];

const ChatPage = ({ user }) => {
  const messagesEndRef = useRef(null);
  // Efecto para desplazar automáticamente al final de la conversación
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="chat-main">
      <div className="chat-thread">
        {mockMessages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.from}`}> 
            <div className="chat-msg-text">{msg.text}</div>
            <div className="chat-msg-time">{msg.time}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-bar">
        <input className="chat-input" placeholder="Escribe un mensaje..." />
        <button className="chat-send-btn" type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ChatPage;
