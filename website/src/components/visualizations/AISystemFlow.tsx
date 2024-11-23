'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Node {
  id: string
  x: number
  y: number
  type: 'input' | 'process' | 'output'
  connections: string[]
  status: 'active' | 'idle' | 'processing'
}

interface DataFlow {
  from: string
  to: string
  data: string
  speed: number
}

export default function AISystemFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Neural network nodes
  const nodes: Node[] = [
    { id: 'input1', x: 100, y: 100, type: 'input', connections: ['process1'], status: 'active' },
    { id: 'process1', x: 300, y: 200, type: 'process', connections: ['output1'], status: 'processing' },
    { id: 'output1', x: 500, y: 100, type: 'output', connections: [], status: 'idle' }
  ]

  // Data flows
  const dataFlows: DataFlow[] = [
    { from: 'input1', to: 'process1', data: 'Intent Analysis', speed: 2 },
    { from: 'process1', to: 'output1', data: 'Decision', speed: 1.5 }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = 400

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId)
          if (target) {
            // Draw neural pathway
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(target.x, target.y)
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)'
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw data flow particles
            const dataFlow = dataFlows.find(flow => flow.from === node.id && flow.to === targetId)
            if (dataFlow) {
              const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y)
              gradient.addColorStop(0, 'rgba(0, 255, 255, 0)')
              gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.8)')
              gradient.addColorStop(1, 'rgba(0, 255, 255, 0)')
              ctx.strokeStyle = gradient
              ctx.lineWidth = 4
              ctx.stroke()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2)
        
        // Node styling based on type and status
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20)
        gradient.addColorStop(0, node.status === 'active' ? 'rgba(0, 255, 255, 0.8)' : 'rgba(138, 43, 226, 0.8)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.fill()
        
        // Add pulse effect for active nodes
        if (node.status === 'active' || node.status === 'processing') {
          ctx.beginPath()
          ctx.arc(node.x, node.y, 30 + Math.sin(Date.now() / 500) * 5, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)'
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-[400px]"
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {nodes.map(node => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{
              left: node.x - 50,
              top: node.y - 10
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-sm text-white/60 text-center mt-8">
              {node.type === 'input' ? 'Input Layer' :
               node.type === 'process' ? 'Hidden Layer' :
               'Output Layer'}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 