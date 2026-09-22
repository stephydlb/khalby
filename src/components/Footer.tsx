import React, { useState } from 'react';
import { Send, CheckCircle2, Youtube, ExternalLink, Disc, Shield } from 'lucide-react';
import { ARTIST_INFO } from '../data/artistData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#08090c] border-t border-amber-900/30 text-neutral-400 text-sm">
      
      {/* Newsletter / Join Section matching Video 1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-neutral-800/80">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase">
            <span>VIP COMMUNITÉ SECRÈTE</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
            REJOINDRE L'EXPÉDITION THE GOLDEN
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Entrez votre adresse email pour recevoir les codes d'accès secrets, invitations aux sessions live privées et alertes sur les tirages limités.
          </p>

          {subscribed ? (
            <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 flex items-center justify-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-400" />
              <span className="font-semibold text-sm">
                Votre accès prioritaire a été enregistré avec succès. Bienvenue dans l'univers.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse e-mail personnelle"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span>Rejoindre</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="pt-4 flex items-center justify-center gap-4 text-xs font-mono text-neutral-400">
            <span>MUSIC</span>
            <span>•</span>
            <span>EXCLUSIVE</span>
            <span>•</span>
            <span>FOREVER</span>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Branding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Disc className="w-4 h-4" />
          </div>
          <div>
            <div className="text-base font-black text-white tracking-wider uppercase font-heading">
              KHALBY
            </div>
            <div className="text-[10px] font-mono text-amber-400/90 tracking-widest uppercase">
              THE GOLDEN EXPERIENCE
            </div>
          </div>
        </div>

        {/* Social and External Hubs */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <a
            href={ARTIST_INFO.youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-red-400 flex items-center gap-1.5 transition-colors"
          >
            <Youtube className="w-4 h-4" />
            <span>Chaîne YouTube</span>
          </a>
          <a
            href={ARTIST_INFO.spotifyArtistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-green-400 flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Spotify Artist</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="text-xs text-neutral-400 text-center md:text-right">
          <p>© 2026 KHALBY. Tous droits réservés.</p>
          <p className="text-[11px] text-neutral-400">Inspiré de l'esthétique On A Spaceship</p>
        </div>

      </div>

    </footer>
  );
};
