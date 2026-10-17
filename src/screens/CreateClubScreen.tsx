import React, { useState } from 'react';
import { ScreenId, ClubData } from '../types';
import { CITIES, IMAGES } from '../mockData';

interface CreateClubScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onClubCreated?: (newClub: ClubData) => void;
}

export const CreateClubScreen: React.FC<CreateClubScreenProps> = ({
  onNavigate,
  onClubCreated,
}) => {
  const [clubName, setClubName] = useState('Les pas de Casa');
  const [city, setCity] = useState('Casablanca');
  const [description, setDescription] = useState(
    "On marche chaque samedi matin le long de la Corniche d'Ain Diab, pause thé à la menthe incluse ! Allure décontractée, poussettes et débutants toujours bienvenus."
  );
  const [membership, setMembership] = useState<'public' | 'request' | 'private'>('public');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCreated(true);

      const createdClub: ClubData = {
        id: `club-${Date.now()}`,
        name: clubName,
        city,
        coverImage: IMAGES.clubCoverAnfa,
        description,
        memberCount: 1,
        activeStatus: 'Nouveau club actif',
        visibility: membership,
        isAdmin: true,
        inviteCode: `${clubName.slice(0, 4).toUpperCase()}-2025`,
        host: {
          name: 'Mehdi Benjelloun',
          role: 'Fondateur',
          avatar: IMAGES.mehdiAvatar,
          stats: 'Fondé aujourd’hui · Administrateur',
        },
        affinityGroups: [
          {
            id: 'group-conv',
            title: 'Échanges & papotages',
            description: 'Marcheurs du quartier',
            icon: 'forum',
            memberCount: 1,
            joined: true,
            bgColorClass: 'bg-surface-container-highest text-on-surface-variant',
          },
        ],
        members: [
          {
            id: 'm-founder',
            name: 'Mehdi Benjelloun',
            role: 'Fondateur',
            tag: 'Fondateur',
            initials: 'MB',
            distanceStr: '128 km',
            activeTimeStr: 'En ligne',
          },
        ],
      };

      if (onClubCreated) {
        onClubCreated(createdClub);
      }

      setTimeout(() => {
        onNavigate('clubs');
      }, 1500);
    }, 1200);
  };

  const isNameValid = clubName.trim().length >= 3;

  return (
    <div className="flex flex-col w-full pb-20 pt-16 md:pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Friendly Maghrebi Running/Walking Club Identity Banner */}
      <div className="w-full bg-surface-container-low rounded-3xl p-5 mb-6 shadow-2xs relative overflow-hidden border border-surface-container-high/50">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-full bg-primary-container/15 flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[30px]">groups</span>
          </div>
          <div className="min-w-0">
            <h2 className="font-headline-md text-xl sm:text-2xl text-on-surface leading-tight font-bold">
              Crée ta communauté
            </h2>
            <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mt-1">
              Donne un toit à tes sorties et rassemble tes coéquipiers à ton rythme dans ta ville.
            </p>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-fixed/20 pointer-events-none blur-2xl"></div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="create-club-form">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT FORM COLUMN: Identity & Description */}
          <div className="space-y-4">
            {/* 1. Nom du club */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-sm font-bold text-on-surface" htmlFor="club-name">
                  Nom du club
                </label>
                {isNameValid && (
                  <span className="font-label-sm text-xs text-primary flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    Valide
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <input
                  id="club-name"
                  type="text"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  placeholder="ex: Les pas de Casa, Marcheurs d'Anfa, Runners du soir"
                  className="w-full h-12 px-4 pr-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-sm placeholder:text-outline shadow-2xs border border-surface-container-high/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                {isNameValid && (
                  <span
                    className="material-symbols-outlined text-primary text-[20px] absolute right-3 pointer-events-none"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                )}
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Choisis un nom simple, mémorable et chaleureux.
              </p>
            </div>

            {/* 2. Ville principale */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-lg text-sm font-bold text-on-surface" htmlFor="club-city">
                Ville principale
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3 flex items-center pointer-events-none text-primary">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <select
                  id="club-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-12 pl-10 pr-10 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-sm appearance-none shadow-2xs border border-surface-container-high/50 focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
                </div>
              </div>
              <p className="font-body-sm text-xs text-on-surface-variant">
                Permet aux marcheurs et coureurs du coin de te découvrir.
              </p>
            </div>

            {/* 3. Vocation / Description libre */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-lg text-sm font-bold text-on-surface" htmlFor="club-desc">
                  Vocation & Esprit libre
                </label>
                <span className="font-label-sm text-xs text-outline">Facultatif</span>
              </div>
              <div className="relative">
                <textarea
                  id="club-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décris en toute liberté l'esprit du club, les envies de rencontres, les thèmes de discussion ou de balade..."
                  className="w-full p-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-sm placeholder:text-outline shadow-2xs border border-surface-container-high/50 resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-surface-container-low rounded-xl border border-surface-container-high/40">
                <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0 mt-0.5">
                  eco
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Pas de prérequis sportif imposé : marche culturelle, papotage, footing doux ou entraînement, tout est bienvenu.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM COLUMN: Membership Policies & Actions */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2.5">
              <label className="font-label-lg text-sm font-bold text-on-surface">
                Politique d'adhésion & Visibilité
              </label>

              <div className="flex flex-col gap-2.5" id="visibility-options">
                {/* Option A: Public */}
                <label
                  onClick={() => setMembership('public')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    membership === 'public'
                      ? 'bg-secondary-container/25 border-primary/50 shadow-xs'
                      : 'bg-surface-container-lowest border-surface-container-high/50 hover:bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      membership === 'public'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">public</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-sm font-bold text-on-surface">
                        Public & ouvert
                      </span>
                      {membership === 'public' && (
                        <span
                          className="material-symbols-outlined text-primary text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Tout le monde peut rejoindre instantanément via le lien ou l'annuaire de la ville.
                    </p>
                  </div>
                </label>

                {/* Option B: Sur demande */}
                <label
                  onClick={() => setMembership('request')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    membership === 'request'
                      ? 'bg-secondary-container/25 border-primary/50 shadow-xs'
                      : 'bg-surface-container-lowest border-surface-container-high/50 hover:bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      membership === 'request'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-sm font-bold text-on-surface">
                        Sur demande / validation
                      </span>
                      {membership === 'request' && (
                        <span
                          className="material-symbols-outlined text-primary text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Tu approuves chaque nouvel adhérent avant qu'il n'accède aux discussions et sorties.
                    </p>
                  </div>
                </label>

                {/* Option C: Privé */}
                <label
                  onClick={() => setMembership('private')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    membership === 'private'
                      ? 'bg-secondary-container/25 border-primary/50 shadow-xs'
                      : 'bg-surface-container-lowest border-surface-container-high/50 hover:bg-surface-container-low'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      membership === 'private'
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-label-lg text-sm font-bold text-on-surface">
                        Privé sur invitation
                      </span>
                      {membership === 'private' && (
                        <span
                          className="material-symbols-outlined text-primary text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                      Invisible dans la recherche, accessible uniquement avec un lien ou code d'invitation direct.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-tertiary">info</span>
              <p className="font-body-sm text-xs">
                La création de groupes internes est facultative et pourra se faire plus tard.
              </p>
            </div>

            {/* Validation / Progress State Banner */}
            {isSubmitting && (
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface-container text-on-surface shadow-xs border border-surface-container-high/40 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined animate-spin text-[20px] text-primary">
                    sync
                  </span>
                  <span className="font-headline-md text-sm font-bold text-primary">
                    Création de ton club...
                  </span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant text-center">
                  Redirection directe vers la fiche du nouveau club
                </p>
              </div>
            )}

            {isCreated && (
              <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-secondary-container/50 text-on-secondary-container font-label-md text-xs font-bold">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Club créé avec succès ! Redirection...</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isCreated}
            className="w-full h-13 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            type="button"
          >
            {isCreated ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check</span>
                <span>Club créé !</span>
              </>
            ) : isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Enregistrement...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>Créer le club</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
