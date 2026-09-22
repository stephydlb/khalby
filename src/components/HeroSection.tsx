import React, { useState } from 'react';
import { ArrowRight, Play, Pause, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { ARTIST_INFO } from '../data/artistData';

interface HeroSectionProps {
  onDiscoverUniverse: () => void;
  onListenTracks: () => void;
  onPlayFeaturedVideo: (youtubeId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onDiscoverUniverse,
  onListenTracks,
  onPlayFeaturedVideo,
}) => {
  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const [isTeaserMuted, setIsTeaserMuted] = useState(true);

  const featuredVideoId = '7uJA4jA_FDU'; // Yeleh

  return (
    <section id="accueil" className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden border-b border-amber-900/30">
      {/* Background ambient solar flare effects */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-[360px] h-[360px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & Call to actions matching poster exactly */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Top artist label */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.25em] text-neutral-400 uppercase font-mono">
                KHALBY
              </span>
              <span className="w-6 h-[1px] bg-amber-500/50" />
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">
                ÉDITION OFFICIELLE
              </span>
            </div>

            {/* Main Title & Subtitle matching the poster */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-heading">
                THE <span className="gold-gradient-text drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)]">GOLDEN</span>
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-amber-200/90 uppercase">
                WELCOME TO THE GOLDEN WORLD
              </p>
            </div>

            {/* Description strictly from the poster: 
                "Merci d'être ici. Ce site est la clé de ton accès à l'univers The Golden. Découvre la musique, les contenus exclusifs et tout ce que nous avons préparé pour toi." */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed font-normal">
              Merci d'être ici. Ce site est la clé de ton accès à l'univers <span className="text-amber-300 font-medium">The Golden</span>. Découvre la musique, les contenus exclusifs et tout ce que nous avons préparé pour toi.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onDiscoverUniverse}
                className="px-5 py-2.5 rounded-lg bg-neutral-900 border border-amber-500/60 hover:bg-neutral-800 hover:border-amber-400 text-amber-300 hover:text-white font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all active:scale-95"
                id="btn-enter-universe"
              >
                <span>ENTRER DANS L'UNIVERS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onListenTracks}
                className="px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 hover:text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 transition-all"
                id="btn-listen-tracks"
              >
                <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>ÉCOUTER LES TITRES</span>
              </button>
            </div>

          </div>

          {/* Right Column: Iconic Golden Solar Ring Halo & Khalby Portrait from Poster */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="relative w-full max-w-[380px] aspect-square flex items-center justify-center">
              
              {/* Concentric Golden Halo / Solar Corona Rings */}
              <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
              <div className="absolute -inset-3 rounded-full border border-dashed border-amber-500/25 animate-spin pointer-events-none" style={{ animationDuration: '60s' }} />
              <div className="absolute -inset-6 rounded-full border border-amber-400/10 pointer-events-none" />
              
              {/* Outer Golden Glow Circle */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-amber-600/30 via-amber-400/20 to-amber-700/30 blur-lg opacity-70" />

              {/* Main Portrait Masked Circle matching the poster */}
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full p-1.5 bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 shadow-[0_0_35px_rgba(245,158,11,0.25)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                  <img
                    src="/assets/khalby_portrait.jpg"
                    alt="Khalby The Golden Artist"
                    className="w-full h-full object-cover object-top scale-105 hover:scale-110 transition-transform duration-700"
                  />
                  {/* Subtle golden ambient grading */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-500/10 mix-blend-overlay" />
                </div>
              </div>

              {/* Golden Signature Script & Eye Emblem as seen in the poster */}
              <div className="absolute -bottom-2 right-2 sm:right-4 z-20 flex flex-col items-end pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
                    <Eye className="w-3 h-3" />
                  </div>
                  <span className="font-serif-luxury text-xl sm:text-2xl font-black text-amber-300 tracking-wider drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] italic">
                    Khalby
                  </span>
                </div>
                <span className="text-[8px] font-mono tracking-widest text-amber-400/90 uppercase font-semibold">
                  UNIVERS THE GOLDEN
                </span>
              </div>

              {/* Floating Quick Play Badge on the image */}
              <button
                onClick={() => onPlayFeaturedVideo(featuredVideoId)}
                className="absolute top-2 left-2 sm:left-4 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/50 text-amber-300 hover:text-white hover:border-amber-400 text-[11px] font-mono font-bold flex items-center gap-1.5 shadow-lg transition-all hover:scale-105"
                title="Lancer le clip Yeleh"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span>YELEH 4K</span>
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

