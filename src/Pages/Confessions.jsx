
import { useState, useEffect } from "react"
import api from "../api/api"
import { FaTrashAlt } from "react-icons/fa"
import { ToastContainer, toast } from "react-toastify"
import { Link } from "react-router-dom"

export default function Confessions() {
  const [confessions, setConfessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [expandedConfessions, setExpandedConfessions] = useState(new Set())

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

  const toggleExpanded = (id) => {
    setExpandedConfessions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
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

  const getTruncatedText = (text, id) => {
    const isExpanded = expandedConfessions.has(id)
    if (isExpanded || text.length <= 200) {
      return text
    }
    return text.substring(0, 200) + '...'
  }

  useEffect(() => {
    getConfessions()
  }, [])

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            All Confessions
          </h1>
          <p className="text-gray-600 mb-6">
            Read and reflect on stories shared by our community
          </p>
          <Link
            to="/post-confessions"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
          >
            Share Your Story
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
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
          <div className="text-sm text-gray-600">
            {confessions.length} {confessions.length === 1 ? 'confession' : 'confessions'}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading confessions...</p>
          </div>
        ) : (
          <>
            {confessions.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No confessions yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Be the first to share your story with the community
                </p>
                <Link
                  to="/add"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Post Your First Confession
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {getFilteredConfessions().map((confession) => (
                  <div
                    key={confession._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 flex-1">
                        {confession.title}
                      </h3>
                      <button
                        onClick={() => handleDelete(confession._id)}
                        className="flex-shrink-0 p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Delete confession"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                    <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                      {getTruncatedText(confession.body, confession._id)}
                    </p>

                    {confession.body.length > 200 && (
                      <button
                        onClick={() => toggleExpanded(confession._id)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm mb-4"
                      >
                        {expandedConfessions.has(confession._id) ? 'Show less' : 'Read more →'}
                      </button>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <span>{formatDate(confession.createdAt)}</span>
                      <span className="font-medium">Anonymous</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}