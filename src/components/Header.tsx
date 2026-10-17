import React, { useState } from 'react';
import { ScreenId } from '../types';
import { CITIES } from '../mockData';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onBack?: () => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenContact: () => void;
  myOutingsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onBack,
  selectedCity,
  onSelectCity,
  onOpenContact,
  myOutingsCount = 2,
}) => {
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Subpage titles
  const subpageTitles: Partial<Record<ScreenId, string>> = {
    'outing-detail': 'Outing Detail',
    'organise-outing': 'Organise Outing',
    invitations: 'Invitations',
    'create-club': 'Create Club',
  };

  const isSubpage = Boolean(subpageTitles[currentScreen]);

  const navLinks: { id: ScreenId; label: string; icon: string; badge?: number }[] = [
    { id: 'accueil', label: 'Accueil', icon: 'explore' },
    { id: 'mes-sorties', label: 'Mes sorties', icon: 'calendar_today', badge: myOutingsCount },
    { id: 'clubs', label: 'Clubs', icon: 'groups' },
    { id: 'organise-outing', label: 'Organiser', icon: 'add_circle' },
    { id: 'invitations', label: 'Invitations', icon: 'mail' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60 transition-all">
        <div className="h-14 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* LEFT ZONE: Brand or Mobile Back */}
          <div className="flex items-center gap-3">
            {isSubpage ? (
              <button
                className="min-w-[44px] min-h-[44px] flex items-center text-primary active:opacity-70 transition-opacity cursor-pointer group"
                onClick={onBack || (() => onNavigate('accueil'))}
                aria-label="Retour"
              >
                <span className="material-symbols-outlined text-[24px] group-hover:-translate-x-0.5 transition-transform">
                  arrow_back_ios_new
                </span>
                <span className="font-body-md text-body-md text-primary ml-1 font-medium">Retour</span>
              </button>
            ) : (
              <div
                className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => onNavigate('accueil')}
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-on-primary text-[20px]">directions_run</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-md text-headline-md font-bold tracking-tight text-on-surface leading-none">
                    GRPD
                  </span>
                  <span className="hidden md:inline text-[10px] font-label-sm uppercase tracking-widest text-primary font-bold">
                    Maroc
                  </span>
                </div>
              </div>
            )}

            {/* Mobile Subpage Title in Center / Left */}
            {isSubpage && (
              <h1 className="font-label-lg text-label-lg font-bold tracking-tight uppercase text-on-surface truncate px-2 md:hidden">
                {subpageTitles[currentScreen]}
              </h1>
            )}
          </div>

          {/* DESKTOP CENTER ZONE: Navigation links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{link.icon}</span>
                  <span>{link.label}</span>
                  {link.badge && link.badge > 0 && link.id === 'mes-sorties' && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-full font-label-md text-xs font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-[16px]">contact_support</span>
              <span>Contact</span>
            </button>
          </nav>

          {/* RIGHT ACTION ZONE */}
          <div className="flex items-center gap-2">
            {/* City Picker Dropdown */}
            <div className="relative">
              <button
                className="h-9 px-3 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors flex items-center gap-1 text-on-surface text-xs font-semibold cursor-pointer shadow-2xs"
                onClick={() => setShowCityPicker(!showCityPicker)}
                title="Changer de ville"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                <span className="font-label-md text-xs">{selectedCity}</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  {showCityPicker ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {showCityPicker && (
                <div className="absolute top-11 right-0 w-44 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[10px] font-label-sm uppercase tracking-wider text-outline font-bold">
                    Villes actives
                  </div>
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        onSelectCity(c);
                        setShowCityPicker(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCity === c
                          ? 'bg-secondary-container/30 text-primary font-bold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span>{c}</span>
                      {selectedCity === c && (
                        <span className="material-symbols-outlined text-[16px] text-primary">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <button
              className="w-9 h-9 relative flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer"
              onClick={() => setShowNotificationToast(true)}
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
            </button>

            {/* Contact Button (Desktop Highlight) */}
            <button
              onClick={onOpenContact}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border border-surface-container-high hover:border-primary/50 text-xs font-semibold text-primary transition-all cursor-pointer hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              <span>Support</span>
            </button>

            {/* User Profile Avatar */}
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:scale-105 transition-transform"
              onClick={() => onNavigate('profil')}
              aria-label="Mon Profil"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm text-on-primary">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
            </button>

            {/* Mobile Menu Hamburger (Visible on small screens) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface cursor-pointer"
              aria-label="Menu principal"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden animate-in fade-in duration-150">
          <div className="fixed top-14 left-0 right-0 bg-surface-container-lowest border-b border-surface-container-high shadow-2xl p-5 space-y-4 animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-high/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[18px]">directions_run</span>
                </div>
                <div>
                  <span className="font-headline-md font-bold text-on-surface">GRPD Maroc</span>
                  <span className="text-[11px] text-outline block">Casablanca & Régions</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-primary bg-secondary-container/40 px-2.5 py-0.5 rounded-full">
                {selectedCity}
              </span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                    currentScreen === link.id
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'text-on-surface hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                  {link.badge && link.badge > 0 && link.id === 'mes-sorties' && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}

              <button
                onClick={() => {
                  onNavigate('create-club');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors ${
                  currentScreen === 'create-club'
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">group_add</span>
                <span>Créer un club</span>
              </button>

              <button
                onClick={() => {
                  onOpenContact();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 text-primary hover:bg-surface-container-low transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">contact_support</span>
                <span>Nous contacter / Support</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal Toast */}
      {showNotificationToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 max-w-xs w-full shadow-2xl border border-surface-container-high space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold font-label-md">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                <span>Notifications (1)</span>
              </div>
              <button
                onClick={() => setShowNotificationToast(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="bg-surface-container-low rounded-xl p-3 space-y-1">
              <p className="text-xs font-bold text-on-surface">Rappel de sortie</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Votre sortie <strong className="text-primary">Footing matinal & Sunrise</strong> est confirmée pour dimanche à 06:45 au Phare d'El Hank.
              </p>
            </div>
            <button
              onClick={() => {
                setShowNotificationToast(false);
                onNavigate('outing-detail');
              }}
              className="w-full h-10 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold transition-all cursor-pointer"
            >
              Voir la sortie
            </button>
          </div>
        </div>
      )}
    </>
  );
};
