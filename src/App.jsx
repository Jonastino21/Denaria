import React from 'react';
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

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
