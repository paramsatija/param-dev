import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeHighlight from 'rehype-highlight'
import { cn } from '@/lib/utils'

interface CodeProps {
  node?: any
  inline?: boolean
  className?: string
  children?: React.ReactNode
}

export default function MessageContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="prose prose-sm max-w-none"
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      components={{
        code: ({ inline, className, children, ...props }: CodeProps) => {
          return (
            <code
              className={cn(
                'bg-gray-100 rounded px-1 py-0.5 text-gray-900',
                inline ? 'text-sm' : 'block p-4 my-2 text-sm overflow-x-auto',
                className
              )}
              {...props}
            >
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}