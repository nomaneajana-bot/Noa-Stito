import React, { useState } from 'react';
import { ScreenId } from '../types';
import { IMAGES } from '../mockData';

interface InvitationsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const InvitationsScreen: React.FC<InvitationsScreenProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'vip'>('pending');
  const [adminStatus, setAdminStatus] = useState<'idle' | 'accepted' | 'refused'>('idle');
  const [cancelToast, setCancelToast] = useState(false);

  return (
    <div className="flex flex-col w-full pb-20 pt-16 md:pt-20 px-4 md:px-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Toast Alert */}
      {cancelToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-surface px-4 py-2 rounded-full text-xs font-semibold shadow-xl border border-surface-container-high/20 animate-in fade-in duration-150">
          Demande d'adhésion annulée.
        </div>
      )}

      {/* Code Recognition Top Ribbon */}
      <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between shadow-2xs border border-surface-container-high/50 mb-6">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
          </div>
          <div className="min-w-0">
            <div className="font-label-sm text-xs uppercase text-outline font-bold">
              Code d'invitation détecté
            </div>
            <div className="font-headline-md text-xl sm:text-2xl font-bold tracking-tight text-on-surface truncate">
              CASA-PAS-2024
            </div>
          </div>
        </div>
        <span className="bg-primary/15 text-primary font-label-sm text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold shrink-0">
          Actif
        </span>
      </div>

      {/* Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: Club Card & Policy */}
        <div className="space-y-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 space-y-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-18 h-18 rounded-2xl overflow-hidden shrink-0 bg-surface-container relative shadow-sm">
                <img
                  className="w-full h-full object-cover"
                  alt="Athletic group walking"
                  src={IMAGES.clubInviteSquare}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 text-primary">
                  <span className="material-symbols-outlined text-[16px]">groups</span>
                  <span className="font-label-sm text-xs uppercase tracking-wide font-bold">
                    Club communautaire
                  </span>
                </div>
                <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-on-surface truncate mt-0.5">
                  Les pas de Casa
                </h2>
                <p className="font-body-sm text-xs text-on-surface-variant flex items-center mt-1 space-x-1">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>Casablanca · 48 membres actifs</span>
                </p>
              </div>
            </div>

            <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
              Marche, découverte urbaine et conversation libre dans les parcs de Casablanca. Ouvert à toutes et tous pour respirer et bouger ensemble.
            </p>

            {/* Host info tile */}
            <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between border border-surface-container-high/40">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-surface-container">
                  <img
                    className="w-full h-full object-cover"
                    alt="Mehdi Benjelloun"
                    src={IMAGES.mehdiClose}
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-label-sm text-[10px] text-outline uppercase font-bold">
                    Organisateur
                  </div>
                  <div className="font-label-lg text-sm font-bold text-on-surface truncate">
                    Mehdi Benjelloun
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-2xs">
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
              </div>
            </div>
          </div>

          {/* Policy Note */}
          <div className="bg-surface-container-low rounded-2xl p-4 flex items-start space-x-3 border border-surface-container-high/40">
            <span className="material-symbols-outlined text-primary text-[22px] mt-0.5 shrink-0">
              shield
            </span>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              Ce club valide manuellement les nouvelles demandes pour préserver la convivialité, la parité et la sécurité bienveillante du groupe.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive State Switcher & Moderator Inset */}
        <div className="space-y-4">
          {/* Switcher Tabs */}
          <div className="bg-surface-container rounded-full p-1 flex border border-surface-container-high/60">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-2 text-center rounded-full font-label-md text-xs transition-all duration-200 cursor-pointer ${
                activeTab === 'pending'
                  ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs'
                  : 'text-outline font-semibold hover:text-on-surface'
              }`}
            >
              Demande standard
            </button>
            <button
              onClick={() => setActiveTab('vip')}
              className={`flex-1 py-2 text-center rounded-full font-label-md text-xs transition-all duration-200 cursor-pointer ${
                activeTab === 'vip'
                  ? 'bg-surface-container-lowest text-on-surface font-bold shadow-xs'
                  : 'text-outline font-semibold hover:text-on-surface'
              }`}
            >
              Invitation directe VIP
            </button>
          </div>

          {/* State 1: Pending Request */}
          {activeTab === 'pending' && (
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-secondary-container/50 flex items-center justify-center text-on-secondary-container shrink-0">
                  <span className="material-symbols-outlined text-[26px]">hourglass_top</span>
                </div>
                <div>
                  <div className="font-label-sm text-xs uppercase tracking-wider text-primary font-bold">
                    Demande envoyée
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-on-surface">
                    En attente de validation
                  </h3>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 space-y-2.5 border border-surface-container-high/40">
                <div className="flex items-start space-x-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                    mail
                  </span>
                  <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                    <strong>Mehdi</strong> recevra ta demande avec tes statistiques de marche récentes.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                    notifications_active
                  </span>
                  <p className="font-body-sm text-xs text-on-surface leading-relaxed">
                    Tu recevras une notification dès qu'elle sera approuvée.
                  </p>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="material-symbols-outlined text-outline text-[18px] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Pas d'inscription automatique aux sorties fermées du club avant confirmation.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('accueil')}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-full font-label-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Explorer les sorties publiques</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          )}

          {/* State 2: Direct VIP Bypass */}
          {activeTab === 'vip' && (
            <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/50 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                  <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
                </div>
                <div>
                  <div className="font-label-sm text-xs uppercase tracking-wider text-secondary font-bold">
                    Passe VIP activé
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-on-surface">
                    Bienvenue dans le club !
                  </h3>
                </div>
              </div>

              <div className="bg-secondary-fixed/20 rounded-xl p-4 space-y-1 text-on-surface border border-secondary-fixed/30">
                <div className="font-headline-md text-base font-bold text-secondary">
                  Adhésion immédiate confirmée
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                  Ton code provient directement du référent club. Tu as désormais accès aux discussions et aux parcours privés de Casablanca.
                </p>
              </div>

              <button
                onClick={() => onNavigate('outing-detail')}
                className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-full font-label-lg text-xs uppercase tracking-wider font-bold flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">directions_walk</span>
                <span>Rejoindre la sortie de samedi</span>
              </button>
            </div>
          )}

          {/* Admin Moderation Inset */}
          <div className="bg-surface-container-high rounded-2xl p-4 space-y-3 border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                <span className="font-label-md text-xs uppercase tracking-wider font-bold">
                  Aperçu côté modérateur
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-outline font-semibold">
                Gestion des demandes
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-3.5 shadow-2xs border border-surface-container-high/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      alt="Sarah Mansouri"
                      src={IMAGES.sarahAvatar}
                    />
                  </div>
                  <div>
                    <div className="font-label-lg text-xs font-bold text-on-surface">
                      Sarah Mansouri
                    </div>
                    <div className="font-body-sm text-[11px] text-outline">
                      Casablanca · 3 sorties GRPD
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-[10px] text-outline font-semibold">Aujourd'hui</span>
              </div>

              <div className="bg-surface-container-low p-2.5 rounded-lg border border-surface-container-high/30">
                <p className="font-body-sm text-xs text-on-surface italic">
                  “Bonjour ! J'habite près d'Anfa Park et j'aimerais vous rejoindre pour les marches du samedi.”
                </p>
              </div>

              {adminStatus === 'idle' ? (
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    onClick={() => setAdminStatus('refused')}
                    className="flex-1 h-9 rounded-full bg-surface-container-high text-on-surface font-label-md text-xs font-bold hover:bg-surface-container-highest transition-colors cursor-pointer"
                  >
                    Refuser
                  </button>
                  <button
                    onClick={() => setAdminStatus('accepted')}
                    className="flex-1 h-9 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold transition-colors flex items-center justify-center space-x-1 shadow-2xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Approuver</span>
                  </button>
                </div>
              ) : adminStatus === 'accepted' ? (
                <div className="py-2 px-3 rounded-lg text-center font-label-md text-xs bg-secondary-fixed/30 text-primary font-bold flex items-center justify-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>✓ Adhésion de Sarah approuvée avec succès !</span>
                </div>
              ) : (
                <div className="py-2 px-3 rounded-lg text-center font-label-md text-xs bg-surface-container-highest text-outline font-semibold">
                  Demande archivée sans approbation.
                </div>
              )}
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setCancelToast(true);
                setTimeout(() => {
                  setCancelToast(false);
                  onNavigate('accueil');
                }, 1600);
              }}
              className="font-label-md text-xs text-outline hover:text-error transition-colors py-1 cursor-pointer font-semibold"
            >
              Annuler la demande d'adhésion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
