import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Flame, Lock, Mail, ArrowRight, User, Headphones, AlertCircle } from 'lucide-react';

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
        navigate('/agent');
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
    <div className="min-h-screen flex flex-col justify-center items-center px-6 py-12 relative bg-[#070508] text-[#fbebee]">

      <div className="orb-1 pointer-events-none" />
      <div className="orb-2 pointer-events-none" />
      <div className="fixed inset-0 bg-cyber-grid pointer-events-none z-0 opacity-50" />


      <div className="relative z-10 w-full max-w-md moving-border-card p-8 sm:p-10">


        <div className="text-center mb-8">

          <Link to="/" className="inline-flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e50914] via-[#ff5e00] to-[#ff007f] flex items-center justify-center">
              <Flame size={20} color="#fff"/>
            </div>

            <span className="font-display font-extrabold text-xl text-white">
              RESOX <span className="text-fire-gradient">// AI</span>
            </span>

          </Link>


          <h2 className="font-display text-2xl font-bold text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-sm text-[#c9b1b8]">
            Sign in to access your resolution portal
          </p>

        </div>



        <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-[#140810] border border-[#ff5e00]/20 mb-6">


          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg ${
              role === 'customer'
              ? 'bg-gradient-to-r from-[#e50914] to-[#ff5e00] text-white'
              : 'text-[#826c74]'
            }`}
          >
            <User size={15}/>
            Customer
          </button>



          <button
            type="button"
            onClick={() => setRole('support_agent')}
            className={`flex items-center justify-center gap-2 py-2 rounded-lg ${
              role === 'support_agent'
              ? 'bg-gradient-to-r from-[#ff5e00] to-[#ff007f] text-white'
              : 'text-[#826c74]'
            }`}
          >
            <Headphones size={15}/>
            Support Agent
          </button>


        </div>



        {error && (
          <div className="flex gap-3 p-3 rounded-xl bg-[#e50914]/15 border border-[#e50914]/40 text-[#ff3344] mb-5">
            <AlertCircle size={18}/>
            {error}
          </div>
        )}



        <form onSubmit={handleSubmit} className="space-y-4">


          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0d060a] border border-[#ff5e00]/25 text-white"
          />


          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0d060a] border border-[#ff5e00]/25 text-white"
          />


          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-futuristic w-full py-3 flex justify-center gap-2"
          >

            {isSubmitting
              ? "Authenticating..."
              :
              <>
                Sign In as {role === 'support_agent' ? 'Support Agent' : 'Customer'}
                <ArrowRight size={16}/>
              </>
            }

          </button>


        </form>



        <div className="text-center mt-6 text-sm text-[#826c74]">

          Don't have an account?{' '}

          <Link
            to={`/register?role=${role}`}
            className="text-[#ff7e26]"
          >
            Register here
          </Link>

        </div>


      </div>

    </div>
  );
};


// 
export default LoginPage;