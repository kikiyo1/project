import React, { useState, useEffect, useCallback } from 'react';

const PRODUCTS_KEY = 'hadesolution-products';

const defaultProducts = [
  {
    id: 1,
    name: "HADESOLUTION Basic",
    description: "Paket dasar untuk usaha kecil dengan fitur kasir lengkap",
    price: "Rp 299.000",
    category: "Basic",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    features: "Kasir POS, Laporan Harian, Manajemen Stok Dasar"
  },
  {
    id: 2,
    name: "HADESOLUTION Pro",
    description: "Solusi lengkap untuk bisnis menengah dengan analitik advanced",
    price: "Rp 599.000",
    category: "Professional",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    features: "Semua fitur Basic, Multi-outlet, CRM, Analitik Lanjutan"
  },
  {
    id: 3,
    name: "HADESOLUTION Enterprise",
    description: "Platform enterprise untuk bisnis besar dengan customization",
    price: "Rp 1.299.000",
    category: "Enterprise",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    features: "Semua fitur Pro, API Integration, Custom Reports, Priority Support"
  }
];

const getInitialProducts = () => {
  try {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      return parsed.length > 0 ? parsed : defaultProducts;
    }
  } catch (error) {
    console.error("Failed to load products from localStorage", error);
  }
  
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
  } catch (error) {
    console.error("Failed to save default products to localStorage", error);
  }
  return defaultProducts;
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getInitialProducts());
  }, []);

  const handleStorageChange = useCallback((event) => {
    if (event.key === PRODUCTS_KEY || event.type === 'products-updated') {
      setProducts(getInitialProducts());
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('products-updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('products-updated', handleStorageChange);
    };
  }, [handleStorageChange]);

  const saveProducts = useCallback((newProducts) => {
    try {
      const productsToSave = typeof newProducts === 'function' ? newProducts(products) : newProducts;
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsToSave));
      setProducts(productsToSave);
      window.dispatchEvent(new CustomEvent('products-updated'));
    } catch (error) {
      console.error("Failed to save products to localStorage", error);
    }
  }, [products]);

  return { products, saveProducts };
};