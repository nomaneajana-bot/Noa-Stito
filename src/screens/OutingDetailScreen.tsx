import React, { useState } from 'react';
import { ScreenId, OutingItem } from '../types';
import { IMAGES } from '../mockData';

interface OutingDetailScreenProps {
  outing: OutingItem;
  onNavigate: (screen: ScreenId) => void;
  onToggleRegistration: (outingId: string) => void;
}

export const OutingDetailScreen: React.FC<OutingDetailScreenProps> = ({
  outing,
  onNavigate,
  onToggleRegistration,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [isJoined, setIsJoined] = useState(outing.isRegistered);
  const [showMapsModal, setShowMapsModal] = useState(false);

  const handleToggleFav = () => {
    setIsSaved(!isSaved);
    showNotification(!isSaved ? 'Sortie ajoutée à tes favoris' : 'Sortie retirée de tes favoris');
  };

  const handleJoin = () => {
    const newState = !isJoined;
    setIsJoined(newState);
    onToggleRegistration(outing.id);
    showNotification(
      newState ? '🎉 Tu es inscrit(e) à cette sortie !' : 'Participation annulée'
    );
  };

  const showNotification = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-28 md:pb-16 pt-16 md:pt-20 px-4 md:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-surface px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-surface-container-high/20 animate-in fade-in slide-in-from-top-2 duration-200">
          {showToast}
        </div>
      )}

      {/* Desktop Responsive Grid: 12 cols (Left 7 cols: Content & Timeline, Right 5 cols: Metrics, Location & Sticky CTA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Media, Host, Spirit & Timeline */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Hero Photography Container with Golden Hour Tone */}
          <div className="relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden shadow-sm border border-surface-container-high/40">
            <div
              className="bg-cover bg-center w-full h-full transform hover:scale-105 transition-transform duration-700 ease-out"
              style={{ backgroundImage: `url('${outing.heroImage || IMAGES.anfaSunset}')` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent"></div>

            {/* Floating Tag: Visibility Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-xs uppercase tracking-wide text-primary font-bold">
                Sortie publique · Ouverte à tous
              </span>
            </div>

            {/* Category / Vibe */}
            <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between">
              <div className="text-white">
                <span className="font-label-md text-xs uppercase tracking-wider text-primary-fixed block mb-0.5 font-bold">
                  Marche & Échange
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {outing.title}
                </h2>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-lowest/20 backdrop-blur-sm px-3 py-1 rounded-full text-white font-label-sm text-xs">
                <span className="material-symbols-outlined text-[15px]">place</span>
                <span>{outing.city}</span>
              </div>
            </div>
          </div>

          {/* Club & Host Banner */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 flex items-center justify-between shadow-xs border border-surface-container-high/50">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover"
                    alt="Portrait of Mehdi"
                    src={outing.host.avatar || IMAGES.mehdiAvatar}
                  />
                </div>
                {outing.host.verified && (
                  <span className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                    <span
                      className="material-symbols-outlined text-[10px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-label-lg text-sm font-bold text-on-surface truncate">
                    {outing.host.name}
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-[10px] font-semibold">
                    {outing.host.role}
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant truncate mt-0.5">
                  Pour le club <span className="text-primary font-semibold">{outing.clubName}</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('clubs')}
              className="px-3.5 py-1.5 rounded-full bg-surface-container-low text-primary font-label-md text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer shrink-0"
            >
              Voir club
            </button>
          </div>

          {/* Non-member Clarification Pill Callout */}
          <div className="px-3.5 py-2.5 rounded-2xl bg-surface-container-low flex items-center gap-2.5 border border-surface-container-high/40">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">info</span>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Tu n'as <span className="font-semibold text-on-surface">pas besoin</span> d'adhérer au club pour t'inscrire à cette session ouverte.
            </p>
          </div>

          {/* Purpose & Step-by-Step Run-down */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 space-y-5">
            <div>
              <h3 className="font-label-lg text-sm font-bold text-on-surface uppercase tracking-wide mb-1.5 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">psychology_alt</span>
                L'esprit de la sortie
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                {outing.description}
              </p>
            </div>

            {/* Step Timeline */}
            <div className="pt-2 border-t border-surface-container-high/40">
              <h3 className="font-label-lg text-sm font-bold text-on-surface uppercase tracking-wide mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                Au programme
              </h3>

              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-surface-container-high">
                {outing.timeline?.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div
                      className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-surface-container-lowest ${
                        idx === 2 ? 'bg-secondary' : 'bg-primary'
                      }`}
                    ></div>
                    <p className="font-label-md text-sm font-bold text-on-surface">
                      {step.time} · {step.title}
                    </p>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Educational Inset Card: Previewing Private Outings comparison */}
          <div className="bg-surface-container rounded-2xl p-4 shadow-xs border border-surface-container-high/60">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
              <h4 className="font-label-md text-xs uppercase tracking-wider font-bold text-on-surface-variant">
                Bon à savoir · Sorties de club
              </h4>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Cette sortie-ci est <strong className="text-on-surface">publique</strong>. Sur les sorties privées des clubs GRPD, le point GPS exact est masqué pour protéger le groupe :
            </p>

            {/* Simulated Concealed Private Outing Mockup snippet */}
            <div className="mt-3 bg-surface-container-lowest rounded-xl p-3 flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                  <span className="material-symbols-outlined text-[18px]">visibility_off</span>
                </div>
                <div>
                  <p className="font-label-sm text-xs font-bold text-on-surface">
                    Sortie réservée membres
                  </p>
                  <p className="font-body-sm text-[11px] text-outline">
                    Lieu exact réservé aux membres
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('invitations')}
                className="px-3 py-1 bg-surface-container-low text-primary rounded-full font-label-sm text-xs font-bold hover:bg-surface-container transition-colors cursor-pointer"
              >
                Adhérer au club
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Key Metrics, Calendar/Location, Attendees & Join CTA Card (5 cols on Desktop) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 lg:sticky lg:top-20">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface-container-lowest rounded-2xl p-3 flex flex-col justify-between shadow-xs border border-surface-container-high/50">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-[10px] uppercase font-bold">Distance</span>
                <span className="material-symbols-outlined text-[16px]">straighten</span>
              </div>
              <p className="mt-1 font-stat-metric text-2xl font-bold text-on-surface">
                {outing.distanceKm.toString().replace('.', ',')}
                <span className="font-label-md text-xs ml-0.5 text-on-surface-variant font-normal">
                  km
                </span>
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-3 flex flex-col justify-between shadow-xs border border-surface-container-high/50">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-[10px] uppercase font-bold">Rythme</span>
                <span className="material-symbols-outlined text-[16px]">directions_walk</span>
              </div>
              <p className="mt-1 font-headline-md text-lg font-bold text-on-surface">
                {outing.paceStr}
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-3 flex flex-col justify-between shadow-xs border border-surface-container-high/50">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-[10px] uppercase font-bold">Intensité</span>
                <span className="material-symbols-outlined text-[16px]">favorite</span>
              </div>
              <p className="mt-1 font-label-lg text-xs font-bold text-primary flex items-center">
                {outing.intensityStr}
              </p>
            </div>
          </div>

          {/* Time, Date and Interactive Location Map Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 flex flex-col gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">calendar_today</span>
              </div>
              <div className="flex-1">
                <p className="font-label-lg text-sm font-bold text-on-surface">{outing.dateStr}</p>
                <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                  Départ à <strong className="text-on-surface font-bold">{outing.departureTime}</strong> · RDV accueil dès{' '}
                  <strong className="text-on-surface font-bold">{outing.meetingTime}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-2 border-t border-surface-container-high/40">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">pin_drop</span>
              </div>
              <div className="flex-1">
                <p className="font-label-lg text-sm font-bold text-on-surface">{outing.location}</p>
                <p className="font-body-sm text-xs text-on-surface-variant">
                  {outing.meetingPointDetails || 'Devant la Grande Esplanade, près de la fontaine sèche.'}
                </p>
              </div>
            </div>

            {/* Static map interactive view */}
            <div
              className="relative w-full h-32 rounded-xl overflow-hidden mt-1 shadow-inner cursor-pointer group"
              onClick={() => setShowMapsModal(true)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('${outing.mapImage || IMAGES.mapAnfa}')` }}
              ></div>
              <div className="absolute bottom-2.5 right-2.5 bg-surface-container-lowest/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-on-surface font-label-sm text-xs flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-primary">navigation</span>
                <span className="font-semibold">Ouvrir dans Maps</span>
              </div>
            </div>
          </div>

          {/* Attendees & Remaining Spots */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-label-lg text-sm font-bold text-on-surface">
                  {outing.spotsBooked + (isJoined && !outing.isRegistered ? 1 : 0)} marcheurs inscrits
                </p>
                <p className="font-body-sm text-xs text-tertiary font-bold mt-0.5">
                  {outing.spotsTotal - (outing.spotsBooked + (isJoined && !outing.isRegistered ? 1 : 0))} places disponibles
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-xs font-bold">
                Confirmé
              </span>
            </div>

            {/* Avatars preview */}
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden py-1">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                  alt="Participant 1"
                  src={IMAGES.attendee1}
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                  alt="Participant 2"
                  src={IMAGES.attendee2}
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                  alt="Participant 3"
                  src={IMAGES.attendee3}
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-surface-container-lowest object-cover"
                  alt="Participant 4"
                  src={IMAGES.attendee4}
                />
                <div className="w-8 h-8 rounded-full bg-surface-container-high ring-2 ring-surface-container-lowest flex items-center justify-center text-on-surface-variant font-label-sm text-xs font-bold">
                  +10
                </div>
              </div>
              <span className="font-body-sm text-xs text-on-surface-variant ml-2 font-medium">
                Rejoins le groupe ce samedi !
              </span>
            </div>
          </div>

          {/* Desktop Direct Join Action Card */}
          <div className="hidden lg:flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl border border-surface-container-high/60 shadow-xs">
            <button
              aria-label="Enregistrer la sortie"
              className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface shadow-2xs hover:bg-surface-container-high transition-all shrink-0 cursor-pointer"
              onClick={handleToggleFav}
              title="Sauvegarder"
            >
              <span
                className={`material-symbols-outlined text-[22px] ${isSaved ? 'text-primary' : ''}`}
                style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isSaved ? 'bookmark' : 'bookmark_border'}
              </span>
            </button>

            <button
              className={`flex-1 h-12 rounded-full font-label-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                isJoined
                  ? 'bg-tertiary text-on-tertiary hover:opacity-90'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
              onClick={handleJoin}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: isJoined ? "'FILL' 1" : "'FILL' 0" }}
              >
                {isJoined ? 'check_circle' : 'person_add'}
              </span>
              <span>{isJoined ? 'Tu es inscrit(e) !' : 'Rejoindre la sortie'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom CTA Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl py-3 px-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-surface-container-high/60 lg:hidden">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            aria-label="Enregistrer la sortie"
            className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface shadow-sm active:scale-95 transition-all shrink-0 border border-surface-container-high cursor-pointer"
            onClick={handleToggleFav}
          >
            <span
              className={`material-symbols-outlined text-[22px] ${isSaved ? 'text-primary' : ''}`}
              style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isSaved ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          <button
            className={`flex-1 h-12 rounded-full font-label-lg text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all cursor-pointer ${
              isJoined
                ? 'bg-tertiary text-on-tertiary'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
            onClick={handleJoin}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isJoined ? "'FILL' 1" : "'FILL' 0" }}
            >
              {isJoined ? 'check_circle' : 'person_add'}
            </span>
            <span>{isJoined ? 'Tu es inscrit(e) !' : 'Rejoindre la sortie'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Maps Modal */}
      {showMapsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-3.5 border border-surface-container-high">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined text-[20px]">map</span>
                <span className="font-label-md text-sm">Point de rassemblement GPS</span>
              </div>
              <button
                onClick={() => setShowMapsModal(false)}
                className="text-on-surface-variant hover:text-on-surface w-8 h-8 rounded-full flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="w-full h-56 rounded-2xl overflow-hidden relative shadow-inner">
              <img
                src={outing.mapImage || IMAGES.mapAnfa}
                alt="Carte Anfa Park"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-surface-container-lowest/90 px-3 py-1.5 rounded-lg text-xs font-bold text-primary flex items-center gap-1.5 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                <span>Anfa Park Casablanca (33.5788° N, 7.6659° W)</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Rendez-vous devant la fontaine sèche centrale face à l'Esplanade de l'Aérodrome historique. Allées éclairées et parking disponible à proximité.
            </p>
            <button
              onClick={() => setShowMapsModal(false)}
              className="w-full h-11 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-semibold transition-all cursor-pointer"
            >
              Fermer la carte
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
