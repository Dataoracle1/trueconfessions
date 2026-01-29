
import { useState, useEffect } from "react"
import api from "../api/api"
import { FaTrashAlt } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function Confessions() {
    const [confessions, setConfessions] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all') 

    const getConfessions = async () => {
        try{
           setLoading(true)
           const response = await api.get('/confessions')
           if(response.data.success){
            setConfessions(response.data.data)
            toast.success('Confessions loaded successfully!')
           }
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            setLoading(false)
        }
    }

    const handleDelete = async(id) => {
        if(!window.confirm('Are you sure you want to delete this confession?')) return;
        try{
           const response = await api.delete(`/confessions/${id}`)
           if(response.data.success){
            setConfessions(confessions.filter(c => c._id !== id))
            toast.success('Confession deleted successfully!')
           }
        }catch(err){
            toast.error(err.response.data.message)
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toDateString() + ' ' + date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getFilteredConfessions = () => {
        if (filter === 'recent') {
            return [...confessions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        } else if (filter === 'oldest') {
            return [...confessions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }
        return confessions
    }

    useEffect(() => {
        getConfessions()
    }, [])

    return(
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <ToastContainer position="top-right" />
            
            
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                            All Confessions
                        </h1>
                        <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                            Read and reflect on stories shared by our community
                        </p>
                        <div className="mt-8">
                            <Link to="/post-confessions">
                                <button className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all hover:scale-105">
                                    Share Your Story
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                
                <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">Filter:</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    filter === 'all' 
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('recent')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    filter === 'recent' 
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Recent
                            </button>
                            <button
                                onClick={() => setFilter('oldest')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    filter === 'oldest' 
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Oldest
                            </button>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600">
                        <span className="font-semibold text-indigo-600">{confessions.length}</span> {confessions.length === 1 ? 'confession' : 'confessions'}
                    </div>
                </div>

                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="h-16 w-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                        </div>
                        <p className="mt-6 text-gray-600 font-medium">Loading confessions...</p>
                    </div>
                ) : (
                    <>
                        
                        {confessions.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-6">
                                    <svg className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No confessions yet</h3>
                                <p className="text-gray-600 mb-6">Be the first to share your story with the community</p>
                                <Link to="/post-confessions">
                                    <button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all hover:shadow-xl">
                                        Post Your First Confession
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {getFilteredConfessions().map((confession) => (
                                    <div 
                                        key={confession._id} 
                                        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1"
                                    >
                                        
                                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 flex-1 pr-2">
                                                    {confession.title}
                                                </h2>
                                                <button 
                                                    onClick={() => handleDelete(confession._id)} 
                                                    className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                                                    title="Delete confession"
                                                >
                                                    <FaTrashAlt className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </div>

                                        
                                        <div className="px-6 py-4">
                                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-6 mb-4">
                                                {confession.body}
                                            </p>
                                            
                                            
                                            {confession.body.length > 200 && (
                                                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                                                    Read more →
                                                </button>
                                            )}
                                        </div>

                                        
                                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span>{formatDate(confession.createdAt)}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span>Anonymous</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}