import React, { useState } from 'react';
import { X, User, Key, FolderHeart, ShieldCheck, Download, Play, Check, Eye } from 'lucide-react';

interface UserAccountModalProps {
  initialTab?: string;
  onClose: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  initialTab = 'profil',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1118] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:border-amber-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-black border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-white uppercase font-heading">
                MON ESPACE GOLDEN
              </h3>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold">
                VIP MEMBRE
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Khalby — The Golden • Portefeuille d'accès officiel
            </p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="grid grid-cols-4 gap-2 pt-4 pb-2 border-b border-neutral-800 text-xs font-mono font-bold">
          {[
            { id: 'profil', label: 'Profil', icon: User },
            { id: 'acces', label: 'Accès', icon: Key },
            { id: 'exclusifs', label: 'Exclusif', icon: FolderHeart },
            { id: 'collection', label: 'Collection', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-black font-extrabold shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content per tab */}
        <div className="py-6 min-h-[220px]">
          {activeTab === 'profil' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Identifiant Golden :</span>
                  <span className="font-mono text-amber-300 font-bold">#KHALBY-GLD-027</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Statut du Pass :</span>
                  <span className="font-mono text-green-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> ACTIF & VÉRIFIÉ
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Édition Détenue :</span>
                  <span className="font-bold text-white uppercase font-heading">
                    The Golden Deluxe (N° 027 / 100)
                  </span>
                </div>
              </div>

              <p className="text-xs text-neutral-400 italic">
                Votre compte est synchronisé avec les sessions privées et les accès prioritaires aux concerts de Khalby.
              </p>
            </div>
          )}

          {activeTab === 'acces' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Accès Audio Master 24-bit</h4>
                  <p className="text-[11px] text-neutral-400">Téléchargement illimité des stems et morceaux originaux.</p>
                </div>
                <span className="px-2 py-1 rounded bg-amber-500 text-black text-[10px] font-bold">DÉBLOQUÉ</span>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Portail Secret QR Scanner</h4>
                  <p className="text-[11px] text-neutral-400">Accès direct aux maquettes et messages studio.</p>
                </div>
                <span className="px-2 py-1 rounded bg-amber-500 text-black text-[10px] font-bold">DÉBLOQUÉ</span>
              </div>
            </div>
          )}

          {activeTab === 'exclusifs' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">AUDIO VOCAL</span>
                <p className="text-xs font-bold text-white">Note Privée Khalby</p>
                <p className="text-[11px] text-neutral-400">0:45 min • Studio Paris</p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">ARCHIVE</span>
                <p className="text-xs font-bold text-white">Planche Contact 35mm</p>
                <p className="text-[11px] text-neutral-400">12 clichés inédits</p>
              </div>
            </div>
          )}

          {activeTab === 'collection' && (
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-amber-500/40 flex items-center gap-4">
              <img
                src="/assets/golden_deluxe_box.jpg"
                alt="Coffret"
                className="w-16 h-16 rounded-xl object-cover border border-amber-500/30 shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-heading">
                  Coffret Deluxe — Numéro 027
                </h4>
                <p className="text-xs text-neutral-400">
                  Comprend : Carte métallique dorée + QR Code + CD 4 titres + Polo collector + Bracelet gravé.
                </p>
                <span className="text-[10px] font-mono text-amber-300 font-bold uppercase mt-1 inline-block">
                  Certifié Authentique • Khalby Official
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
