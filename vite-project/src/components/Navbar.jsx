import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/users', label: 'Users' },
  { to: '/registrations', label: 'Registrations' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-xl border-b border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-500 group-hover:scale-110">
              <svg className="w-5 h-5 text-gray-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent animate-text-glow">
              Event Hive
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link key={link.to} to={link.to} className="relative px-4 py-2 rounded-lg text-sm font-medium group">
                  <span className={`relative z-10 transition-colors duration-300 ${
                    isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-amber-300'
                  }`}>
                    {link.label}
                  </span>
                  <span className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-amber-500/10' : 'bg-transparent group-hover:bg-amber-500/5'
                  }`} />
                  <span className={`absolute bottom-0.5 left-1/2 h-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-500 ease-out ${
                    isActive ? 'w-6 -translate-x-1/2' : 'w-0 -translate-x-1/2 group-hover:w-4'
                  }`} />
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-amber-400 rounded-lg hover:bg-amber-500/10 transition-all duration-300"
          >
            <svg className={`w-6 h-6 transition-transform duration-300 ${mobileOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-slide-down">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 animate-fade-in-up ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border-l-2 border-amber-400'
                      : 'text-gray-400 hover:text-amber-300 hover:bg-amber-500/5'
                  }`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
