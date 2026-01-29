
import api from "../api/api"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Loader from "../components/Loader"
import { ToastContainer, toast } from "react-toastify"

export default function PostConfessions() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [loading, setLoading] = useState(false)
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [charCount, setCharCount] = useState(0)
    const navigate = useNavigate()

    const handleBodyChange = (event) => {
        setBody(event.target.value)
        setCharCount(event.target.value.length)
    }

     const handleSubmit = async(event) => {
    event.preventDefault()

    try{
        setLoading(true)
        const response = await api.post('/confessions', {
            title, 
            body, 
            isAnonymous
        })

        if(response.data.success){
            toast.success('Confession posted successfully!')
            navigate('/confessions')
        }else{
            toast.error(response.data.message)
        }
    }catch(err){
        console.error('Error posting confession:', err)
        console.error('Error details:', err.response)
        toast.error(err.response?.data?.message || 'Failed to post confession')
    }finally{
        setLoading(false)
    }
}
    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <ToastContainer position="top-right" />
            
            
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                        Share Your Story
                    </h1>
                    <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                        Express yourself freely in a safe, supportive space. Your confession matters.
                    </p>
                </div>
            </div>

            
            <div className="max-w-3xl mx-auto px-6 py-12 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                   
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100 px-8 py-6">
                        <div className="flex items-start space-x-3">
                            <svg className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Anonymous by default</h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Your confession will be posted anonymously. Feel free to share whatever's on your mind.
                                </p>
                            </div>
                        </div>
                    </div>

                    
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Post anonymously</p>
                                    <p className="text-xs text-gray-500">Your identity will be hidden</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsAnonymous(!isAnonymous)}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                                    isAnonymous ? 'bg-indigo-600' : 'bg-gray-200'
                                }`}
                            >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                    isAnonymous ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                            </button>
                        </div>

                        
                        <div>
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                                Title
                            </label>
                            <div className="relative">
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    placeholder="Give your confession a title..."
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label htmlFor="body" className="block text-sm font-semibold text-gray-700">
                                    Your Confession
                                </label>
                                <span className="text-xs text-gray-500">
                                    {charCount} characters
                                </span>
                            </div>
                            <div className="relative">
                                <textarea
                                    id="body"
                                    name="body"
                                    required
                                    value={body}
                                    onChange={handleBodyChange}
                                    rows={8}
                                    placeholder="Share what's on your mind... Be honest, be yourself."
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                Express yourself freely. This is a judgment-free zone.
                            </p>
                        </div>

                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <Link
                                to="/confessions"
                                className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                ← Back to confessions
                            </Link>
                            
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTitle("")
                                        setBody("")
                                        setCharCount(0)
                                    }}
                                    className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    Clear
                                </button>
                                
                                {loading ? (
                                    <div className="px-8 py-2.5">
                                        <Loader />
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="px-8 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Post Confession
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                
                <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Community Guidelines
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span>Be respectful and kind to yourself and others</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span>No hate speech, harassment, or harmful content</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span>Share authentically - your truth matters</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-indigo-600 mr-2">•</span>
                            <span>If you need help, please reach out to a professional</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}