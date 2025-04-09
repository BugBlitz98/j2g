import React from 'react'

export default function About() {
  return (
    <div id="about" className="relative py-24 bg-gradient-to-b from-slate-900 to-indigo-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-40 left-20 w-64 h-64 rounded-full bg-indigo-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-violet-500 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left side - SVG graphic */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <div className="relative w-full max-w-md">
            {/* Decorative rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border-2 border-indigo-500/20 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 rounded-full border-2 border-purple-500/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
            </div>
            
            {/* Main SVG */}
            <svg className="w-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4338ca" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#6d28d9" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Abstract shape */}
              <path 
                d="M290,185 C290,235 245,280 195,295 C145,310 90,290 65,245 C40,200 45,140 75,100 C105,60 160,40 210,55 C260,70 290,135 290,185 Z" 
                fill="url(#aboutGradient)"
                filter="url(#glow)"
                opacity="0.85"
              />
              
              {/* Abstract data points */}
              <circle cx="120" cy="120" r="6" fill="#fff" />
              <circle cx="220" cy="100" r="6" fill="#fff" />
              <circle cx="260" cy="180" r="6" fill="#fff" />
              <circle cx="180" cy="240" r="6" fill="#fff" />
              <circle cx="100" cy="200" r="6" fill="#fff" />
              
              {/* Connection lines */}
              <line x1="120" y1="120" x2="220" y2="100" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="220" y1="100" x2="260" y2="180" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="260" y1="180" x2="180" y2="240" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="180" y1="240" x2="100" y2="200" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="100" y1="200" x2="120" y2="120" stroke="#fff" strokeWidth="1.5" strokeOpacity="0.6" />
              
              {/* Text */}
              <text 
                x="50%" 
                y="50%" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fill="#ffffff" 
                fontSize="36" 
                fontWeight="bold"
                filter="url(#glow)"
              >
                About
              </text>
            </svg>
          </div>
        </div>
        
        {/* Right side - Text content */}
        <div className="w-full lg:w-1/2 text-left">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700/30">
              Our Mission
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
            Create Beautiful Graphs From JSON Data
          </h1>
          
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              JSONtoGraph is a powerful JSON visualization and manipulation tool designed to simplify the process of understanding and working with JSON data.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Our tool enables you to edit JSON data directly within 2D and 3D visualizations from multiple directions, allowing you to modify and update data seamlessly.
            </p>
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-800/20">
                <div className="text-indigo-300 mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-medium text-white text-lg">Browser-Based</h3>
                <p className="text-gray-400">No installation required. Works in any modern browser.</p>
              </div>
              
              <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-800/20">
                <div className="text-indigo-300 mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 16H6C4.89543 16 4 15.1046 4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V8M10 20H18C19.1046 20 20 19.1046 20 18V10C20 8.89543 19.1046 8 18 8H10C8.89543 8 8 8.89543 8 10V18C8 19.1046 8.89543 20 10 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-medium text-white text-lg">Interactive</h3>
                <p className="text-gray-400">Modify data directly in your visualizations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}