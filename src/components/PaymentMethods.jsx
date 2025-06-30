import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const PaymentMethods = () => {
  const payments = [
    'BCA', 'Mandiri', 'BRI', 'BNI', 'GoPay', 'OVO', 'DANA', 'ShopeePay', 'QRIS'
  ];

  return (
    <motion.div
      className="mt-20 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center justify-center space-x-2 mb-4">
        <ShieldCheck className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-semibold text-white">Transaksi Aman & Terpercaya</h3>
      </div>
      <p className="text-gray-300 max-w-3xl mx-auto mb-8">
        Kami terintegrasi dengan <a href="https://mayar.id" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold hover:underline">mayar.id</a> untuk menjamin keamanan transaksi Anda. Proses cepat, mudah, dan terenkripsi dengan berbagai pilihan pembayaran.
      </p>
      <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2">
        {payments.map((payment, index) => (
          <motion.div
            key={index}
            className="bg-slate-700/50 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
            viewport={{ once: true }}
          >
            {payment}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentMethods;