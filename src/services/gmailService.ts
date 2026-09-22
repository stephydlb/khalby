export const OFFICIAL_GMAIL_ADDRESS = 'stephkalubiaka@gmail.com';

export interface SendEmailPayload {
  to?: string;
  subject: string;
  body: string;
  fromName?: string;
  fromEmail?: string;
  accessToken: string;
}

export interface SendEmailResult {
  id: string;
  threadId: string;
  labelIds?: string[];
}

/**
 * Encodes a string into Base64URL format safe for Gmail API (RFC 4648 §5).
 */
function toBase64Url(str: string): string {
  // UTF-8 safe base64 encoding
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Sends an email via the Gmail API to the official artist email.
 */
export async function sendEmailViaGmail({
  to = OFFICIAL_GMAIL_ADDRESS,
  subject,
  body,
  fromName,
  fromEmail,
  accessToken,
}: SendEmailPayload): Promise<SendEmailResult> {
  if (!accessToken) {
    throw new Error("Authentification Google requise pour envoyer un e-mail via l'API Gmail.");
  }

  // Construct standard RFC 2822 email format
  const headers = [
    `To: ${to}`,
    fromEmail ? `From: ${fromName ? `"${fromName}" <${fromEmail}>` : fromEmail}` : '',
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
  ]
    .filter(Boolean)
    .join('\r\n');

  const rawMessage = `${headers}\r\n\r\n${body}`;
  const encodedEmail = toBase64Url(rawMessage);

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: encodedEmail,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Erreur Gmail HTTP ${response.status}`;
    throw new Error(message);
  }

  return (await response.json()) as SendEmailResult;
}

export const EMAIL_TEMPLATES = [
  {
    id: 'box-deluxe',
    label: 'Commande Coffret Deluxe (100 ex.)',
    subject: '[The Golden] Réservation Coffret Deluxe Numéroté',
    defaultMessage: `Bonjour l'équipe Khalby & Steph Kalubiaka,\n\nJe souhaite réserver un exemplaire du Coffret Collector The Golden Deluxe (numéroté sur 100 unités).\n\nMerci de me communiquer les modalités d'expédition et de règlement sécurisé.\n\nNom / Prénom :\nTéléphone :\nVille / Pays :`,
  },
  {
    id: 'booking',
    label: 'Demande de Booking / Concert',
    subject: '[Booking Khalby] Proposition de concert / Showcase',
    defaultMessage: `Bonjour Stéphane Kalubiaka,\n\nNous souhaitons inviter Khalby pour un événement musical / concert / festival.\n\nDate prévisionnelle :\nLieu / Ville :\nFormat (Showcase / Live complet) :\nBudget prévisionnel :\n\nDans l'attente de votre retour,`,
  },
  {
    id: 'golden-pass',
    label: 'Support Golden Pass & Accès VIP',
    subject: '[Support The Golden] Question relative à mon accès VIP',
    defaultMessage: `Bonjour,\n\nJ'ai scanné mon QR Code / Pass Golden et j'aimerais obtenir des précisions sur le déblocage des contenus exclusifs et live masters.\n\nNuméro de carte (le cas échéant) :\nMon message :`,
  },
  {
    id: 'fan-message',
    label: 'Message Personnel à Khalby',
    subject: '[Message Fan] Bravo pour The Golden',
    defaultMessage: `Salut Khalby,\n\nJe t'écris pour te féliciter pour ton projet The Golden et les titres Yeleh & Buka !\n\nCe que j'ai ressenti en écoutant :`,
  },
];
