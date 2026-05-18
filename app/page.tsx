'use client';

import { useState } from 'react';
import Button from './components/Button';
import BuyModal from './components/BuyModal';
import Toast from './components/Toast';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function OliveLanding() {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleBuyConfirm = (productId: string) => {
    const productNames: { [key: string]: string } = {
      'bottle-250': 'Botella 250ml',
      'bottle-500': 'Botella 500ml',
      'pack-2x500': 'Pack 2x500ml',
    };
    addToast(
      `¡${productNames[productId] || 'Producto'} agregado al carrito!`,
      'success'
    );
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-[#f5f1ea] text-[#2a261f] min-h-screen overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#f5f1ea]/70 border-b border-[#e7dccb]">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:opacity-70 transition-opacity"
          >
            <h1 className="text-4xl leading-none font-serif">O'live</h1>
            <p className="uppercase tracking-[0.3em] text-[10px] text-[#6d6458] mt-1">
              Aceite de oliva
            </p>
          </button>

          <nav className="hidden md:flex gap-10 uppercase tracking-[0.2em] text-sm text-[#554d43]">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#202015] transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-[#202015] transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="hover:text-[#202015] transition-colors"
            >
              Colección
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="hover:text-[#202015] transition-colors"
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#202015] transition-colors"
            >
              Contacto
            </button>
          </nav>

          <Button onClick={() => setIsBuyModalOpen(true)}>
            Comprar ahora
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-32 bg-[#f5f1ea] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="/olive-bottle.png"
            alt="background"
            className="w-full h-full object-cover blur-sm scale-110"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm text-[#6b654d] mb-8">
              Del Valle de Ilo
            </p>

            <h2 className="text-6xl md:text-8xl leading-[0.95] font-serif mb-8">
              Tradición
              <br />
              que perdura
            </h2>

            <p className="text-xl text-[#50483d] leading-relaxed max-w-xl mb-10">
              Aceite de oliva virgen extra inspirado en la tradición mediterránea,
              nacido entre olivos y desierto costero del sur peruano.
            </p>

            <div className="flex gap-5 flex-wrap">
              <Button onClick={() => setIsBuyModalOpen(true)}>
                Descubrir
              </Button>

              <Button
                variant="secondary"
                onClick={() => scrollToSection('collection')}
              >
                Ver colección
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <img
              src="/olive-bottle.png"
              alt="Olive Bottle"
              className="w-full max-w-md object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-32 px-6 md:px-10 bg-[#ece4d8]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-sm mb-6 text-[#6a6257]">
              Segunda Producción 2026
            </p>

            <h2 className="text-5xl md:text-7xl leading-tight mb-8 font-serif">
              Excelencia
              <br />
              en cada gota
            </h2>

            <p className="text-lg leading-relaxed text-[#554d43] mb-12 max-w-xl">
              Cada botella de O'live representa una cosecha cuidadosamente
              seleccionada, elaborada bajo un proceso artesanal que busca
              preservar el carácter puro del aceite de oliva premium.
            </p>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">Virgen Extra</h3>
                <p className="text-[#655d51]">Máxima calidad</p>
              </div>

              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">
                  Cosecha Selectiva
                </h3>
                <p className="text-[#655d51]">Aceitunas seleccionadas</p>
              </div>

              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">Origen Ilo</h3>
                <p className="text-[#655d51]">Valle costero único</p>
              </div>

              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">
                  Producción Limitada
                </h3>
                <p className="text-[#655d51]">Edición Premium</p>
              </div>
            </div>

            <Button onClick={() => addToast('Más información cargada', 'info')} className="mt-12">
              Conocer más
            </Button>
          </div>

          <div>
            <img
              src="/olive-bottle.png"
              alt="Bottle"
              className="rounded-[35px] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section id="collection" className="py-32 px-6 md:px-10 bg-[#f5f1ea]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-sm text-[#6b654d] mb-4">
              Nuestros Productos
            </p>
            <h2 className="text-5xl md:text-7xl leading-tight font-serif text-[#2a261f]">
              Colección Premium
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Botella 250ml', price: '$$', desc: 'Perfecto para probar' },
              { name: 'Botella 500ml', price: '$$$', desc: 'Para uso diario' },
              { name: 'Pack 2x500ml', price: '$$$$', desc: 'Mejor valor' },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-[#ece4d8] rounded-3xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-6xl mb-4">🫒</div>
                <h3 className="text-2xl font-serif text-[#2a261f] mb-2">
                  {product.name}
                </h3>
                <p className="text-[#6d6458] mb-4">{product.desc}</p>
                <p className="text-3xl font-bold text-[#554d43] mb-6">
                  {product.price}
                </p>
                <Button onClick={() => setIsBuyModalOpen(true)} className="w-full">
                  Agregar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="bg-[#202015] text-[#f5f1ea] py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">
              100% Natural
            </h3>
            <p className="opacity-70">Sin aditivos</p>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">
              Prensado en frío
            </h3>
            <p className="opacity-70">Conserva sus propiedades</p>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">
              Sabor auténtico
            </h3>
            <p className="opacity-70">Equilibrado y elegante</p>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">
              Hecho en Perú
            </h3>
            <p className="opacity-70">Con orgullo</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 md:px-10 bg-[#ece4d8]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl leading-tight font-serif text-[#2a261f] mb-6">
            ¿Preguntas?
          </h2>
          <p className="text-xl text-[#554d43] mb-8">
            Contáctanos para conocer más sobre O'live
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button onClick={() => addToast('Email copiado', 'success')}>
              📧 Enviar Email
            </Button>
            <Button
              variant="secondary"
              onClick={() => addToast('WhatsApp abierto', 'info')}
            >
              💬 WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* MODALS */}
      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        onConfirm={handleBuyConfirm}
      />

      {/* TOASTS */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </main>
  );
}
