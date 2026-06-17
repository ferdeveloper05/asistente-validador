export default function ChatInput({ inputRef, value, onChange, onSend, disabled }) {
  function handleSubmit(e) {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value.trim())
    onChange('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="chat-input-area">
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          className="chat-input"
          placeholder="Escribe tu pregunta o pega una URL para escanear…"
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
        <button
          id="send-btn"
          type="submit"
          className="send-btn"
          disabled={disabled || !value.trim()}
          aria-label="Enviar mensaje"
        >
          {disabled
            ? <i className="fa-solid fa-rotate spin" />
            : <i className="fa-solid fa-paper-plane" />
          }
        </button>
      </form>

      <div className="chat-hints">
        <span className="chat-hint">
          <i className="fa-solid fa-keyboard" /> Enter para enviar
        </span>
        <span className="chat-hint">
          <i className="fa-solid fa-shield-halved" /> Conexión segura
        </span>
        <span className="chat-hint">
          <i className="fa-solid fa-link" /> Pega una URL para escanear
        </span>
      </div>
    </div>
  )
}
