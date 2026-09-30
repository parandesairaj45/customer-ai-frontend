import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export const InstallPwaButton = ({ className = '' }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if running as installed standalone app
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('To install ResoX AI, use the "Install" icon in your browser address bar or browser menu.');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (isInstalled) return null;

  return (
    <button
      type="button"
      onClick={handleInstallClick}
      title="Install ResoX App on your desktop or mobile"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border border-[var(--orange-vibrant)]/40 bg-[var(--orange-primary)]/15 text-[var(--orange-bright)] hover:bg-[var(--orange-primary)]/25 hover:border-[var(--orange-vibrant)] shadow-[0_0_12px_rgba(255,106,0,0.25)] ${className}`}
    >
      <Download size={13} />
      <span>Install ResoX App</span>
    </button>
  );
};

export default InstallPwaButton;
