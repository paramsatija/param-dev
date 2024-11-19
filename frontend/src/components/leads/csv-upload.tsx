'use client'

import { useState } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import Papa from 'papaparse' // You'll need to install this: npm install papaparse @types/papaparse

interface CSVUploadProps {
  onUploadComplete: (data: any[]) => void
  onError: (error: string) => void
}

export function CSVUpload({ onUploadComplete, onError }: CSVUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFileUpload = (file: File) => {
    if (file.type !== 'text/csv') {
      onError('Please upload a CSV file')
      return
    }

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        if (results.errors.length) {
          onError('Error parsing CSV file')
          return
        }
        onUploadComplete(results.data)
      },
      error: (error) => {
        onError('Error parsing CSV file: ' + error.message)
      }
    })
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        handleFileUpload(file)
      }}
    >
      <input
        type="file"
        accept=".csv"
        className="hidden"
        id="csv-upload"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
      />
      <label
        htmlFor="csv-upload"
        className="flex flex-col items-center cursor-pointer"
      >
        <Upload className="h-12 w-12 text-gray-400 mb-2" />
        <span className="text-sm text-gray-600">
          Drop your CSV file here or click to upload
        </span>
      </label>
    </div>
  )
}