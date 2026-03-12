import React, { useEffect, useState } from 'react';
import * as api from '../api/api';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const emptyForm = { name: '', email: '', password: '', role: 'user' };

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      const { data } = await api.getUsers();
      setUsers(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openCreate = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };

  const openEdit = (u) => {
    setEditing(u._id);
    setForm({ name: u.name, email: u.email, password: '', role: u.role || 'user' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form };
      if (editing && !payload.password) delete payload.password;
      if (editing) {
        await api.updateUser(editing, payload);
      } else {
        await api.createUser(payload);
      }
      setModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await api.deleteUser(id);
      fetchUsers();
    } catch {
      alert('Failed to delete');
    }
  };

  const roleBadge = (role) => {
    const styles = role === 'owner'
      ? 'bg-amber-500/15 text-amber-400 border-amber-500/25'
      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>{role}</span>;
  };

  if (loading) return <LoadingSpinner />;

  const inputCls = "w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 input-golden";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <p className="text-gray-500 mt-1">Manage platform users</p>
        </div>
        <button onClick={openCreate} className="btn-golden px-5 py-2.5 rounded-xl text-sm shadow-lg">
          + New User
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-24 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 flex items-center justify-center animate-float">
            <svg className="w-8 h-8 text-amber-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-lg text-gray-500">No users yet. Create the first user!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u, i) => (
            <div
              key={u._id}
              className="card-hover group relative bg-gray-900/80 border border-gray-800 rounded-2xl p-6 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-700" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-gray-950 font-bold text-lg shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-500 group-hover:scale-110">
                    {u.name?.charAt(0)?.toUpperCase() || '?'}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-white truncate group-hover:text-amber-50 transition-colors duration-300">{u.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{u.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {roleBadge(u.role || 'user')}
                </div>

                <div className="flex gap-2 mt-5 pt-4 border-t border-gray-800/60">
                  <button onClick={() => openEdit(u)} className="flex-1 px-3 py-2 rounded-lg bg-gray-800/80 text-gray-300 text-sm font-medium hover:bg-amber-500/10 hover:text-amber-400 transition-all duration-300 hover:scale-[1.02]">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(u._id)} className="flex-1 px-3 py-2 rounded-lg bg-red-500/8 text-red-400 text-sm font-medium hover:bg-red-500/15 transition-all duration-300 hover:scale-[1.02]">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit User' : 'Create User'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls} placeholder="Full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls} placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Password {editing && <span className="text-gray-500">(leave blank to keep current)</span>}
            </label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
              {...(!editing && { required: true })}
              className={inputCls} placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
              className={inputCls}>
              <option value="user">User</option>
              <option value="owner">Owner</option>
            </select>
          </div>
          <button type="submit" disabled={submitting}
            className="w-full py-3 rounded-xl btn-golden text-sm shadow-lg mt-2">
            {submitting ? 'Saving...' : editing ? 'Update User' : 'Create User'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
