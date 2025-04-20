import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import ContactForm from './ContactForm';
import AnimatedSection from './AnimatedSection';

const ContactSection: React.FC = () => {
  const contactInfo = [
    {
      icon: <Mail className="text-primary" size={24} />,
      title: "Email",
      value: "contact@votredomaine.com",
      link: "mailto:contact@votredomaine.com"
    },
    {
      icon: <Phone className="text-primary" size={24} />,
      title: "Téléphone",
      value: "+33 6 00 00 00 00",
      link: "tel:+33600000000"
    },
    {
      icon: <MapPin className="text-primary" size={24} />,
      title: "Localisation",
      value: "Paris, France",
      link: "https://maps.google.com"
    },
    {
      icon: <Clock className="text-primary" size={24} />,
      title: "Disponibilité",
      value: "Lun-Ven, 9h-18h",
      link: "https://calendly.com/votre-lien"
    }
  ];

  return (
    <AnimatedSection id="contact" className="section-container" animation="slide-up">
      <div className="text-center mb-16">
        <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
          Contact
        </h2>
        <p className="section-subtitle">
          N'hésitez pas à me contacter pour discuter de vos projets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Informations de contact */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="somagec-card p-6 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  {info.icon}
                  <div>
                    <h3 className="font-semibold text-gray-800">{info.title}</h3>
                    <p className="text-gray-600">{info.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="somagec-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Pourquoi me contacter ?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>Discussion de projets web</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>Opportunités de collaboration</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>Questions techniques</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                <span>Conseils en développement</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Formulaire de contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection; 