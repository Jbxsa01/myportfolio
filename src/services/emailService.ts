import emailjs from '@emailjs/browser';

// Initialise EmailJS avec ta clé publique
// Tu peux trouver ta clé publique sur https://dashboard.emailjs.com/
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ta_clé_publique_ici';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'ta_service_id_ici';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'ta_template_id_ici';

// Initialise EmailJS une seule fois au démarrage
try {
  emailjs.init(PUBLIC_KEY);
} catch (error) {
  console.warn('EmailJS non configuré. Vérifie tes variables d\'environnement.');
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const emailService = {
  async sendContactEmail(formData: ContactFormData): Promise<boolean> {
    try {
      const templateParams = {
        to_email: import.meta.env.VITE_CONTACT_EMAIL || 'ton_email@example.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      };

      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      console.log('Email envoyé avec succès:', result);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  },
};
