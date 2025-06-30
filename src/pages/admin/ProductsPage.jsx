
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/admin/PageHeader';
import ProductManagement from '@/components/admin/ProductManagement';
import { motion } from 'framer-motion';

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Manajemen Produk - Admin HADESOLUTION</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="Manajemen Produk"
          subtitle="Tambah, edit, dan hapus produk dari katalog Anda."
        />
        <ProductManagement />
      </motion.div>
    </>
  );
};

export default ProductsPage;
