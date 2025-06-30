
import React from 'react';
import { Helmet } from 'react-helmet';
import PageHeader from '@/components/admin/PageHeader';
import LandingPageEditor from '@/components/admin/LandingPageEditor';
import { motion } from 'framer-motion';

const EditorPage = () => {
  return (
    <>
      <Helmet>
        <title>Editor Halaman - Admin HADESOLUTION</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <PageHeader
          title="Editor Landing Page"
          subtitle="Ubah tampilan dan konten landing page secara real-time."
        />
        <LandingPageEditor />
      </motion.div>
    </>
  );
};

export default EditorPage;
