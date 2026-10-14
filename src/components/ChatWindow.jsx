import MessageBubble from './MessageBubble.jsx'
import { AssistantIcon } from './Header.jsx'

function ChatWindow({ messages, loading, onRetry, bottomRef }) {
  if (!messages.length && !loading) return null

  return (
    <div className="chat-window" aria-live="polite" aria-relevant="additions text">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} onRetry={onRetry} />
      ))}
      {loading && (
        <div className="loading-row" role="status">
          <AssistantIcon small />
          <div className="loading-content">
            <div className="loading-bubble" aria-label="AI is preparing your email">
              <span /><span /><span />
            </div>
            <p>AI is preparing your email...</p>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export default ChatWindow