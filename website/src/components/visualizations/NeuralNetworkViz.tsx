'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface NeuronLayer {
  neurons: number
  type: 'input' | 'hidden' | 'output'
  activations: string[]
}

const networkArchitecture: NeuronLayer[] = [
  {
    neurons: 4,
    type: 'input',
    activations: ['Intent Data', 'User Context', 'Historical Data', 'Market Signals']
  },
  {
    neurons: 6,
    type: 'hidden',
    activations: ['Pattern Recognition', 'Sentiment Analysis', 'Context Processing', 'Signal Processing', 'Feature Extraction', 'Decision Logic']
  },
  {
    neurons: 3,
    type: 'output',
    activations: ['Lead Score', 'Action Plan', 'Response Template']
  }
]

export default function NeuralNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 600

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const layerSpacing = canvas.width / (networkArchitecture.length + 1)
      const maxNeurons = Math.max(...networkArchitecture.map(layer => layer.neurons))

      networkArchitecture.forEach((layer, layerIndex) => {
        const x = layerSpacing * (layerIndex + 1)
        const neuronSpacing = canvas.height / (layer.neurons + 1)

        // Draw connections to next layer
        if (layerIndex < networkArchitecture.length - 1) {
          const nextLayer = networkArchitecture[layerIndex + 1]
          const nextX = layerSpacing * (layerIndex + 2)
          const nextNeuronSpacing = canvas.height / (nextLayer.neurons + 1)

          for (let i = 0; i < layer.neurons; i++) {
            for (let j = 0; j < nextLayer.neurons; j++) {
              const startX = x
              const startY = neuronSpacing * (i + 1)
              const endX = nextX
              const endY = nextNeuronSpacing * (j + 1)

              // Create gradient for synapses
              const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
              gradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)')
              gradient.addColorStop(1, 'rgba(138, 43, 226, 0.1)')

              ctx.beginPath()
              ctx.moveTo(startX, startY)
              ctx.lineTo(endX, endY)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 1
              ctx.stroke()

              // Add data flow particles
              const time = Date.now() / 1000
              const particlePos = (Math.sin(time + i * j) + 1) / 2
              const particleX = startX + (endX - startX) * particlePos
              const particleY = startY + (endY - startY) * particlePos

              ctx.beginPath()
              ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
              ctx.fillStyle = 'rgba(0, 255, 255, 0.8)'
              ctx.fill()
            }
          }
        }

        // Draw neurons
        for (let i = 0; i < layer.neurons; i++) {
          const y = neuronSpacing * (i + 1)

          // Neuron glow effect
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
          gradient.addColorStop(0, `rgba(${layer.type === 'hidden' ? '138, 43, 226' : '0, 255, 255'}, 0.8)`)
          gradient.addColorStop(1, 'transparent')

          ctx.beginPath()
          ctx.arc(x, y, 10, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          // Activation label
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
          ctx.font = '12px monospace'
          ctx.textAlign = 'center'
          ctx.fillText(layer.activations[i], x, y + 25)
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [])

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      <div className="absolute top-4 left-4 space-y-2">
        {networkArchitecture.map((layer, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              layer.type === 'input' ? 'bg-neon-blue' :
              layer.type === 'hidden' ? 'bg-neon-purple' :
              'bg-gradient-to-r from-neon-blue to-neon-purple'
            }`} />
            <span className="text-sm text-white/60">{layer.type} Layer</span>
          </div>
        ))}
      </div>
    </div>
  )
} 