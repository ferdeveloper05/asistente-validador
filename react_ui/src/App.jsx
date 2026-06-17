import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ChatHeader from './components/ChatHeader'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'
import InfoPanel from './components/InfoPanel'

// ── Initial conversation seed ──────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    type: 'text',
    text: 'Hola. Soy Neo, tu asistente de seguridad web. Puedo analizar URLs en busca de vulnerabilidades o responder tus preguntas de seguridad. ¿Con qué empezamos hoy?',
    time: 'Hace un momento',
  },
  {
    id: 2,
    sender: 'bot',
    type: 'text',
    text: 'Puedes escribir directamente una pregunta, o pegar una URL para que la analice con el motor de seguridad integrado.',
    time: 'Hace un momento',
  },
]

// ── URL detection helper ───────────────────────────────────────────
function isURL(str) {
  try {
    const url = new URL(str)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

let msgIdCounter = 100

function nextId() { return ++msgIdCounter }

export default function App() {
  const [messages, setMessages]     = useState(INITIAL_MESSAGES)
  const [isTyping, setIsTyping]     = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [scanCount, setScanCount]   = useState(0)
  const [chatCount, setChatCount]   = useState(0)
  const [apiOnline, setApiOnline]   = useState(null) // null = checking
  const inputRef = useRef(null)

  // ── Check FastAPI health on mount ──────────────────────────────
  useEffect(() => {
    fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: 'http://health-check.internal' }),
    })
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false))
  }, [])

  // ── Send handler ──────────────────────────────────────────────
  async function handleSend(text) {
    if (!text.trim()) return

    const userMsg = {
      id: nextId(),
      sender: 'user',
      type: 'text',
      text: text.trim(),
      time: 'Ahora mismo',
    }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      if (isURL(text.trim())) {
        // ── URL → /api/validate ──────────────────────────────
        setScanCount(c => c + 1)
        const res = await fetch('/api/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: text.trim() }),
        })
        const data = await res.json()

        const botMsg = {
          id: nextId(),
          sender: 'bot',
          type: 'validation',
          url: data.url,
          status: data.status,
          message: data.message,
          time: 'Ahora mismo',
        }
        setMessages(prev => [...prev, botMsg])
      } else {
        // ── Text → /api/chat ─────────────────────────────────
        setChatCount(c => c + 1)
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text.trim() }),
        })

        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        const botMsg = {
          id: nextId(),
          sender: 'bot',
          type: 'text',
          text: data.assitant_response ?? data.response ?? 'Respuesta recibida.',
          time: 'Ahora mismo',
        }
        setMessages(prev => [...prev, botMsg])
      }
    } catch (err) {
      const errMsg = {
        id: nextId(),
        sender: 'bot',
        type: 'error',
        text: `Error al conectar con el backend: ${err.message}. Verifica que FastAPI esté corriendo en el puerto 8100.`,
        time: 'Ahora mismo',
      }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="app-wrapper">
      <div className="app-shell">


        {/* ── Main columns ───────────────────────────────────────── */}
        <div className="main-columns">

          {/* Sidebar */}
          <Sidebar scanCount={scanCount} chatCount={chatCount} />

          {/* Chat */}
          <div className="chat-panel">
            <ChatHeader isTyping={isTyping} />
            <MessageList messages={messages} isTyping={isTyping} />
            <ChatInput
              inputRef={inputRef}
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSend}
              disabled={isTyping}
            />
          </div>

          {/* Info Panel */}
          <InfoPanel
            scanCount={scanCount}
            chatCount={chatCount}
            apiOnline={apiOnline}
          />

        </div>
      </div>
    </div>
  )
}
