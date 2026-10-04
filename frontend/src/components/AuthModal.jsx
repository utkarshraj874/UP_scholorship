import React, { useState } from 'react';
import { X, Lock, Mail, User, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!formData.name.trim()) throw new Error('Please enter your full name');
        if (!formData.email.trim()) throw new Error('Please enter your email');
        if (!formData.password || formData.password.length < 6)
          throw new Error('Password must be at least 6 characters');

        await api.register(formData.name, formData.email, formData.password);
        // After registration, auto-login
        const loginRes = await api.login(formData.email, formData.password);
        localStorage.setItem('scholarship_token', loginRes.access_token);
        onAuthSuccess(loginRes.user || { email: formData.email, name: formData.name });
      } else {
        if (!formData.email.trim() || !formData.password)
          throw new Error('Please enter email and password');

        const loginRes = await api.login(formData.email, formData.password);
        localStorage.setItem('scholarship_token', loginRes.access_token);
        onAuthSuccess(loginRes.user || { email: formData.email });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email, password) => {
    setFormData({ name: '', email, password });
    setIsRegister(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a' }}>
              {isRegister ? 'Register Student Account' : 'Login to UP Scholarship Portal'}
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 2 }}>
              {isRegister
                ? 'Create your account to manage your profile and upload documents'
                : 'Enter your credentials to access your UP Scholarship dashboard'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: 4,
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {isRegister && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    color="#94a3b8"
                    style={{ position: 'absolute', left: 12, top: 12 }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: 38 }}
                    placeholder="e.g. Priya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={16}
                  color="#94a3b8"
                  style={{ position: 'absolute', left: 12, top: 12 }}
                />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: 38 }}
                  placeholder="e.g. priya.iiitr@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={16}
                  color="#94a3b8"
                  style={{ position: 'absolute', left: 12, top: 12 }}
                />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: 38 }}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Quick Demo Credentials */}
            {!isRegister && (
              <div
                style={{
                  marginTop: 18,
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                  Quick Fill Test Credentials:
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('priya.iiitr@gmail.com', 'StrongPassword@123')}
                    style={{
                      fontSize: '0.75rem',
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      cursor: 'pointer',
                      color: '#2563eb',
                      fontWeight: 600,
                    }}
                  >
                    Use: priya.iiitr@gmail.com
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#2563eb',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              <span>{loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
