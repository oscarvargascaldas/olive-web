import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'px-8 py-4 rounded-full uppercase tracking-[0.2em] text-sm transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-[#202015] text-white hover:scale-105 shadow-xl hover:shadow-2xl',
    secondary: 'border border-[#2a261f] hover:bg-[#2a261f] hover:text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <span className="flex items-center justify-center gap-2">
        {loading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
        )}
        {children}
      </span>
    </button>
  );
}
