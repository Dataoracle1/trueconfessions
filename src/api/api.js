
import axios from "axios"

const api = axios.create({
    baseURL: "https://anonymous-confession-iota.vercel.app/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        
        console.log('📡 API Request:', config.method.toUpperCase(), config.url)
        console.log('🔐 Token:', token ? 'Present' : 'Missing')
        
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


api.interceptors.response.use(
    (response) => {
        console.log('✅ API Success:', response.config.url)
        return response
    },
    (error) => {
        console.error('❌ API Error:', error.response?.status, error.response?.data)
        
        if (error.response?.status === 401) {
            console.error('🚫 Unauthorized - Please login')
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        
        return Promise.reject(error)
    }
)

export default api



