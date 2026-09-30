import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flame, Lock, Mail, User, Headphones, ArrowRight, AlertCircle, Shield } from 'lucide-react';

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
        navigate('/agent');
      } else {
        navigate('/customer');
      }
    } else {
      setError(res.error || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 relative bg-[#070508] text-[#fbebee]">
      {/* Ambient background glows */}
      <div className="orb-1 pointer-events-none" />
      <div className="orb-3 pointer-events-none" />
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-50" />

      {/* Main Register Card */}
      <div className="relative z-10 w-full max-w-md moving-border-card p-8 sm:p-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e50914] via-[#ff5e00] to-[#ff007f] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,127,0.4)]">
              <Flame size={20} color="#fff" />
            </div>
            <span className="font-display font-extrabold text-xl text-white tracking-tight">
              RESOX <span className="text-fire-gradient">// AI</span>
            </span>
          </Link>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Create an Account</h2>
          <p className="text-sm text-[#c9b1b8]">Join ResoX AI Customer Experience Platform</p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#140810] border border-[#ff5e00]/20 mb-6">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
              role === 'customer'
                ? 'bg-gradient-to-r from-[#e50914] to-[#ff5e00] text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                : 'text-[#826c74] hover:text-[#c9b1b8]'
            }`}
          >
            <User size={15} />
            <span>Customer</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('support_agent')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
              role === 'support_agent'
                ? 'bg-gradient-to-r from-[#ff5e00] to-[#ff007f] text-white shadow-[0_0_12px_rgba(255,0,127,0.4)]'
                : 'text-[#826c74] hover:text-[#c9b1b8]'
            }`}
          >
            <Headphones size={15} />
            <span>Support Agent</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#e50914]/15 border border-[#e50914]/40 text-[#ff3344] text-sm mb-6">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#c9b1b8] mb-1.5 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#826c74]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d060a] border border-[#ff5e00]/25 focus:border-[#ff007f] text-white placeholder-[#826c74] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,0,127,0.25)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#c9b1b8] mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#826c74]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d060a] border border-[#ff5e00]/25 focus:border-[#ff007f] text-white placeholder-[#826c74] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,0,127,0.25)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-[#c9b1b8] mb-1.5 uppercase tracking-wider">
              Password (min 6 characters)
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#826c74]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0d060a] border border-[#ff5e00]/25 focus:border-[#ff007f] text-white placeholder-[#826c74] text-sm outline-none transition-all focus:shadow-[0_0_15px_rgba(255,0,127,0.25)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-futuristic w-full py-3 mt-6 text-sm flex items-center justify-center gap-2"
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
        <div className="text-center mt-6 text-sm text-[#826c74]">
          Already have an account?{' '}
          <Link
            to={`/login?role=${role}`}
            className="text-[#ff7e26] hover:text-[#ff007f] font-semibold underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
