import React, { useState } from 'react';
import { 
  Play, Pause, Download, Plus, Disc, Sparkles, Check, 
  ExternalLink, User, Key, FolderHeart, ShieldCheck, Eye, 
  Music, Film, Volume2, VolumeX, Maximize2, SkipForward, SkipBack 
} from 'lucide-react';
import { Track, CardTier } from '../types';
import { ARTIST_INFO } from '../data/artistData';

interface MainBentoSectionProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onOpenAddYoutubeModal: () => void;
  onSelectTier: (tierId: CardTier) => void;
  onOpenAccountModal: (tab?: string) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MainBentoSection: React.FC<MainBentoSectionProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onOpenAddYoutubeModal,
  onSelectTier,
  onOpenAccountModal,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const [playerMode, setPlayerMode] = useState<'audio' | 'video'>('audio');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownloadTrack = (track: Track) => {
    setDownloadSuccess(track.id);
    const element = document.createElement('a');
    const file = new Blob([`Fichier audio Master 24-bit pour : ${track.title} - Khalby (Univers The Golden)`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Khalby_${track.title.replace(/\s+/g, '_')}_Master.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <section id="musique" className="py-12 bg-[#090a0d] border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Bento Grid as precisely laid out in the poster photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================
              COLUMN 1: MUSIQUE - ÉCOUTE & TÉLÉCHARGE (lg:col-span-5)
             ======================================================== */}
          <div className="lg:col-span-5 bg-[#0e1017] rounded-2xl border border-neutral-800/90 p-5 space-y-5 shadow-2xl flex flex-col justify-between h-full">
            
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-neutral-800/80 pb-4">
                <div>
                  <div className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                    MUSIQUE
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-heading">
                    ÉCOUTE & TÉLÉCHARGE
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Retrouve ici tous les titres du projet.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenAddYoutubeModal}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-[11px] font-mono font-bold flex items-center gap-1 transition-all"
                    title="Ajouter un lien YouTube"
                    id="btn-add-youtube-bento"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ YOUTUBE</span>
                  </button>
                </div>
              </div>

              {/* Track List matching the poster and video */}
              <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                {tracks.map((track) => {
                  const isCurrent = currentTrack.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => onSelectTrack(track)}
                      className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                          : 'bg-neutral-900/60 border-neutral-800/70 hover:bg-neutral-800/60 hover:border-neutral-700'
                      }`}
                    >
                      {/* Left: Thumbnail & Play Indicator */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-neutral-700 group-hover:border-amber-500/50 transition-colors">
                          <img
                            src={track.coverUrl}
                            alt={track.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                            isCurrent ? 'bg-black/50 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'
                          }`}>
                            {isCurrent && isPlaying ? (
                              <div className="flex items-end gap-0.5 h-4">
                                <span className="w-1 bg-amber-400 animate-pulse h-full" />
                                <span className="w-1 bg-amber-400 animate-pulse h-2/3" />
                                <span className="w-1 bg-amber-400 animate-pulse h-4/5" />
                              </div>
                            ) : (
                              <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                            )}
                          </div>
                        </div>

                        {/* Title & Artist */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className={`text-xs sm:text-sm font-bold truncate uppercase ${
                              isCurrent ? 'text-amber-300' : 'text-white'
                            }`}>
                              {track.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-neutral-400 truncate">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      {/* Right: Badge & Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {track.versionTag && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase ${
                            track.versionTag.includes('OFFICIEL') || track.versionTag.includes('DÉJÀ')
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : track.versionTag.includes('AVANT') || track.versionTag.includes('NOUVEAU')
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          }`}>
                            {track.versionTag}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-neutral-500">
                          {track.duration}
                        </span>

                        {/* Download button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadTrack(track);
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-amber-300 hover:bg-neutral-800 transition-colors"
                          title="Télécharger le fichier master audio"
                        >
                          {downloadSuccess === track.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Integrated Compact Player & Streaming platforms bar */}
            <div className="pt-4 border-t border-neutral-800/80 space-y-3">
              
              {/* Mini Player Controls */}
              <div className="p-3 rounded-xl bg-black/60 border border-amber-500/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={onTogglePlay}
                    className="w-9 h-9 rounded-lg bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  </button>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate uppercase">
                      {currentTrack.title}
                    </p>
                    <p className="text-[10px] text-amber-400 font-mono">
                      {isPlaying ? 'EN LECTURE • AUDIO HQ' : 'EN PAUSE'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={onPrevTrack} className="p-1.5 text-neutral-400 hover:text-white" title="Précédent">
                    <SkipBack className="w-4 h-4" />
                  </button>
                  <button onClick={onNextTrack} className="p-1.5 text-neutral-400 hover:text-white" title="Suivant">
                    <SkipForward className="w-4 h-4" />
                  </button>
                  <button onClick={onToggleMute} className="p-1.5 text-neutral-400 hover:text-amber-400" title="Mute">
                    {isMuted ? <VolumeX className="w-4 h-4 text-neutral-600" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* Streaming platform badges as shown in the mockup */}
              <div className="pt-1 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/50">
                <a
                  href={ARTIST_INFO.spotifyArtistUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Spotify</span>
                </a>

                <a
                  href="https://music.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span>Apple Music</span>
                </a>

                <a
                  href={ARTIST_INFO.youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>YouTube</span>
                </a>

                <a
                  href="https://www.deezer.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span>Deezer</span>
                </a>
              </div>

            </div>

          </div>

          {/* ========================================================
              COLUMN 2: GOLDEN ACCESS (lg:col-span-5)
             ======================================================== */}
          <div id="golden-access" className="lg:col-span-5 bg-[#0e1017] rounded-2xl border border-neutral-800/90 p-4 sm:p-5 space-y-4 shadow-2xl flex flex-col justify-between h-full">
            
            <div>
              {/* Header matching poster */}
              <div className="border-b border-neutral-800/80 pb-3">
                <div className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                  NIVEAUX & PASS
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight font-heading">
                  GOLDEN ACCESS
                </h2>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Choisis ton niveau d'accès et découvre ce qui t'est réservé.
                </p>
              </div>

              {/* 3 Tier Cards side-by-side horizontally matching poster layout */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* 1. GOLDEN CARD STANDARD */}
                <div className="p-3 rounded-xl border border-neutral-800 bg-[#12141c] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-2">
                  <div className="space-y-2">
                    {/* Visual Preview */}
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-neutral-800 bg-black flex items-center justify-center relative">
                      <img
                        src="/assets/khalby_portrait.jpg"
                        alt="Golden Card Standard"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1 left-1.5 text-[8px] font-mono text-amber-300 font-bold uppercase">STANDARD</span>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-black text-white uppercase tracking-wider font-heading leading-tight">
                        GOLDEN CARD
                      </h4>
                      <p className="text-[9px] font-mono text-neutral-400 uppercase">STANDARD</p>
                    </div>

                    <ul className="text-[10px] text-neutral-300 space-y-1">
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Carte Golden</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">QR Code</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Accès projet</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Écoute / Master</span></li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectTier('standard')}
                    className="w-full py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors mt-2"
                  >
                    DÉCOUVRIR
                  </button>
                </div>

                {/* 2. GOLDEN EDITION PREMIUM (Highlighted with light gold button) */}
                <div className="p-3 rounded-xl border border-amber-500/60 bg-gradient-to-b from-[#1b1710] to-[#12141c] flex flex-col justify-between space-y-2 shadow-[0_0_15px_rgba(245,158,11,0.12)] relative">
                  <div className="space-y-2">
                    {/* Visual Preview */}
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-amber-500/40 bg-black flex items-center justify-center relative">
                      <img
                        src="/assets/golden_deluxe_box.jpg"
                        alt="Golden Edition Premium"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1 left-1.5 text-[8px] font-mono text-amber-400 font-bold uppercase">PREMIUM</span>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-black text-amber-300 uppercase tracking-wider font-heading leading-tight">
                        GOLDEN EDITION
                      </h4>
                      <p className="text-[9px] font-mono text-neutral-400 uppercase">PREMIUM</p>
                    </div>

                    <ul className="text-[10px] text-neutral-200 space-y-1">
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Carte premium</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">QR Code</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Accès anticipé</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Making-of</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Photos inédites</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Message Khalby</span></li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectTier('premium')}
                    className="w-full py-1.5 rounded-lg bg-[#e8c37d] hover:bg-[#dfb56c] text-black text-[10px] font-extrabold uppercase tracking-wider shadow transition-transform hover:scale-[1.02] active:scale-[0.98] mt-2"
                  >
                    DÉCOUVRIR
                  </button>
                </div>

                {/* 3. GOLDEN DELUXE COLLECTOR */}
                <div className="p-3 rounded-xl border border-amber-900/40 bg-[#12141c] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-2">
                  <div className="space-y-2">
                    {/* Visual Preview */}
                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-amber-500/30 bg-black flex items-center justify-center relative">
                      <img
                        src="/assets/golden_deluxe_box.jpg"
                        alt="Golden Deluxe Box"
                        className="w-full h-full object-cover scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1 left-1.5 text-[8px] font-mono text-amber-400 font-bold uppercase">100 EX.</span>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-black text-white uppercase tracking-wider font-heading leading-tight">
                        GOLDEN DELUXE
                      </h4>
                      <p className="text-[9px] font-mono text-amber-400 uppercase">COLLECTOR</p>
                    </div>

                    <ul className="text-[10px] text-neutral-300 space-y-1">
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Coffret collector</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">CD 4 titres</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Carte numérotée</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Polo + Bracelet</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Signature Khalby</span></li>
                      <li className="flex items-center gap-1"><Check className="w-2.5 h-2.5 text-amber-400 shrink-0" /> <span className="truncate">Versions live</span></li>
                    </ul>
                  </div>

                  <button
                    onClick={() => onSelectTier('deluxe')}
                    className="w-full py-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors mt-2"
                  >
                    DÉCOUVRIR
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================
              COLUMN 3: MON ESPACE GOLDEN (lg:col-span-3)
             ======================================================== */}
          <div className="lg:col-span-3 bg-[#0e1017] rounded-2xl border border-neutral-800/90 p-5 space-y-5 shadow-2xl flex flex-col justify-between h-full">
            
            <div>
              {/* Header */}
              <div className="border-b border-neutral-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                    MON ESPACE GOLDEN
                  </span>
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight font-heading mt-1">
                  Bienvenue, Golden.
                </h3>
              </div>

              {/* Collector Card Badge */}
              <div className="mt-4 p-3.5 rounded-xl border border-amber-500/40 bg-gradient-to-br from-[#1b1710] to-black space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">STATUT MEMBRE</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">VIP</span>
                </div>
                <div className="text-sm font-black text-white font-heading">
                  GOLDEN DELUXE
                </div>
                <div className="text-xs font-mono text-amber-400 font-bold">
                  N° 027 / 100
                </div>
                <button
                  onClick={() => onSelectTier('deluxe')}
                  className="text-[11px] font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 pt-1 inline-block"
                >
                  Voir mon coffret ↗
                </button>
              </div>

              {/* Navigation Menu inside Account */}
              <div className="mt-5 space-y-2">
                <button
                  onClick={() => onOpenAccountModal('profil')}
                  className="w-full p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 text-left text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mon profil</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Actif</span>
                </button>

                <button
                  onClick={() => onOpenAccountModal('acces')}
                  className="w-full p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 text-left text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-amber-400" />
                    <span>Mes accès</span>
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">Niveau 3</span>
                </button>

                <button
                  onClick={() => onOpenAccountModal('exclusifs')}
                  className="w-full p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 text-left text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FolderHeart className="w-3.5 h-3.5 text-amber-400" />
                    <span>Contenus exclusifs</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">4 dispo</span>
                </button>

                <button
                  onClick={() => onOpenAccountModal('collection')}
                  className="w-full p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-800 text-left text-xs font-semibold text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ma collection</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">Numéroté</span>
                </button>
              </div>
            </div>

            {/* Emblem & Artist quote strictly as in the poster */}
            <div className="pt-6 border-t border-neutral-800/80 text-center space-y-2">
              <div className="w-10 h-10 rounded-full mx-auto bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Eye className="w-5 h-5" />
              </div>

              <blockquote className="text-xs italic text-neutral-300 font-serif-luxury leading-relaxed">
                "Plus qu'un projet, c'est une énergie."
              </blockquote>
              <p className="text-[11px] font-bold text-amber-400 font-mono">
                — Khalby
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
