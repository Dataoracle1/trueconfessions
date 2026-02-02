import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

export default function Home() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const res = await fetch('https://dragonball-api.com/api/characters')

                if (res.ok) {
                    toast.success('Characters fetched successfully')
                    const data = await res.json()
                    console.log(data)
                    const resultArray = data.items
                    setCharacters(resultArray)
                } else {
                    toast.error('Failed to fetch characters')
                }
            } catch (err) {
                console.log(err)
                toast.error('An error occurred')
            } finally {
                setLoading(false)
            }
        }

        handleFetch()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <ToastContainer />
            
            {/* Hero Section - Fixed for mobile */}
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 sm:py-16 md:py-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative w-full max-w-[375px] sm:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                   
                        <div className="relative">
                            <h1 className="text-center space-y-2 sm:space-y-3">
                                <span className="block text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-white/90 uppercase font-light" 
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    Welcome to
                                </span>
        
                                <div className="relative inline-block px-4 sm:px-0">
                                    <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight italic tracking-wide text-[#3d2817]" 
                                        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: '0.05em' }}>
                                        Confessions
                                    </span>
            
                                    <div className="absolute -bottom-2 sm:-bottom-3 left-0 right-0 flex justify-center">
                                        <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"></div>
                                    </div>
                                </div>
                            </h1>
    
                            {/* Decorative lines - hidden on mobile */}
                            <div className="absolute top-1/2 left-0 w-8 h-px bg-gradient-to-r from-[#d4a574] to-transparent hidden lg:block"></div>
                            <div className="absolute top-1/2 right-0 w-8 h-px bg-gradient-to-l from-[#d4a574] to-transparent hidden lg:block"></div>
                        </div>

                        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-6 sm:leading-8 text-indigo-100 max-w-xl sm:max-w-2xl mx-auto px-4 sm:px-0">
                            Share your thoughts, discover stories, and connect with others in a safe and anonymous space.
                        </p>

                        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-x-6 px-4 sm:px-0">
                            <Link to="/post-confessions" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto rounded-full bg-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-xl">
                                    Post Confession
                                </button>
                            </Link>
                            <Link to="/confessions" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto rounded-full border-2 border-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                                    Browse Confessions
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Characters Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Featured Characters
                    </h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600">
                        Discover amazing characters from the Dragon Ball universe
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center py-16 sm:py-20">
                        <div className="relative">
                            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                        </div>
                        <p className="mt-4 text-gray-600 font-medium text-sm sm:text-base">Loading characters...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {characters.map((character, index) => (
                            <div 
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2"
                            >
                                {/* Character Image */}
                                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                                    <img 
                                        src={character.image} 
                                        alt={character.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Character Info */}
                                <div className="p-5 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {character.name}
                                    </h3>
                                    {character.race && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            Race: {character.race}
                                        </p>
                                    )}
                                    {character.ki && (
                                        <p className="mt-1 text-sm text-gray-600">
                                            Ki: {character.ki}
                                        </p>
                                    )}
                                    
                                    <button className="mt-4 w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-500 hover:to-purple-500 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && characters.length === 0 && (
                    <div className="text-center py-16 sm:py-20">
                        <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No characters found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try refreshing the page.</p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to share your story?
                    </h2>
                    <p className="mt-3 sm:mt-4 text-base sm:text-lg text-indigo-100 px-4 sm:px-0">
                        Join our community and make your confession today.
                    </p>
                    <div className="mt-6 sm:mt-8">
                        <Link to="/post-confessions">
                            <button className="rounded-full bg-white px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all hover:scale-105">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}