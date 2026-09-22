import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Download, 
  Plus, 
  Youtube, 
  ExternalLink, 
  Disc, 
  Radio, 
  CheckCircle2, 
  Flame,
  Music2
} from 'lucide-react';
import { Track } from '../types';
import { ARTIST_INFO } from '../data/artistData';

interface AudioPlayerSectionProps {
  tracks: Track[];
  currentTrack: Track;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onOpenAddYoutubeModal: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const AudioPlayerSection: React.FC<AudioPlayerSectionProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onOpenAddYoutubeModal,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
}) => {
  const [playerMode, setPlayerMode] = useState<'audio' | 'youtube'>('audio');
  const [currentTime, setCurrentTime] = useState(0);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Simulated progress timer when playing audio mode
  useEffect(() => {
    let interval: number;
    if (isPlaying && playerMode === 'audio') {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            onNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playerMode, currentTrack, onNextTrack]);

  // Reset timer on track switch
  useEffect(() => {
    setCurrentTime(0);
  }, [currentTrack.id]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const handleDownload = (e: React.MouseEvent, track: Track) => {
    e.stopPropagation();
    setDownloadSuccessMessage(`Téléchargement initié : "${track.title}" (Master 24-bit MP3)`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  const progressPercent = currentTrack.durationSeconds 
    ? Math.min(100, (currentTime / currentTrack.durationSeconds) * 100) 
    : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    const newSec = (newPercent / 100) * currentTrack.durationSeconds;
    setCurrentTime(newSec);
  };

  return (
    <section id="musique" className="py-16 md:py-24 border-b border-amber-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast notification for direct download */}
        {downloadSuccessMessage && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-neutral-900 border border-amber-500/50 text-white shadow-2xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-semibold">{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Section Header with "+ AJOUTER UN LIEN YOUTUBE" button as seen in video */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Radio className="w-4 h-4 animate-pulse text-amber-400" />
              <span>DISCOGRAPHIE & STREAMING IMMERSIF</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
              ÉCOUTE & TÉLÉCHARGEMENT DIRECT
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
              Accédez aux titres officiels, écoutez les versions live et synchronisez vos vidéos depuis YouTube en un clic.
            </p>
          </div>

          {/* Add YouTube Link CTA */}
          <button
            onClick={onOpenAddYoutubeModal}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            id="btn-add-youtube-track"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>AJOUTER UN LIEN YOUTUBE</span>
          </button>
        </div>

        {/* 2-Column Layout: Left = Tracklist, Right = Official Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tracklist Column */}
          <div className="lg:col-span-6 space-y-3">
            <div className="space-y-2">
              {tracks.map((track) => {
                const isSelected = track.id === currentTrack.id;
                const isThisPlaying = isSelected && isPlaying;

                return (
                  <div
                    key={track.id}
                    onClick={() => onSelectTrack(track)}
                    className={`group cursor-pointer p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500/60 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                        : 'border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-800/60 hover:border-neutral-700'
                    }`}
                    id={`track-item-${track.id}`}
                  >
                    {/* Left: Play button & info */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-lg shrink-0 flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                          : 'bg-neutral-800 text-neutral-300 group-hover:bg-neutral-700 group-hover:text-white'
                      }`}>
                        {isThisPlaying ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-bold truncate ${
                            isSelected ? 'text-amber-300' : 'text-white group-hover:text-amber-200'
                          }`}>
                            {track.title}
                          </h4>
                          {track.isHot && (
                            <span className="shrink-0 p-0.5 rounded bg-red-500/20 text-red-400" title="Populaire">
                              <Flame className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 truncate">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    {/* Right: Badge, Duration & Download */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
                        track.versionTag === 'DIRECT YOUTUBE'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                          : track.versionTag === 'CLIP OFFICIEL'
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}>
                        {track.versionTag}
                      </span>

                      <span className="text-xs font-mono text-neutral-400">
                        {track.duration}
                      </span>

                      {/* Download Direct MP3 Button */}
                      <button
                        onClick={(e) => handleDownload(e, track)}
                        title="Téléchargement direct MP3 Master"
                        className="p-1.5 rounded-lg border border-neutral-700 hover:border-amber-400 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Link Buttons below tracklist matching video */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <span className="text-xs text-neutral-400 uppercase font-semibold">
                Écouter l'artiste sur :
              </span>
              <a
                href={ARTIST_INFO.spotifyArtistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-green-500/40 text-neutral-300 hover:text-green-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Spotify</span>
              </a>
              <a
                href={ARTIST_INFO.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-neutral-300 hover:text-red-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5 text-red-500" />
                <span>Chaîne YouTube</span>
              </a>
            </div>

          </div>

          {/* Right Column: LECTEUR OFFICIEL matching Video 1 */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-amber-500/30 bg-[#121319] p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
              
              {/* Top bar inside player */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <h3 className="text-sm font-extrabold tracking-wider uppercase text-amber-300 font-heading">
                    LECTEUR OFFICIEL
                  </h3>
                </div>

                {/* Mode switch: Audio vs YouTube */}
                <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-neutral-800 text-xs font-semibold">
                  <button
                    onClick={() => setPlayerMode('audio')}
                    className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                      playerMode === 'audio'
                        ? 'bg-amber-500 text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Music2 className="w-3.5 h-3.5" />
                    <span>Audio</span>
                  </button>

                  <button
                    onClick={() => setPlayerMode('youtube')}
                    className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
                      playerMode === 'youtube'
                        ? 'bg-red-600 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Youtube className="w-3.5 h-3.5" />
                    <span>YouTube</span>
                  </button>
                </div>
              </div>

              {/* Main Media Visual Display */}
              <div className="py-4">
                {playerMode === 'youtube' && currentTrack.youtubeId ? (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-neutral-800">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&enablejsapi=1`}
                      title={currentTrack.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 via-black to-[#1a150b] border border-amber-900/30 flex items-center justify-center p-6">
                    
                    {/* Background artwork with blur */}
                    <img
                      src={currentTrack.coverUrl}
                      alt={currentTrack.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-md"
                    />

                    {/* Vinyl turntable graphic */}
                    <div className="relative z-10 flex items-center gap-6">
                      <div className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-amber-950/80 bg-neutral-950 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-center ${
                        isPlaying ? 'animate-spin' : ''
                      }`} style={{ animationDuration: '6s' }}>
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/60">
                          <img
                            src={currentTrack.coverUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full border border-neutral-800/80" />
                        <div className="absolute w-2 h-2 rounded-full bg-white z-20" />
                      </div>

                      {/* Equalizer animation bars */}
                      <div className="space-y-2">
                        <div className="flex items-end gap-1.5 h-10">
                          {[40, 75, 55, 90, 65, 80, 45, 95, 60, 85].map((h, i) => (
                            <span
                              key={i}
                              className={`w-1 rounded-full bg-amber-400 transition-all duration-300 ${
                                isPlaying ? 'animate-pulse' : 'opacity-30'
                              }`}
                              style={{
                                height: isPlaying ? `${Math.max(15, (h * (i % 2 === 0 ? 1 : 0.8)))}%` : '15%',
                                animationDelay: `${i * 80}ms`,
                              }}
                            />
                          ))}
                        </div>
                        <div className="px-2 py-1 rounded bg-black/60 border border-amber-500/20 text-[10px] font-mono text-amber-300 font-semibold inline-block">
                          HQ 320 KBPS • STEREO
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* Subtitle notice: Titre synchronisé directement depuis Youtube */}
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    Titre synchronisé directement depuis Youtube.
                  </span>
                  {currentTrack.youtubeId && (
                    <a
                      href={`https://youtu.be/${currentTrack.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Youtube className="w-3 h-3 text-red-500" />
                      <span>Voir sur YouTube</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Track Title and Artist Details */}
              <div className="pt-2 pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">
                      {currentTrack.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                      {currentTrack.artist}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                    {currentTrack.versionTag}
                  </span>
                </div>
              </div>

              {/* Progress Scrub Bar */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercent}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:accent-amber-300"
                />
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls Bar: Prev, Play/Pause, Next, Volume */}
              <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between gap-4">
                
                {/* Playback Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onPrevTrack}
                    className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                    title="Piste précédente"
                    id="btn-player-prev"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onTogglePlay}
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-transform hover:scale-105 active:scale-95"
                    title={isPlaying ? 'Pause' : 'Lecture'}
                    id="btn-player-play-pause"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-black" />
                    ) : (
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={onNextTrack}
                    className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                    title="Piste suivante"
                    id="btn-player-next"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume & Quality Badges */}
                <div className="flex items-center gap-3">
                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onToggleMute}
                      className="text-neutral-400 hover:text-white transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-neutral-500" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-amber-400" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                      className="w-16 sm:w-20 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                    />
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black border border-neutral-800 text-[10px] font-mono text-amber-300 font-bold">
                      HQ
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black border border-neutral-800 text-[10px] font-mono text-neutral-400">
                      MP3
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
