export default function ChatHeader({ isTyping }) {
  return (
    <div className="chat-header">
      <div className="chat-header-left">
        {/* Neo avatar */}
        <div className={`neo-avatar ${isTyping ? 'active' : ''}`}>
          <div className="neo-avatar-inner" />
        </div>

        <div>
          <div className="neo-name">
            Neo
            {isTyping && (
              <span className="typing-badge">PROCESANDO...</span>
            )}
          </div>
          <p className="neo-subtitle">Asistente Virtual de Seguridad Web</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="chat-header-actions">
        <button className="icon-btn" title="Buscar en conversación">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
        <button className="icon-btn" title="Configuración del chat">
          <i className="fa-solid fa-sliders" />
        </button>
        <button className="icon-btn" title="Exportar conversación">
          <i className="fa-solid fa-arrow-up-from-bracket" />
        </button>
      </div>
    </div>
  )
}
