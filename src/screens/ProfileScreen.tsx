import React from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../mockData';

interface ProfileScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenContact: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <div className="flex flex-col w-full pb-28 md:pb-16 pt-16 md:pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* User Header Profile */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-xs border border-surface-container-high/50 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-container shadow-xs">
            <img
              src={IMAGES.mehdiAvatar}
              alt="Profil Mehdi"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary ring-2 ring-surface-container-lowest flex items-center justify-center text-white text-[10px] font-bold">
            ✓
          </span>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="font-headline-md text-xl sm:text-2xl font-bold text-on-surface">
                Mehdi Benjelloun
              </h1>
              <p className="font-body-sm text-xs sm:text-sm text-outline mt-0.5">
                Casablanca · Guide référent & Passionné de marche urbaine
              </p>
            </div>
            <button
              onClick={onOpenContact}
              className="px-4 py-2 rounded-full border border-surface-container-high hover:border-primary/60 text-xs font-bold text-primary hover:bg-surface-container-low transition-colors self-center sm:self-auto cursor-pointer"
            >
              Support & Contact
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            <span className="px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-sm text-xs font-bold">
              Membre Vérifié GRPD
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-xs font-semibold">
              Club Fondateur
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs font-semibold">
              Anfa Park & Corniche
            </span>
          </div>
        </div>
      </div>

      {/* Athletic Telemetry Grid (Hevy / Strava inspired) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-5">
        <div className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-surface-container-high/50 shadow-2xs">
          <span className="font-label-sm text-xs text-outline uppercase font-bold block">Distance</span>
          <span className="font-stat-metric text-2xl sm:text-3xl font-bold text-on-surface block mt-1">
            128<span className="text-sm text-outline font-normal">km</span>
          </span>
          <span className="text-[11px] text-primary font-bold">cette saison</span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-surface-container-high/50 shadow-2xs">
          <span className="font-label-sm text-xs text-outline uppercase font-bold block">Sorties</span>
          <span className="font-stat-metric text-2xl sm:text-3xl font-bold text-on-surface block mt-1">
            14
          </span>
          <span className="text-[11px] text-on-surface-variant font-semibold">terminées</span>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 text-center border border-surface-container-high/50 shadow-2xs">
          <span className="font-label-sm text-xs text-outline uppercase font-bold block">Clubs</span>
          <span className="font-stat-metric text-2xl sm:text-3xl font-bold text-on-surface block mt-1">
            3
          </span>
          <span className="text-[11px] text-secondary font-bold">1 administré</span>
        </div>
      </div>

      {/* 2-Column Responsive Layout on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 items-start">
        {/* LEFT COLUMN: Quick Navigation to Key App Screens */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 border border-surface-container-high/50 space-y-3 shadow-xs">
          <h2 className="font-label-md text-xs uppercase tracking-wider text-outline font-bold">
            Actions rapides & Modules
          </h2>

          <div className="space-y-1.5">
            <button
              onClick={() => onNavigate('organise-outing')}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                </div>
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Organiser une sortie
                  </span>
                  <span className="text-xs text-outline">Créer un nouveau parcours pour ton groupe</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px] group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => onNavigate('invitations')}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Invitations & Codes d'accès
                  </span>
                  <span className="text-xs text-outline">Gérer les demandes et rejoindre avec code</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px] group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => onNavigate('create-club')}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">groups</span>
                </div>
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Créer un club communautaire
                  </span>
                  <span className="text-xs text-outline">Fonder un nouveau groupe à Casablanca</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px] group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </button>

            <button
              onClick={onOpenContact}
              className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container-low transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">contact_support</span>
                </div>
                <div>
                  <span className="font-label-md text-sm font-bold text-on-surface block">
                    Formulaire de contact & Assistance
                  </span>
                  <span className="text-xs text-outline">Échanger avec l'équipe support GRPD</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline text-[20px] group-hover:translate-x-0.5 transition-transform">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Badges & Community Impact */}
        <div className="bg-surface-container-lowest rounded-3xl p-5 border border-surface-container-high/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-label-md text-xs uppercase tracking-wider text-outline font-bold">
              Badges de la communauté
            </h2>
            <span className="font-label-sm text-xs text-primary font-bold">4 débloqués</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-surface-container-low flex items-center gap-3 border border-surface-container-high/30">
              <span className="text-2xl">🌴</span>
              <div className="min-w-0">
                <span className="font-label-md text-xs font-bold text-on-surface block truncate">
                  Plein Air Anfa
                </span>
                <span className="text-[10px] text-outline">10 marches au parc</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-low flex items-center gap-3 border border-surface-container-high/30">
              <span className="text-2xl">🌅</span>
              <div className="min-w-0">
                <span className="font-label-md text-xs font-bold text-on-surface block truncate">
                  Sunrise Corniche
                </span>
                <span className="text-[10px] text-outline">Footing avant 07h</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-low flex items-center gap-3 border border-surface-container-high/30">
              <span className="text-2xl">🍵</span>
              <div className="min-w-0">
                <span className="font-label-md text-xs font-bold text-on-surface block truncate">
                  Thé & Partage
                </span>
                <span className="text-[10px] text-outline">Convivialité active</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-surface-container-low flex items-center gap-3 border border-surface-container-high/30">
              <span className="text-2xl">🧭</span>
              <div className="min-w-0">
                <span className="font-label-md text-xs font-bold text-on-surface block truncate">
                  Guide Certifié
                </span>
                <span className="text-[10px] text-outline">Animateur référent</span>
              </div>
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="bg-secondary-container/20 rounded-2xl p-4 border border-secondary-container/40 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-secondary block">Une question technique ?</span>
              <span className="text-xs text-on-surface-variant">L'équipe GRPD répond à toutes vos demandes.</span>
            </div>
            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold shrink-0 cursor-pointer hover:opacity-90"
            >
              Écrire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
