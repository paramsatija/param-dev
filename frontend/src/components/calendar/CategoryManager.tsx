'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
}

export function CategoryManager({
  categories,
  onCategoryChange
}: {
  categories: Category[]
  onCategoryChange: (categories: Category[]) => void
}) {
  const [isAdding, setIsAdding] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6' })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-900">Categories</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Add Category
        </button>
      </div>

      {isAdding && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="flex-1 rounded-md border-gray-300 text-sm"
            placeholder="Category name"
          />
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            className="w-8 h-8 rounded-md cursor-pointer"
          />
          <button
            onClick={() => {
              onCategoryChange([
                ...categories,
                { ...newCategory, id: Date.now().toString() }
              ])
              setIsAdding(false)
              setNewCategory({ name: '', color: '#3b82f6' })
            }}
            className="p-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-gray-700">{category.name}</span>
            </div>
            <button
              onClick={() => {
                onCategoryChange(categories.filter(c => c.id !== category.id))
              }}
              className="text-gray-400 hover:text-red-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
