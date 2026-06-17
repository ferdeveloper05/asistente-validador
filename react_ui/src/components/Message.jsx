// ── Validation result card ────────────────────────────────────────
function ValidationCard({ url, status, message }) {
  const isScanning = status?.includes('scanning') || status?.includes('mock')
  const isOk       = status === 'ok' || status === 'safe'
  const isError    = status === 'error' || status === 'malicious'

  const statusClass = isOk ? 'vc-status-ok' : isError ? 'vc-status-error' : 'vc-status-scanning'
  const statusIcon  = isOk ? 'fa-check-circle' : isError ? 'fa-triangle-exclamation' : 'fa-radar'
  const statusLabel = isOk ? 'SEGURO' : isError ? 'AMENAZA DETECTADA' : 'ESCANEANDO'

  return (
    <div className="validation-card">
      <div className={`validation-card-header ${statusClass}`}>
        <i className={`fa-solid ${statusIcon}`} />
        <span>{statusLabel}</span>
      </div>
      <div className="validation-card-body">
        <div style={{ marginBottom: '0.4rem' }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>URL analizada</span>
          <p style={{ fontWeight: 600, color: 'var(--pastel-blue)', wordBreak: 'break-all', marginTop: '2px' }}>{url}</p>
        </div>
        <div style={{ marginTop: '0.6rem' }}>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resultado</span>
          <p style={{ marginTop: '2px' }}>{message}</p>
        </div>

        {/* Simulated scan steps */}
        {isScanning && (
          <div className="scan-progress" style={{ marginTop: '0.75rem' }}>
            {[
              { label: 'DNS Lookup', state: 'done' },
              { label: 'SSL Certificate Check', state: 'done' },
              { label: 'Malware Database', state: 'active' },
              { label: 'Phishing Patterns', state: 'pending' },
            ].map(step => (
              <div key={step.label} className="scan-step">
                <div className={`scan-step-icon ${step.state}`}>
                  {step.state === 'done' && <i className="fa-solid fa-check" />}
                  {step.state === 'active' && <i className="fa-solid fa-rotate spin" />}
                  {step.state === 'pending' && <i className="fa-solid fa-clock" />}
                </div>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Error message ─────────────────────────────────────────────────
function ErrorBubble({ text }) {
  return (
    <div style={{
      background: 'rgba(255, 95, 87, 0.08)',
      border: '1px solid rgba(255, 95, 87, 0.2)',
      borderRadius: 'var(--radius-xl)',
      borderTopLeftRadius: '4px',
      padding: '0.9rem 1.1rem',
      fontSize: '0.8375rem',
      color: '#FF8A80',
      lineHeight: 1.65,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', fontWeight: 600 }}>
        <i className="fa-solid fa-triangle-exclamation" style={{ color: '#FF5F57' }} />
        Error de conexión
      </div>
      {text}
    </div>
  )
}

// ── Main Message component ────────────────────────────────────────
export default function Message({ msg }) {
  const isUser = msg.sender === 'user'

  return (
    <div className={`msg-row ${isUser ? 'user' : 'bot'}`}>
      {/* Avatar */}
      <div className={`msg-avatar ${isUser ? 'user-av' : 'bot-av'}`}>
        {isUser ? <i className="fa-solid fa-user" /> : 'N'}
      </div>

      {/* Bubble content */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', minWidth: 0 }}>
        {msg.type === 'error' ? (
          <ErrorBubble text={msg.text} />
        ) : msg.type === 'validation' ? (
          <div className="msg-bubble bot">
            <p>He iniciado el análisis de seguridad para la URL indicada:</p>
            <ValidationCard
              url={msg.url}
              status={msg.status}
              message={msg.message}
            />
            <span className="msg-time">{msg.time}</span>
          </div>
        ) : (
          <div className={`msg-bubble ${isUser ? 'user' : 'bot'}`}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            <span className="msg-time">{msg.time}</span>
          </div>
        )}
      </div>
    </div>
  )
}
