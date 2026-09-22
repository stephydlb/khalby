import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MainBentoSection } from './components/MainBentoSection';
import { ExclusiveAndCollectionsSection } from './components/ExclusiveAndCollectionsSection';
import { VideoSection } from './components/VideoSection';
import { GoldenCardSection } from './components/GoldenCardSection';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';
import { QrScanModal } from './components/QrScanModal';
import { AddYoutubeModal } from './components/AddYoutubeModal';
import { UserAccountModal } from './components/UserAccountModal';
import { CollectionsModal } from './components/CollectionsModal';
import { ExclusivePreviewModal } from './components/ExclusivePreviewModal';
import { INITIAL_TRACKS } from './data/artistData';
import { Track, CardTier } from './types';
import { audioEngine } from './utils/audioEngine';
import { Play, Pause, SkipForward, Disc3, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track>(INITIAL_TRACKS[0]); // Default to 'YELEH'
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [selectedPassTier, setSelectedPassTier] = useState<CardTier>('premium');
  
  // Modals state
  const [qrScanTier, setQrScanTier] = useState<CardTier | null>(null);
  const [isAddYoutubeOpen, setIsAddYoutubeOpen] = useState<boolean>(false);
  const [accountModalTab, setAccountModalTab] = useState<string | null>(null);
  const [isCollectionsModalOpen, setIsCollectionsModalOpen] = useState<boolean>(false);
  const [exclusiveModalItemId, setExclusiveModalItemId] = useState<string | null>(null);
  const [showStickyPlayer, setShowStickyPlayer] = useState<boolean>(false);

  // Monitor scroll for active section & sticky mini-player
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowStickyPlayer(scrollY > 550);

      const sections = ['accueil', 'musique', 'golden-access', 'exclusif', 'boutique'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.stop();
      setIsPlaying(false);
    } else {
      audioEngine.play(currentTrack.audioSampleType || 'afro-beat');
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    audioEngine.stop();
    audioEngine.play(track.audioSampleType || 'afro-beat');
    setIsPlaying(true);
  };

  const handleNextTrack = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    handleSelectTrack(tracks[nextIndex]);
  };

  const handlePrevTrack = () => {
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    handleSelectTrack(tracks[prevIndex]);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleAddTrack = (newTrack: Track) => {
    setTracks((prev) => [newTrack, ...prev]);
    handleSelectTrack(newTrack);
  };

  const handlePlayFeaturedVideo = (youtubeId: string) => {
    const matchingTrack = tracks.find((t) => t.youtubeId === youtubeId);
    if (matchingTrack) {
      handleSelectTrack(matchingTrack);
    }
    handleNavigate('musique');
  };

  const handleSelectTierFromBento = (tierId: CardTier) => {
    setSelectedPassTier(tierId);
    handleNavigate('golden-pass');
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-neutral-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Top Navigation - Strictly section links ONLY, no streaming links */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        isAudioPlaying={isPlaying}
        onToggleMasterMute={handleToggleMute}
        isMuted={isMuted}
        onOpenUserAccount={() => setAccountModalTab('profil')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section matching the Poster Mockup & Video */}
        <HeroSection
          onDiscoverUniverse={() => handleNavigate('golden-access')}
          onListenTracks={() => handleNavigate('musique')}
          onPlayFeaturedVideo={handlePlayFeaturedVideo}
        />

        {/* 2. Main 3-Column Bento Section exactly from the Poster:
               Col 1: Musique • Écoute & Télécharge
               Col 2: Golden Access (3 Tiers)
               Col 3: Mon Espace Golden (User Status & Quote) */}
        <MainBentoSection
          tracks={tracks}
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onSelectTrack={handleSelectTrack}
          onTogglePlay={handleTogglePlay}
          onNextTrack={handleNextTrack}
          onPrevTrack={handlePrevTrack}
          onOpenAddYoutubeModal={() => setIsAddYoutubeOpen(true)}
          onSelectTier={handleSelectTierFromBento}
          onOpenAccountModal={(tab) => setAccountModalTab(tab || 'profil')}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* 3. Lower Section from the Poster:
               Left: EXCLUSIF (Making-of, Photos inédites, Message de Khalby, Versions live)
               Right: LES COLLECTIONS (Physical artifacts showcase with button 'VOIR LES COLLECTIONS ->') */}
        <ExclusiveAndCollectionsSection
          onOpenExclusiveItem={(itemId) => setExclusiveModalItemId(itemId)}
          onOpenCollectionsModal={() => setIsCollectionsModalOpen(true)}
        />

        {/* 4. Video Clips Section (Chaîne Officielle YouTube from video 1 & 3) */}
        <VideoSection
          onSelectVideoForPlayer={(youtubeId) => {
            const track = tracks.find((t) => t.youtubeId === youtubeId);
            if (track) {
              handleSelectTrack(track);
            }
            handleNavigate('musique');
          }}
        />

        {/* 5. 3D Golden Pass & Collector Card Section (Recto & Verso with laser QR scan simulator) */}
        <GoldenCardSection
          activeTier={selectedPassTier}
          onSimulateQrScan={(tierId) => setQrScanTier(tierId)}
        />

        {/* 6. Interactive Gallery Section inspired by onaspaceship */}
        <GallerySection />
      </main>

      {/* Footer with VIP Newsletter, brand and copyright */}
      <Footer />

      {/* Floating Sticky Bottom Mini-Player */}
      {showStickyPlayer && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#10121a]/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl p-3 shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center justify-between gap-3 animate-fade-in">
          
          <div 
            onClick={() => handleNavigate('musique')}
            className="flex items-center gap-3 cursor-pointer min-w-0"
          >
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-amber-500/30">
              <img src={currentTrack.coverUrl} alt="" className="w-full h-full object-cover" />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Disc3 className="w-5 h-5 text-amber-400 animate-spin" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h5 className="text-xs font-bold text-white uppercase truncate">
                {currentTrack.title}
              </h5>
              <p className="text-[10px] text-amber-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleTogglePlay}
              className="w-9 h-9 rounded-xl bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 transition-colors shadow-md"
              title={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>

            <button
              onClick={handleNextTrack}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
              title="Suivant"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleToggleMute}
              className="p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
              title={isMuted ? 'Activer le son' : 'Couper le son'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-500" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
            </button>
          </div>

        </div>
      )}

      {/* Modal 1: QR Code Scanner & Secret Portal */}
      {qrScanTier && (
        <QrScanModal
          tierId={qrScanTier}
          onClose={() => setQrScanTier(null)}
        />
      )}

      {/* Modal 2: Add YouTube Video / Track */}
      {isAddYoutubeOpen && (
        <AddYoutubeModal
          onClose={() => setIsAddYoutubeOpen(false)}
          onAddTrack={handleAddTrack}
        />
      )}

      {/* Modal 3: Mon Espace Golden / User Account */}
      {accountModalTab && (
        <UserAccountModal
          initialTab={accountModalTab}
          onClose={() => setAccountModalTab(null)}
        />
      )}

      {/* Modal 4: Boutique / Les Collections */}
      {isCollectionsModalOpen && (
        <CollectionsModal
          onClose={() => setIsCollectionsModalOpen(false)}
          onSelectTierForPass={(tier) => {
            setSelectedPassTier(tier);
            handleNavigate('golden-pass');
          }}
        />
      )}

      {/* Modal 5: Exclusive Preview (Making-of, Photos, Message, Live) */}
      {exclusiveModalItemId && (
        <ExclusivePreviewModal
          itemId={exclusiveModalItemId}
          onClose={() => setExclusiveModalItemId(null)}
        />
      )}

    </div>
  );
}
