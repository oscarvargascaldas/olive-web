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
  const [loading, setLoading] = useState(false);

  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER;

  const handleEmailClick = () => {
    if (!contactEmail) {
      alert('Email no configurado');
      return;
    }
    const subject = `Consulta de ${name || 'Cliente'}`;
    const body = `Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleWhatsAppClick = () => {
    if (!whatsappPhone) {
      alert('WhatsApp no configurado');
      return;
    }
    const text = `Hola, soy ${name}. ${message}`;
    window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setName('');
      setEmail('');
      setMessage('');
      onSuccess?.();
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Tu nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-[#d4c4b0] bg-white focus:outline-none focus:border-[#202015]"
      />

      <input
        type="email"
        placeholder="Tu correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-lg border border-[#d4c4b0] bg-white focus:outline-none focus:border-[#202015]"
      />

      <textarea
        placeholder="Tu mensaje"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-[#d4c4b0] bg-white focus:outline-none focus:border-[#202015]"
      ></textarea>

      <div className="flex gap-3 flex-wrap">
        <Button type="button" onClick={handleEmailClick} className="flex-1">
          📧 Enviar por Email
        </Button>

        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleWhatsAppClick}
          className="flex-1"
        >
          💬 WhatsApp
        </Button>
      </div>
    </form>
  );
}
