'use client';

import { useCart } from '@/app/context/CartContext';
import Button from './Button';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface ShippingAddress {
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
}

export default function Cart() {
  const { cart, cartError, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    nombre: session?.user?.nombre ?? '',
    email: session?.user?.email ?? '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
  });

  const total = getCartTotal();

  async function createOrder() {
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingAddress }),
      });
      const data = await response.json();

      if (!response.ok) {
        setCheckoutError(data.error ?? 'No se pudo crear el pedido.');
        return;
      }

      clearCart();
      setCheckoutOpen(false);
      setIsOpen(false);
      window.alert('Pedido creado correctamente. Te contactaremos para coordinar el pago y envío.');
    } catch (error) {
      console.error('Error creando pedido:', error);
      setCheckoutError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  function updateShippingAddress(field: keyof ShippingAddress, value: string) {
    setShippingAddress((current) => ({ ...current, [field]: value }));
  }

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
                aria-label="Cerrar carrito"
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{cartError}</p>}
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
                  {!session ? (
                    <Button onClick={() => { window.location.href = '/auth/login'; }} className="w-full">
                      Inicia sesión para comprar
                    </Button>
                  ) : checkoutOpen ? (
                    <div className="space-y-3">
                      <p className="text-sm text-[#6d6458]">
                        Pedido para {session.user?.email}. Completa los datos de envío.
                      </p>
                      <input aria-label="Nombre completo" autoComplete="name" placeholder="Nombre completo" required value={shippingAddress.nombre} onChange={(event) => updateShippingAddress('nombre', event.target.value)} className="w-full rounded-lg border border-[#d4c4b0] px-3 py-2" />
                      <input aria-label="Correo electrónico" autoComplete="email" type="email" placeholder="Correo electrónico" required value={shippingAddress.email} onChange={(event) => updateShippingAddress('email', event.target.value)} className="w-full rounded-lg border border-[#d4c4b0] px-3 py-2" />
                      <input aria-label="Teléfono" autoComplete="tel" type="tel" placeholder="Teléfono" required value={shippingAddress.telefono} onChange={(event) => updateShippingAddress('telefono', event.target.value)} className="w-full rounded-lg border border-[#d4c4b0] px-3 py-2" />
                      <input aria-label="Dirección" autoComplete="street-address" placeholder="Dirección" required value={shippingAddress.direccion} onChange={(event) => updateShippingAddress('direccion', event.target.value)} className="w-full rounded-lg border border-[#d4c4b0] px-3 py-2" />
                      <input aria-label="Ciudad" autoComplete="address-level2" placeholder="Ciudad" required value={shippingAddress.ciudad} onChange={(event) => updateShippingAddress('ciudad', event.target.value)} className="w-full rounded-lg border border-[#d4c4b0] px-3 py-2" />
                      <input aria-label="Código postal (opcional)" autoComplete="postal-code" placeholder="Código postal (opcional)" value={shippingAddress.codigoPostal} onChange={(event) => updateShippingAddress('codigoPostal', event.target.value)} className="w-full rounded-lg border border-[#d4c4b0] px-3 py-2" />
                      {checkoutError && <p role="alert" className="text-sm text-red-700">{checkoutError}</p>}
                      <Button onClick={createOrder} loading={checkoutLoading} className="w-full">
                        {checkoutLoading ? 'Creando pedido...' : 'Confirmar pedido'}
                      </Button>
                      <Button variant="secondary" onClick={() => setCheckoutOpen(false)} className="w-full">
                        Volver
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={() => setCheckoutOpen(true)} className="w-full">
                      Continuar compra
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={clearCart}
                    className="w-full"
                  >
                    Vaciar Carrito
                  </Button>
                  {session && (
                    <Button variant="secondary" onClick={() => signOut({ callbackUrl: '/' })} className="w-full">
                      Cerrar sesión
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
