import { useNavigate } from 'react-router-dom';

const AUTH_KEY = 'hadesolution_auth';

export const useAuth = () => {
  const navigate = useNavigate();

  const login = (password) => {
    if (password === 'JAKARTAKU123') {
      sessionStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    navigate('/login');
  };

  const isAuthenticated = () => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  };

  return { login, logout, isAuthenticated };
};