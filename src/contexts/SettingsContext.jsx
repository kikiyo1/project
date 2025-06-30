
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { ShoppingCart, BarChart3, Users, Shield } from 'lucide-react';

const SETTINGS_KEY = 'hadesolution-settings';

const defaultSettings = {
  heroTitle: 'SOFTWARE HADESOLUTION',
  heroSubtitle: 'Revolusikan bisnis Anda dengan solusi kasir terdepan. Kelola penjualan, inventori, dan laporan dalam satu platform terintegrasi.',
  primaryColor: '#3b82f6',
  fontFamily: 'Inter',
  featuresSection: {
    title: 'Fitur Unggulan',
    subtitle: 'Dilengkapi dengan teknologi terdepan untuk mendukung pertumbuhan bisnis Anda',
    items: [
      { id: 1, icon: 'ShoppingCart', title: 'Kasir Pintar', description: 'Proses transaksi cepat dengan antarmuka yang intuitif dan mudah digunakan' },
      { id: 2, icon: 'BarChart3', title: 'Laporan Real-time', description: 'Dashboard analitik lengkap untuk memantau performa bisnis Anda' },
      { id: 3, icon: 'Users', title: 'Manajemen Karyawan', description: 'Kelola akses karyawan dengan sistem role dan permission yang fleksibel' },
      { id: 4, icon: 'Shield', title: 'Keamanan Terjamin', description: 'Data bisnis Anda aman dengan enkripsi tingkat enterprise' }
    ]
  },
  whyUsSection: {
    title: 'Mengapa Memilih HADESOLUTION?',
    image: 'https://images.unsplash.com/photo-1556742504-16b083241fab',
    benefits: [
      "Meningkatkan efisiensi operasional hingga 80%",
      "Mengurangi kesalahan transaksi manual",
      "Laporan keuangan otomatis dan akurat",
      "Integrasi dengan berbagai payment gateway",
      "Support 24/7 dari tim ahli kami",
      "Update fitur berkala tanpa biaya tambahan"
    ]
  },
  ctaSection: {
    title: 'Siap Mengembangkan Bisnis Anda?',
    subtitle: 'Bergabunglah dengan ribuan bisnis yang telah mempercayai SOFTWARE HADESOLUTION'
  },
  footer: {
    visible: true,
    companyInfo: {
      name: 'HADESOLUTION',
      description: 'Solusi kasir terdepan untuk bisnis modern. Kami berkomitmen memberikan teknologi terbaik untuk mengembangkan bisnis Anda.'
    },
    contacts: {
      email: 'info@hadesolution.com',
      phone: '+62 21 1234 5678',
      address: 'Jakarta, Indonesia'
    },
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  }
};

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load settings from localStorage", error);
      setSettings(defaultSettings);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveSettings = (newSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error("Failed to save settings to localStorage", error);
    }
  };

  const updateSettings = useCallback((newValues) => {
    setSettings(prevSettings => {
      const updated = { ...prevSettings, ...newValues };
      saveSettings(updated);
      return updated;
    });
  }, []);
  
  const updateNestedSettings = useCallback((section, key, value) => {
    setSettings(prevSettings => {
      const updated = {
        ...prevSettings,
        [section]: {
          ...prevSettings[section],
          [key]: value
        }
      };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
    saveSettings(defaultSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, updateNestedSettings, resetSettings, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'ShoppingCart': return ShoppingCart;
    case 'BarChart3': return BarChart3;
    case 'Users': return Users;
    case 'Shield': return Shield;
    default: return ShoppingCart;
  }
};
