
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
            
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-20">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center">
                   
                    <div className="relative">
                   <h1 className="text-center space-y-3">
                      <span className="block text-sm tracking-[0.4em] text-white/90 uppercase font-light" 
                       style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                       Welcome to
                      </span>
        
                        <div className="relative inline-block">
                         <span className="block text-7xl sm:text-8xl md:text-9xl font-extralight italic tracking-wide text-[#3d2817]" 
                          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", letterSpacing: '0.05em' }}>
                             Confessions
                           </span>
            
            
                         <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                         <div className="w-1/3 h-px bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"></div>
                         </div>
                          </div>
                          </h1>
    
    
    <div className="absolute top-1/2 left-0 w-8 h-px bg-gradient-to-r from-[#d4a574] to-transparent hidden md:block"></div>
    <div className="absolute top-1/2 right-0 w-8 h-px bg-gradient-to-l from-[#d4a574] to-transparent hidden md:block"></div>
</div>
                        <p className="mt-6 text-lg leading-8 text-indigo-100 max-w-2xl mx-auto">
                            Share your thoughts, discover stories, and connect with others in a safe and anonymous space.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link to="/post-confessions">
                                <button className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all hover:scale-105 hover:shadow-xl">
                                    Post Confession
                                </button>
                            </Link>
                            <Link to="/confessions">
                                <button className="rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
                                    Browse Confessions
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Featured Characters
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Discover amazing characters from the Dragon Ball universe
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                            <p className="mt-4 text-gray-600 font-medium">Loading characters...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {characters.map((character, index) => (
                            <div 
                                key={index}
                                className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2"
                            >
                                
                                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
                                    <img 
                                        src={character.image} 
                                        alt={character.name}
                                        className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
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

            
                {!loading && characters.length === 0 && (
                    <div className="text-center py-20">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">No characters found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try refreshing the page.</p>
                    </div>
                )}
            </div>

            
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to share your story?
                    </h2>
                    <p className="mt-4 text-lg text-indigo-100">
                        Join our community and make your confession today.
                    </p>
                    <div className="mt-8">
                        <Link to="/post-confessions">
                            <button className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all hover:scale-105">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}