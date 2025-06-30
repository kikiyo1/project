
import React from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

const AdminStats = () => {
  const { products } = useProducts();

  const stats = [
    {
      title: "Total Produk",
      value: products.length,
      icon: <Package className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Kategori",
      value: [...new Set(products.map(p => p.category).filter(Boolean))].length,
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Pengunjung (30 Hari)",
      value: "1,250",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Penjualan (Bulan Ini)",
      value: "Rp 15.7Jt",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} text-white`}>
              {stat.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminStats;
