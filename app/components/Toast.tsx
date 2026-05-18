'use client';

import React, { useEffect } from 'react';

interface ToastProps {
  toasts: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>;
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => onRemove(toast.id), 3000)
    );
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts, onRemove]);

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
    const baseStyle =
      'px-4 py-3 rounded-lg shadow-lg text-white text-sm flex items-center gap-2';
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
    <div className="fixed top-6 right-6 z-[999] space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getStyle(toast.type)} animate-slide-up`}
        >
          <span className="font-bold text-lg">{getIcon(toast.type)}</span>
          <span>{toast.message}</span>
          <button
            onClick={() => onRemove(toast.id)}
            className="ml-auto pl-2 hover:opacity-80"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
