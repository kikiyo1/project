
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const Footer = () => {
  const { settings } = useSettings();
  const { footer } = settings;

  const socialIcons = {
    facebook: <Facebook className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />
  };

  return (
    <footer className="bg-gradient-to-r from-slate-900/90 to-blue-900/90 border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold gradient-text">{footer.companyInfo.name}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {footer.companyInfo.description}
            </p>
            <div className="flex space-x-4">
              {Object.entries(footer.socials).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-white/10 rounded-lg"
                  aria-label={`Follow us on ${platform}`}
                >
                  {socialIcons[platform]}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold text-white">Produk</span>
            <ul className="space-y-2">
              {['HADESOLUTION Basic', 'HADESOLUTION Pro', 'HADESOLUTION Enterprise', 'Custom Solutions'].map((item, index) => (
                <li key={index}>
                  <a href="#product-catalog" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold text-white">Support</span>
            <ul className="space-y-2">
              {['Dokumentasi', 'Tutorial', 'FAQ', 'Live Chat', 'Training'].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="text-lg font-semibold text-white">Kontak</span>
            <div className="space-y-3">
              <a href={`mailto:${footer.contacts.email}`} className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                <span>{footer.contacts.email}</span>
              </a>
              <a href={`tel:${footer.contacts.phone.replace(/\s/g, '')}`} className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors text-sm">
                <Phone className="w-4 h-4" />
                <span>{footer.contacts.phone}</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{footer.contacts.address}</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {footer.companyInfo.name}. Semua hak dilindungi.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Kebijakan Privasi', 'Syarat & Ketentuan', 'Cookie Policy'].map((item, index) => (
              <a key={index} href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
