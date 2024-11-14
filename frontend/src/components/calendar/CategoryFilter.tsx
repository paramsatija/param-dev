'use client'

interface Category {
  id: string
  name: string
  color: string
}

interface CategoryFilterProps {
  categories: Category[]
  selected: string[]
  onChange: (categories: string[]) => void
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-gray-700">Categories</h3>
      <div className="space-y-1">
        {categories.map((category) => (
          <label key={category.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(category.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...selected, category.id])
                } else {
                  onChange(selected.filter(id => id !== category.id))
                }
              }}
              className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <span className="text-sm text-gray-700">{category.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
