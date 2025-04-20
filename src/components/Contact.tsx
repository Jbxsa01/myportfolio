import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Github, Linkedin, Mail, Send, Phone } from 'lucide-react';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Sending form data:', formData);
      
      const response = await fetch('http://localhost/myportfolio/public/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // Essayer de trouver un objet JSON valide dans la réponse
      const jsonMatch = responseText.match(/\{.*\}/s);
      if (jsonMatch) {
        try {
          const data = JSON.parse(jsonMatch[0]);
          
          if (data.success) {
            toast.success("Message envoyé avec succès !");
            setFormData({ name: '', email: '', subject: '', message: '' });
          } else {
            console.error('Server error:', data);
            toast.error(data.message || "Une erreur est survenue");
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          toast.error("Erreur de format de réponse du serveur");
        }
      } else {
        console.error('No JSON found in response');
        toast.error("Réponse invalide du serveur");
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error("Une erreur est survenue lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AnimatedSection id="contact" className="section-container py-24">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-primary before:rounded-full relative inline-block">
        Contact
      </h2>
      <p className="section-subtitle">
        N'hésitez pas à me contacter pour discuter de projets ou d'opportunités.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        <div>
          <h3 className="text-2xl font-display font-semibold mb-6">Contactez-moi</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <a href="mailto:bjane.asmaa1@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  bjane.asmaa1@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="font-medium">Téléphone</h4>
                <a href="tel:+212652846950" className="text-muted-foreground hover:text-primary transition-colors">
                  +212 652 846 950
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                <Linkedin size={20} />
              </div>
              <div>
                <h4 className="font-medium">LinkedIn</h4>
                <a href="https://www.linkedin.com/in/bjane-asmaa" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  linkedin.com/in/bjane-asmaa
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                <Github size={20} />
              </div>
              <div>
                <h4 className="font-medium">GitHub</h4>
                <a href="https://github.com/bjane-asmaa" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  github.com/bjane-asmaa
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-display font-semibold mb-6">Envoyez-moi un message</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>Envoi en cours...</>
              ) : (
                <>
                  Envoyer <Send size={16} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
