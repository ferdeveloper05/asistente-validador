export default function InfoPanel({ scanCount, chatCount, apiOnline }) {
  const totalInteractions = scanCount + chatCount

  return (
    <div className="info-panel">

      {/* ── Stats ────────────────────────────────────────────────── */}
      <div>
        <p className="panel-section-label">Estadísticas</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          <div className="stat-card">
            <span className="stat-label">URLs Escaneadas</span>
            <span className="stat-value mint">{scanCount}</span>
            <span className="stat-sublabel">Esta sesión</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Consultas de Chat</span>
            <span className="stat-value" style={{ color: 'var(--pastel-blue)' }}>{chatCount}</span>
            <span className="stat-sublabel">Esta sesión</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Interacciones</span>
            <span className="stat-value">{totalInteractions}</span>
            <span className="stat-sublabel">Mensajes totales</span>
          </div>
        </div>
      </div>

      {/* ── API Status ───────────────────────────────────────────── */}
      <div>
        <p className="panel-section-label">Estado del Sistema</p>
        <div style={{ background: 'var(--pizarra-light)', border: '1px solid var(--border)', borderRadius: '0.875rem', padding: '0.875rem 1rem' }}>
          {[
            {
              name: 'FastAPI Backend',
              online: apiOnline,
              checking: apiOnline === null,
            },
            { name: 'Motor IA (Gemini)', online: apiOnline, checking: apiOnline === null },
            { name: 'Motor de Seguridad', online: false, checking: false },
          ].map((svc) => (
            <div className="api-status-row" key={svc.name}>
              <span className="api-status-name">{svc.name}</span>
              {svc.checking ? (
                <span className="api-status-dot" style={{ color: 'var(--text-muted)' }}>
                  <span className="dot" style={{ background: 'var(--text-muted)' }} />
                  verificando…
                </span>
              ) : (
                <span className={`api-status-dot ${svc.online ? 'online' : 'offline'}`}>
                  <span className="dot" />
                  {svc.online ? 'online' : 'offline'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Tip card ─────────────────────────────────────────────── */}
      <div>
        <div className="tip-card">
          <div className="tip-card-title">
            <i className="fa-solid fa-lightbulb" /> Consejo
          </div>
          Pega directamente una URL completa (con <code style={{ color: 'var(--mint)', fontFamily: 'monospace' }}>https://</code>) para activar el análisis automático de seguridad con el motor de validación.
        </div>
      </div>

      {/* ── Endpoint reference ──────────────────────────────────── */}
      <div>
        <p className="panel-section-label">Endpoints API</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { method: 'POST', path: '/api/validate', desc: 'Escanear URL' },
            { method: 'POST', path: '/api/chat', desc: 'Chat con IA' },
          ].map(ep => (
            <div key={ep.path} style={{
              background: 'var(--pizarra-light)',
              border: '1px solid var(--border)',
              borderRadius: '0.625rem',
              padding: '0.6rem 0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2px' }}>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'var(--mint)',
                  background: 'rgba(76,175,80,0.12)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  letterSpacing: '0.04em',
                }}>
                  {ep.method}
                </span>
                <code style={{ fontSize: '0.7rem', color: 'var(--pastel-blue)', fontFamily: 'monospace' }}>
                  {ep.path}
                </code>
              </div>
              <p style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{ep.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
