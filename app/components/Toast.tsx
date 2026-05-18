import React, { useState } from 'react';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'error' | 'info';
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  const getStyle = (type: string) => {
    const baseStyle = 'px-4 py-3 rounded-lg shadow-lg text-white text-sm';
    switch (type) {
      case 'success':
        return `${baseStyle} bg-green-500`;
      case 'error':
        return `${baseStyle} bg-red-500`;
      case 'info':
        return `${baseStyle} bg-blue-500`;
      default:
        return baseStyle;
    }
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-[999] space-y-3">
        {toasts.map((toast) => (
          <div key={toast.id} className={`${getStyle(toast.type)} animate-slide-up`}>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{getIcon(toast.type)}</span>
              <span>{toast.text}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Expose addToast globally */}
      {typeof window !== 'undefined' && (window as any).addToast && null}
    </>
  );
}

export function useToast() {
  const [, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    const newToast: ToastMessage = { id, text, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { addToast };
}
