import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, User, Headphones, ArrowRight, AlertCircle, Zap } from 'lucide-react';

export const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'support_agent' ? 'support_agent' : 'customer';

  const [role, setRole] = useState(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await register(name, email, password, role);
    setIsSubmitting(false);

    if (res.success) {
      if (res.user?.role === 'support_agent') {
        navigate('/support');
      } else {
        navigate('/customer');
      }
    } else {
      setError(res.error || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 relative bg-transparent text-[var(--text-primary)]">
      {/* Main Register Card */}
      <div className="relative z-10 w-full max-w-md moving-border-card p-8 sm:p-10 animate-card-in">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff6a00] via-[#ff7a00] to-[#ff8a1f] flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.5)]">
              <Zap size={22} className="text-white fill-white" />
            </div>
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              RESOX <span className="text-fire-gradient">// AI</span>
            </span>
          </Link>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Create an Account</h2>
          <p className="text-sm text-[var(--text-secondary)]">Join ResoX AI Customer Experience Platform</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#13151c] border border-[var(--border-card)] mb-6">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              role === 'customer'
                ? 'bg-gradient-to-r from-[var(--orange-primary)] to-[var(--orange-bright)] text-white shadow-[0_0_12px_rgba(255,106,0,0.4)]'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <User size={15} />
            <span>Customer</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('support_agent')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
              role === 'support_agent'
                ? 'bg-gradient-to-r from-[var(--purple-vibrant)] to-[var(--purple-neon)] text-white shadow-[0_0_12px_rgba(139,92,246,0.35)]'
                : 'text-[var(--text-muted)] hover:text-white'
            }`}
          >
            <Headphones size={15} />
            <span>Support Agent</span>
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs mb-6 animate-card-in">
            <AlertCircle size={18} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#13151c] border border-[var(--border-card)] focus:border-[var(--orange-vibrant)] text-white placeholder-[var(--text-muted)] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,106,0,0.2)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#13151c] border border-[var(--border-card)] focus:border-[var(--orange-vibrant)] text-white placeholder-[var(--text-muted)] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,106,0,0.2)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
              Password (min 6 characters)
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#13151c] border border-[var(--border-card)] focus:border-[var(--orange-vibrant)] text-white placeholder-[var(--text-muted)] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,106,0,0.2)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-futuristic w-full py-3 mt-6 text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Creating account...</span>
            ) : (
              <>
                <span>Register as {role === 'support_agent' ? 'Support Agent' : 'Customer'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-[var(--text-muted)]">
          Already have an account?{' '}
          <Link
            to={`/login?role=${role}`}
            className="text-[var(--orange-bright)] hover:text-[var(--orange-vibrant)] font-semibold underline underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
