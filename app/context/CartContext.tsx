'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface CartContextType {
  cart: CartItem[];
  user: User | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  getCartTotal: () => number;
  cartError: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartError, setCartError] = useState<string | null>(null);

  // Cargar carrito desde localStorage
  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      if (status === 'loading') return;

      setIsLoading(true);
      setCartError(null);
      try {
        const savedCart = localStorage.getItem('cart');
        const savedUser = localStorage.getItem('user');
        const guestCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

        if (savedUser) setUser(JSON.parse(savedUser));

        if (status === 'authenticated') {
          let pendingGuestCart = guestCart;
          while (pendingGuestCart.length > 0) {
            const item = pendingGuestCart[0];
            const response = await fetch('/api/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId: item.id, cantidad: item.quantity }),
            });
            if (!response.ok) {
              throw new Error('No se pudo sincronizar el carrito guardado.');
            }
            pendingGuestCart = pendingGuestCart.slice(1);
            localStorage.setItem('cart', JSON.stringify(pendingGuestCart));
          }

          const response = await fetch('/api/cart');
          if (!response.ok) throw new Error('No se pudo cargar el carrito.');
          const data = await response.json();
          if (!cancelled) {
            setCart(
              data.items.map((item: { productId: string; nombre: string; precio: number; cantidad: number }) => ({
                id: item.productId,
                name: item.nombre,
                price: item.precio,
                quantity: item.cantidad,
              })),
            );
            localStorage.removeItem('cart');
          }
        } else if (!cancelled) {
          setCart(guestCart);
        }
      } catch (error) {
        console.error('Error cargando carrito:', error);
        setCartError('No se pudo sincronizar el carrito. Actualiza la página para volver a intentarlo.');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadCart();
    return () => {
      cancelled = true;
    };
  }, [status]);

  // Guardar carrito en localStorage
  useEffect(() => {
    if (!isLoading) {
      if (status === 'authenticated') {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  }, [cart, isLoading, status]);

  // Guardar usuario en localStorage
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }, [user, isLoading]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prevCart, item];
    });

    if (status === 'authenticated') {
      void fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: item.id,
          nombre: item.name,
          precio: item.price,
          cantidad: item.quantity,
        }),
      }).then((response) => {
        if (!response.ok) throw new Error('No se pudo guardar el producto en el carrito.');
        setCartError(null);
      }).catch((error: unknown) => {
        console.error('Error guardando producto en carrito:', error);
        setCartError('No se pudo guardar el cambio en tu cuenta. Inténtalo de nuevo.');
      });
    }
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
    if (status === 'authenticated') {
      void fetch(`/api/cart/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (!response.ok) throw new Error('No se pudo eliminar el producto del carrito.');
          setCartError(null);
        })
        .catch((error: unknown) => {
          console.error('Error eliminando producto del carrito:', error);
          setCartError('No se pudo guardar el cambio en tu cuenta. Inténtalo de nuevo.');
        });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart((prevCart) =>
        prevCart.map((i) => (i.id === id ? { ...i, quantity } : i))
      );
      if (status === 'authenticated') {
        void fetch(`/api/cart/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cantidad: quantity }),
        }).then((response) => {
          if (!response.ok) throw new Error('No se pudo actualizar la cantidad.');
          setCartError(null);
        }).catch((error: unknown) => {
          console.error('Error actualizando cantidad del carrito:', error);
          setCartError('No se pudo guardar el cambio en tu cuenta. Inténtalo de nuevo.');
        });
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    if (status === 'authenticated') {
      void Promise.all(
        cart.map((item) => fetch(`/api/cart/${item.id}`, { method: 'DELETE' })),
      ).then((responses) => {
        if (responses.some((response) => !response.ok)) {
          console.error('No se pudieron eliminar todos los productos del carrito remoto.');
          setCartError('No se pudo vaciar el carrito de tu cuenta. Inténtalo de nuevo.');
        } else {
          setCartError(null);
        }
      }).catch((error: unknown) => {
        console.error('Error vaciando carrito remoto:', error);
      });
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setUser,
        getCartTotal,
        cartError,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
