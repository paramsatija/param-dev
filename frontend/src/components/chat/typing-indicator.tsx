export function TypingIndicator() {
    return (
      <div className="flex space-x-2 p-4 bg-gray-100 rounded-lg max-w-[70%]">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      </div>
    )
  }