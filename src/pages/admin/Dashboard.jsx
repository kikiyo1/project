
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/admin/PageHeader';
import AdminStats from '@/components/admin/AdminStats';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - Admin HADESOLUTION</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="Dashboard Analitik"
          subtitle="Ringkasan performa dan data penting aplikasi Anda."
        />
        <AdminStats />
        <div className="mt-8">
          <AnalyticsChart />
        </div>
      </motion.div>
    </>
  );
};

export default AdminDashboard;
