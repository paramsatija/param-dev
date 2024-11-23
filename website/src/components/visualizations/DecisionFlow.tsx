'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HoverCard from '@/components/effects/HoverCard'

interface DecisionNode {
  id: string
  type: 'input' | 'process' | 'decision' | 'output'
  title: string
  description: string
  metrics: {
    confidence: number
    speed: string
    accuracy: string
  }
  connections: string[]
}

const decisionNodes: Record<string, DecisionNode> = {
  input: {
    id: 'input',
    type: 'input',
    title: 'Data Input',
    description: 'Real-time prospect data analysis',
    metrics: {
      confidence: 95,
      speed: '< 10ms',
      accuracy: '99.9%'
    },
    connections: ['analysis']
  },
  analysis: {
    id: 'analysis',
    type: 'process',
    title: 'Intent Analysis',
    description: 'Multi-factor intent scoring',
    metrics: {
      confidence: 92,
      speed: '< 50ms',
      accuracy: '97.5%'
    },
    connections: ['decision']
  },
  decision: {
    id: 'decision',
    type: 'decision',
    title: 'Decision Engine',
    description: 'AI-powered action determination',
    metrics: {
      confidence: 94,
      speed: '< 100ms',
      accuracy: '96.8%'
    },
    connections: ['output']
  },
  output: {
    id: 'output',
    type: 'output',
    title: 'Action Generation',
    description: 'Personalized response creation',
    metrics: {
      confidence: 96,
      speed: '< 200ms',
      accuracy: '98.2%'
    },
    connections: []
  }
}

export default function DecisionFlow() {
  const [processedNodes, setProcessedNodes] = useState<Set<string>>(new Set())
  const [currentNode, setCurrentNode] = useState<string>('input')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNode(current => {
        const currentNode = decisionNodes[current]
        if (currentNode.connections.length > 0) {
          const nextNode = currentNode.connections[0]
          setProcessedNodes(prev => {
            const newSet = new Set(Array.from(prev))
            newSet.add(current)
            return newSet
          })
          return nextNode
        }
        setProcessedNodes(new Set())
        return 'input'
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {Object.entries(decisionNodes).map(([id, node]) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative ${
                currentNode === id ? 'ring-2 ring-neon-blue' : ''
              }`}
            >
              <HoverCard className="h-full">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">{node.title}</h3>
                  <p className="text-white/80 mb-6">{node.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(node.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 rounded-lg p-3"
                      >
                        <div className="text-white/60 text-sm capitalize">{key}</div>
                        <div className="text-white font-mono">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 