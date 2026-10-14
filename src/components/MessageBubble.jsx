import EmailSummary from './EmailSummary.jsx'
import { AssistantIcon } from './Header.jsx'

function formatTimestamp(date) {
  return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(date)
}

function MessageBubble({ message, onRetry }) {
  const isUser = message.role === 'user'

  if (message.error) {
    return (
      <article className="message-row assistant-row">
        <AssistantIcon small />
        <div className="assistant-message-content">
          <div className="error-bubble">
            <p className="error-title">Unable to reach the email agent.</p>
            <p className="error-copy">Please make sure the n8n workflow is running.</p>
            <button className="retry-button" type="button" onClick={() => onRetry(message.retryMessage)}>
              <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M16.2 8A6.5 6.5 0 0 0 4.8 5.6L3 7.5m0 0V4.7m0 2.8h2.8M3.8 12A6.5 6.5 0 0 0 15.2 14.4l1.8-1.9m0 0v2.8m0-2.8h-2.8" /></svg>
              Retry
            </button>
          </div>
          <time className="message-time" dateTime={message.timestamp.toISOString()}>{formatTimestamp(message.timestamp)}</time>
        </div>
      </article>
    )
  }

  if (isUser) {
    return (
      <article className="message-row user-row">
        <div className="user-message-content">
          <div className="user-bubble">{message.text}</div>
          <time className="message-time" dateTime={message.timestamp.toISOString()}>{formatTimestamp(message.timestamp)}</time>
        </div>
      </article>
    )
  }

  return (
    <article className="message-row assistant-row">
      <AssistantIcon small />
      <div className="assistant-message-content">
        {message.email
          ? <EmailSummary email={message.email} />
          : <div className="assistant-bubble">{message.text || 'I couldn’t read a response from the email agent. Please try again.'}</div>}
        <time className="message-time" dateTime={message.timestamp.toISOString()}>{formatTimestamp(message.timestamp)}</time>
      </div>
    </article>
  )
}

export default MessageBubble