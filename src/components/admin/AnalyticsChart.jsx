
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', Penjualan: 4000, Pengunjung: 2400 },
  { name: 'Feb', Penjualan: 3000, Pengunjung: 1398 },
  { name: 'Mar', Penjualan: 2000, Pengunjung: 9800 },
  { name: 'Apr', Penjualan: 2780, Pengunjung: 3908 },
  { name: 'Mei', Penjualan: 1890, Pengunjung: 4800 },
  { name: 'Jun', Penjualan: 2390, Pengunjung: 3800 },
  { name: 'Jul', Penjualan: 3490, Pengunjung: 4300 },
];

const AnalyticsChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-effect p-6 rounded-xl"
    >
      <h3 className="text-xl font-bold text-white mb-6">Grafik Penjualan & Pengunjung</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#fff'
              }}
            />
            <Legend wrapperStyle={{ color: '#fff' }} />
            <Bar dataKey="Penjualan" fill="#3b82f6" />
            <Bar dataKey="Pengunjung" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
