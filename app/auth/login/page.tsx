'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/app/components/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (result?.error) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    window.location.href = '/';
  }

  return (
    <main className="min-h-screen bg-[#f5f1ea] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">
        <Link href="/" className="text-sm text-[#6d6458] hover:text-[#202015]">← Volver a O&apos;live</Link>
        <h1 className="text-4xl font-serif text-[#2a261f] mt-6 mb-2">Bienvenido</h1>
        <p className="text-[#6d6458] mb-8">Ingresa para guardar tu carrito y consultar tus pedidos.</p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
        <label className="block text-sm mb-2" htmlFor="email">Correo electrónico</label>
        <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full mb-5 px-4 py-3 rounded-lg border border-[#d4c4b0]" />
        <label className="block text-sm mb-2" htmlFor="password">Contraseña</label>
        <input id="password" type="password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full mb-6 px-4 py-3 rounded-lg border border-[#d4c4b0]" />
        <Button type="submit" loading={loading} className="w-full">{loading ? 'Ingresando...' : 'Iniciar sesión'}</Button>
        <p className="text-center text-sm text-[#6d6458] mt-6">
          ¿Aún no tienes cuenta? <Link href="/auth/register" className="underline text-[#202015]">Crear cuenta</Link>
        </p>
      </form>
    </main>
  );
}
