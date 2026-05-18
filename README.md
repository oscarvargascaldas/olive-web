# O'live - Aceite de Oliva Premium Peruano 🫒

Sitio web de comercio electrónico para **O'live**, aceite de oliva virgen extra producido artesanalmente en el Valle de Ilo, Perú.

## 🌟 Características

- ✨ **Diseño Elegante** - Interfaz moderna y sofisticada
- 🎯 **Completamente Interactivo** - Botones, modales y notificaciones funcionales
- 📱 **Responsive** - Optimizado para móvil, tablet y desktop
- ♿ **Accesible** - Cumple con estándares WCAG
- ⚡ **Rendimiento** - Rápido y optimizado
- 🛒 **Modal de Compra** - Selección y simulación de compra
- 🔔 **Notificaciones** - Sistema de toasts para feedback
- 📍 **Smooth Scroll** - Navegación fluida entre secciones

## 🛠 Stack Tecnológico

- **Next.js 16.2.6** - Framework React
- **React 19.2.4** - Librería UI
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos
- **ESLint 9** - Linting

## 📦 Dependencias

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/oscarvargascaldas/olive-web.git
cd olive-web

# Instalar dependencias
npm install
```

### Desarrollo

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Build para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
olive-web/
├── app/
│   ├── components/
│   │   ├── Button.tsx          # Botón reutilizable
│   │   ├── Modal.tsx           # Modal base
│   │   ├── BuyModal.tsx        # Modal de compra
│   │   └── Toast.tsx           # Notificaciones
│   ├── page.tsx                # Página principal
│   ├── layout.tsx              # Layout raíz
│   └── globals.css             # Estilos globales
├── public/                     # Assets estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── README.md
```

## 🎨 Componentes Principales

### Button (`app/components/Button.tsx`)
Botón reutilizable con variantes y estados

```tsx
<Button 
  variant="primary" 
  onClick={handleClick}
  loading={isLoading}
>
  Comprar
</Button>
```

### BuyModal (`app/components/BuyModal.tsx`)
Modal interactivo para seleccionar y comprar productos

### Toast (`app/components/Toast.tsx`)
Notificaciones con auto-cierre

```tsx
addToast('¡Compra completada!', 'success');
```

## 🎯 Secciones Disponibles

1. **Hero** - Presentación principal
2. **Nosotros** - Información sobre el producto
3. **Colección** - Productos disponibles
4. **Proceso** - Cómo hacemos nuestro aceite
5. **Beneficios** - Ventajas del producto

## ✨ Características Interactivas

### Navegación Funcional
- Scroll suave a secciones
- Botones de navegación conectados
- Notificaciones de acción

### Modal de Compra
- Selección de 3 productos
- Estados de carga
- Confirmación de compra

### Retroalimentación Visual
- Hover effects
- Animaciones suaves
- Sistema de toasts

## 📱 Responsividad

- **Mobile First** - Optimizado para dispositivos pequeños
- **Breakpoints** - md (768px) y superiores
- **Flexbox y Grid** - Layouts modernos

## 🔍 SEO

- Metadatos optimizados
- Lenguaje español configurado
- Estructura semántica
- Open Graph integrado

## 🚀 Deploy con Vercel

1. Conecta tu repositorio a Vercel
2. Vercel detectará Next.js automáticamente
3. Click en "Deploy"

Ver sitio en vivo: [https://olive-web-one.vercel.app](https://olive-web-one.vercel.app)

## 📄 Licencia

Este proyecto es privado y pertenece a Oscar Vargas Caldas.

## 🤝 Contribuciones

Para reportar bugs o sugerir mejoras, abre un issue en GitHub.

## 📞 Contacto

- Email: oscarvargascaldas@gmail.com
- GitHub: [@oscarvargascaldas](https://github.com/oscarvargascaldas)

---

**O'live** - Tradición que perdura 🫒
