import type { Metadata } from 'next'
import { ThemeProvider } from '@/providers/theme-provider'
import Navigation from '@/components/Navigation'
import SpaceBackground from '@/components/background/SpaceBackground'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cognifuse AI',
  description: 'AI Business Copilot Suite',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <SpaceBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 