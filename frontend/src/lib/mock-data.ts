export const mockChats = [
  {
    id: '1',
    title: 'Sales Strategy Discussion',
    messages: [
      {
        id: '1',
        content: 'How can I improve my sales pitch?',
        role: 'user',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        content: 'Here are some key tips for improving your sales pitch...',
        role: 'assistant',
        createdAt: new Date().toISOString()
      }
    ]
  }
]

export const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  image: 'https://ui-avatars.com/api/?name=Demo+User'
} 