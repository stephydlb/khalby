import React, { useState } from 'react';
import { 
  RotateCw, 
  QrCode, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  Radio, 
  Crown, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { CardTier } from '../types';
import { GOLDEN_TIERS } from '../data/artistData';

interface GoldenCardSectionProps {
  onSimulateQrScan: (tierId: CardTier) => void;
  activeTier?: CardTier;
}

export const GoldenCardSection: React.FC<GoldenCardSectionProps> = ({ 
  onSimulateQrScan,
  activeTier = 'premium'
}) => {
  const [selectedTier, setSelectedTier] = useState<CardTier>(activeTier);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sync if parent passes different tier
  React.useEffect(() => {
    if (activeTier) {
      setSelectedTier(activeTier);
    }
  }, [activeTier]);

  const currentTierData = GOLDEN_TIERS.find((t) => t.id === selectedTier) || GOLDEN_TIERS[1];

  const handleSelectTier = (tier: CardTier) => {
    setSelectedTier(tier);
    // Keep flip state or reset
  };

  return (
    <section id="golden-pass" className="py-16 md:py-24 border-b border-amber-900/20 bg-[#0a0b0f] relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top header row matching Video 2 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>THE GOLDEN COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
              OBJET PHYSIQUE : RECTO & VERSO
            </h2>
            <p className="text-sm text-neutral-400">
              Cliquez sur la carte pour retourner le verso ou simuler le scan du QR Code
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-neutral-400">
              Contact : <span className="text-amber-300 font-mono">stephkalubiaka@gmail.com</span>
            </span>
            <button
              onClick={() => onSimulateQrScan(selectedTier)}
              className="px-3.5 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>REJOINDRE</span>
            </button>
          </div>
        </div>

        {/* 3 Tier Selector Tabs matching Video 2 */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-xl max-w-full overflow-x-auto">
            {GOLDEN_TIERS.map((tier) => {
              const isCurrent = tier.id === selectedTier;
              return (
                <button
                  key={tier.id}
                  onClick={() => handleSelectTier(tier.id)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center gap-2 whitespace-nowrap ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-500/20 border border-amber-500/60 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  id={`tab-tier-${tier.id}`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    tier.id === 'standard' 
                      ? 'bg-green-400' 
                      : tier.id === 'premium' 
                      ? 'bg-amber-400' 
                      : 'bg-yellow-300'
                  }`} />
                  <span>{tier.tabLabel}</span>
                  <span className="text-[10px] opacity-75 font-mono">[{tier.tabBadge}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Display: Left = 3D Flippable Card, Right = Edition Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Flip Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            {/* 3D Card Container */}
            <div 
              className="w-full max-w-md perspective-1000 cursor-pointer select-none"
              onClick={() => setIsFlipped(!isFlipped)}
              id="golden-card-container"
            >
              <div 
                className={`relative w-full aspect-[1.586/1] rounded-2xl transition-transform duration-700 transform-style-3d shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                
                {/* ----------------- RECTO SIDE ----------------- */}
                <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/50 p-6 flex flex-col justify-between overflow-hidden backface-hidden bg-gradient-to-br from-[#1c1913] via-[#121316] to-[#0c0d10]">
                  
                  {/* Metallic Sheen diagonal line */}
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-amber-400/10 to-transparent rotate-45 pointer-events-none" />

                  {/* Top Row: Artist & Chip */}
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono">
                        ARTISTE OFFICIEL
                      </div>
                      <div className="text-2xl font-black text-white font-heading tracking-widest uppercase">
                        KHALBY
                      </div>
                    </div>

                    {/* Golden Microchip Graphic */}
                    <div className="w-12 h-10 rounded-md border border-amber-400/70 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-1 shadow-[0_0_10px_rgba(245,158,11,0.4)]">
                      <div className="w-full h-full border border-black/40 rounded flex flex-col justify-around px-1 py-0.5">
                        <div className="h-0.5 bg-black/40 w-full" />
                        <div className="flex justify-between">
                          <div className="w-2 h-2 rounded-full border border-black/40" />
                          <div className="w-2 h-2 rounded-full border border-black/40" />
                        </div>
                        <div className="h-0.5 bg-black/40 w-full" />
                      </div>
                    </div>
                  </div>

                  {/* Center: Edition Title & Serial Number */}
                  <div className="my-auto relative z-10">
                    <div className="text-xs text-amber-400/80 font-mono tracking-widest uppercase">
                      THE GOLDEN
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-amber-300 uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(245,158,11,0.3)]">
                      {currentTierData.title}
                    </div>

                    {currentTierData.cardSerialNumber && (
                      <div className="mt-1 text-sm font-mono font-bold text-amber-200/90 tracking-widest">
                        EXEMPLAIRE NUMÉROTÉ <span className="text-white bg-black/50 px-2 py-0.5 rounded border border-amber-500/30">{currentTierData.cardSerialNumber}</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Status & Flip hint */}
                  <div className="flex items-end justify-between relative z-10 pt-2 border-t border-amber-500/20">
                    <div>
                      <div className="text-[9px] text-neutral-500 uppercase font-mono">STATUT</div>
                      <div className="text-xs font-bold text-amber-400 tracking-wider font-mono">
                        {currentTierData.cardStatus}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-neutral-400 font-mono flex items-center gap-1 hover:text-amber-300">
                        CLIQUEZ POUR VERSO (SCAN) ↻
                      </span>
                    </div>
                  </div>

                </div>

                {/* ----------------- VERSO SIDE ----------------- */}
                <div className="absolute inset-0 rounded-2xl border-2 border-amber-500/50 p-6 flex flex-col justify-between overflow-hidden backface-hidden rotate-y-180 bg-gradient-to-br from-[#121316] via-[#1a1711] to-[#0c0d10]">
                  
                  {/* Top Bar: Scan to Enter */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <span className="text-xs font-bold text-amber-300 tracking-wider uppercase font-mono flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-amber-400" />
                      <span>SCAN TO ENTER</span>
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      VERSO OFFICIEL
                    </span>
                  </div>

                  {/* Center: Realistic QR Code and Destination */}
                  <div className="flex items-center gap-5 my-auto">
                    {/* QR Code Container */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white p-2 shrink-0 flex items-center justify-center shadow-lg relative group">
                      {/* Stylized QR Code Visual */}
                      <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="0" y="0" width="30" height="30" fill="#000" />
                        <rect x="5" y="5" width="20" height="20" fill="#fff" />
                        <rect x="9" y="9" width="12" height="12" fill="#000" />

                        <rect x="70" y="0" width="30" height="30" fill="#000" />
                        <rect x="75" y="5" width="20" height="20" fill="#fff" />
                        <rect x="79" y="9" width="12" height="12" fill="#000" />

                        <rect x="0" y="70" width="30" height="30" fill="#000" />
                        <rect x="5" y="75" width="20" height="20" fill="#fff" />
                        <rect x="9" y="79" width="12" height="12" fill="#000" />

                        {/* Random pattern data matrix cells */}
                        <rect x="36" y="8" width="6" height="6" fill="#000" />
                        <rect x="48" y="14" width="8" height="6" fill="#000" />
                        <rect x="40" y="26" width="6" height="10" fill="#000" />
                        <rect x="14" y="40" width="10" height="6" fill="#000" />
                        <rect x="30" y="44" width="8" height="8" fill="#000" />
                        <rect x="44" y="40" width="12" height="12" fill="#000" />
                        <rect x="62" y="38" width="6" height="10" fill="#000" />
                        <rect x="76" y="48" width="8" height="6" fill="#000" />
                        <rect x="36" y="66" width="10" height="6" fill="#000" />
                        <rect x="52" y="60" width="8" height="8" fill="#000" />
                        <rect x="68" y="72" width="12" height="6" fill="#000" />
                        <rect x="84" y="84" width="6" height="8" fill="#000" />
                        <rect x="44" y="80" width="8" height="12" fill="#000" />
                        {/* Center gold K badge in QR */}
                        <circle cx="50" cy="50" r="10" fill="#d97706" />
                        <text x="50" y="54" textAnchor="middle" fill="#000" fontSize="12" fontWeight="900">K</text>
                      </svg>
                    </div>

                    {/* Explanatory text beside QR */}
                    <div className="space-y-1">
                      <p className="text-[10px] text-amber-400 font-mono uppercase tracking-wider font-semibold">
                        LE QR CODE DONNE ACCÈS DIRECT À :
                      </p>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">
                        WELCOME TO THE GOLDEN WORLD
                      </h4>
                      <p className="text-[11px] text-neutral-400 leading-tight">
                        Lien permanent entre votre objet physique et l'univers numérique.
                      </p>
                    </div>
                  </div>

                  {/* Bottom Platforms sync */}
                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>Spotify • Apple Music • YouTube • Deezer</span>
                    <span className="text-amber-400 font-semibold">RECTO ↻</span>
                  </div>

                </div>

              </div>
            </div>

            {/* Action Buttons below the card as shown in video 2 */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all"
                id="btn-flip-card"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>{isFlipped ? 'Voir le RECTO' : 'Retourner le VERSO'}</span>
              </button>

              <button
                onClick={() => onSimulateQrScan(selectedTier)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all hover:scale-105 active:scale-95"
                id="btn-simulate-qr"
              >
                <QrCode className="w-4 h-4 fill-black" />
                <span>SIMULER LE SCAN DU QR</span>
              </button>
            </div>

          </div>

          {/* Right Column: Edition Details & Checklist matching Video 2 */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Edition Header Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase mb-2">
                <span>{currentTierData.editionBadge}</span>
              </div>

              <div className="text-xs font-mono text-neutral-400 tracking-wider">
                {currentTierData.subtitleIntro}
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading mt-1">
                {currentTierData.title}
              </h3>
            </div>

            {/* Tagline Quote */}
            {currentTierData.quote && (
              <blockquote className="p-3.5 rounded-xl border-l-4 border-amber-400 bg-neutral-900/60 text-amber-200 text-sm font-medium italic">
                {currentTierData.quote}
              </blockquote>
            )}

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
              {currentTierData.description}
            </p>

            {/* Checklist Section matching Video 2: CONTENU & FONCTIONNALITÉS DU QR CODE */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>CONTENU & FONCTIONNALITÉS DU QR CODE :</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentTierData.features.map((feat, index) => (
                  <div
                    key={index}
                    className="p-2.5 rounded-lg border border-neutral-800 bg-[#121319] flex items-start gap-2.5"
                  >
                    <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        {feat.label}
                      </div>
                      <div className="text-[11px] text-neutral-400 leading-tight">
                        {feat.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Status & Open Golden World CTA matching Video 2 */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-mono block">STATUT COMMERCIAL</span>
                <span className="text-xs font-semibold text-neutral-300">
                  {currentTierData.commercialStatus}
                </span>
              </div>

              <button
                onClick={() => onSimulateQrScan(selectedTier)}
                className="px-5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
                id="btn-open-golden-world"
              >
                <span>Ouvrir The Golden World</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
