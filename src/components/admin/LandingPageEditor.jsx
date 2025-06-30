
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, RefreshCw, Trash2, Plus, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LandingPageEditor = () => {
  const { settings, updateSettings, updateNestedSettings, resetSettings } = useSettings();
  const { toast } = useToast();
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    updateSettings({ [e.target.name]: e.target.value });
  };

  const handleNestedInputChange = (section, key, value) => {
    updateNestedSettings(section, { ...settings[section], [key]: value });
  };
  
  const handleDeeplyNestedInputChange = (section, subSection, key, value) => {
    updateNestedSettings(section, {
      ...settings[section],
      [subSection]: {
        ...settings[section][subSection],
        [key]: value
      }
    });
  };

  const handleArrayItemChange = (section, index, key, value) => {
    const items = [...settings[section].items];
    items[index] = { ...items[index], [key]: value };
    updateNestedSettings(section, { ...settings[section], items });
  };

  const addArrayItem = (section) => {
    const items = [...settings[section].items];
    items.push({ id: Date.now(), icon: 'ShoppingCart', title: 'Fitur Baru', description: 'Deskripsi fitur baru' });
    updateNestedSettings(section, { ...settings[section], items });
  };

  const removeArrayItem = (section, index) => {
    const items = settings[section].items.filter((_, i) => i !== index);
    updateNestedSettings(section, { ...settings[section], items });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateNestedSettings('whyUsSection', { ...settings.whyUsSection, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "✅ Pengaturan Disimpan!",
      description: "Tampilan landing page telah diperbarui."
    });
  };

  const handleReset = () => {
    resetSettings();
    toast({
      title: "🔄 Pengaturan Direset!",
      description: "Tampilan landing page telah dikembalikan ke default."
    });
  };

  const fontOptions = ['Inter', 'Roboto', 'Lato', 'Montserrat', 'Poppins'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-effect p-6 rounded-xl"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Editor Komponen</h2>
        <div className="flex gap-2">
          <Button onClick={handleReset} variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/20">
            <RefreshCw className="mr-2 w-4 h-4" /> Reset
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
            <Save className="mr-2 w-4 h-4" /> Simpan
          </Button>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl font-semibold text-white">Pengaturan Global</AccordionTrigger>
          <AccordionContent className="p-4 bg-slate-800/30 rounded-b-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="primaryColor" className="text-white">Warna Primer</Label>
                <Input id="primaryColor" name="primaryColor" type="color" value={settings.primaryColor} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-white w-full h-10 p-1"/>
              </div>
              <div>
                <Label htmlFor="fontFamily" className="text-white">Jenis Font</Label>
                <select id="fontFamily" name="fontFamily" value={settings.fontFamily} onChange={handleInputChange} className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-white">
                  {fontOptions.map(font => <option key={font} value={font}>{font}</option>)}
                </select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-xl font-semibold text-white">Hero Section</AccordionTrigger>
          <AccordionContent className="p-4 bg-slate-800/30 rounded-b-lg space-y-4">
            <div>
              <Label htmlFor="heroTitle" className="text-white">Judul Utama</Label>
              <Input id="heroTitle" name="heroTitle" value={settings.heroTitle} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-white"/>
            </div>
            <div>
              <Label htmlFor="heroSubtitle" className="text-white">Sub-Judul</Label>
              <Textarea id="heroSubtitle" name="heroSubtitle" value={settings.heroSubtitle} onChange={handleInputChange} className="bg-slate-700 border-slate-600 text-white" rows={3}/>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-xl font-semibold text-white">Fitur Unggulan</AccordionTrigger>
          <AccordionContent className="p-4 bg-slate-800/30 rounded-b-lg space-y-6">
            <div className="space-y-4">
              <Label className="text-white">Judul & Sub-judul Section</Label>
              <Input value={settings.featuresSection.title} onChange={(e) => handleNestedInputChange('featuresSection', 'title', e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
              <Input value={settings.featuresSection.subtitle} onChange={(e) => handleNestedInputChange('featuresSection', 'subtitle', e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
            </div>
            <div className="space-y-4">
              {settings.featuresSection.items.map((item, index) => (
                <div key={item.id} className="p-4 bg-slate-700/50 rounded-lg space-y-2 relative">
                  <Input value={item.title} onChange={(e) => handleArrayItemChange('featuresSection', index, 'title', e.target.value)} className="bg-slate-600 border-slate-500 text-white" />
                  <Textarea value={item.description} onChange={(e) => handleArrayItemChange('featuresSection', index, 'description', e.target.value)} className="bg-slate-600 border-slate-500 text-white" rows={2} />
                  <Button onClick={() => removeArrayItem('featuresSection', index)} variant="destructive" size="icon" className="absolute top-2 right-2 w-7 h-7"><Trash2 className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
            <Button onClick={() => addArrayItem('featuresSection')}><Plus className="mr-2 w-4 h-4" /> Tambah Fitur</Button>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-xl font-semibold text-white">Why Us Section</AccordionTrigger>
          <AccordionContent className="p-4 bg-slate-800/30 rounded-b-lg space-y-4">
            <div>
              <Label className="text-white">Judul Section</Label>
              <Input value={settings.whyUsSection.title} onChange={(e) => handleNestedInputChange('whyUsSection', 'title', e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
            </div>
            <div>
              <Label className="text-white">URL Gambar</Label>
              <div className="flex gap-2">
                <Input value={settings.whyUsSection.image} onChange={(e) => handleNestedInputChange('whyUsSection', 'image', e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
                <Button type="button" onClick={() => fileInputRef.current.click()}><Upload className="w-4 h-4" /></Button>
                <Input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-xl font-semibold text-white">Footer</AccordionTrigger>
          <AccordionContent className="p-4 bg-slate-800/30 rounded-b-lg space-y-6">
            <div className="flex items-center space-x-2">
              <Switch id="footer-visible" checked={settings.footer.visible} onCheckedChange={(checked) => handleNestedInputChange('footer', 'visible', checked)} />
              <Label htmlFor="footer-visible" className="text-white">Tampilkan Footer</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Email Kontak</Label>
                <Input value={settings.footer.contacts.email} onChange={(e) => handleDeeplyNestedInputChange('footer', 'contacts', 'email', e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <Label className="text-white">Telepon Kontak</Label>
                <Input value={settings.footer.contacts.phone} onChange={(e) => handleDeeplyNestedInputChange('footer', 'contacts', 'phone', e.target.value)} className="bg-slate-700 border-slate-600 text-white" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};

export default LandingPageEditor;
