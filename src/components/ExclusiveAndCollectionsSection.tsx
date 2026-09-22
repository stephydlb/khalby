import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, Image as ImageIcon, MessageSquare, Radio, Check, X, Shield, ShoppingBag } from 'lucide-react';

interface ExclusiveAndCollectionsSectionProps {
  onOpenExclusiveItem: (type: string) => void;
  onOpenCollectionsModal: () => void;
}

export const ExclusiveAndCollectionsSection: React.FC<ExclusiveAndCollectionsSectionProps> = ({
  onOpenExclusiveItem,
  onOpenCollectionsModal,
}) => {
  const exclusiveItems = [
    {
      id: 'making-of',
      title: 'Making-of',
      desc: 'Dans les coulisses du projet...',
      tag: 'VIDÉO 4K',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
      icon: Play,
    },
    {
      id: 'photos',
      title: 'Photos inédites',
      desc: 'Des clichés exclusifs de session.',
      tag: '12 PHOTOS',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
      icon: ImageIcon,
    },
    {
      id: 'message',
      title: 'Message de Khalby',
      desc: 'Un mot intime pour toi.',
      tag: 'AUDIO VOCAL',
      image: '/assets/khalby_portrait.jpg',
      icon: MessageSquare,
    },
    {
      id: 'versions-live',
      title: 'Versions live',
      desc: 'Une autre énergie, la même âme.',
      tag: 'MASTER 24B',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      icon: Radio,
    },
  ];

  return (
    <section id="exclusif" className="py-14 bg-[#0a0b0f] border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Two main segments from the poster: EXCLUSIF and LES COLLECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================
              LEFT: EXCLUSIF (lg:col-span-7)
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RÉSERVÉ AUX MEMBRES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading mt-1">
                EXCLUSIF
              </h2>
              <p className="text-sm text-neutral-400">
                Des contenus que tu ne retrouveras nulle part ailleurs.
              </p>
            </div>

            {/* 4 Cards Grid from the poster */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exclusiveItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => onOpenExclusiveItem(item.id)}
                    className="group relative rounded-xl overflow-hidden border border-neutral-800 bg-[#12141c] hover:border-amber-500/50 transition-all cursor-pointer p-4 flex flex-col justify-between min-h-[170px] shadow-lg"
                  >
                    {/* Background image preview with darkened gradient */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-25 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/80 to-transparent" />
                    </div>

                    {/* Top tag & icon */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-black/70 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-300 uppercase">
                        {item.tag}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom title & link */}
                    <div className="relative z-10 pt-4">
                      <h4 className="text-base font-black text-white group-hover:text-amber-300 transition-colors uppercase font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-300 mt-0.5 line-clamp-1">
                        {item.desc}
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300">
                        <span>Voir</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              RIGHT: LES COLLECTIONS (BOUTIQUE) (lg:col-span-5)
             ======================================================== */}
          <div id="boutique" className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>BOUTIQUE & ÉDITIONS LIMITÉES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-heading mt-1">
                LES COLLECTIONS
              </h2>
              <p className="text-sm text-neutral-400">
                Trois façons de vivre l'expérience The Golden.
              </p>
            </div>

            {/* Showcase Container matching the poster */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-[#16140e] via-[#0f1118] to-black p-5 space-y-5 shadow-2xl relative overflow-hidden group">
              
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

              {/* Artifacts visual showcase preview */}
              <div className="relative aspect-video sm:aspect-[16/10] rounded-xl overflow-hidden border border-amber-500/30 bg-black flex items-center justify-center">
                <img
                  src="/assets/golden_deluxe_box.jpg"
                  alt="Coffret The Golden Deluxe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                      ÉDITION LIMITÉE (100 EX.)
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-white font-heading uppercase">
                      COFFRET GOLDEN DELUXE
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-extrabold uppercase">
                    COLLECTOR
                  </span>
                </div>
              </div>

              {/* Physical items included list */}
              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-300 font-mono">
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-amber-400">✓</span> Coffret Noir & Or
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-amber-400">✓</span> CD 4 Titres Master
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-amber-400">✓</span> Carte Numérotée
                </div>
                <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-amber-400">✓</span> Polo & Bracelet
                </div>
              </div>

              {/* CTA Button strictly as written on the poster: 'VOIR LES COLLECTIONS ->' */}
              <button
                onClick={onOpenCollectionsModal}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                id="btn-view-collections"
              >
                <span>VOIR LES COLLECTIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
