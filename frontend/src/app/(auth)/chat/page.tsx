'use client'

import { useState, useRef } from 'react'
import { useChatStore } from '@/store/chat-store'
import { Plus, Send, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    chats,
    currentChatId,
    isTyping,
    addChat,
    addMessage,
    setCurrentChat
  } = useChatStore()

  const currentChat = chats.find(chat => chat.id === currentChatId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    try {
      setIsLoading(true)
      await addMessage(inputMessage)
      setInputMessage('')
      scrollToBottom()
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r">
        <div className="p-4">
          <button
            onClick={addChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2.5 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>
        <div className="overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              onClick={() => setCurrentChat(chat.id)}
              className={cn(
                "px-4 py-3 cursor-pointer border-l-2 hover:bg-gray-50",
                chat.id === currentChatId 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-transparent'
              )}
            >
              <div className="font-medium text-sm">{chat.title}</div>
              <div className="text-xs text-gray-500 truncate mt-1">
                {chat.messages[chat.messages.length - 1]?.content || 'New conversation'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {currentChat ? (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {currentChat.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] p-4 rounded-lg",
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-50 text-gray-900 border border-gray-200'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce [animation-delay:0.2s]">●</div>
                    <div className="animate-bounce [animation-delay:0.4s]">●</div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="border-t bg-white p-4">
              <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <MessageSquare className="w-12 h-12 mb-4" />
            <h3 className="text-lg font-medium mb-2">No chat selected</h3>
            <p className="text-sm">Select a chat from the sidebar or start a new one</p>
          </div>
        )}
      </div>
    </div>
  )
}
