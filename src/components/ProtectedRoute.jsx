import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
        <div className="w-8 h-8 rounded-full border-2 border-[var(--orange-vibrant)] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = (user.role || '').toLowerCase().trim();
  const isAgent = userRole === 'support_agent' || userRole === 'agent' || userRole === 'support';

  if (allowedRoles && allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some((role) => {
      if (role === 'support_agent' || role === 'agent' || role === 'support') return isAgent;
      if (role === 'customer') return !isAgent;
      return userRole === role;
    });

    if (!isAllowed) {
      return <Navigate to={isAgent ? '/agent' : '/customer'} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
