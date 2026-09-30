import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api';
import { Lock, ArrowRight, Zap, AlertCircle, CheckCircle, KeyRound, ShieldCheck } from 'lucide-react';

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 1. Check if token is in query parameters
    const queryToken = searchParams.get('token');
    const queryEmail = searchParams.get('email');

    if (queryEmail) {
      setEmail(queryEmail);
    }

    if (queryToken) {
      setToken(queryToken);
      return;
    }

    // 2. Check if token is in hash parameters (Supabase Auth email redirect format)
    const hash = window.location.hash;
    if (hash) {
      const hashParams = new URLSearchParams(hash.replace(/^#/, ''));
      const accessToken = hashParams.get('access_token');
      if (accessToken) {
        setToken(accessToken);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter a new password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/api/auth/reset-password', {
        email: email.trim().toLowerCase() || undefined,
        token: token || undefined,
        password,
      });

      if (response.data?.success) {
        setSuccess(true);
      } else {
        setError(response.data?.error || 'Failed to reset password. The link may have expired.');
      }
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Password reset failed. The link may be invalid or expired. Please request a new one.';
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
            <ShieldCheck size={13} />
            SECURE CREDENTIAL UPDATE
          </div>

          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Set New Password
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            Create a strong, secure password for your ResoX account.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex gap-3 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs mb-5 animate-card-in">
            <AlertCircle size={18} className="shrink-0 text-red-400 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success State */}
        {success ? (
          <div className="space-y-6 text-center animate-card-in">
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm space-y-2">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle size={24} />
              </div>
              <h3 className="font-display font-bold text-base text-white">Password Updated!</h3>
              <p className="text-xs text-emerald-200/80">
                Your password has been successfully reset in Supabase and the security registry.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/login')}
              className="btn-futuristic w-full py-3 flex justify-center items-center gap-2 cursor-pointer"
            >
              <span>Sign In with New Password</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* If email wasn't carried in token, allow entering email */}
            {!token && (
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Account Email</label>
                <input
                  type="email"
                  required
                  placeholder="Your account email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#13151c] border border-[var(--border-card)] text-white placeholder-[var(--text-muted)] text-sm outline-none focus:border-[var(--orange-vibrant)]"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase">New Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#13151c] border border-[var(--border-card)] text-white placeholder-[var(--text-muted)] text-sm outline-none focus:border-[var(--orange-vibrant)] focus:shadow-[0_0_15px_rgba(255,106,0,0.2)] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="password"
                  required
                  placeholder="Re-enter your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#13151c] border border-[var(--border-card)] text-white placeholder-[var(--text-muted)] text-sm outline-none focus:border-[var(--orange-vibrant)] focus:shadow-[0_0_15px_rgba(255,106,0,0.2)] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !password}
              className="btn-futuristic w-full py-3 flex justify-center items-center gap-2 cursor-pointer mt-3"
            >
              {isSubmitting ? (
                <span>Updating Password...</span>
              ) : (
                <>
                  <span>Save New Password</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="text-center pt-3">
              <Link
                to="/login"
                className="text-xs text-[var(--text-muted)] hover:text-white transition-colors"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
