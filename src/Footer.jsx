import React from 'react'

const Footer = () => {
  return (
    <footer className="relative">
      {/* Footer content */}
      <div className="bg-gradient-to-b from-indigo-900 to-slate-900 pt-6 pb-8 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-20 left-40 w-72 h-72 rounded-full bg-purple-500 blur-3xl"></div>
          <div className="absolute top-10 right-40 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo and branding */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-extrabold">
                  <span className="bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300 bg-clip-text text-transparent">
                    JSON2GRAPH
                  </span>
                </h2>
              </div>
              <p className="text-gray-400">
                Transform your JSON data into beautiful interactive visualizations with our easy-to-use tool.
              </p>

              <div className="flex space-x-4">
                <a href="https://github.com/BugBlitz98" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </a>
                <a href="https://x.com/Animesh68589159" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/animesh-manna-428633157/" className="text-gray-400 hover:text-purple-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a>
                <a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">About</a>
                <a href="#howitworks" className="text-gray-400 hover:text-purple-400 transition-colors">How It Works</a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</a>
              </nav>
            </div>

            {/* Twelve Tools Badge */}
            <div className="flex items-center justify-center">
              <a href="https://twelve.tools" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://twelve.tools/badge0-dark.svg"
                  alt="Featured on Twelve Tools"
                  width="200"
                  height="54"
                  className="transition-transform hover:scale-105"
                />
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-indigo-900/30">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400 mb-4 md:mb-0">
                © 2025 <a href="#" className="hover:text-purple-400 transition-colors">json2graph.com</a>. All Rights Reserved.
              </p>
              <p className="text-sm text-gray-400">
                Created by <a href="https://www.linkedin.com/in/animesh-manna-428633157/" className="text-indigo-400 hover:text-purple-400 transition-colors">@animesh</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
