import { 
  Link as LinkIcon, 
  Key as KeyIcon, 
  Bell as BellIcon, 
  User as UserIcon 
} from 'lucide-react'

export function SettingsMenu() {
  return (
    <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
      <div className="space-y-1">
        {[
          { label: 'Integrations', icon: LinkIcon },
          { label: 'API Keys', icon: KeyIcon },
          { label: 'Notifications', icon: BellIcon },
          { label: 'Profile Settings', icon: UserIcon },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <item.icon className="w-4 h-4 text-gray-500" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
