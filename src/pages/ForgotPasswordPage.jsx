import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { Mail, ArrowRight, ArrowLeft, Zap, AlertCircle, CheckCircle, KeyRound } from 'lucide-react';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [directResetLink, setDirectResetLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setError('');
    setSuccessMessage('');
    setDirectResetLink('');
    setIsSubmitting(true);

    try {
      const response = await api.post('/api/auth/forgot-password', {
        email: email.trim().toLowerCase(),
      });

      if (response.data?.success) {
        setSuccessMessage(
          response.data.message ||
            'Password reset link dispatched via Supabase! Please check your email inbox and spam folder.'
        );
        if (response.data.resetToken) {
          setDirectResetLink(
            `/reset-password?token=${encodeURIComponent(response.data.resetToken)}&email=${encodeURIComponent(
              email.trim().toLowerCase()
            )}`
          );
        }
      } else {
        setError(response.data?.error || 'Failed to request password reset. Please try again.');
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Unable to process password reset. Please verify your email or try again later.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 relative bg-transparent text-[var(--text-primary)]">
      <div className="relative z-10 w-full max-w-md moving-border-card p-8 sm:p-10 animate-card-in">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6a00] via-[#ff7a00] to-[#ff8a1f] flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.5)]">
              <Zap size={22} className="text-white fill-white" />
            </div>
            <span className="font-display font-extrabold text-xl text-white">
              RESOX <span className="text-fire-gradient">// AI</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--orange-primary)]/10 border border-[var(--orange-vibrant)]/35 text-[11px] font-mono text-[var(--orange-bright)] mb-3">
            <KeyRound size={13} />
            SUPABASE AUTH RECOVERY
          </div>

          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Reset Your Password
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            Enter your registered account email to receive a password reset link.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex gap-3 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs mb-5 animate-card-in">
            <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMessage ? (
          <div className="space-y-5 animate-card-in">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex gap-3">
              <CheckCircle size={20} className="shrink-0 text-emerald-400 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-emerald-200">Email Dispatched Successfully</p>
                <p>{successMessage}</p>
              </div>
            </div>

            {directResetLink && (
              <div className="p-3.5 rounded-xl bg-[#141822] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-2">
                <p className="text-[11px] font-mono text-[var(--orange-bright)]">Direct Testing Shortcut:</p>
                <p className="text-[11px]">
                  Testing in hackathon environment or waiting on email inbox?
                </p>
                <Link
                  to={directResetLink}
                  className="btn-futuristic py-2 px-3 text-xs w-full flex items-center justify-center gap-2"
                >
                  <span>Set New Password Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="email"
                required
                placeholder="Registered email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#13151c] border border-[var(--border-card)] text-white placeholder-[var(--text-muted)] text-sm outline-none focus:border-[var(--orange-vibrant)] focus:shadow-[0_0_15px_rgba(255,106,0,0.2)] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="btn-futuristic w-full py-3 flex justify-center items-center gap-2 cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span>Sending Recovery Link...</span>
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center pt-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--orange-bright)] transition-colors"
              >
                <ArrowLeft size={14} />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
