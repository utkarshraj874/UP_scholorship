import React from 'react';
import { GraduationCap, User, FileText, BookOpen, LogOut, LogIn, ShieldCheck } from 'lucide-react';

export default function Navbar({ user, activeTab, setActiveTab, onOpenAuth, onLogout }) {
  return (
    <header
      style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        borderBottom: '1px solid #1e293b',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)',
            }}
          >
            <GraduationCap size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  letterSpacing: '0.01em',
                  color: '#ffffff',
                }}
              >
                IIIT RANCHI
              </span>
              <span
                style={{
                  backgroundColor: '#1e3a8a',
                  color: '#93c5fd',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 9999,
                  border: '1px solid #3b82f6',
                }}
              >
                UP SCHOLARSHIP
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 1 }}>
              Student Facilitation & Form Fill-up Portal (Outside State Scheme)
            </p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: '#1e293b',
                  padding: '6px 14px',
                  borderRadius: 8,
                  border: '1px solid #334155',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    backgroundColor: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc' }}>
                    {user.name || 'Student'}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                    {user.email}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="btn btn-secondary"
                style={{
                  padding: '7px 12px',
                  fontSize: '0.8rem',
                  backgroundColor: '#334155',
                  color: '#f8fafc',
                  border: '1px solid #475569',
                }}
                title="Logout"
              >
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.86rem' }}
            >
              <LogIn size={16} />
              <span>Login / Register</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div
        style={{
          borderTop: '1px solid #1e293b',
          backgroundColor: '#0b1120',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
          }}
        >
          <button
            onClick={() => setActiveTab('profile')}
            style={{
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'profile' ? '#60a5fa' : '#94a3b8',
              borderBottom: activeTab === 'profile' ? '2.5px solid #3b82f6' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <User size={16} />
            <span>Student Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            style={{
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'documents' ? '#60a5fa' : '#94a3b8',
              borderBottom: activeTab === 'documents' ? '2.5px solid #3b82f6' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <FileText size={16} />
            <span>Document Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            style={{
              padding: '12px 18px',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: 'none',
              background: 'transparent',
              color: activeTab === 'guide' ? '#60a5fa' : '#94a3b8',
              borderBottom: activeTab === 'guide' ? '2.5px solid #3b82f6' : '2.5px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <BookOpen size={16} />
            <span>Form Guidelines & Coordinator Notes</span>
          </button>
        </div>
      </div>
    </header>
  );
}
