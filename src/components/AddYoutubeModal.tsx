import React, { useState } from 'react';
import { X, Youtube, Plus, Sparkles, Check } from 'lucide-react';
import { Track } from '../types';

interface AddYoutubeModalProps {
  onClose: () => void;
  onAddTrack: (track: Track) => void;
}

export const AddYoutubeModal: React.FC<AddYoutubeModalProps> = ({ onClose, onAddTrack }) => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [versionTag, setVersionTag] = useState('DIRECT YOUTUBE');
  const [error, setError] = useState<string | null>(null);

  // Helper to extract YouTube video ID from various URL formats
  const extractYoutubeId = (url: string): string | null => {
    const trimmed = url.trim();
    if (!trimmed) return null;

    // Direct ID (11 chars)
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = trimmed.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractYoutubeId(youtubeUrl);
    if (!id) {
      setError('Veuillez entrer une URL YouTube valide ou un ID de vidéo (ex: 7uJA4jA_FDU).');
      return;
    }

    const finalTitle = title.trim() || `Titre YouTube (${id})`;

    const newTrack: Track = {
      id: `custom-yt-${Date.now()}`,
      title: finalTitle.toUpperCase(),
      artist: 'Khalby • OFFICIEL',
      versionTag: versionTag.toUpperCase(),
      duration: '3:30',
      durationSeconds: 210,
      youtubeId: id,
      coverUrl: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      audioSampleType: 'afro-beat',
    };

    onAddTrack(newTrack);
    onClose();
  };

  const handleQuickPreset = (presetId: string, presetTitle: string, tag: string) => {
    setYoutubeUrl(`https://youtu.be/${presetId}`);
    setTitle(presetTitle);
    setVersionTag(tag);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#111218] rounded-2xl border border-amber-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center">
              <Youtube className="w-4 h-4 fill-red-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight font-heading">
                AJOUTER UN LIEN YOUTUBE
              </h3>
              <p className="text-xs text-neutral-400">
                Synchronisez n'importe quelle vidéo de Khalby dans votre lecteur
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets from Khalby's official catalogue */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-amber-400 uppercase font-bold tracking-wider">
            Raccourcis officiels de Khalby :
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickPreset('7uJA4jA_FDU', 'YELEH (Clip Officiel)', 'CLIP OFFICIEL')}
              className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-amber-500/50 hover:bg-neutral-800 text-left transition-colors"
            >
              <div className="font-bold text-white">YELEH</div>
              <div className="text-[10px] text-neutral-400 font-mono">Clip Officiel HD</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset('0OuJLqKhSGo', "DOUBLE RAISON D'ÊTRE", 'VISUALIZER')}
              className="p-2.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:border-amber-500/50 hover:bg-neutral-800 text-left transition-colors"
            >
              <div className="font-bold text-white">DOUBLE RAISON</div>
              <div className="text-[10px] text-neutral-400 font-mono">Visualizer 4K</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 font-bold uppercase">
              URL DE LA VIDÉO YOUTUBE OU IDENTIFIANT :
            </label>
            <input
              type="text"
              placeholder="https://youtu.be/7uJA4jA_FDU"
              value={youtubeUrl}
              onChange={(e) => {
                setYoutubeUrl(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
              required
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 font-bold uppercase">
              TITRE DU MORCEAU :
            </label>
            <input
              type="text"
              placeholder="Ex: NOUVEAU FREESTYLE GOLDEN"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-sm focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-neutral-300 font-bold uppercase">
              BADGE DE VERSION :
            </label>
            <select
              value={versionTag}
              onChange={(e) => setVersionTag(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 text-white text-sm focus:outline-none focus:border-amber-400"
            >
              <option value="DIRECT YOUTUBE">DIRECT YOUTUBE</option>
              <option value="SINGLE OFFICIEL">SINGLE OFFICIEL</option>
              <option value="CLIP OFFICIEL">CLIP OFFICIEL</option>
              <option value="LIVE ACOUSTIQUE">LIVE ACOUSTIQUE</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-neutral-800 text-xs font-bold text-neutral-400 hover:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter & Écouter</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
