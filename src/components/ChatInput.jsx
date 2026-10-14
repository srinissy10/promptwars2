function ChatInput({ value, onChange, onSend, loading }) {
  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSend()
    }
  }

  return (
    <div className="chat-input-wrap">
      <label className="visually-hidden" htmlFor="message-input">Email request</label>
      <textarea
        id="message-input"
        rows="2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tell me what email you want to send..."
        disabled={loading}
      />
      <div className="input-controls">
        <span className="input-hint">Shift + Enter for a new line</span>
        <button className="send-button" type="button" onClick={onSend} disabled={!value.trim() || loading} aria-label="Send email request">
          {loading ? <span className="send-spinner" aria-hidden="true" /> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 11.7 19 5l-4.5 14-3-6.2-7-1.1Zm7 1.1L19 5" /></svg>}
        </button>
      </div>
    </div>
  )
}

export default ChatInput