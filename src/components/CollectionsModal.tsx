import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { CardTier } from '../types';

interface CollectionsModalProps {
  onClose: () => void;
  onSelectTierForPass: (tierId: CardTier) => void;
}

export const CollectionsModal: React.FC<CollectionsModalProps> = ({
  onClose,
  onSelectTierForPass,
}) => {
  const [orderedTier, setOrderedTier] = useState<string | null>(null);

  const collections = [
    {
      id: 'standard',
      name: 'GOLDEN CARD',
      subtitle: 'STANDARD ACCESS',
      edition: 'Édition Illimitée',
      badge: 'NUMÉRIQUE & PHYSIQUE',
      desc: 'Accès essentiel à l’univers The Golden avec carte officielle et QR Code.',
      included: [
        'Carte officielle Golden (format portefeuille)',
        'QR Code individuel sécurisé',
        'Accès permanent au portail audio',
        'Téléchargement Master MP3 320kbps',
      ],
      price: '19,99 €',
    },
    {
      id: 'premium',
      name: 'GOLDEN EDITION',
      subtitle: 'PREMIUM EXPERIENCE',
      edition: 'Tirage 500 Exemplaires',
      badge: 'BEST SELLER',
      desc: 'Pour les passionnés : boîtier rigide noir mat, carte embossée dorée et accès anticipé.',
      included: [
        'Boîtier collector texturé noir & or',
        'Carte métallique premium embossée',
        'Accès anticipé aux prochaines sorties',
        'Making-of vidéo 4K & archives studio',
        'Message vocal exclusif de Khalby',
      ],
      price: '49,99 €',
      highlighted: true,
    },
    {
      id: 'deluxe',
      name: 'GOLDEN DELUXE',
      subtitle: 'ULTIMATE COLLECTOR',
      edition: '100 Exemplaires Seulement',
      badge: 'NUMÉROTÉ 001 - 100',
      desc: 'Le coffret absolu : CD 4 titres, polo exclusif, bracelet gravé et signature manuscrite.',
      included: [
        'Coffret de luxe grand format avec dorure à chaud',
        'CD Physique 4 titres (Master 24-bit Flac & WAV)',
        'Carte numérotée certifiée de 001 à 100',
        'Polo officiel The Golden brodé',
        'Bracelet signature The Golden',
        'Dédicace manuscrite personnalisée de Khalby',
        'Invitations aux sessions privées et balances concert',
      ],
      price: '149,99 €',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#0d0f16] border border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.95)] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-400 hover:text-white hover:border-amber-400 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 pb-8 border-b border-neutral-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>BOUTIQUE OFFICIELLE THE GOLDEN</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
            LES TROIS COLLECTIONS
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300">
            Trois façons uniques de vivre et posséder l'expérience musicale The Golden de Khalby.
          </p>
        </div>

        {orderedTier ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-400 animate-bounce">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase font-heading">
              Réservation Enregistrée !
            </h3>
            <p className="text-sm text-neutral-300 max-w-md mx-auto">
              Votre intérêt pour la collection <span className="text-amber-300 font-bold uppercase">{orderedTier}</span> a été noté. Vous recevrez le lien de paiement prioritaire et le certificat d'attribution par e-mail.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={() => {
                  onSelectTierForPass(orderedTier as CardTier);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-wider"
              >
                Tester la Carte 3D & Scanner le QR
              </button>
              <button
                onClick={() => setOrderedTier(null)}
                className="px-6 py-2.5 rounded-xl bg-neutral-800 text-white text-xs font-bold uppercase"
              >
                Retour
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {collections.map((col) => (
              <div
                key={col.id}
                className={`rounded-2xl p-5 flex flex-col justify-between transition-all relative ${
                  col.highlighted
                    ? 'bg-gradient-to-b from-[#1c170e] via-[#12141c] to-[#0c0d12] border-2 border-amber-500/80 shadow-[0_0_30px_rgba(245,158,11,0.2)] md:-translate-y-2'
                    : 'bg-[#12141c] border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {col.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest font-mono">
                    RECOMMANDÉ
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold tracking-wider uppercase">
                      {col.badge}
                    </span>
                    <h3 className="text-lg font-black text-white uppercase font-heading">
                      {col.name}
                    </h3>
                    <p className="text-[11px] font-mono text-neutral-400 uppercase">
                      {col.subtitle}
                    </p>
                  </div>

                  <div className="text-2xl font-black text-amber-300 font-mono">
                    {col.price}
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {col.desc}
                  </p>

                  <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">Inclus dans le pack :</span>
                    <ul className="text-xs text-neutral-300 space-y-1.5">
                      {col.included.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setOrderedTier(col.id)}
                    className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                      col.highlighted
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-lg hover:scale-105'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                    }`}
                  >
                    <span>Commander</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
