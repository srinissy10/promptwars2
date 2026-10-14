function AssistantIcon({ small = false }) {
  return (
    <span className={`assistant-icon${small ? ' assistant-icon-small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 3.5 18.8 12l8.7 2.8-8.7 2.8-2.8 8.9-2.8-8.9-8.7-2.8 8.7-2.8L16 3.5Z" fill="currentColor" />
        <path d="m25.5 19.5 1.3 3.7 3.7 1.3-3.7 1.2-1.3 3.8-1.2-3.8-3.8-1.2 3.8-1.3 1.2-3.7Z" fill="currentColor" opacity=".65" />
      </svg>
    </span>
  )
}

function Header({ connection }) {
  const connectionLabel = connection === 'connected'
    ? 'Backend connected'
    : connection === 'unavailable'
      ? 'Connection unavailable'
      : 'Webhook ready'

  return (
    <header className="topbar">
      <div className="brand-lockup">
        <AssistantIcon />
        <div>
          <p className="brand-name">Personal AI Email Agent</p>
          <p className="brand-caption">Your intelligent email assistant</p>
        </div>
      </div>
      <div className={`connection-status status-${connection}`} role="status">
        <span className="status-indicator" />
        <span>{connectionLabel}</span>
      </div>
    </header>
  )
}

export { AssistantIcon }
export default Header