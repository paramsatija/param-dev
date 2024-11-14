import { Settings, Key, Link, Bell } from 'lucide-react'

const settingsNavItems = [
  {
    name: 'Integrations',
    href: '/settings/integrations',
    icon: Link
  },
  {
    name: 'API Keys',
    href: '/settings/api-keys',
    icon: Key
  },
  {
    name: 'Notifications',
    href: '/settings/notifications',
    icon: Bell
  }
]

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <div className="w-64 border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          <nav className="space-y-1">
            {settingsNavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

