# 🚀 Guía de Configuración Completa - O'live Web

## 📋 Tabla de Contenidos
1. [Instalación Local](#instalación-local)
2. [Configurar Variables de Entorno](#configurar-variables-de-entorno)
3. [Usar ContactForm](#usar-contactform)
4. [Deploy en Vercel](#deploy-en-vercel)

---

## 🔧 Instalación Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/oscarvargascaldas/olive-web.git
cd olive-web
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear archivo `.env.local`
En la **raíz del proyecto** (al lado de `package.json`), crea el archivo `.env.local`:

```bash
touch .env.local
```

---

## 📧 Configurar Variables de Entorno

### Opción A: Email (Gmail)
1. Abre tu `.env.local`
2. Añade tu correo:
```bash
NEXT_PUBLIC_CONTACT_EMAIL=tu-correo@gmail.com
```

### Opción B: WhatsApp (Obtener Phone Number)

#### Con Twilio (Fácil, Recomendado)
1. Ve a https://www.twilio.com
2. Crea una cuenta gratuita
3. En Dashboard > Messaging > Whatsapp > Sandbox
4. Copia el número: `+1415XXX`
5. En `.env.local`:
```bash
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+1415XXXXXXX
```

#### Con Meta Business (Para producción)
1. Ve a https://developers.facebook.com
2. Crea app de WhatsApp Business
3. Obtén tu Phone Number ID
4. En `.env.local`:
```bash
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+51987654321
NEXT_PUBLIC_WHATSAPP_API_KEY=tu_access_token_aqui
```

### Configuración Completa en `.env.local`:
```bash
# Email
NEXT_PUBLIC_CONTACT_EMAIL=oscarvargascaldas@gmail.com

# WhatsApp (Perú, ejemplo)
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+51987654321
NEXT_PUBLIC_WHATSAPP_API_KEY=tu_api_key_aqui

# API (opcional)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# MongoDB y autenticación (necesarias para cuentas, carrito persistente y pedidos)
MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/olive
NEXTAUTH_SECRET=genera-un-secreto-largo-y-aleatorio
NEXTAUTH_URL=http://localhost:3000
```

### Preparar MongoDB

1. Crea un proyecto y un cluster gratuito en [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Crea un usuario de base de datos y permite el acceso desde tu IP durante desarrollo.
3. Copia la cadena de conexión en `MONGODB_URI` y reemplaza los valores entre `< >`.
4. Genera `NEXTAUTH_SECRET` con un gestor de secretos; nunca lo publiques ni lo prefijes con `NEXT_PUBLIC_`.
5. Reinicia `npm run dev` después de modificar `.env.local`.

El esquema crea automáticamente las colecciones `users`, `carts` y `orders` cuando se registra el primer usuario. Los precios válidos se mantienen en `lib/products.ts` y el servidor los valida antes de guardar el carrito.

---

## 📝 Usar ContactForm

### En tu página (page.tsx):
```typescript
'use client';

import ContactForm from './components/ContactForm';
import { useState } from 'react';

export default function OliveLanding() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  return (
    <main>
      {/* ... otras secciones ... */}

      {/* CONTACT SECTION */}
      <section id="contact" className="py-32 px-6 md:px-10 bg-[#ece4d8]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl leading-tight font-serif text-[#2a261f] mb-6">
            ¿Preguntas?
          </h2>
          <p className="text-xl text-[#554d43] mb-8">
            Contáctanos para conocer más sobre O'live
          </p>
          
          {/* Aquí va el formulario */}
          <ContactForm 
            onSuccess={() => addToast('¡Mensaje enviado correctamente!', 'success')}
          />
        </div>
      </section>

      {/* TOASTS */}
      <Toast toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </main>
  );
}
```

### ¿Qué hace el ContactForm?
- ✅ **Campo Nombre** - Para identificar al cliente
- ✅ **Campo Email** - Para que te contesten
- ✅ **Campo Mensaje** - Texto del mensaje
- ✅ **Botón Email** - Abre el cliente de correo del usuario
- ✅ **Botón WhatsApp** - Abre WhatsApp Web con el número configurado

---

## 🚀 Ejecutar Localmente

```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

**Prueba:**
1. Scrollea hasta "Contacto"
2. Completa el formulario
3. Haz click en "Enviar por Email" o "WhatsApp"

---

## 🌐 Deploy en Vercel

### 1. Conectar repositorio
1. Ve a https://vercel.com
2. Click en "Import Project"
3. Selecciona tu repositorio `olive-web`

### 2. Agregar Variables de Entorno
1. En Vercel, ve a **Settings > Environment Variables**
2. Añade las 3 variables:
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER`
   - `NEXT_PUBLIC_WHATSAPP_API_KEY`
   - `MONGODB_URI`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (la URL pública de Vercel)

### 3. Deploy
1. Click en **Deploy**
2. Espera a que se complete (2-3 minutos)
3. Tu sitio está en vivo 🎉

---

## 📱 Componentes Disponibles

### Button.tsx
```typescript
<Button 
  variant="primary" | "secondary"
  onClick={() => {}}
  disabled={false}
  loading={false}
>
  Texto del botón
</Button>
```

### Modal.tsx
```typescript
<Modal 
  isOpen={boolean}
  onClose={() => {}}
  title="Título"
>
  Contenido
</Modal>
```

### Toast.tsx
```typescript
<Toast 
  toasts={[{ id: '1', message: 'Mensaje', type: 'success' }]}
  onRemove={(id) => {}}
/>
```

### ContactForm.tsx
```typescript
<ContactForm 
  onSuccess={() => console.log('Formulario enviado')}
/>
```

### BuyModal.tsx
```typescript
<BuyModal
  isOpen={boolean}
  onClose={() => {}}
  onConfirm={(productId) => {}}
/>
```

---

## 🔒 Seguridad

### ✅ Variables públicas (seguras)
```bash
NEXT_PUBLIC_CONTACT_EMAIL=correo@gmail.com
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER=+51987654321
```

### ❌ Variables privadas (NO públicas)
Si tienes un backend que procesa pagos o datos sensibles, usa variables sin `NEXT_PUBLIC_`:
```bash
# En servidor solo
API_SECRET_KEY=xxxx
DATABASE_URL=xxxx
```

---

## 🐛 Troubleshooting

### "Environment variables not found"
- ✅ Asegúrate que `.env.local` está en la **raíz** del proyecto
- ✅ Reinicia el servidor: `npm run dev`

### "WhatsApp no abre"
- ✅ Verifica que `NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER` incluya el `+`
- ✅ Formato correcto: `+51987654321` (Perú)

### "Email no se abre"
- ✅ Verifica que `NEXT_PUBLIC_CONTACT_EMAIL` es válido
- ✅ Prueba en navegador diferente

---

## 📞 Soporte

¿Problemas? Contacta con:
- **Email:** oscarvargascaldas@gmail.com
- **GitHub:** https://github.com/oscarvargascaldas

---

**O'live** - Tradición que perdura 🫒
