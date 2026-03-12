import React from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 animate-scale-in">
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl shadow-amber-500/5 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-800/80">
            <h2 className="text-xl font-semibold text-amber-50">{title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-amber-400 transition-all duration-300 rounded-lg hover:bg-amber-500/10 hover:rotate-90"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
