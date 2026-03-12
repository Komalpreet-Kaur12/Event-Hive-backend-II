import React, { useEffect, useState } from 'react';
import * as api from '../api/api';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const emptyForm = { title: '', description: '', date: '', maxParticipants: '', registrationDeadline: '' };

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data } = await api.getEvents();
      setEvents(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (ev) => {
    setEditing(ev._id);
    setForm({
      title: ev.title,
      description: ev.description,
      date: ev.date ? ev.date.slice(0, 16) : '',
      maxParticipants: ev.maxParticipants,
      registrationDeadline: ev.registrationDeadline ? ev.registrationDeadline.slice(0, 16) : '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await api.updateEvent(editing, form);
      } else {
        await api.createEvent(form);
      }
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await api.deleteEvent(id);
      fetchEvents();
    } catch {
      alert('Failed to delete');
    }
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—';

  if (loading) return <LoadingSpinner />;

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 input-golden";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <p className="text-gray-500 mt-1">Manage all your events</p>
        </div>
        <button onClick={openCreate} className="btn-golden px-5 py-2.5 rounded-xl text-sm shadow-lg">
          + New Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-24 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 flex items-center justify-center animate-float">
            <svg className="w-8 h-8 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-lg text-gray-500">No events yet. Create your first event!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((ev, i) => (
            <div
              key={ev._id}
              className="card-hover group relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-700" />

              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white truncate pr-2 group-hover:text-amber-50 transition-colors duration-300">{ev.title}</h3>
                  <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20">
                    {ev.maxParticipants} max
                  </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{ev.description}</p>

                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>Event: {fmt(ev.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Deadline: {fmt(ev.registrationDeadline)}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-5 pt-4 border-t border-gray-800/60">
                  <button onClick={() => openEdit(ev)} className="flex-1 px-3 py-2 rounded-lg bg-gray-800/80 text-gray-300 text-sm font-medium hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300 hover:scale-[1.02]">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(ev._id)} className="flex-1 px-3 py-2 rounded-lg bg-red-500/8 text-red-400 text-sm font-medium hover:bg-red-500/15 transition-all duration-300 hover:scale-[1.02]">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Event' : 'Create Event'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls} placeholder="Event title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Description</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={`${inputCls} resize-none`} placeholder="Describe the event" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Event Date</label>
              <input required type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inputCls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Max Participants</label>
              <input required type="number" min="1" value={form.maxParticipants} onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })}
                className={inputCls} placeholder="100" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Registration Deadline</label>
            <input required type="datetime-local" value={form.registrationDeadline} onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
              className={inputCls} />
          </div>
          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-xl btn-golden text-sm shadow-lg mt-2">
            {submitting ? 'Saving...' : editing ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
