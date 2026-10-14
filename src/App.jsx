import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import ExamplePrompts from './components/ExamplePrompts.jsx'
import ChatInput from './components/ChatInput.jsx'
import { sendEmailAgentMessage } from './services/emailAgent.js'
import { normalizeAgentResponse, parseEmailResponse } from './utils/parseEmailResponse.js'
import './App.css'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [connection, setConnection] = useState('ready')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, loading])

  async function submitMessage(message, isRetry = false) {
    const trimmedMessage = message.trim()
    if (!trimmedMessage || loading) return

    if (!isRetry) {
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: 'user',
        text: trimmedMessage,
        timestamp: new Date(),
      }])
    }

    setLoading(true)
    try {
      const result = await sendEmailAgentMessage(trimmedMessage)
      const responseText = normalizeAgentResponse(result)
      const email = parseEmailResponse(responseText)
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: responseText,
        email,
        timestamp: new Date(),
      }])
      setConnection('connected')
      setInput('')
    } catch {
      setConnection('unavailable')
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: 'assistant',
        error: true,
        retryMessage: trimmedMessage,
        timestamp: new Date(),
      }])
    } finally {
      setLoading(false)
    }
  }

  function handleSend() {
    submitMessage(input)
  }

  return (
    <main className="app-shell">
      <Header connection={connection} />
      <section className={`workspace ${messages.length ? 'has-messages' : 'is-empty'}`} aria-label="Email assistant conversation">
        {!messages.length && (
          <div className="welcome-block">
            <div className="welcome-mark" aria-hidden="true">
              <span className="welcome-mark-core">✳</span>
              <span className="welcome-mark-orbit" />
            </div>
            <p className="eyebrow">YOUR PERSONAL EMAIL ASSISTANT</p>
            <h1>Make email happen<br />with a simple ask.</h1>
            <p className="welcome-copy">Tell me who to write, what to say, and when to send it.</p>
          </div>
        )}
        <ChatWindow messages={messages} loading={loading} onRetry={(message) => submitMessage(message, true)} bottomRef={bottomRef} />
        {!messages.length && <ExamplePrompts onSelect={setInput} />}
      </section>
      <footer className="composer-dock">
        <ChatInput value={input} onChange={setInput} onSend={handleSend} loading={loading} />
        <p className="privacy-note">Your request is sent securely to your email workflow.</p>
      </footer>
    </main>
  )
}

export default App