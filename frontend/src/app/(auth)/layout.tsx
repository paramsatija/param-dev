'use client'

import { TopNavbar } from '@/components/layout/top-navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <TopNavbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}
