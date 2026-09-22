import React, { useState } from 'react';
import { Camera, Eye, X, ZoomIn, Sparkles, Filter } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/artistData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['Tous', 'The Golden', 'Studio', 'Scène', 'Argentique'];

  const filteredPhotos = selectedCategory === 'Tous'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <section id="galerie" className="py-16 md:py-24 border-b border-amber-900/20 bg-[#0b0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Camera className="w-4 h-4 text-amber-400" />
              <span>ARCHIVES VISUELLES & CODES ESTHÉTIQUES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-heading">
              GALERIE INTERACTIVE
            </h2>
            <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
              Plongez dans les coulisses de la création, les sessions studio et l'univers photographique The Golden.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 bg-neutral-900 relative shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`relative ${photo.aspectRatio} w-full overflow-hidden`}>
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-neutral-700 text-[10px] font-mono font-bold text-amber-300 uppercase">
                    {photo.category}
                  </span>
                </div>

                {/* Bottom Caption on Hover */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h4 className="text-base font-bold text-white uppercase font-heading group-hover:text-amber-300 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                    {photo.caption}
                  </p>
                </div>

                {/* Center zoom icon on hover */}
                <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-xl">
                  <ZoomIn className="w-5 h-5" />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#111218] rounded-2xl border border-amber-500/40 overflow-hidden shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase">
                  {activePhoto.category}
                </span>
                <h3 className="text-base font-bold text-white uppercase font-heading">
                  {activePhoto.title}
                </h3>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo display */}
            <div className="relative max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            {/* Modal Caption */}
            <div className="p-4 bg-[#14151e] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
              <p className="italic">
                « {activePhoto.caption} »
              </p>
              <span className="font-mono text-amber-400 font-bold">
                Édition {activePhoto.date}
              </span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
