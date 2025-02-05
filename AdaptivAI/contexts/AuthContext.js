import { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from '../config/axiosInstance';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsLogin(true);
                await fetchUserProfile();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', {
                email,
                password
            });
            const token = data.data.token;
            await SecureStore.setItemAsync('access_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchUserProfile();
            setIsLogin(true);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('access_token');
            delete axios.defaults.headers.common['Authorization'];
            setIsLogin(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const register = async (email, password) => {
        try {
            await axios.post('/api/users/register', {
                email,
                password
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get('/api/users/profile');
            setUser(data.data.user);
        } catch (error) {
            console.error('Profile fetch failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            isLogin,
            loading,
            user,
            login,
            logout,
            register,
            fetchUserProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);