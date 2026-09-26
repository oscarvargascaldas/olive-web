'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import { products } from '@/lib/products';

interface BuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (productId: string) => void;
}

export default function BuyModal({ isOpen, onClose, onConfirm }: BuyModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    setTimeout(() => {
      onConfirm(selectedProduct);
      setLoading(false);
      setSelectedProduct(null);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Selecciona tu Producto">
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {products.map((product) => (
          <label
            key={product.id}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedProduct === product.id
                ? 'border-[#202015] bg-[#f0e8df]'
                : 'border-[#d4c4b0] hover:border-[#202015]'
            }`}
          >
            <input
              type="radio"
              name="product"
              value={product.id}
              checked={selectedProduct === product.id}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-5 h-5 cursor-pointer"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-[#2a261f]">{product.name}</p>
                {product.badge && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6d6458]">{product.description}</p>
              <p className="text-lg font-bold text-[#202015] mt-1">${product.price.toFixed(2)} USD</p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-[#d4c4b0]">
        <Button variant="secondary" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={!selectedProduct}
          loading={loading}
          className="flex-1"
        >
          {loading ? 'Procesando...' : 'Comprar'}
        </Button>
      </div>
    </Modal>
  );
}
