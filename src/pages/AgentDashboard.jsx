import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { 
  Flame, 
  LogOut, 
  RotateCcw, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Clock, 
  Layers, 
  Tag, 
  Activity, 
  ChevronRight, 
  Headphones, 
  X,
  AlertCircle
} from 'lucide-react';

export const AgentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [sendingMsg, setSendingMsg] = useState(false);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tickets/all');
      if (res.data?.success) {
        setTickets(res.data.tickets || []);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const selectTicket = async (ticket) => {
    setSelectedTicket(ticket);
    try {
      const res = await api.get(`/tickets/${ticket.id}`);
      if (res.data?.success) {
        setMessages(res.data.messages || []);
      }
    } catch (err) {
      console.error('Error fetching ticket details:', err);
    }
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedTicket || statusUpdating) return;
    setStatusUpdating(true);
    try {
      const res = await api.patch(`/tickets/${selectedTicket.id}/status`, { status: newStatus });
      if (res.data?.success) {
        setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
        setTickets((prev) =>
          prev.map((t) => (t.id === selectedTicket.id ? { ...t, status: newStatus } : t))
        );
      }
    } catch (err) {
      alert('Failed to update status: ' + (err.response?.data?.error || err.message));
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket || sendingMsg) return;
    setSendingMsg(true);
    try {
      const res = await api.post(`/tickets/${selectedTicket.id}/messages`, {
        message: newMessage.trim(),
      });
      if (res.data?.success) {
        setMessages((prev) => [...prev, res.data.data]);
        setNewMessage('');
      }
    } catch (err) {
      alert('Failed to send message: ' + (err.response?.data?.error || err.message));
    } finally {
      setSendingMsg(false);
    }
  };

  const filteredTickets = tickets.filter((t) => {
    if (filter === 'all') return true;
    return t.status?.toLowerCase() === filter;
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ff5e00]/15 text-[#ff7e26] border border-[#ff5e00]/40">
            RESOLVED
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ff007f]/15 text-[#ff2a96] border border-[#ff007f]/40">
            IN PROGRESS
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#e50914]/15 text-[#ff3344] border border-[#e50914]/40">
            OPEN
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
    <div className="min-h-screen bg-[#070508] text-[#fbebee] flex flex-col relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="orb-1 pointer-events-none" />
      <div className="orb-2 pointer-events-none" />
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-40" />

      {/* Top Navbar */}
      <header className="relative z-10 w-full bg-[#0d070b]/80 backdrop-blur-md border-b border-[#ff5e00]/15 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ff5e00] to-[#ff007f] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,127,0.4)]">
              <Headphones size={20} color="#fff" />
            </div>
            <div>
              <span className="font-display font-extrabold text-lg text-white">RESOX AI</span>
              <span className="text-[11px] font-mono text-[#ff2a96] ml-2 px-2 py-0.5 rounded bg-[#ff007f]/15 border border-[#ff007f]/30">
                SUPPORT AGENT OPS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#c9b1b8] hidden sm:inline">
              Agent: <strong className="text-white">{user?.name || 'Support Agent'}</strong>
            </span>
            <button
              onClick={() => {
                logout();
                navigate('/login?role=support_agent');
              }}
              className="btn-ghost-futuristic text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col">
        {/* Dashboard Title & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
              Customer Tickets Overview
            </h1>
            <p className="text-sm text-[#c9b1b8]">
              Manage live customer complaints triage, AI recommendations, and ticket status
            </p>
          </div>

          {/* Filter Pills & Refresh */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#140810] border border-[#ff5e00]/20 text-xs font-mono">
              {['all', 'open', 'in_progress', 'resolved'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    filter === f
                      ? 'bg-gradient-to-r from-[#e50914] to-[#ff5e00] text-white font-bold'
                      : 'text-[#826c74] hover:text-[#c9b1b8]'
                  }`}
                >
                  {f.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              onClick={fetchTickets}
              className="btn-ghost-futuristic text-xs p-2"
              title="Refresh tickets"
            >
              <RotateCcw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[#e50914]/15 border border-[#e50914]/40 text-[#ff3344] text-sm mb-6">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Main Split Layout: Tickets List on Left, Ticket Details on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
          {/* Tickets Column (5 cols or full) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {loading ? (
              <div className="moving-border-card p-12 text-center text-[#c9b1b8]">
                <div className="w-8 h-8 rounded-full border-2 border-[#ff007f] border-t-transparent animate-spin mx-auto mb-3" />
                <p className="text-sm font-mono">Loading tickets...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="moving-border-card p-8 text-center text-[#c9b1b8]">
                <p className="text-sm font-mono">No tickets found for filter '{filter}'.</p>
              </div>
            ) : (
              filteredTickets.map((t) => {
                const isSelected = selectedTicket?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => selectTicket(t)}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-[#180814] border-[#ff007f] shadow-[0_0_15px_rgba(255,0,127,0.3)]'
                        : 'bg-[#10070e]/80 border-[#ff5e00]/15 hover:border-[#ff5e00]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(t.status)}
                        <span className="text-[11px] font-mono text-[#ff7e26] px-2 py-0.5 rounded bg-[#ff5e00]/10">
                          {t.sector}
                        </span>
                      </div>
                      {t.ai_priority && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${getPriorityBadge(t.ai_priority)}`}>
                          {t.ai_priority}
                        </span>
                      )}
                    </div>

                    <h4 className="font-display text-sm font-bold text-white mb-1 truncate">
                      {t.ai_summary || t.issue_description}
                    </h4>

                    <p className="text-xs text-[#c9b1b8] line-clamp-2 mb-2">
                      {t.issue_description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-[#826c74] font-mono pt-2 border-t border-white/5">
                      <span>ID: #{t.id?.slice(0, 8)}</span>
                      <span>{new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Details & Conversation Column (7 cols) */}
          <div className="lg:col-span-7">
            {selectedTicket ? (
              <div className="moving-border-card p-6 h-full flex flex-col space-y-5">
                {/* Header & Status Changer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ff5e00]/20">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusBadge(selectedTicket.status)}
                      <span className="text-xs font-mono text-[#ff7e26] px-2 py-0.5 rounded bg-[#ff5e00]/10">
                        {selectedTicket.sector}
                      </span>
                      {selectedTicket.ai_priority && (
                        <span className={`text-xs font-mono px-2 py-0.5 rounded uppercase font-bold ${getPriorityBadge(selectedTicket.ai_priority)}`}>
                          {selectedTicket.ai_priority}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-base font-bold text-white">
                      Ticket #{selectedTicket.id?.slice(0, 8)}
                    </h3>
                  </div>

                  {/* Status Buttons */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#080407] border border-[#ff5e00]/20 text-xs font-mono">
                    <span className="text-[11px] text-[#826c74] px-1 hidden sm:inline">Set Status:</span>
                    {['open', 'in_progress', 'resolved'].map((st) => (
                      <button
                        key={st}
                        disabled={statusUpdating || selectedTicket.status === st}
                        onClick={() => handleUpdateStatus(st)}
                        className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                          selectedTicket.status === st
                            ? 'bg-[#ff5e00] text-white font-bold'
                            : 'text-[#826c74] hover:text-white'
                        }`}
                      >
                        {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Complaint Text */}
                <div className="p-3.5 rounded-xl bg-[#080407] border border-[#ff5e00]/15">
                  <span className="text-[11px] font-mono text-[#ff7e26] block mb-1">CUSTOMER COMPLAINT</span>
                  <p className="text-xs sm:text-sm text-[#fbebee] leading-relaxed">
                    {selectedTicket.issue_description}
                  </p>
                </div>

                {/* AI Analysis Panel */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#e50914]/10 via-[#ff5e00]/10 to-[#ff007f]/10 border border-[#ff007f]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#ff2a96] font-bold flex items-center gap-1.5">
                      <Sparkles size={14} />
                      AI TRIAGE & REMEDY RECOMMENDATION
                    </span>
                    <span className="text-[10px] font-mono text-[#ff7e26]">GEMINI 3.8 FLASH</span>
                  </div>

                  {selectedTicket.ai_summary && (
                    <div className="text-xs text-[#c9b1b8]">
                      <strong className="text-white">Summary: </strong>
                      {selectedTicket.ai_summary}
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div>
                      <strong className="text-white block text-[11px] text-[#826c74]">CATEGORY</strong>
                      <span className="text-[#ff7e26] font-semibold">{selectedTicket.ai_category || 'N/A'}</span>
                    </div>
                    <div>
                      <strong className="text-white block text-[11px] text-[#826c74]">SENTIMENT</strong>
                      <span className="text-[#ff2a96] font-semibold">{selectedTicket.ai_sentiment || 'N/A'}</span>
                    </div>
                  </div>

                  {selectedTicket.ai_recommended_action && (
                    <div className="p-3 rounded-lg bg-[#ff007f]/15 border border-[#ff007f]/30 text-xs">
                      <strong className="text-white block mb-0.5">Recommended Next Action:</strong>
                      <p className="text-[#fbebee] leading-relaxed">{selectedTicket.ai_recommended_action}</p>
                    </div>
                  )}
                </div>

                {/* Conversation Feed */}
                <div className="flex-1 flex flex-col min-h-48 pt-2">
                  <span className="text-xs font-mono text-[#826c74] block mb-2">MESSAGES & REPLIES</span>
                  <div className="flex-1 overflow-y-auto space-y-2.5 max-h-48 pr-1 mb-3">
                    {messages.length === 0 ? (
                      <p className="text-xs text-[#826c74] italic">No conversation messages yet. Send a response to the customer.</p>
                    ) : (
                      messages.map((m) => {
                        const isAgent = m.sender?.role === 'support_agent' || m.sender_id === user?.id;
                        return (
                          <div
                            key={m.id}
                            className={`p-3 rounded-xl text-xs max-w-[85%] ${
                              isAgent
                                ? 'ml-auto bg-[#ff007f]/20 border border-[#ff007f]/35 text-white'
                                : 'mr-auto bg-[#ff5e00]/15 border border-[#ff5e00]/25 text-[#fbebee]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1 text-[10px] text-[#826c74]">
                              <span className="font-semibold text-white">
                                {m.sender?.name || (isAgent ? 'Support Agent' : 'Customer')}
                              </span>
                              <span>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <p>{m.message}</p>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Send Message Form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type agent reply to customer..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#080407] border border-[#ff5e00]/25 text-white placeholder-[#826c74] text-xs outline-none focus:border-[#ff007f]"
                    />
                    <button
                      type="submit"
                      disabled={sendingMsg || !newMessage.trim()}
                      className="btn-futuristic py-2 px-4 text-xs flex items-center gap-1.5"
                    >
                      <Send size={13} />
                      <span>Send Reply</span>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="moving-border-card p-12 text-center text-[#c9b1b8] h-full flex flex-col items-center justify-center">
                <Headphones size={36} className="text-[#ff5e00] mb-3 opacity-60" />
                <h4 className="font-display text-base font-bold text-white mb-1">No ticket selected</h4>
                <p className="text-xs text-[#826c74] max-w-sm">
                  Select a ticket from the left panel to inspect the AI resolution analysis, update its lifecycle status, or send replies.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
export default AgentDashboard;
