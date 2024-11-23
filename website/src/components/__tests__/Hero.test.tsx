import { render, screen } from '@testing-library/react'
import Hero from '../Hero'

jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

describe('Hero Component', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByText(/Meet Your AI SDR Copilot/i)).toBeInTheDocument()
  })

  it('renders the CTA button', () => {
    render(<Hero />)
    expect(screen.getByText(/Start Your AI Journey/i)).toBeInTheDocument()
  })
}) 