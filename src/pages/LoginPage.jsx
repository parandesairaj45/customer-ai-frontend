import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, User, Headphones, AlertCircle, Zap } from 'lucide-react';

export const LoginPage = () => {
  const [searchParams] = useSearchParams();

  const defaultRole =
    searchParams.get('role') === 'support_agent'
      ? 'support_agent'
      : 'customer';

  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setIsSubmitting(true);

    const res = await login(email, password);

    setIsSubmitting(false);

    if (res.success) {
      if (res.user?.role === 'support_agent') {
        navigate('/support');
      } else {
        navigate('/customer');
      }
    } else {
      setError(
        res.error ||
        'Authentication failed. Please verify your credentials.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 relative bg-transparent text-[var(--text-primary)]">
      <div className="relative z-10 w-full max-w-md moving-border-card p-8 sm:p-10 animate-card-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] via-[#8b5cf6] to-[#ff7a00] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <Zap size={22} className="text-white fill-white" />
            </div>

            <span className="font-display font-extrabold text-xl text-white">
              RESOX <span className="text-fire-gradient">// AI</span>
            </span>
          </Link>

          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-[var(--text-secondary)]">
            Sign in to access the Customer Experience Platform
          </p>
        </div>

        {/* Role Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#090b16] border border-[var(--border-subtle)] mb-6">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-gradient-to-r from-[var(--cyan-vibrant)] to-[var(--cyan-bright)] text-black shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <User size={15} />
            Customer
          </button>

          <button
            type="button"
            onClick={() => setRole('support_agent')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              role === 'support_agent'
                ? 'bg-gradient-to-r from-[var(--purple-vibrant)] to-[var(--purple-neon)] text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <Headphones size={15} />
            Support Agent
          </button>
        </div>

        {error && (
          <div className="flex gap-3 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs mb-5 animate-card-in">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090b16] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] text-sm outline-none focus:border-[var(--cyan-vibrant)] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
            />
          </div>

          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#090b16] border border-[var(--border-subtle)] text-white placeholder-[var(--text-muted)] text-sm outline-none focus:border-[var(--cyan-vibrant)] focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-futuristic w-full py-3 flex justify-center items-center gap-2 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In as {role === 'support_agent' ? 'Support Agent' : 'Customer'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-[var(--text-muted)]">
          Don't have an account?{' '}
          <Link
            to={`/register?role=${role}`}
            className="text-[var(--cyan-bright)] hover:text-[var(--orange-vibrant)] font-semibold underline underline-offset-4 transition-colors"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;