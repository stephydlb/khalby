import React, { useState } from 'react';
import { Youtube, Play, ExternalLink, Sparkles, X } from 'lucide-react';
import { VIDEOS_DATA, ARTIST_INFO } from '../data/artistData';
import { VideoItem } from '../types';

interface VideoSectionProps {
  onSelectVideoForPlayer: (youtubeId: string, title: string) => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onSelectVideoForPlayer }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);

  return (
    <section id="videos" className="py-16 md:py-24 border-b border-amber-900/20 bg-[#0d0e13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching video 1 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-2">
              <Youtube className="w-4 h-4 fill-red-500" />
              <span>PRODUCTION AUDIOVISUELLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
              CHAÎNE OFFICIELLE YOUTUBE
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
              Visionnez les clips et sessions directement sur le site en haute fidélité.
            </p>
          </div>

          <a
            href={ARTIST_INFO.youtubeChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/40 hover:bg-red-600 hover:text-white text-red-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all"
          >
            <Youtube className="w-4 h-4" />
            <span>@KHALBY SUR YOUTUBE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIDEOS_DATA.map((video) => (
            <div
              key={video.id}
              className="group rounded-2xl border border-neutral-800 hover:border-amber-500/50 bg-[#121319] overflow-hidden transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col"
              id={`video-card-${video.id}`}
            >
              {/* Thumbnail Container */}
              <div 
                onClick={() => setActiveModalVideo(video)}
                className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-85 group-hover:brightness-95"
                />
                
                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase ${
                    video.badge === 'CLIP OFFICIEL'
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                      : 'bg-amber-500 text-black shadow-lg shadow-amber-900/50'
                  }`}>
                    {video.badge}
                  </span>
                </div>

                {/* Duration bottom-right */}
                <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 rounded bg-black/80 border border-neutral-700 text-[10px] font-mono text-neutral-300">
                  {video.duration}
                </div>

                {/* Center Hover Play Button */}
                <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.5)] transform scale-90 group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-black ml-0.5" />
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors uppercase">
                    {video.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    {video.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectVideoForPlayer(video.youtubeId, video.title)}
                    className="px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold transition-colors whitespace-nowrap"
                  >
                    Lire dans le lecteur
                  </button>
                  <button
                    onClick={() => setActiveModalVideo(video)}
                    className="p-2 rounded-lg border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white"
                    title="Plein écran"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Video Modal */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl border border-amber-500/40 overflow-hidden shadow-2xl">
            
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-600/30 text-red-300 uppercase mr-2">
                  {activeModalVideo.badge}
                </span>
                <span className="text-base font-bold text-white uppercase font-heading">
                  {activeModalVideo.title}
                </span>
              </div>

              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeModalVideo.youtubeId}?autoplay=1&enablejsapi=1`}
                title={activeModalVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-[#121319] flex items-center justify-between text-xs text-neutral-400">
              <span>Khalby • Univers The Golden</span>
              <a
                href={`https://youtu.be/${activeModalVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Ouvrir sur YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
