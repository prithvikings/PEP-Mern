import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await api.get('/auth/current_user');
        // Backend returns empty string or object; strictly check truthiness
        if (data && data._id) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = () => {
    // Redirect to backend OAuth route
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};