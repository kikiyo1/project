
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LandingPage from '@/pages/LandingPage';
import AdminLogin from '@/pages/AdminLogin';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import { SettingsProvider } from '@/contexts/SettingsContext';
import AdminLayout from '@/pages/admin/Layout';
import AdminDashboard from '@/pages/admin/Dashboard';
import EditorPage from '@/pages/admin/EditorPage';
import ProductsPage from '@/pages/admin/ProductsPage';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Helmet>
          <title>SOFTWARE HADESOLUTION - Solusi Kasir Modern</title>
          <meta name="description" content="Software kasir terdepan untuk bisnis modern. Kelola penjualan, inventori, dan laporan dengan mudah menggunakan SOFTWARE HADESOLUTION." />
        </Helmet>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="editor" element={<EditorPage />} />
              <Route path="products" element={<ProductsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </SettingsProvider>
  );
}

export default App;
