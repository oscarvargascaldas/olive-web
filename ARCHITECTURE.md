# 🛒 Arquitectura Carrito + Usuarios + Base de Datos

## 📊 Análisis de Opciones

### Opción 1: Next.js + MongoDB (RECOMENDADO PARA PRINCIPIANTES)
```
Ventajas:
✅ Muy fácil de configurar
✅ No necesitas servidor separado
✅ Base de datos en la nube (Atlas - gratis)
✅ Gratuito y escalable
✅ Integración perfecta con Next.js

Desventajas:
❌ NoSQL (menos relacional)
```

### Opción 2: Next.js + PostgreSQL (RECOMENDADO PARA PRODUCCIÓN)
```
Ventajas:
✅ SQL relacional (mejor para usuarios + carrito)
✅ Más seguro y profesional
✅ Mejor para consultas complejas
✅ Gratuito con Railway/Render

Desventajas:
❌ Un poco más complejo
```

### Opción 3: XAMPP (Tu sugerencia)
```
Ventajas:
✅ Local en tu máquina
✅ Gratis
✅ Fácil de instalar

Desventajas:
❌ Necesitas backend separado (PHP/Node)
❌ No funciona en Vercel directamente
❌ Más complejidad
```

---

## 🏆 MI RECOMENDACIÓN: Next.js + MongoDB + NextAuth

### ¿Por qué esta arquitectura?

1. **Frontend + Backend en una app** (Next.js)
2. **Base de datos gratis en la nube** (MongoDB Atlas)
3. **Autenticación incorporada** (NextAuth)
4. **API REST automática** (Next.js API Routes)
5. **Deploy fácil en Vercel** (Sin costo)

---

## 🚀 Plan de Implementación

### Fase 1: Setup Base de Datos (15 min)
```bash
1. Crear cuenta en MongoDB Atlas (gratuito)
2. Crear cluster y obtener CONNECTION_STRING
3. Configurar en .env.local
```

### Fase 2: Autenticación de Usuarios (30 min)
```bash
1. Instalar NextAuth
2. Crear rutas API de autenticación
3. Crear página de login/registro
4. Proteger rutas con sesión
```

### Fase 3: Modelo de Datos (20 min)
```typescript
// Usuario
{
  id: ObjectId
  email: string
  password: string (hash)
  nombre: string
  createdAt: date
}

// Carrito
{
  id: ObjectId
  userId: ObjectId (relación)
  items: [
    {
      productId: string
      nombre: string
      precio: number
      cantidad: number
    }
  ]
  total: number
  createdAt: date
}

// Órdenes
{
  id: ObjectId
  userId: ObjectId
  items: array
  total: number
  estado: 'pending' | 'paid' | 'shipped'
  createdAt: date
}
```

### Fase 4: Componentes del Carrito (1 hora)
```typescript
✅ ShoppingCart.tsx    - Vista del carrito
✅ CartItem.tsx        - Item individual
✅ LoginForm.tsx       - Registro/Login
✅ ProfilePage.tsx     - Perfil del usuario
✅ OrderHistory.tsx    - Historial de compras
```

### Fase 5: API Routes (45 min)
```bash
/api/auth/[...nextauth]  - Autenticación
/api/cart                - Obtener/actualizar carrito
/api/cart/add            - Agregar al carrito
/api/cart/remove         - Quitar del carrito
/api/orders              - Crear orden
/api/orders/history      - Historial
```

---

## 📦 Stack Recomendado

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "mongodb": "^6.0",
    "mongoose": "^8.0",
    "next-auth": "^4.24",
    "bcryptjs": "^2.4.3"
  }
}
```

---

## 🔐 Flujo de Usuario

```
1. Usuario entra a la app
   ↓
2. Hace click en "Registrarse"
   ↓
3. Llena formulario (email, contraseña, nombre)
   ↓
4. Se guarda en MongoDB (contraseña hasheada)
   ↓
5. Inicia sesión con NextAuth
   ↓
6. Puede agregar productos al carrito
   ↓
7. Carrito se guarda en BD (vinculado a userId)
   ↓
8. Puede ver historial de compras
   ↓
9. Puede cerrar sesión
```

---

## 💾 Alternativa con XAMPP (Si insistes)

Si quieres usar XAMPP localmente:

```
1. XAMPP (PHP + MySQL)
2. Crear API REST en PHP
3. Next.js consume esa API
4. Base de datos en localhost

Problemas:
- No funciona en Vercel (production)
- Necesitas servidor separado
- Más mantenimiento
```

**Recomendación:** Usa MongoDB para development y cuando se lance, migra a PostgreSQL si necesitas mayor seguridad.

---

## ✅ Pasos Iniciales

### 1. Crear cuenta MongoDB Atlas
```
1. Ve a https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Completa datos
4. Crea un cluster (Free Tier)
5. Obtén CONNECTION_STRING
```

### 2. Instalar dependencias
```bash
npm install mongodb mongoose next-auth bcryptjs
```

### 3. Configurar .env.local
```bash
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/olive
NEXTAUTH_SECRET=random_secret_key_aqui
NEXTAUTH_URL=http://localhost:3000
```

### 4. Crear archivo models/User.ts
```typescript
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('User', userSchema);
```

---

## 📈 Escala de Complejidad

```
Fácil (Hoy):      MongoDB + Next.js + NextAuth
Medio (Semana):   Agregar carrito + órdenes
Difícil (Mes):    Pagos (Stripe/PayPal)
Experto (2 meses): Admin panel + reportes
```

---

## 🎯 Mi Recomendación Final

**USARÉ: MongoDB + NextAuth + Next.js**

```
✅ Rápido de implementar
✅ Gratuito
✅ Escalable
✅ Funciona en Vercel
✅ Perfecto para e-commerce pequeño
✅ Fácil de mantener
```

¿Continuamos con esta opción? 🚀
