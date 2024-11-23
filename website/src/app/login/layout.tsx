import type { Metadata } from "next"
import { ThemeProvider } from '@/providers/theme-provider'

export const metadata: Metadata = {
  title: "Login - Cognifuse AI",
  description: "AI Business Copilot Suite",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 