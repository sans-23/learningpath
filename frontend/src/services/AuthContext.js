import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log('useEffect token: ', token);
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (token) => {
    setAccessToken(token);
    localStorage.setItem('accessToken', token);
    console.log("login token: ", token);
    // You can also save the token to local storage here
  };

  const logout = () => {
    setAccessToken('');
    localStorage.removeItem('accessToken');
    // You can also remove the token from local storage here
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
