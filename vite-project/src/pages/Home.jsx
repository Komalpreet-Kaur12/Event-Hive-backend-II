import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, getUsers, getRegistrations } from '../api/api';

export default function Home() {
  const [stats, setStats] = useState({ events: 0, users: 0, registrations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [evRes, usRes, rgRes] = await Promise.all([getEvents(), getUsers(), getRegistrations()]);
        setStats({
          events: evRes.data.length,
          users: usRes.data.length,
          registrations: rgRes.data.length,
        });
      } catch {
        /* backend may not be running */
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Events', value: stats.events, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', to: '/events' },
    { label: 'Total Users', value: stats.users, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197', to: '/users' },
    { label: 'Registrations', value: stats.registrations, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', to: '/registrations' },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">

      {/* ── Floating decorative orbs ── */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl animate-orb pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-orb pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/3 rounded-full blur-3xl animate-orb pointer-events-none" style={{ animationDelay: '5s' }} />

      {/* ── Hero Section ── */}
      <div className="relative text-center mb-20 animate-fade-in-up">
        {/* Decorative sparkle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-px h-16 bg-gradient-to-b from-amber-400/60 to-transparent" />

        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 animate-border-glow">
          <span className="text-amber-400 text-sm font-medium">Your Event Management Hub</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
            Event Hive
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Manage events, users, and registrations from one sleek dashboard.
          Create, update, and organise everything in one place.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            to="/events"
            className="btn-golden px-7 py-3.5 rounded-xl text-sm tracking-wide shadow-lg animate-pulse-glow"
          >
            Browse Events
          </Link>
          <Link
            to="/users"
            className="px-7 py-3.5 rounded-xl bg-gray-800/80 text-amber-200/80 font-semibold border border-amber-500/20 hover:border-amber-500/40 hover:bg-gray-800 hover:text-amber-100 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/10"
          >
            View Users
          </Link>
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <Link
            key={card.label}
            to={card.to}
            className="card-hover group relative overflow-hidden rounded-2xl bg-gray-900/80 border border-gray-800 p-7 animate-fade-in-up"
            style={{ animationDelay: `${0.5 + i * 0.15}s` }}
          >
            {/* Corner glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-yellow-500/20 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-500 group-hover:scale-110">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                </svg>
              </div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{card.label}</p>
              <p className="text-4xl font-bold text-white mt-2 group-hover:text-amber-50 transition-colors duration-300">
                {loading ? (
                  <span className="inline-block w-10 h-8 bg-gray-800 rounded animate-pulse" />
                ) : card.value}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/30 transition-all duration-700" />
          </Link>
        ))}
      </div>
    </div>
  );
}
