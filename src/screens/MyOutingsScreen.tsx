import React, { useState } from 'react';
import { ScreenId, OutingItem } from '../types';

interface MyOutingsScreenProps {
  outings: OutingItem[];
  onNavigate: (screen: ScreenId) => void;
  onSelectOuting: (outing: OutingItem) => void;
  onCancelOuting: (outingId: string) => void;
}

export const MyOutingsScreen: React.FC<MyOutingsScreenProps> = ({
  outings,
  onNavigate,
  onSelectOuting,
  onCancelOuting,
}) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'past'>('upcoming');
  const [selectedForCancel, setSelectedForCancel] = useState<OutingItem | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const confirmedOutings = outings.filter((o) => o.isRegistered && !o.isPending);
  const pendingOutings = outings.filter((o) => o.isPending);

  const pastOutings = [
    {
      id: 'past-1',
      title: 'Foulée du Printemps Corniche',
      clubName: 'Casa Runners Club',
      date: 'Dim. 12 mai · 07:00',
      location: 'Aïn Diab',
      dist: '10,2 km',
      pace: '5:32/km',
    },
    {
      id: 'past-2',
      title: 'Marche culturelle Habous & Dégustation',
      clubName: 'Les pas de Casa',
      date: 'Sam. 4 mai · 10:30',
      location: 'Quartier Habous',
      dist: '5,1 km',
      pace: '3,8 km/h',
    },
    {
      id: 'past-3',
      title: 'Circuit Vert Oasis',
      clubName: 'Oasis Athletic Club',
      date: 'Sam. 27 avril · 08:30',
      location: 'Parc Oasis',
      dist: '6,4 km',
      pace: '4,5 km/h',
    },
  ];

  const handleOpenCancelSheet = (outing: OutingItem) => {
    setSelectedForCancel(outing);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (selectedForCancel) {
      onCancelOuting(selectedForCancel.id);
      setShowCancelModal(false);
      setToastMessage(`Participation à "${selectedForCancel.title}" annulée.`);
      setTimeout(() => setToastMessage(null), 3000);
      setSelectedForCancel(null);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 md:pb-16 pt-16 md:pt-20 px-4 md:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-surface px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-surface-container-high/20 animate-in fade-in duration-150">
          {toastMessage}
        </div>
      )}

      {/* Top Header & Segmented Control */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-surface-container-high/40 mb-6">
        <div>
          <span className="font-label-sm text-xs uppercase tracking-wider text-outline font-bold">
            Calendrier personnel
          </span>
          <h1 className="font-headline-xl-mobile md:text-3xl font-bold text-on-surface mt-0.5">
            Mes Sorties & Réservations
          </h1>
        </div>

        {/* Segmented Control Navigation */}
        <div
          className="w-full md:w-auto bg-surface-container-high p-1 rounded-full flex items-center justify-between shadow-2xs border border-surface-container-high/60"
          role="tablist"
        >
          <button
            onClick={() => setActiveTab('upcoming')}
            aria-selected={activeTab === 'upcoming'}
            className={`flex-1 md:flex-none py-1.5 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'upcoming'
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface font-semibold'
            }`}
            role="tab"
            type="button"
          >
            <span className="font-label-md text-xs">À venir</span>
            <span
              className={`font-label-sm text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'upcoming'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              {confirmedOutings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('pending')}
            aria-selected={activeTab === 'pending'}
            className={`flex-1 md:flex-none py-1.5 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface font-semibold'
            }`}
            role="tab"
            type="button"
          >
            <span className="font-label-md text-xs">En attente</span>
            <span
              className={`font-label-sm text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'pending'
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-surface-container-highest text-on-surface-variant'
              }`}
            >
              {pendingOutings.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('past')}
            aria-selected={activeTab === 'past'}
            className={`flex-1 md:flex-none py-1.5 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'past'
                ? 'bg-surface-container-lowest shadow-xs text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface font-semibold'
            }`}
            role="tab"
            type="button"
          >
            <span className="font-label-md text-xs">Passées</span>
            <span className="font-label-sm text-[10px] px-1.5 py-0.2 rounded-full bg-surface-container-highest text-on-surface-variant font-bold">
              12
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Section 1: Upcoming Confirmed Outings (Responsive 2-column Grid) */}
        {activeTab === 'upcoming' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <h2 className="font-headline-md font-bold text-on-surface">Sorties confirmées</h2>
              </div>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                {confirmedOutings.length} réservations actives
              </span>
            </div>

            {confirmedOutings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {confirmedOutings.map((outing) => (
                  <article
                    key={outing.id}
                    className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs hover:shadow-md border border-surface-container-high/60 flex flex-col justify-between space-y-4 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-label-sm text-xs text-primary uppercase font-bold tracking-wide">
                              {outing.clubName}
                            </span>
                            <span className="text-on-surface-variant text-xs">•</span>
                            <span className="font-label-sm text-xs text-on-surface-variant">
                              {outing.subType || outing.discipline}
                            </span>
                          </div>
                          <h3 className="font-headline-md text-lg font-bold text-on-surface truncate">
                            {outing.title}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-sm text-xs font-bold shrink-0">
                          <span
                            className="material-symbols-outlined text-[14px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          Inscrit·e
                        </span>
                      </div>

                      {/* Schedule & Location Pills */}
                      <div className="grid grid-cols-2 gap-2.5 pt-3">
                        <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            event
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                              Date & Heure
                            </span>
                            <span className="font-label-md text-xs font-bold text-on-surface truncate">
                              {outing.dateStr.split(' ')[0]} {outing.dateStr.split(' ')[1]} · {outing.departureTime}
                            </span>
                          </div>
                        </div>

                        <div className="bg-surface-container-low rounded-xl p-3 flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-primary text-[20px]">
                            location_on
                          </span>
                          <div className="flex flex-col truncate">
                            <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-bold">
                              Rendez-vous
                            </span>
                            <span className="font-label-md text-xs font-bold text-on-surface truncate">
                              {outing.location}, Casa
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Action Row */}
                    <div className="pt-2 flex items-center justify-between border-t border-surface-container-high/40">
                      <button
                        className="font-label-md text-xs font-semibold text-on-surface-variant hover:text-error transition-colors flex items-center gap-1 py-1 cursor-pointer"
                        onClick={() => handleOpenCancelSheet(outing)}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                        Se désister
                      </button>
                      <button
                        onClick={() => {
                          onSelectOuting(outing);
                          onNavigate('outing-detail');
                        }}
                        className="h-9 px-4 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        type="button"
                      >
                        Détails
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Compact Empty State Variant Pattern */
              <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col items-center text-center space-y-3 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">hiking</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline-md font-bold text-on-surface">
                    Aucune sortie prévue pour le moment
                  </h4>
                  <p className="font-body-sm text-sm text-on-surface-variant">
                    Trouve un groupe chaleureux pour marcher ou courir ensemble ce week-end à Casablanca.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('accueil')}
                  className="h-11 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">explore</span>
                  Explorer les sorties
                </button>
              </div>
            )}
          </section>
        )}

        {/* Section 2: Pending Requests */}
        {(activeTab === 'pending' || (activeTab === 'upcoming' && pendingOutings.length > 0)) && (
          <section className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim"></span>
                <h2 className="font-headline-md font-bold text-on-surface">Demandes en attente</h2>
              </div>
              <span className="font-label-sm text-xs text-on-surface-variant uppercase font-semibold">
                {pendingOutings.length} requête en cours
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingOutings.map((outing) => (
                <article
                  key={outing.id}
                  className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/60 flex flex-col space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-label-sm text-xs text-on-surface-variant uppercase font-bold tracking-wide">
                          {outing.clubName}
                        </span>
                        <span className="text-on-surface-variant text-xs">•</span>
                        <span className="font-label-sm text-xs text-on-surface-variant">
                          {outing.subType || 'Trail doux'}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-base font-bold text-on-surface truncate">
                        {outing.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-xs font-bold shrink-0">
                      <span className="material-symbols-outlined text-[14px]">hourglass_empty</span>
                      En attente
                    </span>
                  </div>

                  <div className="bg-surface-container-low rounded-xl p-3 flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-[18px]">
                          calendar_month
                        </span>
                        Sam. 8 juin · 09:00
                      </span>
                      <span className="font-label-sm text-xs text-on-surface-variant">
                        {outing.location}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <span className="material-symbols-outlined text-on-surface-variant text-[16px] shrink-0 mt-0.5">
                        info
                      </span>
                      <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                        L'organisateur valide les participants avant le départ afin de calibrer le groupe.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-surface-container-high/40">
                    <button
                      onClick={() => handleOpenCancelSheet(outing)}
                      className="h-9 px-3 rounded-full text-on-surface-variant font-label-md text-xs font-medium hover:text-error transition-colors cursor-pointer"
                      type="button"
                    >
                      Annuler ma demande
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section 3: Past Outings */}
        {activeTab === 'past' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
                <h2 className="font-headline-md font-bold text-on-surface">Sorties passées (12)</h2>
              </div>
              <span className="font-label-sm text-xs text-outline font-semibold">Total 74 km</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pastOutings.map((p) => (
                <div
                  key={p.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-xs border border-surface-container-high/60 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="font-label-sm text-xs text-primary uppercase font-bold">
                      {p.clubName}
                    </span>
                    <h4 className="font-headline-sm font-bold text-on-surface mt-1 text-base">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-outline mt-1.5">
                      <span>{p.date}</span>
                      <span>•</span>
                      <span>{p.location}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-surface-container-high/40 flex items-center justify-between">
                    <span className="text-xs text-outline">Allure : {p.pace}</span>
                    <span className="font-stat-metric text-xl font-bold text-on-surface">
                      {p.dist}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: Cancellation Sheet Inset Preview */}
        <section className="pt-4 max-w-2xl mx-auto" id="cancel-sheet-preview">
          <div className="w-full bg-surface-container-high/60 p-4 rounded-3xl flex flex-col space-y-3 border border-surface-container-high">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-xs text-on-surface-variant uppercase font-bold tracking-wider">
                Aperçu · Fiche d'annulation native
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[16px]">touch_app</span>
            </div>

            <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col space-y-4 border border-surface-container-high/40">
              <div className="w-10 h-1 rounded-full bg-surface-container-highest mx-auto"></div>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-error-container/60 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-error text-[22px]">event_busy</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-headline-md font-bold text-on-surface">
                    Annuler ma participation ?
                  </h4>
                  <span className="font-label-md text-xs text-primary font-bold truncate">
                    Marche & conversation (Sam. 1 juin)
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-3.5 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px] shrink-0 mt-0.5">
                  group
                </span>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Tu annules uniquement ta participation personnelle. La sortie reste maintenue pour les autres participants de la communauté.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={() => {
                    if (confirmedOutings.length > 0) {
                      handleOpenCancelSheet(confirmedOutings[0]);
                    }
                  }}
                  className="flex-1 h-11 rounded-full bg-error-container text-on-error-container font-label-md text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98] cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                  Confirmer l'annulation
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 h-11 rounded-full bg-surface-container text-on-surface font-label-md text-xs font-semibold flex items-center justify-center transition-colors hover:bg-surface-container-high cursor-pointer"
                  type="button"
                >
                  Garder ma place
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Floating Active Cancellation Modal */}
      {showCancelModal && selectedForCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl shadow-2xl p-6 flex flex-col space-y-4 animate-in zoom-in-95 duration-200 border border-surface-container-high">
            <div className="w-10 h-1 rounded-full bg-surface-container-highest mx-auto"></div>
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-error-container/60 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-error text-[24px]">event_busy</span>
              </div>
              <div className="flex flex-col min-w-0">
                <h4 className="font-headline-md font-bold text-on-surface">Annuler ma participation ?</h4>
                <span className="font-label-md text-xs text-primary font-bold truncate">
                  {selectedForCancel.title}
                </span>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3.5 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px] shrink-0 mt-0.5">
                group
              </span>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Tu annules uniquement ta participation personnelle. La sortie reste maintenue pour les autres participants de la communauté.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 h-12 rounded-full bg-error-container text-on-error-container font-label-md font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-90"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Confirmer l'annulation
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 h-12 rounded-full bg-surface-container text-on-surface font-label-md font-semibold text-xs flex items-center justify-center cursor-pointer hover:bg-surface-container-high"
              >
                Garder ma place
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
