import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-amber-500/20 animate-pulse-glow" />
        <div className="w-12 h-12 border-4 border-gray-800 border-t-amber-400 rounded-full animate-spin" />
      </div>
      <p className="text-sm text-amber-400/50 animate-pulse">Loading...</p>
    </div>
  );
}
