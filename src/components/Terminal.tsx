import { useState, useRef, useEffect } from 'react'
import { Message } from '../types'
import { ChevronRight, Bot, User, Terminal as TerminalIcon } from 'lucide-react'
import './Terminal.css'

interface TerminalProps {
  messages: Message[]
  onCommand: (command: string) => void
}

function Terminal({ messages, onCommand }: TerminalProps) {
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // 自动聚焦输入框
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onCommand(input.trim())
      setCommandHistory(prev => [...prev, input.trim()])
      setHistoryIndex(-1)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < 0 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      }
    }
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index} className="terminal-line">
        {line}
      </div>
    ))
  }

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'user':
        return <User size={14} className="message-icon user-icon" />
      case 'ai':
        return <Bot size={14} className="message-icon ai-icon" />
      default:
        return <TerminalIcon size={14} className="message-icon system-icon" />
    }
  }

  const getMessageClass = (type: Message['type']) => {
    switch (type) {
      case 'user':
        return 'message user-message'
      case 'ai':
        return 'message ai-message'
      default:
        return 'message system-message'
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <TerminalIcon size={16} />
        <span>Terminal</span>
        <div className="terminal-controls">
          <div className="control-dot red"></div>
          <div className="control-dot yellow"></div>
          <div className="control-dot green"></div>
        </div>
      </div>
      
      <div className="terminal-content">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={getMessageClass(message.type)}>
              <div className="message-header">
                {getMessageIcon(message.type)}
                <span className="message-timestamp">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="message-content">
                {formatContent(message.content)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-line">
            <ChevronRight size={16} className="prompt-icon" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="command-input"
              placeholder="Type a command (try 'help')..."
              spellCheck={false}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Terminal