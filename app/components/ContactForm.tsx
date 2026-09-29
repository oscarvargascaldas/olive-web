'use client';

import React, { useState } from 'react';
import Button from './Button';

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER;

  const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!contactEmail) {
      setError('El correo de contacto aún no está configurado.');
      return;
    }

    const subject = `Consulta de ${name || 'Cliente'}`;
    const body = `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onSuccess?.();
  };

  const handleWhatsAppClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setError('');

    if (!whatsappPhone) {
      setError('WhatsApp aún no está configurado.');
      return;
    }

    const text = `Hola, soy ${name}. ${message}`;
    const form = event.currentTarget.form;
    if (!form?.reportValidity()) {
      return;
    }

    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleEmailSubmit} className="space-y-4 max-w-lg mx-auto text-left">
      <input
        name="name"
        type="text"
        autoComplete="name"
        aria-label="Tu nombre"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-[#d4c4b0] bg-white focus:outline-none focus:border-[#202015]"
      />

      <input
        name="email"
        type="email"
        autoComplete="email"
        aria-label="Tu correo"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-[#d4c4b0] bg-white focus:outline-none focus:border-[#202015]"
      />

      <textarea
        name="message"
        aria-label="Tu mensaje"
        placeholder="Tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-[#d4c4b0] bg-white focus:outline-none focus:border-[#202015]"
      />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3 flex-wrap">
        <Button type="submit" className="flex-1">
          📧 Enviar por correo
        </Button>

        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleWhatsAppClick}
          className="flex-1"
        >
          💬 Enviar por WhatsApp
        </Button>
      </div>
      <p className="text-xs text-[#6d6458]">
        Se abrirá tu aplicación de correo o WhatsApp con el mensaje preparado; confirma el envío allí.
      </p>
    </form>
  );
}
