import React from 'react';
import { ScreenId } from '../types';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  myOutingsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  myOutingsCount = 2,
}) => {
  const isTabScreen = ['accueil', 'mes-sorties', 'clubs', 'profil'].includes(currentScreen);

  if (!isTabScreen) {
    return null;
  }

  const navItems: {
    id: ScreenId;
    label: string;
    icon: string;
    badge?: number;
  }[] = [
    { id: 'accueil', label: 'Accueil', icon: 'explore' },
    { id: 'mes-sorties', label: 'Mes sorties', icon: 'calendar_today', badge: myOutingsCount },
    { id: 'clubs', label: 'Clubs', icon: 'groups' },
    { id: 'profil', label: 'Profil', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.04)] border-t border-surface-container-high/60 md:hidden">
      <div className="flex justify-around items-center h-[54px] max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 transition-all relative cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 && item.id === 'mes-sorties' && (
                  <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[10px] uppercase tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
