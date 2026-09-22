import React, { useState, useEffect } from 'react';
import { X, QrCode, Play, Pause, Download, Sparkles, CheckCircle2, Lock, Unlock, Volume2 } from 'lucide-react';
import { CardTier } from '../types';
import { GOLDEN_TIERS } from '../data/artistData';
import { audioEngine } from '../utils/audioEngine';

interface QrScanModalProps {
  tierId: CardTier;
  onClose: () => void;
}

export const QrScanModal: React.FC<QrScanModalProps> = ({ tierId, onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [isPlayingVoiceNote, setIsPlayingVoiceNote] = useState(false);
  const [activeTab, setActiveTab] = useState<'audio' | 'photos' | 'certificat'>('audio');

  const tier = GOLDEN_TIERS.find((t) => t.id === tierId) || GOLDEN_TIERS[1];

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleVoiceNote = () => {
    if (isPlayingVoiceNote) {
      audioEngine.stop();
      setIsPlayingVoiceNote(false);
    } else {
      audioEngine.play('atmospheric');
      setIsPlayingVoiceNote(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#101117] rounded-3xl border border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden my-8">
        
        {/* Top Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-amber-400 uppercase">
                  SIMULATION DU SCAN DU QR CODE
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono font-bold">
                  {tier.editionBadge}
                </span>
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-heading">
                PORTAIL EXCLUSIF THE GOLDEN WORLD
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              audioEngine.stop();
              onClose();
            }}
            className="p-2 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {scanning ? (
            /* Scanning Animation */
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative w-28 h-28 rounded-2xl border-2 border-amber-400/80 p-3 bg-neutral-900 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                <QrCode className="w-16 h-16 text-amber-400/60" />
                {/* Laser scan line */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_#f59e0b] animate-bounce" />
              </div>
              <div>
                <p className="text-base font-bold text-white uppercase tracking-wider font-heading">
                  AUTHENTIFICATION DE VOTRE PASS EN COURS...
                </p>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Vérification du certificat de sécurité cryptographic {tier.cardStatus}
                </p>
              </div>
            </div>
          ) : (
            /* Unlocked Exclusive Content */
            <div className="space-y-6">
              
              {/* Unlock Success Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">
                      ACCÈS OFFICIEL VALIDÉ : {tier.title}
                    </h4>
                    <p className="text-xs text-neutral-300">
                      Bienvenue dans le salon secret de Khalby réservé aux détenteurs.
                    </p>
                  </div>
                </div>
                <span className="hidden sm:inline px-3 py-1 rounded bg-black/60 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                  SESSION VIP ACTIVE
                </span>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
                <button
                  onClick={() => setActiveTab('audio')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'audio'
                      ? 'bg-amber-500 text-black'
                      : 'text-neutral-400 hover:text-white bg-neutral-900'
                  }`}
                >
                  Archives & Notes Vocales
                </button>
                <button
                  onClick={() => setActiveTab('photos')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'photos'
                      ? 'bg-amber-500 text-black'
                      : 'text-neutral-400 hover:text-white bg-neutral-900'
                  }`}
                >
                  Planches Argentiques
                </button>
                <button
                  onClick={() => setActiveTab('certificat')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'certificat'
                      ? 'bg-amber-500 text-black'
                      : 'text-neutral-400 hover:text-white bg-neutral-900'
                  }`}
                >
                  Certificat d'Authenticité
                </button>
              </div>

              {/* Tab 1: Exclusive Audio & Voice Note */}
              {activeTab === 'audio' && (
                <div className="space-y-4">
                  {/* Voice Note from Khalby */}
                  <div className="p-4 rounded-xl border border-amber-500/30 bg-[#15161f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <button
                        onClick={handleToggleVoiceNote}
                        className="w-12 h-12 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0 hover:bg-amber-400 transition-colors shadow-lg"
                      >
                        {isPlayingVoiceNote ? (
                          <Pause className="w-5 h-5 fill-black" />
                        ) : (
                          <Play className="w-5 h-5 fill-black ml-0.5" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-600/20 text-red-300 font-bold uppercase">
                            EXCLUSIF
                          </span>
                          <h5 className="text-sm font-bold text-white uppercase">
                            Message Privé de Khalby
                          </h5>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          « Merci pour votre soutien dans The Golden. Voici la vision du projet. » (0:45)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Volume2 className={`w-4 h-4 ${isPlayingVoiceNote ? 'text-amber-400 animate-pulse' : 'text-neutral-500'}`} />
                      <span className="text-xs font-mono text-neutral-400">
                        {isPlayingVoiceNote ? 'Lecture...' : 'Écouter'}
                      </span>
                    </div>
                  </div>

                  {/* Secret Track Previews */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                      Titres inédits avant-première :
                    </h5>

                    <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-neutral-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                          01
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">OR NOIR (Studio Cut #2)</div>
                          <div className="text-xs text-neutral-400">Khalby • Master 24-bit 96kHz</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                        Débloqué
                      </span>
                    </div>

                    <div className="p-3 rounded-lg border border-neutral-800 bg-neutral-900/80 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-neutral-800 text-amber-400 flex items-center justify-center font-bold text-xs">
                          02
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">RYTHME SACRÉ (Acoustic Jam)</div>
                          <div className="text-xs text-neutral-400">Session live improvisée</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                        Débloqué
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Photos */}
              {activeTab === 'photos' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
                    'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
                  ].map((url, i) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden border border-neutral-800 relative group">
                      <img src={url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <span className="text-[10px] text-amber-300 font-mono">Planche #0{i+1} • Argentique</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Certificate */}
              {activeTab === 'certificat' && (
                <div className="p-6 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-neutral-900 via-black to-[#1a140a] text-center space-y-4">
                  <Sparkles className="w-8 h-8 text-amber-400 mx-auto" />
                  <h4 className="text-lg font-black text-amber-300 uppercase tracking-widest font-heading">
                    CERTIFICAT DE PROPRIÉTÉ NUMÉRIQUE & PHYSIQUE
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-lg mx-auto leading-relaxed">
                    Ce passe atteste que le détenteur possède l'accès certifié et immuable à l'univers The Golden de l'artiste Khalby. 
                    {tier.cardSerialNumber && ` Numéro de série de tirage : ${tier.cardSerialNumber}.`}
                  </p>
                  <div className="pt-2 font-mono text-[11px] text-amber-400/80">
                    HASH : 0x7B9A...KHALBY_GOLDEN_2026
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-neutral-400 font-mono">
            Univers The Golden • © 2026 Khalby
          </span>
          <button
            onClick={() => {
              audioEngine.stop();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Fermer le portail
          </button>
        </div>

      </div>
    </div>
  );
};
