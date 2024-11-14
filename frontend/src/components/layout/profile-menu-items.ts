import { Settings, HelpCircle, Moon, Sun, KeyIcon, Bell, User, FileText, BarChart3, LogOut } from 'lucide-react'

export const profileMenuItems = [
  {
    title: 'Account',
    items: [
      { label: 'Profile Settings', icon: User, href: '/settings/profile' },
      { label: 'Notifications', icon: Bell, href: '/settings/notifications' },
      { label: 'API Keys', icon: KeyIcon, href: '/settings/api-keys' },
    ]
  },
  {
    title: 'Preferences',
    items: [
      { label: 'Theme', icon: Moon, type: 'theme' },
      { label: 'Documentation', icon: FileText, href: '/docs' },
      { label: 'Analytics', icon: BarChart3, href: '/analytics' },
    ]
  },
  {
    title: 'Other',
    items: [
      { label: 'Help Center', icon: HelpCircle, href: '/help' },
      { label: 'Log out', icon: LogOut, type: 'button', onClick: () => console.log('logout') },
    ]
  }
]
