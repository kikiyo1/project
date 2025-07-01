import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Save, X, Upload } from 'lucide-react';

const ProductFormDialog = ({ isOpen, setIsOpen, product, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    features: '',
    checkoutUrl: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  const isEditing = !!product;

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setFormData(product);
        setImagePreview(product.image || '');
      } else {
        setFormData({ name: '', description: '', price: '', category: '', image: '', features: '', checkoutUrl: '' });
        setImagePreview('');
      }
    }
  }, [isOpen, product, isEditing]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description) {
      toast({
        title: "❌ Data Tidak Lengkap",
        description: "Mohon lengkapi nama, harga, dan deskripsi produk!",
        variant: "destructive"
      });
      return;
    }

    const productData = {
      ...formData,
      id: isEditing ? product.id : Date.now(),
      price: formData.price.toString().includes('Rp') ? formData.price : `Rp ${formData.price}`
    };

    onSave(productData);
    toast({
      title: isEditing ? "✅ Produk Diperbarui!" : "🎉 Produk Ditambahkan!",
      description: `${productData.name} telah berhasil disimpan.`
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-text">
            {isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">Nama Produk *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Contoh: HADESOLUTION Pro"
                required
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-white">Harga *</Label>
              <Input
                id="price"
                value={formData.price.toString().replace('Rp ','')}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="299000"
                type="number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-white">Kategori</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Basic, Pro, Enterprise"
              />
            </div>
            <div>
              <Label className="text-white">Gambar Produk</Label>
              <div className="flex items-center gap-2">
                <Button 
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700 w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Gambar
                </Button>
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
                {imagePreview && <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded-md object-cover"/>}
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white">Deskripsi *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Deskripsi lengkap produk..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="features" className="text-white">Fitur Utama</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({...formData, features: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="Kasir POS, Laporan Harian, Manajemen Stok..."
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="checkoutUrl" className="text-white">Checkout URL (Mayar)</Label>
            <Input
              id="checkoutUrl"
              value={formData.checkoutUrl}
              onChange={(e) => setFormData({...formData, checkoutUrl: e.target.value})}
              className="bg-slate-700 border-slate-600 text-white"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex-1"
            >
              <Save className="mr-2 w-4 h-4" />
              {isEditing ? 'Update Produk' : 'Simpan Produk'}
            </Button>
            <Button 
              type="button"
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-700"
            >
              <X className="mr-2 w-4 h-4" />
              Batal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
