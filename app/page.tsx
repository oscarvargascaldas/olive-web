export default function OliveLanding() {
  return (
    <main className="bg-[#f5f1ea] text-[#2a261f] min-h-screen overflow-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#f5f1ea]/70 border-b border-[#e7dccb]">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-4xl leading-none font-serif">O’live</h1>
            <p className="uppercase tracking-[0.3em] text-[10px] text-[#6d6458] mt-1">
              Aceite de oliva
            </p>
          </div>

          <nav className="hidden md:flex gap-10 uppercase tracking-[0.2em] text-sm text-[#554d43]">
            <a href="#">Inicio</a>
            <a href="#">Nosotros</a>
            <a href="#">Colección</a>
            <a href="#">Proceso</a>
            <a href="#">Contacto</a>
          </nav>

          <button className="bg-[#202015] text-white px-6 py-3 rounded-full uppercase tracking-[0.15em] text-xs hover:scale-105 transition-all duration-300">
            Comprar ahora
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-32 bg-[#f5f1ea] overflow-hidden">
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
              <button className="bg-[#202015] text-white px-8 py-4 rounded-full uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300 shadow-xl">
                Descubrir
              </button>

              <button className="border border-[#2a261f] px-8 py-4 rounded-full uppercase tracking-[0.2em] text-sm hover:bg-[#2a261f] hover:text-white transition-all duration-300">
                Ver colección
              </button>
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

      {/* SECOND SECTION */}
      <section className="py-32 px-6 md:px-10 bg-[#ece4d8]">
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
              Cada botella de O’live representa una cosecha cuidadosamente seleccionada,
              elaborada bajo un proceso artesanal que busca preservar el carácter puro
              del aceite de oliva premium.
            </p>

            <div className="grid grid-cols-2 gap-8 text-sm">
              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">Virgen Extra</h3>
                <p className="text-[#655d51]">Máxima calidad</p>
              </div>

              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">Cosecha Selectiva</h3>
                <p className="text-[#655d51]">Aceitunas seleccionadas</p>
              </div>

              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">Origen Ilo</h3>
                <p className="text-[#655d51]">Valle costero único</p>
              </div>

              <div className="border-t border-[#c7baa5] pt-5">
                <h3 className="uppercase tracking-[0.2em] mb-2">Producción Limitada</h3>
                <p className="text-[#655d51]">Edición Premium</p>
              </div>
            </div>

            <button className="mt-12 bg-[#202015] text-white px-8 py-4 rounded-full uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300">
              Conocer más
            </button>
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

      {/* BENEFITS */}
      <section className="bg-[#202015] text-[#f5f1ea] py-14 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">100% Natural</h3>
            <p className="opacity-70">Sin aditivos</p>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">Prensado en frío</h3>
            <p className="opacity-70">Conserva sus propiedades</p>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">Sabor auténtico</h3>
            <p className="opacity-70">Equilibrado y elegante</p>
          </div>

          <div>
            <h3 className="uppercase tracking-[0.2em] text-sm mb-2">Hecho en Perú</h3>
            <p className="opacity-70">Con orgullo</p>
          </div>
        </div>
      </section>
    </main>
  )
}
