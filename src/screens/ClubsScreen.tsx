import React, { useState } from 'react';
import { ScreenId, ClubData, OutingItem } from '../types';
import { IMAGES } from '../mockData';

interface ClubsScreenProps {
  club: ClubData;
  onNavigate: (screen: ScreenId) => void;
  onSelectOuting: (outing: OutingItem) => void;
}

export const ClubsScreen: React.FC<ClubsScreenProps> = ({
  club,
  onNavigate,
  onSelectOuting,
}) => {
  const [isAdminView, setIsAdminView] = useState(true);
  const [affinityGroups, setAffinityGroups] = useState(club.affinityGroups);
  const [showAllMembersModal, setShowAllMembersModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleGroupJoin = (groupId: string) => {
    setAffinityGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const next = !g.joined;
          showToast(next ? `Groupe "${g.title}" rejoint !` : `Tu as quitté "${g.title}".`);
          return {
            ...g,
            joined: next,
            memberCount: next ? g.memberCount + 1 : g.memberCount - 1,
          };
        }
        return g;
      })
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-28 md:pb-16 pt-16 md:pt-20 px-4 md:px-8 max-w-6xl mx-auto animate-in fade-in duration-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-surface px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-surface-container-high/20 animate-in fade-in duration-150">
          {toastMessage}
        </div>
      )}

      {/* Club Panoramic Header Card */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-surface-container-lowest shadow-xs border border-surface-container-high/50 flex flex-col mb-6">
        <div
          className="relative w-full h-44 sm:h-56 md:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url('${club.coverImage || IMAGES.clubCoverAnfa}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-black/30"></div>

          {/* Badges */}
          <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
              Actif aujourd'hui
            </span>
          </div>

          <div className="absolute top-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[15px] text-on-surface-variant">lock_open</span>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Public</span>
          </div>
        </div>

        {/* Club Identity Details */}
        <div className="px-5 sm:px-6 pt-4 pb-5 flex flex-col space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-on-surface-variant mb-1">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                <span className="font-label-md text-sm">{club.city} · Club public ouvert</span>
              </div>
              <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface tracking-tight truncate">
                {club.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-on-secondary-fixed text-[26px]">hiking</span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-2.5 flex items-center gap-2 border border-surface-container-high/40">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[14px]">
                    {isAdminView ? 'shield_person' : 'person'}
                  </span>
                </div>
                <div>
                  <span className="font-label-sm text-[10px] uppercase tracking-wide text-primary block font-bold">
                    Statut
                  </span>
                  <span className="font-body-sm text-xs font-bold text-on-surface">
                    {isAdminView ? 'Membre Administrateur' : 'Membre Actif'}
                  </span>
                </div>
                <button
                  onClick={() => setIsAdminView(!isAdminView)}
                  className="ml-2 text-xs font-semibold text-primary underline hover:text-tertiary cursor-pointer"
                >
                  {isAdminView ? 'Vue ordinaire' : 'Vue admin'}
                </button>
              </div>
            </div>
          </div>

          <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-4xl">
            {club.description}
          </p>
        </div>
      </div>

      {/* Responsive 2-Column Split Layout on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Outings & Affinity Groups (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          {/* Section: Prochaines Sorties */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">event_upcoming</span>
                <h3 className="font-headline-md font-bold text-on-surface">Prochaines sorties</h3>
              </div>
              <span className="font-label-md text-xs text-primary font-bold">2 prévues</span>
            </div>

            {/* Outing Card 1 */}
            <div
              onClick={() => onNavigate('outing-detail')}
              className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md space-y-3.5 active:scale-[0.99] transition-all cursor-pointer border border-surface-container-high/50 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-xs font-bold uppercase">
                      Public
                    </span>
                    <span className="font-label-sm text-xs text-outline">Sam. 1 juin · 18:30</span>
                  </div>
                  <h4 className="font-headline-md text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    Marche & conversation
                  </h4>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[24px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 bg-surface-container-low p-2.5 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">park</span>
                  <div className="min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase block">Lieu</span>
                    <span className="font-body-sm text-xs font-bold text-on-surface truncate block">
                      Anfa Park
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]">group</span>
                  <div className="min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase block">Inscrits</span>
                    <span className="font-body-sm text-xs font-bold text-on-surface block">
                      14 participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center font-label-sm text-xs font-bold text-on-primary-fixed ring-2 ring-surface-container-lowest">
                    MB
                  </div>
                  <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center font-label-sm text-xs font-bold text-on-tertiary-fixed ring-2 ring-surface-container-lowest">
                    YS
                  </div>
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center font-label-sm text-xs font-bold text-on-secondary-fixed ring-2 ring-surface-container-lowest">
                    +12
                  </div>
                </div>
                <span className="font-label-sm text-xs text-primary font-bold">
                  Appuie pour voir le parcours
                </span>
              </div>
            </div>

            {/* Outing Card 2 */}
            <div
              onClick={() => onNavigate('outing-detail')}
              className="w-full bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-xs hover:shadow-md space-y-3.5 active:scale-[0.99] transition-all cursor-pointer border border-surface-container-high/50 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-xs font-bold uppercase">
                      Réservée Club
                    </span>
                    <span className="font-label-sm text-xs text-outline">Dim. 9 juin · 10:00</span>
                  </div>
                  <h4 className="font-headline-md text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    Balade historique Habous
                  </h4>
                </div>
                <span className="material-symbols-outlined text-outline-variant text-[24px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 bg-surface-container-low p-2.5 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px]">account_balance</span>
                  <div className="min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase block">Lieu</span>
                    <span className="font-body-sm text-xs font-bold text-on-surface truncate block">
                      Quartier Habous
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px]">group</span>
                  <div className="min-w-0">
                    <span className="font-label-sm text-[10px] text-outline uppercase block">Inscrits</span>
                    <span className="font-body-sm text-xs font-bold text-on-surface block">
                      8 participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="w-7 h-7 rounded-full bg-tertiary-fixed-dim flex items-center justify-center font-label-sm text-xs font-bold text-on-tertiary-fixed-variant ring-2 ring-surface-container-lowest">
                    KT
                  </div>
                  <div className="w-7 h-7 rounded-full bg-primary-fixed-dim flex items-center justify-center font-label-sm text-xs font-bold text-on-primary-fixed-variant ring-2 ring-surface-container-lowest">
                    LM
                  </div>
                  <div className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-xs font-bold text-on-surface-variant ring-2 ring-surface-container-lowest">
                    +6
                  </div>
                </div>
                <span className="font-label-sm text-xs text-outline font-medium">
                  Inscription ouverte
                </span>
              </div>
            </div>
          </div>

          {/* Section: Groupes & Affinités */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">forum</span>
                <h3 className="font-headline-md font-bold text-on-surface">Groupes & affinités</h3>
              </div>
              <span className="font-label-sm text-xs text-outline uppercase font-semibold">
                Optionnels
              </span>
            </div>

            <div className="space-y-2.5">
              {affinityGroups.map((group) => (
                <div
                  key={group.id}
                  className="w-full bg-surface-container-lowest rounded-2xl p-4 flex items-center justify-between shadow-xs border border-surface-container-high/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${group.bgColorClass}`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{group.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-sm font-bold text-on-surface">
                        {group.title}
                      </h4>
                      <span className="font-body-sm text-xs text-on-surface-variant">
                        {group.description}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleGroupJoin(group.id)}
                    className={`px-4 py-1.5 rounded-full font-label-md text-xs font-semibold transition-all cursor-pointer ${
                      group.joined
                        ? 'bg-secondary-container text-on-secondary-container font-bold'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {group.joined ? 'Rejoint' : 'Rejoindre'}
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-surface-container-low rounded-xl p-3.5 flex items-start gap-2.5 border border-surface-container-high/40">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">
                info
              </span>
              <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                Les groupes sont purement thématiques et optionnels. Rejoindre le club n'inscrit pas automatiquement aux sorties.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Admin Management, Roster & Perspective (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Admin Action Strip */}
          {isAdminView ? (
            <div className="flex flex-col space-y-3 bg-surface-container-lowest p-5 rounded-3xl shadow-xs border border-surface-container-high/50">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs uppercase tracking-wider text-outline font-bold">
                  Gestion du club
                </span>
                <span className="font-label-sm text-xs text-primary font-bold">
                  Mode responsable
                </span>
              </div>

              <button
                onClick={() => onNavigate('organise-outing')}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-full font-label-lg text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                Organiser une sortie
              </button>

              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => onNavigate('invitations')}
                  className="h-10 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-full px-3 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary">person_add</span>
                  Inviter un membre
                </button>
                <button
                  onClick={() => onNavigate('invitations')}
                  className="relative h-10 bg-secondary-fixed text-on-secondary-fixed-variant rounded-full px-3 text-xs font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  <span className="truncate">Demandes (2)</span>
                  <span className="w-2 h-2 rounded-full bg-error ml-0.5"></span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-xs border border-surface-container-high/50 space-y-3">
              <span className="font-label-sm text-xs uppercase text-outline font-bold block">
                Espace adhérent
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Tu es membre de ce club. Tu peux inviter des amis proches à postuler ou consulter les sorties privées.
              </p>
              <button
                onClick={() => onNavigate('invitations')}
                className="w-full h-11 bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold rounded-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                Inviter un membre
              </button>
            </div>
          )}

          {/* Members Roster */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-xs border border-surface-container-high/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">group</span>
                <h3 className="font-headline-md font-bold text-on-surface">Membres</h3>
              </div>
              <span className="font-label-md text-xs text-primary font-bold">
                {club.memberCount} membres
              </span>
            </div>

            <div className="space-y-3">
              {club.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between py-1.5 border-b border-surface-container-high/30 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-label-lg text-sm font-bold ${
                        member.tag === 'Fondateur'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-body-md text-sm font-bold text-on-surface">
                          {member.name}
                        </span>
                        {member.tag && (
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold uppercase">
                            {member.tag}
                          </span>
                        )}
                      </div>
                      <span className="font-body-sm text-xs text-outline">
                        {member.activeTimeStr} · {member.distanceStr}
                      </span>
                    </div>
                  </div>

                  {member.tag === 'Fondateur' ? (
                    <span className="material-symbols-outlined text-outline-variant text-[20px]">
                      military_tech
                    </span>
                  ) : (
                    <span className="font-label-sm text-xs text-outline">{member.role}</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllMembersModal(true)}
              className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-bold text-center transition-colors cursor-pointer"
            >
              Voir tous les {club.memberCount} membres
            </button>
          </div>

          {/* Perspective Comparison Inset */}
          <div className="bg-surface-container-high/60 rounded-3xl p-4 space-y-2.5 border border-surface-container-high">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-tertiary">visibility</span>
                <span className="font-label-md text-xs font-bold text-on-surface uppercase tracking-wide">
                  Aperçu : Vue membre ordinaire
                </span>
              </div>
              <button
                onClick={() => setIsAdminView(!isAdminView)}
                className="text-xs text-primary font-bold hover:underline cursor-pointer"
              >
                {isAdminView ? 'Activer' : 'Rétablir admin'}
              </button>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-xl flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-label-sm text-xs font-semibold">
                  Membre
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Pas de droits de modération
                </span>
              </div>
              <button
                onClick={() => onNavigate('invitations')}
                className="h-8 px-3 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">person_add</span>
                Inviter
              </button>
            </div>

            <span className="font-label-sm text-[11px] text-outline block italic">
              Les boutons de gestion et validation des membres sont masqués pour les non-administrateurs.
            </span>
          </div>
        </div>
      </div>

      {/* Full Members Modal */}
      {showAllMembersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-3xl p-6 max-w-md w-full max-h-[80vh] flex flex-col shadow-2xl space-y-4 border border-surface-container-high">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h3 className="font-headline-md font-bold text-on-surface">
                Membres du club ({club.memberCount})
              </h3>
              <button
                onClick={() => setShowAllMembersModal(false)}
                className="text-outline hover:text-on-surface w-8 h-8 rounded-full flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {club.members
                .concat([
                  { id: 'm-5', name: 'Omar Bennani', role: 'Coureur', initials: 'OB', distanceStr: '35 km', activeTimeStr: 'Actif hier' },
                  { id: 'm-6', name: 'Nadia Alaoui', role: 'Marcheuse', initials: 'NA', distanceStr: '28 km', activeTimeStr: 'Actif il y a 3j' },
                  { id: 'm-7', name: 'Hicham Kabbaj', role: 'Guide adjoint', initials: 'HK', distanceStr: '95 km', activeTimeStr: 'Actif il y a 5h' },
                  { id: 'm-8', name: 'Zineb Tazi', role: 'Marcheuse', initials: 'ZT', distanceStr: '14 km', activeTimeStr: 'Membre récent' },
                ])
                .map((m) => (
                  <div key={m.id} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center font-bold">
                        {m.initials}
                      </div>
                      <div>
                        <span className="font-bold text-on-surface block">{m.name}</span>
                        <span className="text-outline text-[11px]">{m.distanceStr}</span>
                      </div>
                    </div>
                    <span className="text-outline text-[11px] font-medium">{m.role}</span>
                  </div>
                ))}
            </div>
            <button
              onClick={() => setShowAllMembersModal(false)}
              className="w-full h-11 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md font-semibold cursor-pointer"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
