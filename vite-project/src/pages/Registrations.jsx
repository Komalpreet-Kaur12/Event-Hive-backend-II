import React, { useEffect, useState } from 'react';
import * as api from '../api/api';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const emptyForm = { event: '', user: '', teamName: '', members: '' };

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchAll = async () => {
    try {
      const [regRes, evRes, usRes] = await Promise.all([
        api.getRegistrations(),
        api.getEvents(),
        api.getUsers(),
      ]);
      setRegistrations(regRes.data);
      setEvents(evRes.data);
      setUsers(usRes.data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (r) => {
    setEditing(r._id);
    setForm({
      event: r.event?._id || r.event || '',
      user: r.user?._id || r.user || '',
      teamName: r.teamName,
      members: Array.isArray(r.members) ? r.members.join(', ') : r.members || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        members: form.members.split(',').map((m) => m.trim()).filter(Boolean),
      };
      if (editing) {
        await api.updateRegistration(editing, payload);
      } else {
        await api.createRegistration(payload);
      }
      setModalOpen(false);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this registration?')) return;
    try {
      await api.deleteRegistration(id);
      fetchAll();
    } catch {
      alert('Failed to delete');
    }
  };

  if (loading) return <LoadingSpinner />;

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 input-golden";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white">Registrations</h1>
          <p className="text-gray-500 mt-1">Manage event registrations</p>
        </div>
        <button onClick={openCreate} className="btn-golden px-5 py-2.5 rounded-xl text-sm shadow-lg">
          + New Registration
        </button>
      </div>

      {registrations.length === 0 ? (
        <div className="text-center py-24 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 flex items-center justify-center animate-float">
            <svg className="w-8 h-8 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-lg text-gray-500">No registrations yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {registrations.map((r, i) => (
            <div
              key={r._id}
              className="card-hover group relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-700" />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-amber-50 transition-colors duration-300">{r.teamName}</h3>
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                    {r.members?.length || 0} members
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Event: <span className="text-amber-200/70">{r.event?.title || 'N/A'}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>By: <span className="text-amber-200/70">{r.user?.name || 'N/A'}</span></span>
                  </div>
                </div>

                {r.members && r.members.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {r.members.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-0.5 rounded-md bg-amber-500/8 text-amber-300/80 text-xs border border-amber-500/15 transition-all duration-300 hover:bg-amber-500/15 hover:text-amber-200">
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mt-auto pt-4 border-t border-gray-800/60">
                  <button onClick={() => openEdit(r)} className="flex-1 px-3 py-2 rounded-lg bg-gray-800/80 text-gray-300 text-sm font-medium hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300 hover:scale-[1.02]">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(r._id)} className="flex-1 px-3 py-2 rounded-lg bg-red-500/8 text-red-400 text-sm font-medium hover:bg-red-500/15 transition-all duration-300 hover:scale-[1.02]">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Registration' : 'New Registration'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Event</label>
            <select required value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })}
              className={inputCls}>
              <option value="">Select an event</option>
              {events.map((ev) => (
                <option key={ev._id} value={ev._id}>{ev.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">User</label>
            <select required value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })}
              className={inputCls}>
              <option value="">Select a user</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Team Name</label>
            <input required value={form.teamName} onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              className={inputCls} placeholder="Team name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Members <span className="text-gray-500">(comma-separated)</span></label>
            <input required value={form.members} onChange={(e) => setForm({ ...form, members: e.target.value })}
              className={inputCls} placeholder="Alice, Bob, Charlie" />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-xl btn-golden text-sm shadow-lg mt-2">
            {submitting ? 'Saving...' : editing ? 'Update Registration' : 'Register'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
