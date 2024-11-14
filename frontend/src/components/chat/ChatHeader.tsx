import { Settings as SettingsIcon, Bell as BellIcon } from 'lucide-react'

export default function ChatHeader() {
  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h2 className="font-semibold">Sales Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <BellIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
