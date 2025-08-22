import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import './App.css'
import LoginPage from './pages/auth/LoginView';
import Dashboard from './pages/admin/Dashboard';
import DashboardLayout from './components/layouts/AdminLayout';
import ProductManagement from './pages/admin/products/productManagement';
import { ToastContainer } from 'react-toastify'
import './components/layouts/adminlayout.css'
import NewProduct from './pages/admin/products/newProducts';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Cat } from 'lucide-react';

import NewCategory from './pages/admin/categories/newCategory';  
function App() {
  
   const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000; // en secondes
          if (decoded.exp < currentTime) {
            console.warn("Token expiré, déconnexion...");
            localStorage.removeItem('authToken');
            navigate('/login'); // redirection
          }
        } catch (error) {
          console.error("Token invalide: "+error);
          localStorage.removeItem('authToken');
          navigate('/login');
        }
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path='products/list' element={<ProductManagement />} />
          <Route path='products/add' element={<NewProduct/>} />
          <Route path='categories/add' element={<NewCategory/>} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </>
  );
}

export default App;
