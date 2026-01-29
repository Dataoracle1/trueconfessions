
import { create } from "zustand";
import api from "../api/api";
import { toast } from "react-toastify";

const userStore = create((set) => ({
     user: null,
     loading: true,

     checkAuth: async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                set({ user: null, loading: false });
                return;
            }

            const response = await api.get('/auth/me');
            
            if (response.data.success) {
                set({ user: response.data.data, loading: false });
            } else {
                localStorage.removeItem('token');
                set({ user: null, loading: false });
            }
        } catch (err) {
            localStorage.removeItem('token');
            set({ user: null, loading: false });
            throw err;
        }
     },

     signup: async (username, email, password) => {
        try {
            const response = await api.post('/auth/signup', { username, email, password });
            
            if (response.data.success) {
                // Save token to localStorage
                localStorage.setItem('token', response.data.token);
                
                set({ user: response.data.data, loading: false });
                toast.success('Account created successfully!');
            } else {
                set({ user: null, loading: false });
            }
        } catch (err) {
            set({ user: null, loading: false });
            throw err;
        }
     },

     login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            if (response.data.success) {
                // Save token to localStorage
                localStorage.setItem('token', response.data.token);
                
                set({ user: response.data.data, loading: false });
                toast.success('Login successful!');
            } else {
                set({ user: null, loading: false });
            }
        } catch (err) {
            set({ user: null, loading: false });
            throw err;
        }
     },

     logout: () => {
        localStorage.removeItem('token');
        set({ user: null, loading: false });
        toast.success('Logged out successfully');
     }
}));

export default userStore;