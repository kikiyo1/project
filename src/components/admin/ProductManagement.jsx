import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProductFormDialog from '@/components/admin/ProductFormDialog';
import { useProducts } from '@/hooks/useProducts';

const ProductManagement = () => {
  const { toast } = useToast();
  const { products, saveProducts } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId) => {
    const newProducts = products.filter(p => p.id !== productId);
    saveProducts(newProducts);
    toast({
      title: "🗑️ Produk Dihapus",
      description: "Produk berhasil dihapus dari katalog."
    });
  };

  const onProductSave = (savedProduct) => {
    let newProducts;
    if (editingProduct) {
      newProducts = products.map(p => p.id === savedProduct.id ? savedProduct : p);
    } else {
      newProducts = [...products, savedProduct];
    }
    saveProducts(newProducts);
    setEditingProduct(null);
  };
  
  return (
    <div className="glass-effect p-6 rounded-xl mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Katalog Produk ({products.length})</h2>
        <Button 
          onClick={() => {
            setEditingProduct(null);
            setIsDialogOpen(true);
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="mr-2 w-4 h-4" />
          Tambah Produk
        </Button>
      </div>

      <ProductFormDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        product={editingProduct}
        onSave={onProductSave}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="bg-slate-800/50 p-6 rounded-xl card-hover border border-slate-700"
          >
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                <span className="text-blue-400 font-bold">{product.price}</span>
              </div>
              {product.category && (
                <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              )}
              <p className="text-gray-300 text-sm h-16 overflow-y-auto">{product.description}</p>
              {product.features && (
                <p className="text-gray-400 text-xs">{product.features}</p>
              )}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={() => handleEdit(product)}
                  variant="outline"
                  size="sm"
                  className="border-blue-600 text-blue-400 hover:bg-blue-600/20 flex-1"
                >
                  <Edit className="mr-2 w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  variant="outline"
                  size="sm"
                  className="border-red-600 text-red-400 hover:bg-red-600/20 flex-1"
                >
                  <Trash2 className="mr-2 w-4 h-4" />
                  Hapus
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">Belum Ada Produk</h3>
          <p className="text-gray-500">Tambahkan produk pertama Anda untuk memulai katalog</p>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;