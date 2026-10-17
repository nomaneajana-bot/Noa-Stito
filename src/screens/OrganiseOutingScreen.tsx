import React, { useState } from 'react';
import { ScreenId, ActivityFormat, OutingItem } from '../types';
import { IMAGES } from '../mockData';

interface OrganiseOutingScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onAddOuting: (newOuting: OutingItem) => void;
}

export const OrganiseOutingScreen: React.FC<OrganiseOutingScreenProps> = ({
  onNavigate,
  onAddOuting,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<ActivityFormat>('Marche');
  const [title, setTitle] = useState('Marche & conversation au coucher du soleil');
  const [ambiance, setAmbiance] = useState(
    "Prendre l'air, papoter et profiter de la fin de journée en marchant dans le parc."
  );
  const [pace, setPace] = useState(
    'Accueil 18:15 · Départ 18:30 · 4,5 km à allure libre · Fin vers 19:30 avec thé partagé.'
  );
  const [location, setLocation] = useState("Anfa Park, fontaine centrale face à l'Esplanade");
  const [date, setDate] = useState('Sam. 1 juin 2025');
  const [time, setTime] = useState('18:30 (RDV 18:15)');
  const [visibility, setVisibility] = useState<'public' | 'club'>('public');
  const [affinityGroup, setAffinityGroup] = useState('Conversation Anglais/Français');
  const [showConfirmationSheet, setShowConfirmationSheet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const newOuting: OutingItem = {
        id: `outing-${Date.now()}`,
        title,
        clubName: 'Les pas de Casa',
        clubId: 'club-pas-de-casa',
        discipline: selectedFormat,
        subType: selectedFormat === 'Course' ? 'Foulée collective' : 'Marche conviviale',
        dateStr: date,
        timeStr: '18:30',
        departureTime: '18:30',
        meetingTime: '18:15',
        location: location.split(',')[0],
        city: 'Casablanca',
        meetingPointDetails: location,
        distanceKm: selectedFormat === 'Course' ? 6.5 : 4.5,
        paceStr: selectedFormat === 'Course' ? '5:50/km' : '~4 km/h',
        intensityStr: selectedFormat === 'Course' ? 'Modérée' : 'Douce & libre',
        description: ambiance,
        scheduleDetails: pace,
        heroImage: IMAGES.anfaSunset,
        mapImage: IMAGES.mapOrganise,
        isRegistered: true,
        statusText: 'Inscrit·e',
        spotsTotal: 20,
        spotsBooked: 1,
        isPublic: visibility === 'public',
        host: {
          name: 'Mehdi Benjelloun',
          role: 'Guide & Créateur',
          avatar: IMAGES.mehdiAvatar,
          verified: true,
        },
      };

      onAddOuting(newOuting);
      setShowConfirmationSheet(true);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-20 pt-16 md:pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Top Club Context Selector */}
      <div className="mb-6">
        <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between border border-surface-container-high/50 shadow-2xs">
          <div className="flex items-center space-x-3.5 min-w-0">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-on-secondary-container text-[24px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                groups
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-xs uppercase text-outline font-bold">Organisée pour</p>
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className="font-headline-md text-lg sm:text-xl font-bold text-on-surface truncate">
                  Les pas de Casa
                </span>
                <span className="material-symbols-outlined text-outline text-[20px]">expand_more</span>
              </div>
            </div>
          </div>
          <span className="font-label-sm text-xs bg-surface-container px-3 py-1 rounded-full text-on-surface-variant font-bold border border-surface-container-high">
            Club officiel
          </span>
        </div>
      </div>

      {/* Form with 2-Column Responsive Desktop Grid */}
      <form onSubmit={handlePublish} className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT FORM COLUMN: Discipline & Content */}
          <div className="space-y-5">
            {/* 1. Discipline / Format */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 flex flex-col space-y-3">
              <label className="font-label-md text-xs uppercase text-outline font-bold">
                Discipline / Format
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Marche', 'Course', 'M. dynamique'] as ActivityFormat[]).map((fmt) => {
                  const isActive = selectedFormat === fmt;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`min-h-[44px] flex items-center justify-center rounded-full font-label-md text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="truncate">{fmt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Titre & Ambiance */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 flex flex-col space-y-4">
              <div>
                <label className="font-label-md text-xs uppercase text-outline block mb-1.5 font-bold" htmlFor="title">
                  Titre de la sortie
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex. Foulée matinale sur la Corniche"
                  className="w-full bg-surface-container-low text-on-surface font-body-md text-sm rounded-xl px-3.5 py-3 focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-high/40"
                  required
                />
              </div>

              <div>
                <label className="font-label-md text-xs uppercase text-outline block mb-1.5 font-bold" htmlFor="ambiance">
                  Objectif & Ambiance
                </label>
                <textarea
                  id="ambiance"
                  rows={2}
                  value={ambiance}
                  onChange={(e) => setAmbiance(e.target.value)}
                  placeholder="Quel esprit pour cette sortie ?"
                  className="w-full bg-surface-container-low text-on-surface font-body-md text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary resize-none border border-surface-container-high/40"
                />
              </div>

              <div>
                <label className="font-label-md text-xs uppercase text-outline block mb-1.5 font-bold" htmlFor="pace">
                  Déroulé & Rythme
                </label>
                <textarea
                  id="pace"
                  rows={2}
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  placeholder="Horaires, étapes, allure..."
                  className="w-full bg-surface-container-low text-on-surface font-body-md text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary resize-none border border-surface-container-high/40"
                />
              </div>
            </div>
          </div>

          {/* RIGHT FORM COLUMN: Location, Date & Visibility */}
          <div className="space-y-5">
            {/* 3. Rendez-vous & Lieu */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 flex flex-col space-y-3.5">
              <div>
                <label className="font-label-md text-xs uppercase text-outline block mb-1.5 font-bold">
                  Lieu exact de rencontre
                </label>
                <div className="flex items-center bg-surface-container-low rounded-xl px-3.5 py-3 space-x-2 border border-surface-container-high/40">
                  <span
                    className="material-symbols-outlined text-primary text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent text-on-surface font-body-md text-sm w-full focus:outline-none"
                  />
                </div>
              </div>

              {/* Static Map Preview */}
              <div
                className="w-full h-36 rounded-xl bg-surface-container-high relative overflow-hidden flex items-end p-3 bg-cover bg-center shadow-inner"
                style={{ backgroundImage: `url('${IMAGES.mapOrganise}')` }}
              >
                <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-lg px-3 py-1 flex items-center space-x-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-sm text-xs font-bold text-on-surface">
                    Point GPS validé · Anfa
                  </span>
                </div>
              </div>
            </div>

            {/* 4. Planification */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 flex flex-col space-y-3">
              <label className="font-label-md text-xs uppercase text-outline font-bold">
                Planification
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-surface-container-low p-3 rounded-xl flex items-center space-x-2.5 min-h-[44px]">
                  <span className="material-symbols-outlined text-outline text-[20px]">calendar_today</span>
                  <div className="min-w-0">
                    <span className="font-label-sm text-[10px] text-outline block font-bold">Date</span>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="font-body-md text-sm font-bold text-on-surface bg-transparent focus:outline-none w-full"
                    />
                  </div>
                </div>

                <div className="bg-surface-container-low p-3 rounded-xl flex items-center space-x-2.5 min-h-[44px]">
                  <span className="material-symbols-outlined text-outline text-[20px]">schedule</span>
                  <div className="min-w-0">
                    <span className="font-label-sm text-[10px] text-outline block font-bold">Départ</span>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="font-body-md text-sm font-bold text-on-surface bg-transparent focus:outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Visibilité & Groupe */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 flex flex-col space-y-3">
              <label className="font-label-md text-xs uppercase text-outline font-bold">
                Visibilité de la sortie
              </label>

              <div className="space-y-2">
                <label
                  onClick={() => setVisibility('public')}
                  className={`flex items-start space-x-3 p-3.5 rounded-xl cursor-pointer transition-colors border ${
                    visibility === 'public'
                      ? 'bg-surface-container border-primary/40'
                      : 'bg-surface-container-low border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={visibility === 'public'}
                    onChange={() => setVisibility('public')}
                    className="mt-0.5 accent-primary shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-label-lg text-sm font-bold text-on-surface">Publique</span>
                      <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-[10px] px-2 py-0.5 rounded-md font-bold">
                        Recommandé
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-snug">
                      Visible par tous les marcheurs à Casablanca, même non-membres.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setVisibility('club')}
                  className={`flex items-start space-x-3 p-3.5 rounded-xl cursor-pointer transition-colors border ${
                    visibility === 'club'
                      ? 'bg-surface-container border-primary/40'
                      : 'bg-surface-container-low border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="club"
                    checked={visibility === 'club'}
                    onChange={() => setVisibility('club')}
                    className="mt-0.5 accent-primary shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="font-label-lg text-sm font-bold text-on-surface">
                      Réservée aux membres du club
                    </span>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-snug">
                      Visible uniquement par les adhérents de Les pas de Casa.
                    </p>
                  </div>
                </label>
              </div>

              {/* Groupe d'affinité */}
              <div className="pt-2">
                <label className="font-label-sm text-[11px] text-outline font-bold uppercase block mb-1">
                  Groupe d'affinité (Optionnel)
                </label>
                <select
                  value={affinityGroup}
                  onChange={(e) => setAffinityGroup(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface font-body-md text-sm rounded-xl px-3 py-2.5 border border-surface-container-high/40 focus:outline-none focus:border-primary"
                >
                  <option value="Conversation Anglais/Français">Conversation Anglais/Français</option>
                  <option value="Marche douce & Poussettes">Marche douce & Poussettes</option>
                  <option value="Aucun">Aucun (général)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-sm uppercase tracking-wider font-bold flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Publication en cours...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">add_task</span>
                <span>Publier la sortie</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Success Confirmation Modal */}
      {showConfirmationSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl p-6 border border-surface-container-high flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center mb-3 text-on-secondary-container">
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>

            <h3 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface">
              Sortie publiée avec succès !
            </h3>
            <p className="font-body-md text-sm text-on-surface-variant mt-1 mb-5">
              Ta marche est prête. Les membres reçoivent une notification pour s'inscrire.
            </p>

            <div className="w-full bg-surface-container-low rounded-2xl p-4 flex items-center space-x-3.5 text-left mb-6 border border-surface-container-high/40">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary-fixed text-[22px]">
                  hiking
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-label-lg text-sm font-bold text-on-surface truncate block">
                  {title}
                </span>
                <span className="font-body-sm text-xs text-outline truncate block mt-0.5">
                  {date} à 18:30 · {location.split(',')[0]}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowConfirmationSheet(false);
                  onNavigate('outing-detail');
                }}
                className="flex-1 h-12 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-xs uppercase tracking-wide font-bold flex items-center justify-center shadow-sm cursor-pointer transition-colors"
              >
                Voir la sortie
              </button>
              <button
                onClick={() => {
                  setShowConfirmationSheet(false);
                  onNavigate('accueil');
                }}
                className="flex-1 h-12 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-xs uppercase tracking-wide font-bold flex items-center justify-center cursor-pointer transition-colors"
              >
                Accueil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
