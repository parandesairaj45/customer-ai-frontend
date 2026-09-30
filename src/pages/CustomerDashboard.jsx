import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { PlusCircle, LogOut, RotateCcw, AlertCircle, Clock, Tag, Flame } from 'lucide-react';

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
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#ff5e00]/15 text-[#ff7e26] border border-[#ff5e00]/30">
            Resolved
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#ff007f]/15 text-[#ff2a96] border border-[#ff007f]/30">
            In Progress
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#e50914]/15 text-[#ff3344] border border-[#e50914]/30">
            Open
          </span>
        );
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'urgent':
        return 'bg-[#e50914]/20 text-[#ff3344] border-[#e50914]/40';
      case 'high':
        return 'bg-[#ff5e00]/20 text-[#ff7e26] border-[#ff5e00]/40';
      case 'medium':
        return 'bg-[#ff9440]/15 text-[#ff9440] border-[#ff9440]/30';
      default:
        return 'bg-[#ff007f]/15 text-[#ff2a96] border-[#ff007f]/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#070508] text-[#fbebee] flex flex-col">
      {/* Top Header */}
      <header className="w-full bg-[#0d070b] border-b border-[#ff5e00]/15 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#e50914] via-[#ff5e00] to-[#ff007f] flex items-center justify-center shadow-[0_0_12px_rgba(255,0,127,0.4)]">
              <Flame size={18} color="#fff" />
            </div>
            <span className="font-display font-bold text-lg text-white">ResoX AI</span>
            <span className="text-xs font-mono text-[#ff7e26] ml-2">Customer Portal</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#c9b1b8]">
              Logged in as <strong className="text-white">{user?.name || 'Customer'}</strong>
            </span>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-xs text-[#826c74] hover:text-[#ff3344] flex items-center gap-1.5 transition-colors"
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">
              Welcome, {user?.name || 'Customer'}
            </h1>
            <p className="text-sm text-[#c9b1b8]">
              Manage and track your submitted support complaints
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTickets}
              className="px-3 py-2 rounded-lg bg-[#140810] border border-[#ff5e00]/20 text-[#c9b1b8] hover:text-white text-xs flex items-center gap-1.5 transition-all"
              title="Refresh tickets"
            >
              <RotateCcw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => navigate('/customer/request')}
              className="btn-futuristic py-2 px-4 text-xs font-semibold flex items-center gap-2"
            >
              <PlusCircle size={15} />
              <span>Create Ticket</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#e50914]/15 border border-[#e50914]/30 text-[#ff3344] text-sm mb-6">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tickets List */}
        {loading ? (
          <div className="p-12 text-center text-[#c9b1b8] border border-[#ff5e00]/15 rounded-xl bg-[#0f070c]">
            <div className="w-7 h-7 rounded-full border-2 border-[#ff007f] border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono">Loading your tickets from backend...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="p-12 text-center border border-[#ff5e00]/20 rounded-2xl bg-[#0d060a]">
            <h3 className="font-display text-lg font-bold text-white mb-2">No tickets found</h3>
            <p className="text-sm text-[#c9b1b8] max-w-sm mx-auto mb-6">
              You haven't submitted any complaints yet. Click below to create your first ticket.
            </p>
            <button
              onClick={() => navigate('/customer/request')}
              className="btn-futuristic text-xs py-2.5 px-5 inline-flex items-center gap-2"
            >
              <PlusCircle size={14} />
              <span>Create Ticket</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-5 rounded-xl bg-[#0e070c] border border-[#ff5e00]/20 hover:border-[#ff007f]/40 transition-all flex flex-col gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Header line */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(ticket.status)}
                    <span className="text-xs font-mono text-[#ff7e26] px-2 py-0.5 rounded bg-[#ff5e00]/10 border border-[#ff5e00]/20">
                      {ticket.sector}
                    </span>
                    {ticket.ai_priority && (
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase font-bold border ${getPriorityBadge(ticket.ai_priority)}`}>
                        {ticket.ai_priority}
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-[#826c74] font-mono flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* AI Summary or Title */}
                <h3 className="font-display text-base font-bold text-white">
                  {ticket.ai_summary || ticket.issue_description}
                </h3>

                {/* Complaint text */}
                <p className="text-xs text-[#c9b1b8] leading-relaxed line-clamp-2">
                  {ticket.issue_description}
                </p>

                {/* AI Category & Action (if generated) */}
                {(ticket.ai_category || ticket.ai_recommended_action) && (
                  <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    {ticket.ai_category && (
                      <span className="text-[#ff7e26] flex items-center gap-1 font-mono">
                        <Tag size={12} />
                        Category: {ticket.ai_category}
                      </span>
                    )}
                    {ticket.ai_sentiment && (
                      <span className="text-[#ff2a96] font-mono">
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
