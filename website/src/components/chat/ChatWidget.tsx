'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    setMessages(prev => [...prev, { text: input, isUser: true }])
    setInput('')

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our team will get back to you soon.", 
        isUser: false 
      }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 w-80 h-96 rounded-xl glass"
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-white/10">
                <h3 className="font-grotesk">Chat with Zoe</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`${msg.isUser ? 'ml-auto' : 'mr-auto'} max-w-[80%]`}>
                    <div className={`p-3 rounded-xl ${msg.isUser ? 'bg-neon-blue/20' : 'bg-neon-purple/20'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-black/50 rounded-full px-4 py-2"
                    placeholder="Type your message..."
                  />
                  <button
                    onClick={sendMessage}
                    className="p-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
      >
        {isOpen ? '×' : '💬'}
      </motion.button>
    </div>
  )
} 