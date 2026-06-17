import { useEffect, useRef } from 'react'
import Message from './Message'

export default function MessageList({ messages, isTyping }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="messages-area">
      {/* Date separator */}
      <div className="date-separator">
        <div className="date-separator-line" />
        <span className="date-separator-text">HOY</span>
        <div className="date-separator-line" />
      </div>

      {messages.map(msg => (
        <Message key={msg.id} msg={msg} />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="msg-row bot">
          <div className="msg-avatar bot-av">N</div>
          <div className="msg-bubble bot">
            <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
