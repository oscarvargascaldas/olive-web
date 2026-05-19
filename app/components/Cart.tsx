'use client';

import { useCart } from '@/app/context/CartContext';
import Button from './Button';
import { useState } from 'react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const total = getCartTotal();

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#202015] text-white hover:scale-105 transition-transform"
      >
        🛒 Carrito
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Cart Panel */}
          <div className="relative z-10 ml-auto w-full max-w-md bg-[#f5f1ea] h-screen flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#d4c4b0]">
              <h2 className="text-2xl font-serif">Mi Carrito</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#6d6458] hover:text-[#2a261f]"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <p className="text-center text-[#6d6458] py-8">Tu carrito está vacío</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-[#d4c4b0]"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-[#2a261f]">{item.name}</h3>
                      <p className="text-sm text-[#6d6458]">${item.price.toFixed(2)}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(0, item.quantity - 1))
                          }
                          className="px-2 py-1 bg-[#ece4d8] rounded hover:bg-[#d4c4b0]"
                        >
                          −
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-[#ece4d8] rounded hover:bg-[#d4c4b0]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-xl h-fit"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-[#d4c4b0] p-6 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full">Continuar Compra</Button>
                  <Button
                    variant="secondary"
                    onClick={clearCart}
                    className="w-full"
                  >
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
