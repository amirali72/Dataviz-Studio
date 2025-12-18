import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          DataViz Studio
        </h1>

        <div className="space-y-6">
          
          {/* Box 1: Upload */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📁 Upload Your  
            </h2>
            <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
              Choose File
            </button>
          </div>

          {/* Box 2: Preview */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📋 Data Preview (First 5 Rows)
            </h2>
            <p className="text-gray-500">Upload a file to see preview</p>
          </div>

          {/* Box 3: Chart Builder */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              🎨 Build Your Chart
            </h2>
            <p className="text-gray-500">Select columns after uploading data</p>
          </div>

          {/* Box 4: Chart Display */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              📊 Your Chart
            </h2>
            <p className="text-gray-500">Chart will appear here</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

