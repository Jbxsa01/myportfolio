import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, MessageCircle, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email invalide' : '';
      case 'subject':
        return value.length < 5 ? 'Le sujet doit contenir au moins 5 caractères' : '';
      case 'message':
        return value.length < 10 ? 'Le message doit contenir au moins 10 caractères' : '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name as keyof FormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Vérifier s'il y a des erreurs
    const newErrors: Partial<FormData> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormData] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast.error('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    // Simuler un succès
    setShowSuccess(true);
    toast.success('Message envoyé avec succès !');
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setShowSuccess(false);
      setIsSubmitting(false);
    }, 3000);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Bonjour ! Je souhaite discuter de votre profil.");
    window.open(`https://wa.me/33600000000?text=${message}`, '_blank');
  };

  const openCalendly = () => {
    window.open('https://calendly.com/votre-lien', '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="flex justify-center gap-4 mb-8">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-primary/10"
          onClick={openWhatsApp}
        >
          <MessageCircle size={20} />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-primary/10"
          onClick={openCalendly}
        >
          <Calendar size={20} />
          Prendre RDV
        </Button>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom"
              className={errors.name ? 'border-red-500' : ''}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre email"
              className={errors.email ? 'border-red-500' : ''}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Sujet"
            className={errors.subject ? 'border-red-500' : ''}
          />
          <AnimatePresence>
            {errors.subject && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.subject}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            className={`min-h-[150px] ${errors.message ? 'border-red-500' : ''}`}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Send size={20} />
            </motion.div>
          ) : showSuccess ? (
            <CheckCircle size={20} className="text-green-500" />
          ) : (
            <>
              <Send size={20} className="mr-2" />
              Envoyer
            </>
          )}
        </Button>
      </motion.form>
    </div>
  );
};

export default ContactForm; 