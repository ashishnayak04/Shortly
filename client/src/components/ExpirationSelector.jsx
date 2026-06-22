import { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'

const options = [
  { value: 'never', label: 'Never expire' },
  { value: '1day', label: '1 Day' },
  { value: '7days', label: '7 Days' },
  { value: '30days', label: '30 Days' },
  { value: 'custom', label: 'Custom date & time' },
]

export default function ExpirationSelector({ value, onChange }) {
  const [selectedType, setSelectedType] = useState('never')

  const handleTypeChange = (type) => {
    setSelectedType(type)
    if (type !== 'custom') {
      onChange(type)
    } else {
      onChange(null)
    }
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-text">
        <Clock className="w-4 h-4 inline mr-1.5 -mt-0.5 text-text-secondary" />
        Link Expiration
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map(({ value: val, label }) => (
          <button
            key={val}
            type="button"
            onClick={() => handleTypeChange(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-smooth ${
              selectedType === val
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface text-text-secondary hover:text-text border border-border hover:border-primary/30'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {selectedType === 'custom' && (
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="date"
              value={value?.split('T')[0] || ''}
              onChange={(e) => {
                const time = value?.split('T')[1] || '23:59'
                onChange(`${e.target.value}T${time}`)
              }}
              className="input-field w-full pl-10 pr-3 py-2 rounded-lg text-sm"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="relative flex-1">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="time"
              value={value?.split('T')[1] || '23:59'}
              onChange={(e) => {
                const date = value?.split('T')[0] || new Date().toISOString().split('T')[0]
                onChange(`${date}T${e.target.value}`)
              }}
              className="input-field w-full pl-10 pr-3 py-2 rounded-lg text-sm"
            />
          </div>
        </div>
      )}
    </div>
  )
}
