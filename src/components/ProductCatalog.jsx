import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PaymentMethods from '@/components/PaymentMethods';

const ProductCatalog = ({ products }) => {
  const { toast } = useToast();

  const handlePurchase = (url) => {
    if (url) {
      window.open(`${url}?iframe=true`, '_blank');
    } else {
      toast({
        title: "Checkout tidak tersedia",
        description: "URL checkout belum ditentukan untuk produk ini."
      });
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/6285161244123?text=Halo,%20saya%20tertarik%20dengan%20paket%20custom%20SOFTWARE%20HADESOLUTION.', '_blank');
  };

  if (!products || products.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Katalog Produk
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Katalog produk sedang dipersiapkan. Kembali lagi nanti!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Paket SOFTWARE HADESOLUTION
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Semua paket dilengkapi dengan support penuh dari tim ahli kami.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="glass-effect p-8 rounded-2xl card-hover relative overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {index === 1 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold z-10">
                  <Star className="w-4 h-4 inline mr-1" />
                  Populer
                </div>
              )}
              
              <div className="flex-grow">
                {product.image && (
                  <div className="mb-6 overflow-hidden rounded-xl">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                )}
                
                <div className="space-y-4">
                  {product.category && (
                    <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category}
                    </span>
                  )}
                  
                  <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                  
                  <div className="text-3xl font-bold gradient-text">
                    {product.price}
                    <span className="text-sm text-gray-400 font-normal">/lisensi</span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed flex-grow min-h-[6rem]">{product.description}</p>
                  
                  {product.features && (
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold flex items-center">
                        <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                        Fitur Utama:
                      </h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {product.features.split(',').map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                            {feature.trim()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={() => handlePurchase(product.checkoutUrl)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <ShoppingCart className="mr-2 w-5 h-5" />
                  Pilih Paket Ini
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-4">
            Butuh paket khusus untuk bisnis Anda?
          </p>
          <Button 
            onClick={handleWhatsAppRedirect}
            variant="outline" 
            className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-xl"
          >
            Konsultasi Custom Package
          </Button>
        </motion.div>

        <PaymentMethods />

      </div>
    </section>
  );
};

export default ProductCatalog;
