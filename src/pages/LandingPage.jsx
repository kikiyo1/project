
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Star, ArrowRight, CheckCircle, Zap, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProductCatalog from '@/components/ProductCatalog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useSettings, getIconComponent } from '@/contexts/SettingsContext';
import { useProducts } from '@/hooks/useProducts';

const LandingPage = () => {
  const { toast } = useToast();
  const { products } = useProducts();
  const { settings, isLoaded } = useSettings();

  const handleGetStarted = () => {
    toast({
      title: "🚀 Tertarik dengan SOFTWARE HADESOLUTION?",
      description: "Hubungi tim kami untuk demo gratis dan konsultasi bisnis!",
    });
  };

  const handleContactSales = () => {
    toast({
      title: "📞 Tim Sales Siap Membantu!",
      description: "Kami akan menghubungi Anda dalam 24 jam untuk demo personal!",
    });
  };

  const handleWhatsAppRedirect = () => {
    window.open('https://wa.me/6285161244123?text=Halo,%20saya%20tertarik%20untuk%20konsultasi%20gratis%20mengenai%20SOFTWARE%20HADESOLUTION.', '_blank');
  };
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{settings.heroTitle} - Solusi Kasir Terdepan</title>
        <meta name="description" content={settings.heroSubtitle} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href={`https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700;800;900&display=swap`} rel="stylesheet" />
      </Helmet>
      
      <style>{`
        :root {
          --primary-color: ${settings.primaryColor};
        }
        body {
          font-family: '${settings.fontFamily}', sans-serif;
        }
        .gradient-text {
          background-image: linear-gradient(to right, ${settings.primaryColor}, #9333ea, #ec4899);
        }
        .pulse-glow {
          animation-name: pulse-glow-dynamic;
        }
        @keyframes pulse-glow-dynamic {
          from { box-shadow: 0 0 20px ${settings.primaryColor}80; }
          to { box-shadow: 0 0 40px ${settings.primaryColor}CC; }
        }
      `}</style>
      
      <div className="min-h-screen">
        <Navbar />
        
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-indigo-900/50"></div>
          <div className="absolute inset-0">
            <div className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl floating-animation`} style={{backgroundColor: `${settings.primaryColor}33`}}></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {settings.heroTitle}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {settings.heroSubtitle}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r text-white px-8 py-4 text-lg font-semibold rounded-xl pulse-glow"
                  style={{'--tw-gradient-from': settings.primaryColor, '--tw-gradient-to': 'rgb(147 51 234)'}}
                >
                  Mulai Sekarang <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  onClick={handleContactSales}
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  Demo Gratis
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

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
                {settings.featuresSection.title}
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {settings.featuresSection.subtitle}
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {settings.featuresSection.items.map((feature, index) => {
                const Icon = getIconComponent(feature.icon);
                return (
                  <motion.div
                    key={feature.id}
                    className="glass-effect p-8 rounded-2xl card-hover"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-4" style={{color: settings.primaryColor}}><Icon className="w-8 h-8" /></div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
                  {settings.whyUsSection.title}
                </h2>
                <div className="space-y-4">
                  {settings.whyUsSection.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="glass-effect p-8 rounded-2xl">
                  <img  
                    alt="Dashboard SOFTWARE HADESOLUTION yang modern dan intuitif"
                    className="w-full h-64 object-cover rounded-xl"
                   src={settings.whyUsSection.image} />
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-semibold">4.9/5 Rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-white">10,000+ Pengguna</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <ProductCatalog products={products} />

        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                {settings.ctaSection.title}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {settings.ctaSection.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r text-white px-8 py-4 text-lg font-semibold rounded-xl"
                  style={{'--tw-gradient-from': settings.primaryColor, '--tw-gradient-to': 'rgb(147 51 234)'}}
                >
                  <Zap className="mr-2 w-5 h-5" />
                  Mulai Trial Gratis
                </Button>
                <Button 
                  onClick={handleWhatsAppRedirect}
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
                >
                  <Award className="mr-2 w-5 h-5" />
                  Konsultasi Gratis
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {settings.footer.visible && <Footer />}
      </div>
    </>
  );
};

export default LandingPage;
