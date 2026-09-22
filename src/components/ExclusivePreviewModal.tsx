import React from 'react';
import { X, Play, Image as ImageIcon, MessageSquare, Radio, Download, ShieldCheck } from 'lucide-react';

interface ExclusivePreviewModalProps {
  itemId: string | null;
  onClose: () => void;
}

export const ExclusivePreviewModal: React.FC<ExclusivePreviewModalProps> = ({ itemId, onClose }) => {
  if (!itemId) return null;

  const contentMap: Record<string, { title: string; subtitle: string; tag: string; body: React.ReactNode }> = {
    'making-of': {
      title: 'Making-of Vidéo — Session Studio',
      subtitle: 'Dans les coulisses de la création de The Golden à Paris',
      tag: 'VIDÉO 4K MASTER',
      body: (
        <div className="space-y-4">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-amber-500/30 bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/7uJA4jA_FDU?autoplay=1&controls=1"
              title="Khalby Making-of"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Plongez dans les nuits d'enregistrement de Khalby, la recherche des textures sonores, les arrangements vocaux et la genèse de l'univers visuel The Golden.
          </p>
        </div>
      ),
    },
    photos: {
      title: 'Archives Photographiques Inédites',
      subtitle: '12 tirages argentiques haute définition par le studio visuel',
      tag: 'ARGENTIQUE 35MM',
      body: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              '/assets/khalby_portrait.jpg',
              '/assets/golden_deluxe_box.jpg',
              'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
            ].map((img, idx) => (
              <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-neutral-700 bg-neutral-900 group">
                <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400">
            Clichés réservés exclusivement aux détenteurs du Pass Golden.
          </p>
        </div>
      ),
    },
    message: {
      title: 'Message Vocal Personnel de Khalby',
      subtitle: 'Enregistré spécialement pour la communauté The Golden',
      tag: 'AUDIO VOCAL EXCLUSIF',
      body: (
        <div className="p-6 rounded-2xl bg-[#16140e] border border-amber-500/40 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center mx-auto animate-pulse">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h4 className="text-base font-bold text-white uppercase font-heading">
            « Merci de faire partie de cette aventure. »
          </h4>
          <p className="text-xs text-neutral-300 max-w-md mx-auto italic">
            "Ce projet The Golden, c'est pas juste des chansons qu'on sort. C'est une vision, une façon d'avancer et de briller ensemble dans l'obscurité. Bienvenue dans l'univers."
          </p>
          <div className="pt-2 flex justify-center">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-amber-400 text-[11px] font-mono">
              Durée : 0:48 min • Audio HQ
            </span>
          </div>
        </div>
      ),
    },
    'versions-live': {
      title: 'Sessions Live Exclusives — Master Audio',
      subtitle: 'Prises acoustiques et live sessions directes du studio',
      tag: 'MASTER 24-BIT 96KHZ',
      body: (
        <div className="space-y-3">
          {[
            { name: 'YELEH (Acoustic Guitar & Vocals)', length: '3:15' },
            { name: 'DOUBLE RAISON D’ÊTRE (Sunset Live Rehearsal)', length: '4:10' },
            { name: 'BUKA — BRISER (Piano Solo Version)', length: '3:52' },
          ].map((v, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white uppercase">{v.name}</p>
                <p className="text-[10px] text-amber-400 font-mono">Session Acoustique Studio</p>
              </div>
              <span className="text-xs font-mono text-neutral-400">{v.length}</span>
            </div>
          ))}
        </div>
      ),
    },
  };

  const current = contentMap[itemId] || contentMap['making-of'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1118] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:border-amber-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 pb-6 border-b border-neutral-800">
          <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase">
            {current.tag}
          </span>
          <h3 className="text-2xl font-black text-white uppercase font-heading">
            {current.title}
          </h3>
          <p className="text-xs text-neutral-400">
            {current.subtitle}
          </p>
        </div>

        <div className="py-6">
          {current.body}
        </div>

        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
