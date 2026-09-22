import React, { useState } from 'react';
import { 
  X, Mail, Send, CheckCircle2, AlertCircle, Copy, Check, 
  ExternalLink, LogIn, LogOut, ShieldCheck, Sparkles 
} from 'lucide-react';
import { 
  OFFICIAL_GMAIL_ADDRESS, 
  EMAIL_TEMPLATES, 
  sendEmailViaGmail 
} from '../services/gmailService';
import { googleSignIn, logoutGoogle } from '../services/firebaseAuth';
import { User } from 'firebase/auth';

interface GmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  accessToken: string | null;
  onAuthSuccess: (user: User, token: string) => void;
  onLogout: () => void;
}

export const GmailContactModal: React.FC<GmailContactModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  accessToken,
  onAuthSuccess,
  onLogout,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(EMAIL_TEMPLATES[0].id);
  const [subject, setSubject] = useState(EMAIL_TEMPLATES[0].subject);
  const [body, setBody] = useState(EMAIL_TEMPLATES[0].defaultMessage);
  const [isSending, setIsSending] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [sendSuccessId, setSendSuccessId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!isOpen) return null;

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    const tmpl = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setSubject(tmpl.subject);
      setBody(tmpl.defaultMessage);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(OFFICIAL_GMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        onAuthSuccess(res.user, res.accessToken);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Erreur lors de la connexion Google.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleTriggerSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setErrorMessage('Veuillez renseigner un objet et un message.');
      return;
    }

    if (!accessToken) {
      setErrorMessage('Veuillez vous connecter avec votre compte Google / Gmail pour expédier ce message.');
      return;
    }

    // Per mandatory Workspace Skill rule: Explicit user confirmation before destructive/sending actions
    setShowConfirmDialog(true);
  };

  const handleConfirmAndSend = async () => {
    setShowConfirmDialog(false);
    setIsSending(true);
    setErrorMessage(null);
    try {
      const result = await sendEmailViaGmail({
        to: OFFICIAL_GMAIL_ADDRESS,
        subject,
        body,
        fromName: currentUser?.displayName || undefined,
        fromEmail: currentUser?.email || undefined,
        accessToken: accessToken!,
      });
      setSendSuccessId(result.id);
    } catch (err: any) {
      console.error('Erreur envoi Gmail:', err);
      setErrorMessage(err?.message || "Échec de l'envoi via l'API Gmail.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-[#0e1017] border border-amber-500/40 p-5 sm:p-6 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                  SERVICE GMAIL OFFICIEL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-heading">
                CONTACT KHALBY & PRODUCTION
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-1 mt-4 space-y-4 text-xs">
          
          {/* Target Official Email Banner */}
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                Destinataire officiel :
              </span>
              <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm truncate block">
                {OFFICIAL_GMAIL_ADDRESS}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copié' : 'Copier'}</span>
              </button>
              <a
                href={`mailto:${OFFICIAL_GMAIL_ADDRESS}?subject=${encodeURIComponent(subject)}`}
                className="px-2.5 py-1 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-mono flex items-center gap-1 transition-colors"
                title="Ouvrir dans votre client e-mail"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Mailto</span>
              </a>
            </div>
          </div>

          {/* Google Auth Status bar */}
          <div className="p-3 rounded-xl border border-neutral-800 bg-[#12141c]">
            {currentUser && accessToken ? (
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Avatar" 
                      className="w-7 h-7 rounded-full border border-amber-500/50" 
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName?.[0] || 'U'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate text-[11px]">
                      {currentUser.displayName || 'Utilisateur Google'}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate font-mono">
                      {currentUser.email} • Gmail API Connecté
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-1 rounded text-neutral-400 hover:text-red-400 text-[10px] font-mono flex items-center gap-1 transition-colors shrink-0"
                  title="Déconnexion Google"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-0.5 text-center sm:text-left">
                  <p className="font-bold text-neutral-200">
                    Connexion Gmail API
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    Connectez-vous pour envoyer votre message directement via l'API Gmail sécurisée.
                  </p>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={isSigningIn}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-bold text-[11px] flex items-center gap-1.5 shadow transition-all shrink-0 active:scale-95 disabled:opacity-50"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{isSigningIn ? 'Connexion...' : 'Se connecter avec Google'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Success Banner */}
          {sendSuccessId && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/40 text-green-300 space-y-1">
              <div className="flex items-center gap-2 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Message envoyé avec succès à {OFFICIAL_GMAIL_ADDRESS} !</span>
              </div>
              <p className="text-[10px] font-mono text-green-400/80">
                Identifiant du message Gmail : {sendSuccessId}
              </p>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span className="text-[11px]">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleTriggerSend} className="space-y-3">
            {/* Template Selector */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1.5">
                Modèle de message rapide :
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {EMAIL_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    type="button"
                    onClick={() => handleSelectTemplate(tmpl.id)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      selectedTemplate === tmpl.id
                        ? 'border-amber-500/60 bg-amber-500/15 text-amber-300 font-bold'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="block truncate text-[11px]">{tmpl.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                Objet de l'e-mail :
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                Corps du message :
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                required
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs focus:outline-none focus:border-amber-400 resize-none font-mono"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-lg border border-neutral-700 text-neutral-300 hover:bg-neutral-800 text-xs font-semibold"
              >
                Fermer
              </button>

              <button
                type="submit"
                disabled={isSending || !accessToken}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow transition-all active:scale-95 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSending ? 'Envoi en cours...' : 'Envoyer via Gmail'}</span>
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Mandatory User Confirmation Dialog before sending an email on behalf of user */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md rounded-2xl bg-[#141620] border border-amber-500/60 p-5 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Confirmation d'envoi d'e-mail</span>
            </div>
            
            <div className="space-y-2 text-xs text-neutral-300">
              <p>
                Vous êtes sur le point d'envoyer un e-mail officiel via votre compte Gmail connecté :
              </p>
              <div className="p-3 rounded-lg bg-black/60 border border-neutral-800 font-mono text-[11px] space-y-1">
                <div><span className="text-neutral-400">À :</span> {OFFICIAL_GMAIL_ADDRESS}</div>
                <div><span className="text-neutral-400">De :</span> {currentUser?.email}</div>
                <div className="truncate"><span className="text-neutral-400">Objet :</span> {subject}</div>
              </div>
              <p className="text-[11px] text-neutral-400">
                Confirmez-vous l'envoi de ce message ?
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-3 py-1.5 rounded-lg border border-neutral-700 text-neutral-300 text-xs hover:bg-neutral-800 font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmAndSend}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Confirmer et envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
