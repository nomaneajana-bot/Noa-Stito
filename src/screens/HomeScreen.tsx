import React, { useState } from 'react';
import { ScreenId, OutingItem } from '../types';
import { ALL_OUTINGS } from '../mockData';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSelectOuting: (outing: OutingItem) => void;
  outingsCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onSelectOuting,
  outingsCount,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'run' | 'walk' | 'dynamic_walk'>('all');

  const heroOuting = ALL_OUTINGS[1]; // Footing matinal & Sunrise

  // Filter nearby outings
  const nearbyOutings = ALL_OUTINGS.filter((o) => {
    if (activeFilter === 'all') return o.id !== heroOuting.id;
    if (activeFilter === 'run') return o.discipline === 'Course';
    if (activeFilter === 'walk') return o.discipline === 'Marche';
    if (activeFilter === 'dynamic_walk') return o.discipline === 'M. dynamique';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 md:pb-16 pt-16 md:pt-20 px-4 md:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* 1. Top Section: Header & Greeting + Desktop Summary Stats */}
      <section className="pt-2 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-surface-container-high/40 mb-6">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-medium">
            Vendredi 24 mai · Casablanca & Régions
          </span>
          <h1 className="font-headline-xl-mobile md:text-4xl text-headline-xl-mobile text-on-surface mt-0.5 tracking-tight font-bold">
            On sort ?
          </h1>
        </div>

        {/* Quiet Unboxed Activity Summary (Horizontal Bar on Mobile & Desktop) */}
        <div className="py-2 px-3 flex items-center justify-between gap-4 text-center bg-surface-container-low/80 rounded-2xl border border-surface-container-high/50 shadow-2xs">
          <button
            onClick={() => onNavigate('mes-sorties')}
            className="flex-1 min-w-[70px] flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[22px] md:text-2xl font-stat-metric text-on-surface font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors">
              {outingsCount}
            </span>
            <span className="text-[11px] font-body-sm text-on-surface-variant">à venir</span>
          </button>
          <div className="h-6 w-[1px] bg-surface-container-high shrink-0"></div>
          <button
            onClick={() => onNavigate('clubs')}
            className="flex-1 min-w-[70px] flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[22px] md:text-2xl font-stat-metric text-on-surface font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors">
              3
            </span>
            <span className="text-[11px] font-body-sm text-on-surface-variant">clubs</span>
          </button>
          <div className="h-6 w-[1px] bg-surface-container-high shrink-0"></div>
          <button
            onClick={() => onNavigate('mes-sorties')}
            className="flex-1 min-w-[70px] flex flex-col items-center hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <span className="text-[22px] md:text-2xl font-stat-metric text-on-surface font-semibold tracking-tight leading-tight group-hover:text-primary transition-colors">
              12
            </span>
            <span className="text-[11px] font-body-sm text-on-surface-variant">sorties réalisées</span>
          </button>
        </div>
      </section>

      {/* 2. Responsive Flexible Grid: 1 col on mobile, 12 cols on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Featured Hero Outing + Organiser Card (7 cols on Desktop) */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <h2 className="font-headline-md font-bold text-on-surface tracking-tight">
                Ta prochaine sortie confirmée
              </h2>
            </div>
            <span className="text-xs text-primary font-semibold hidden sm:inline">
              Place réservée
            </span>
          </div>

          <article className="relative flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-surface-container-high/60 transition-all duration-300">
            <div className="relative w-full h-44 sm:h-52 bg-surface-container overflow-hidden">
              <img
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                alt="Muted golden sunrise over the Atlantic Ocean along the Corniche Ouest in Casablanca"
                src={heroOuting.heroImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

              {/* Inscrit·e Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-md text-xs text-primary tracking-normal font-bold">
                  Inscrit·e
                </span>
              </div>

              {/* Bottom Info Ribbon */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 font-label-md text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>Départ 06:45 · RDV 06:35</span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-sm text-xs font-label-sm font-semibold tracking-wide text-white">
                  Course
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex flex-col">
                <h2 className="font-headline-md text-xl text-on-surface font-bold tracking-tight leading-snug">
                  {heroOuting.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-on-surface-variant font-body-sm text-sm">
                  <span className="font-semibold text-on-surface">{heroOuting.clubName}</span>
                  <span>•</span>
                  <span className="truncate">{heroOuting.location}, Corniche Ouest</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-container-high/60">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="w-6 h-6 rounded-full bg-primary-fixed ring-2 ring-surface-container-lowest flex items-center justify-center text-[10px] font-label-sm font-bold text-on-primary-fixed">
                      Y
                    </div>
                    <div className="w-6 h-6 rounded-full bg-tertiary-fixed ring-2 ring-surface-container-lowest flex items-center justify-center text-[10px] font-label-sm font-bold text-on-tertiary-fixed">
                      S
                    </div>
                    <div className="w-6 h-6 rounded-full bg-secondary-fixed ring-2 ring-surface-container-lowest flex items-center justify-center text-[10px] font-label-sm font-bold text-on-secondary-fixed">
                      M
                    </div>
                  </div>
                  <span className="font-body-sm text-xs text-on-surface-variant font-medium">
                    {heroOuting.spotsBooked} participants confirmés
                  </span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-xs font-bold bg-surface-container text-on-surface-variant">
                  {heroOuting.distanceKm} km · {heroOuting.paceStr}
                </span>
              </div>

              <button
                onClick={() => {
                  onSelectOuting(heroOuting);
                  onNavigate('outing-detail');
                }}
                className="w-full h-11 rounded-full bg-primary hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-on-primary font-label-md text-sm font-semibold shadow-sm min-h-[44px] cursor-pointer mt-1"
                type="button"
              >
                <span>Voir la sortie</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </article>

          {/* Action Card: Organiser une sortie */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/70 hover:bg-surface-container transition-all flex items-center justify-between gap-4 shadow-2xs group">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]">add</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-sm text-on-surface font-bold leading-tight">
                  Organiser une sortie
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant truncate mt-0.5">
                  Propose un parcours pour ton club ou ouvert à tous
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('organise-outing')}
              className="px-4 py-2 rounded-full bg-primary text-on-primary hover:bg-primary-container font-label-md text-xs font-bold shrink-0 flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              <span>Créer</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Sorties à proximité (5 cols on Desktop) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              Sorties à proximité
            </h2>
            <button
              onClick={() => onNavigate('mes-sorties')}
              className="font-label-md text-xs text-primary hover:underline flex items-center gap-0.5 cursor-pointer font-semibold"
              type="button"
            >
              <span>Tout voir</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward_ios</span>
            </button>
          </div>

          {/* Filter chips row */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            <button
              className={`filter-pill h-8 px-3.5 rounded-full font-label-md text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
              onClick={() => setActiveFilter('all')}
              type="button"
            >
              <span>Tout</span>
            </button>

            <button
              className={`filter-pill h-8 px-3.5 rounded-full font-label-md text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                activeFilter === 'run'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
              onClick={() => setActiveFilter('run')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">directions_run</span>
              <span>Course</span>
            </button>

            <button
              className={`filter-pill h-8 px-3.5 rounded-full font-label-md text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                activeFilter === 'walk'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
              onClick={() => setActiveFilter('walk')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">nordic_walking</span>
              <span>Marche</span>
            </button>

            <button
              className={`filter-pill h-8 px-3.5 rounded-full font-label-md text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                activeFilter === 'dynamic_walk'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
              onClick={() => setActiveFilter('dynamic_walk')}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">speed</span>
              <span>Dynamique</span>
            </button>
          </div>

          {/* Outing List Cards */}
          <div className="flex flex-col space-y-3">
            {nearbyOutings.map((outing) => (
              <div
                key={outing.id}
                onClick={() => {
                  onSelectOuting(outing);
                  onNavigate('outing-detail');
                }}
                className="w-full text-left p-4 rounded-2xl bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 flex items-center justify-between gap-3 shadow-2xs hover:shadow-sm border border-surface-container-high/50 cursor-pointer group hover:-translate-y-0.5"
                role="button"
                tabIndex={0}
              >
                <div className="flex flex-col min-w-0 pr-1 flex-1">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-xs mb-0.5">
                    <span className="inline-flex items-center gap-1 text-primary font-bold">
                      <span className="material-symbols-outlined text-[14px]">
                        {outing.discipline === 'Course'
                          ? 'directions_run'
                          : outing.discipline === 'M. dynamique'
                          ? 'speed'
                          : 'nordic_walking'}
                      </span>
                      {outing.discipline}
                    </span>
                    <span>•</span>
                    <span>{outing.dateStr.split(' ')[0]} {outing.dateStr.split(' ')[1]}, {outing.timeStr}</span>
                  </div>

                  <h3 className="font-headline-md text-base leading-tight text-on-surface font-bold truncate group-hover:text-primary transition-colors">
                    {outing.title}
                  </h3>

                  <div className="flex items-center gap-1.5 mt-1 font-body-sm text-xs text-on-surface-variant">
                    <span className="truncate">{outing.clubName}</span>
                    <span>•</span>
                    <span className="shrink-0">{outing.location}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-[11px] font-semibold">
                      {outing.distanceKm} km · {outing.paceStr}
                    </span>
                    <span className="font-body-sm text-[11px] text-secondary font-bold">
                      {outing.spotsTotal - outing.spotsBooked} places disponibles
                    </span>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 text-on-surface-variant group-hover:text-on-primary group-hover:bg-primary transition-colors shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
