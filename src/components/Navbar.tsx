import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Disc3, User, Globe } from 'lucide-react';
import { ARTIST_INFO } from '../data/artistData';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  isAudioPlaying: boolean;
  onToggleMasterMute: () => void;
  isMuted: boolean;
  onOpenUserAccount: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  activeSection,
  isAudioPlaying,
  onToggleMasterMute,
  isMuted,
  onOpenUserAccount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'accueil', label: 'ACCUEIL' },
    { id: 'musique', label: 'MUSIQUE' },
    { id: 'golden-access', label: 'GOLDEN ACCESS' },
    { id: 'exclusif', label: 'EXCLUSIF' },
    { id: 'boutique', label: 'BOUTIQUE' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0a0b0e]/90 border-b border-amber-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand / Logo matching the poster mockup */}
        <div 
          onClick={() => handleNavClick('accueil')}
          className="cursor-pointer flex items-center gap-3 group"
          id="navbar-brand"
        >
          <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-gradient-to-br from-amber-500/20 via-black to-[#1a140a] flex items-center justify-center shadow-[0_0_15px_rgba(217,119,6,0.25)] group-hover:border-amber-400 transition-colors">
            <Disc3 className={`w-5 h-5 text-amber-400 ${isAudioPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider text-white group-hover:text-amber-400 transition-colors font-heading uppercase">
                {ARTIST_INFO.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold tracking-widest uppercase font-serif-luxury">
                THE GOLDEN
              </span>
            </div>
            <p className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono">
              UNIVERS OFFICIEL
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Links ONLY (NO streaming links as requested!) */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all ${
                activeSection === item.id
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right side: Mon compte & controls (NO external streaming buttons!) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Audio Ambience toggle */}
          <button
            onClick={onToggleMasterMute}
            title={isMuted ? 'Activer le son' : 'Couper le son'}
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />}
            <span className="hidden xl:inline">{isMuted ? 'MUTE' : 'HQ AUDIO'}</span>
          </button>

          {/* Mon Compte CTA as shown on top-right in poster & video */}
          <button
            onClick={onOpenUserAccount}
            className="px-4 py-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-500/25 to-amber-500/15 hover:border-amber-400 text-amber-200 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            id="btn-nav-account"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span>Mon compte</span>
          </button>

          {/* Language selector FR */}
          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/80 text-xs font-mono text-neutral-300">
            <Globe className="w-3.5 h-3.5 text-neutral-400" />
            <span>FR</span>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenUserAccount}
            className="p-2 rounded-lg border border-amber-500/40 bg-amber-500/10 text-amber-300"
            title="Mon compte"
          >
            <User className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleMasterMute}
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-amber-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0c0d12] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-all ${
                activeSection === item.id
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUserAccount();
              }}
              className="w-full py-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Accéder à Mon Espace Golden</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

