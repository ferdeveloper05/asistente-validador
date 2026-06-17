const HISTORY_ITEMS = [
  { id: 1, label: 'Análisis github.com', icon: 'fa-shield-halved' },
  { id: 2, label: 'Consulta OWASP Top 10', icon: 'fa-comment-dots' },
  { id: 3, label: 'Scan paypal.com', icon: 'fa-shield-halved' },
  { id: 4, label: 'SQL Injection patterns', icon: 'fa-comment-dots' },
]

export default function Sidebar({ scanCount, chatCount }) {
  return (
    <div className="sidebar">
      {/* Navigation */}
      <div>
        <p className="sidebar-section-label">Workspace</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button className="nav-btn active">
            <i className="fa-solid fa-message nav-icon" />
            <span>Chat Principal</span>
          </button>
          <button className="nav-btn">
            <i className="fa-solid fa-clock-rotate-left nav-icon" />
            <span>Historial</span>
          </button>
          <button className="nav-btn">
            <i className="fa-solid fa-chart-bar nav-icon" />
            <span>Reportes</span>
          </button>
          <button className="nav-btn">
            <i className="fa-solid fa-gear nav-icon" />
            <span>Configuración</span>
          </button>
        </div>
      </div>

      {/* Recent sessions */}
      <div>
        <p className="sidebar-section-label">Recientes</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {HISTORY_ITEMS.map(item => (
            <div key={item.id} className="history-item">
              <i className={`fa-solid ${item.icon}`} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick stats */}
      <div>
        <p className="sidebar-section-label">Sesión actual</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', padding: '4px 0' }}>
            <span style={{ color: 'var(--text-muted)' }}>URLs escaneadas</span>
            <span style={{ color: 'var(--mint)', fontWeight: 700 }}>{scanCount}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.73rem', padding: '4px 0', borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Chats enviados</span>
            <span style={{ color: 'var(--pastel-blue)', fontWeight: 700 }}>{chatCount}</span>
          </div>
        </div>
      </div>

      {/* User card */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">
            UX
            <span className="user-avatar-status" />
          </div>
          <div>
            <p className="user-name">Diseñador Senior</p>
            <p className="user-status">Sesión Activa</p>
          </div>
        </div>
      </div>
    </div>
  )
}
