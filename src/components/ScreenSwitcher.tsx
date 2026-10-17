import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenId; name: string; number: number; icon: string }[] = [
    { id: 'accueil', name: 'Accueil (On sort ?)', number: 1, icon: 'explore' },
    { id: 'outing-detail', name: 'Outing Detail (Marche)', number: 2, icon: 'directions_walk' },
    { id: 'mes-sorties', name: 'Mes Sorties & Désistement', number: 3, icon: 'calendar_month' },
    { id: 'clubs', name: 'Clubs (Les pas de Casa)', number: 4, icon: 'groups' },
    { id: 'organise-outing', name: 'Organise Outing (Créer sortie)', number: 5, icon: 'edit_calendar' },
    { id: 'invitations', name: 'Invitations & Validation', number: 6, icon: 'mail' },
    { id: 'create-club', name: 'Create Club (Nouvelle communauté)', number: 7, icon: 'add_circle' },
    { id: 'profil', name: 'Profil & Statistiques', number: 8, icon: 'person' },
    { id: 'contact', name: 'Formulaire de Contact & Support', number: 9, icon: 'contact_support' },
  ];

  return (
    <div className="fixed top-20 right-3 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-surface-container-high shadow-lg text-primary text-xs font-semibold hover:bg-surface-container-lowest transition-all cursor-pointer"
          title="Sélecteur rapide d'écran"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="font-label-sm uppercase tracking-wider">Écrans (7)</span>
          <span className="material-symbols-outlined text-[16px]">layers</span>
        </button>
      ) : (
        <div className="bg-surface-container-lowest/95 backdrop-blur-xl border border-surface-container-high rounded-2xl p-3 shadow-2xl w-64 max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">devices</span>
              <span className="font-label-md text-xs font-bold uppercase tracking-wider text-on-surface">
                Écrans de l'app
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-full hover:bg-surface-container flex items-center justify-center text-outline cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>

          <div className="space-y-1">
            {screens.map((s) => {
              const isCurrent = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    onSelectScreen(s.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-on-primary/20 text-on-primary'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    {s.number}
                  </span>
                  <span className="material-symbols-outlined text-[16px] shrink-0">
                    {s.icon}
                  </span>
                  <span className="truncate">{s.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-2 pt-2 border-t border-surface-container-high text-[10px] text-outline text-center">
            Reproduction fidèle aux designs GRPD
          </div>
        </div>
      )}
    </div>
  );
};
