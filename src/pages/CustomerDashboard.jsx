import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { PlusCircle, LogOut, RotateCcw, AlertCircle, Clock, Tag, Zap, Activity, MessageSquareHeart } from 'lucide-react';
import InstallPwaButton from '../components/InstallPwaButton';

export const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/api/tickets/my');
      if (res.data?.success) {
        setTickets(res.data.tickets || []);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login');
        return;
      }
      setError(err.response?.data?.error || 'Failed to fetch tickets from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Resolved
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[var(--purple-deep)]/25 text-[var(--purple-neon)] border border-[var(--purple-vibrant)]/35">
            In Progress
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[var(--orange-primary)]/15 text-[var(--orange-bright)] border border-[var(--orange-vibrant)]/40">
            Open
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'badge-urgent';
      case 'high':
        return 'badge-high';
      case 'medium':
        return 'badge-medium';
      default:
        return 'badge-low';
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-primary)] flex flex-col">
      {/* Top Header */}
      <header className="w-full bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border-subtle)] px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff6a00] via-[#ff7a00] to-[#ff8a1f] flex items-center justify-center shadow-[0_0_12px_rgba(255,106,0,0.5)]">
              <Zap size={16} className="text-white fill-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">ResoX AI</span>
            <span className="text-xs font-mono text-[var(--orange-bright)] ml-2 px-2.5 py-0.5 rounded-full bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/30">
              Customer Experience Portal
            </span>
          </div>

          <div className="flex items-center gap-4">
            <InstallPwaButton className="hidden sm:inline-flex" />
            <span className="text-sm text-[var(--text-secondary)]">
              Logged in as <strong className="text-white">{user?.name || 'Customer'}</strong>
            </span>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-xs text-[var(--text-muted)] hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
        {/* Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 animate-card-in">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Welcome, {user?.name || 'Customer'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              Manage and track your customer experience feedback & resolution progress
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTickets}
              className="px-3.5 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-secondary)] hover:text-white text-xs flex items-center gap-1.5 transition-all cursor-pointer hover:border-[var(--orange-vibrant)]"
              title="Refresh records"
            >
              <RotateCcw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => navigate('/customer/request')}
              className="btn-futuristic py-2 px-4 text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size={15} />
              <span>Share Experience</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-sm mb-6 animate-card-in">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tickets List */}
        {loading ? (
          <div className="p-12 text-center text-[var(--text-secondary)] border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-card)] backdrop-blur-md">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--orange-vibrant)] border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono">Loading your experience records from server...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center border border-[var(--border-card)] rounded-2xl bg-[var(--bg-card)] backdrop-blur-md animate-card-in">
            <div className="w-12 h-12 rounded-2xl bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/30 flex items-center justify-center mx-auto mb-4 text-[var(--orange-bright)]">
              <MessageSquareHeart size={24} />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">No experience records found</h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6">
              You haven't submitted any experience feedback yet. Click below to share your first experience with our AI triage engine.
            </p>
            <button
              onClick={() => navigate('/customer/request')}
              className="btn-futuristic text-xs py-2.5 px-5 inline-flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle size={14} />
              <span>Share Experience</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-card)] hover:border-[var(--orange-vibrant)]/60 transition-all flex flex-col gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.4)] backdrop-blur-md hover:-translate-y-0.5 animate-card-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header line */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(ticket.status)}
                    <span className="text-xs font-mono text-[var(--orange-bright)] px-2.5 py-0.5 rounded-full bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/30">
                      {ticket.sector}
                    </span>
                    {ticket.ai_priority && (
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${getPriorityBadge(ticket.ai_priority)}`}>
                        {ticket.ai_priority}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* AI Summary or Title */}
                <h3 className="font-display text-base font-bold text-white">
                  {ticket.ai_summary || ticket.issue_description}
                </h3>

                {/* Experience Feedback Details */}
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {ticket.issue_description}
                </p>

                {/* AI Category & Sentiment & Action */}
                {(ticket.ai_category || ticket.ai_recommended_action) && (
                  <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    {ticket.ai_category && (
                      <span className="text-[var(--orange-bright)] flex items-center gap-1 font-mono">
                        <Tag size={12} />
                        Category: {ticket.ai_category}
                      </span>
                    )}
                    {ticket.ai_sentiment && (
                      <span className="text-[var(--purple-neon)] font-mono flex items-center gap-1">
                        <Activity size={12} />
                        Sentiment: {ticket.ai_sentiment}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CustomerDashboard;
