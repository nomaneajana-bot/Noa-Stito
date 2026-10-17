import React, { useState } from 'react';
import { ContactFormData } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: 'Renseignement général',
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Validation logic
  const validateField = (name: keyof ContactFormData, value: string) => {
    let err = '';
    if (name === 'fullName') {
      if (!value.trim()) {
        err = 'Le nom complet est obligatoire.';
      } else if (value.trim().length < 2) {
        err = 'Veuillez saisir au moins 2 caractères.';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        err = "L'adresse email est obligatoire.";
      } else if (!emailRegex.test(value.trim())) {
        err = 'Veuillez entrer une adresse email valide.';
      }
    } else if (name === 'message') {
      if (!value.trim()) {
        err = 'Le message ne peut pas être vide.';
      } else if (value.trim().length < 15) {
        err = `Encore au moins ${15 - value.trim().length} caractères requis.`;
      }
    }
    return err;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name as keyof ContactFormData, value),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name as keyof ContactFormData, value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErr = validateField('fullName', formData.fullName);
    const emailErr = validateField('email', formData.email);
    const msgErr = validateField('message', formData.message);

    const newErrors = {
      fullName: nameErr,
      email: emailErr,
      message: msgErr,
    };

    setErrors(newErrors);
    setTouched({ fullName: true, email: true, message: true });

    if (!nameErr && !emailErr && !msgErr) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 900);
    }
  };

  const handleResetAndClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: 'Renseignement général',
      message: '',
    });
    setTouched({});
    setErrors({});
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-high w-full max-w-lg overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 bg-surface-container-low border-b border-surface-container-high/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">contact_support</span>
            </div>
            <div>
              <h3 className="font-headline-md font-bold text-on-surface">Nous contacter</h3>
              <p className="font-body-sm text-on-surface-variant text-xs">
                Une question, une idée ou un partenariat avec GRPD Maroc ?
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center mx-auto text-on-secondary-container">
                <span
                  className="material-symbols-outlined text-[36px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div>
                <h4 className="font-headline-md font-bold text-on-surface">Message envoyé avec succès !</h4>
                <p className="font-body-md text-on-surface-variant text-sm mt-1 max-w-sm mx-auto">
                  Merci <strong>{formData.fullName}</strong>. Notre équipe d'animation à Casablanca vous répondra sous 24h à l'adresse <em>{formData.email}</em>.
                </p>
              </div>

              <div className="bg-surface-container-low rounded-xl p-3.5 text-left text-xs space-y-1 max-w-sm mx-auto border border-surface-container-high/40">
                <span className="font-bold text-primary block">Objet : {formData.subject}</span>
                <p className="text-on-surface-variant italic">"{formData.message}"</p>
              </div>

              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md font-bold transition-all shadow-sm cursor-pointer"
              >
                Fermer la fenêtre
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Nom & Email (Responsive 2 cols on tablet/desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-md text-xs font-bold text-on-surface block mb-1">
                    Nom complet <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="ex: Amina Tazi"
                    className={`w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm border focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : touched.fullName && formData.fullName
                        ? 'border-primary/50'
                        : 'border-surface-container-high/60 focus:border-primary'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-error font-medium block mt-1">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="font-label-md text-xs font-bold text-on-surface block mb-1">
                    Adresse email <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="amina@exemple.ma"
                    className={`w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm border focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-error focus:ring-1 focus:ring-error'
                        : touched.email && formData.email
                        ? 'border-primary/50'
                        : 'border-surface-container-high/60 focus:border-primary'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-error font-medium block mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Téléphone & Sujet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-md text-xs font-bold text-on-surface block mb-1">
                    Téléphone <span className="text-outline font-normal">(Facultatif)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+212 6 00 00 00 00"
                    className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-container-high/60 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="font-label-md text-xs font-bold text-on-surface block mb-1">
                    Sujet de votre message
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface text-sm border border-surface-container-high/60 focus:outline-none focus:border-primary"
                  >
                    <option value="Renseignement général">Renseignement général</option>
                    <option value="Proposer un nouveau club partenaire">
                      Proposer un club partenaire
                    </option>
                    <option value="Devenir référent / guide local">
                      Devenir référent / guide local
                    </option>
                    <option value="Signaler un problème sur une sortie">
                      Signaler un problème
                    </option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-label-md text-xs font-bold text-on-surface">
                    Message <span className="text-error">*</span>
                  </label>
                  <span className="text-[11px] text-outline">
                    {formData.message.length}/500 caractères
                  </span>
                </div>
                <textarea
                  name="message"
                  rows={4}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Écrivez votre message ici (questions sur les parcours à Anfa ou Corniche, propositions, suggestions)..."
                  className={`w-full p-3 rounded-xl bg-surface-container-low text-on-surface text-sm border resize-none focus:outline-none transition-colors ${
                    errors.message
                      ? 'border-error focus:ring-1 focus:ring-error'
                      : touched.message && formData.message.length >= 15
                      ? 'border-primary/50'
                      : 'border-surface-container-high/60 focus:border-primary'
                  }`}
                />
                {errors.message && (
                  <span className="text-[11px] text-error font-medium block mt-1">
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-full text-on-surface-variant hover:text-on-surface text-xs font-semibold cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-container active:scale-[0.98] text-on-primary font-label-md font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">send</span>
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
