// src/hooks/useAuthCheck.js
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function useAuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // en secondes
        if (decoded.exp && decoded.exp < now) {
          // Token expiré → Logout
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      } catch (error) {
        console.error('Token invalide', error);
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    }
  }, [navigate]);
}
// This hook checks the authentication status by verifying the JWT token.
// If the token is expired or invalid, it removes the token from localStorage and redirects to the login page.
// It uses the `jwt-decode` library to decode the token and check its expiration time.
// The `useNavigate` hook from `react-router-dom` is used for navigation.   
// This hook should be used in components that require authentication checks, such as in the main App component or protected routes.
// It ensures that the user is redirected to the login page if they are not authenticated or if their session has expired.
// Make sure to install the `jwt-decode` package if you haven't already:
// npm install jwt-decode
// Usage example:
// import useAuthCheck from './hooks/useAuthCheck';
// function App() {
//   useAuthCheck();