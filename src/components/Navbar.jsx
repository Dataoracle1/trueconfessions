

import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import userStore from "../store/userStore"

export default function Navbar() {
  const {user, logout} = userStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])
  
  return(
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5 group">
              <span className="sr-only">Confessions</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-indigo-500 group-hover:to-purple-500 transition-all">
                {user?.username || "Confessions"}
              </h1>
            </Link>
          </div>

          
          <div className="flex lg:hidden">
            <button 
              type="button" 
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>

        
          <div className="hidden lg:flex lg:gap-x-8">
            <Link 
              to='/' 
              className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to='/confessions' 
              className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors relative group py-2"
            >
              Confessions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to='/post-confessions' 
              className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors relative group py-2"
            >
              Post Confessions
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              to='/about' 
              className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors relative group py-2"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

    
          {user ? (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
              <button 
                onClick={logout}
                className="rounded-full bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-red-500 hover:to-pink-500 transition-all hover:shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
              <Link 
                to='/login' 
                className="text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors px-4 py-2"
              >
                Log in
              </Link>
              <Link 
                to='/signup' 
                className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-md"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </header>

      
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          
          <div className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm shadow-2xl">
            
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {user?.username || "Confessions"}
              </h1>
              <button 
                type="button" 
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            
            <div className="space-y-1">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors"
              >
                🏠 Home
              </Link>
              <Link 
                to="/confessions" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors"
              >
                💬 Confessions
              </Link>
              <Link 
                to="/post-confessions" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors"
              >
                ✍️ Post Confessions
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors"
              >
                ℹ️ About
              </Link>
            </div>

            
            <div className="my-6 border-t border-gray-200"></div>

            
            {user ? (
              <button
                onClick={() => {
                  logout()
                  setMobileMenuOpen(false)
                }}
                className="w-full rounded-lg px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all shadow-sm"
              >
                🚪 Logout
              </button>
            ) : (
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-center text-base font-semibold text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 text-center text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all shadow-sm"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}