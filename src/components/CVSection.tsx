import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, ExternalLink, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Code, Award } from 'lucide-react';
import DownloadCVButton from './ui/DownloadCVButton';
import AnimatedSection from './AnimatedSection';
import { toast } from 'sonner';

const CVSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('experience');
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const tabs = [
    { id: 'experience', label: 'Expérience', icon: <Briefcase size={18} /> },
    { id: 'education', label: 'Formation', icon: <GraduationCap size={18} /> },
    { id: 'skills', label: 'Compétences', icon: <Code size={18} /> },
    { id: 'achievements', label: 'Réalisations', icon: <Award size={18} /> }
  ];

  const handlePreviewClick = () => {
    setIsPreviewVisible(true);
    toast.info('Ouverture de l\'aperçu du CV...');
  };

  const handleContactClick = (type: string) => {
    switch (type) {
      case 'email':
        window.location.href = 'mailto:contact@example.com';
        break;
      case 'phone':
        window.location.href = 'tel:+33612345678';
        break;
      case 'location':
        toast.info('Localisation: Paris, France');
        break;
      default:
        break;
    }
  };

  return (
    <AnimatedSection id="cv" className="section-container py-24" animation="slide-up">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
          Mon CV
          <motion.span 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto text-justify">
          Découvrez mon parcours professionnel et mes compétences.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto px-4">
        {/* Aperçu du CV */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-8">
              {/* En-tête du CV */}
              <div className="text-center mb-8">
                <motion.h3 
                  className="text-2xl font-bold text-primary mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Asmaa
                </motion.h3>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Développeuse Full Stack
                </motion.p>
              </div>

              {/* Onglets */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Contenu des onglets */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {activeTab === 'experience' && (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Stagiaire Ingénieur Mobile & IA — Développement d'agents intelligents</h4>
                        <p className="text-gray-600 text-sm text-justify">AfriTechia, Casablanca — Juillet 2025 – Août 2025</p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-justify">
                          <li>Conception et développement d'un Agent d'Intelligence Artificielle (OCR, STT, TTS) pour la traduction Darija</li>
                          <li>Résultat : Amélioration de 80% de la communication multilingue</li>
                          <li>Technologies : Intelligence Artificielle, Traitement du langage naturel, Mobile Development</li>
                        </ul>
                      </motion.div>
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Assistante en Conception Fonctionnelle et Communication Digitale</h4>
                        <p className="text-gray-600 text-sm text-justify">Oriigami — Mars 2025 – Avril 2025</p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-justify">
                          <li>Gestion de Projet : Rédaction des Cahiers des Charges Fonctionnels (Web et Mobile)</li>
                          <li>Étude de marché et analyse des besoins utilisateurs</li>
                          <li>Développement de stratégies de communication et création de contenu digital</li>
                        </ul>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="font-semibold text-gray-800 mb-2">Stage en Réseau et Développement</h4>
                        <p className="text-gray-600 text-sm text-justify">SOMAGEC GROUP — 2024</p>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-justify">
                          <li>Développement d'application et administration réseau</li>
                          <li>Gestion de l'infrastructure technique</li>
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 'education' && (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Master en Informatique</h4>
                        <p className="text-gray-600 text-sm text-justify">2021 - 2023</p>
                        <p className="text-gray-600 mt-2 text-justify">Spécialisation en développement web et applications mobiles</p>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="font-semibold text-gray-800 mb-2">Licence en Informatique</h4>
                        <p className="text-gray-600 text-sm text-justify">2018 - 2021</p>
                        <p className="text-gray-600 mt-2 text-justify">Formation générale en sciences informatiques</p>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Langages de programmation</h4>
                        <div className="flex flex-wrap gap-2 text-justify">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">JavaScript</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">TypeScript</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">PHP</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">Python</span>
                        </div>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="font-semibold text-gray-800 mb-2">Frameworks & Bibliothèques</h4>
                        <div className="flex flex-wrap gap-2 text-justify">
                          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">React</span>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Node.js</span>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Express</span>
                          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">Laravel</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeTab === 'achievements' && (
                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <motion.div variants={itemVariants} className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Projets notables</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-justify">
                          <li>Application e-commerce avec React et Node.js</li>
                          <li>Système de gestion de contenu personnalisé</li>
                          <li>Application mobile de suivi d'activité</li>
                        </ul>
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <h4 className="font-semibold text-gray-800 mb-2">Certifications</h4>
                        <ul className="list-disc list-inside text-gray-600 space-y-2 text-justify">
                          <li>AWS Certified Cloud Practitioner</li>
                          <li>Google Developer Certification</li>
                          <li>MongoDB Certified Developer</li>
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Contact info */}
              <motion.div 
                className="mt-8 pt-6 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => handleContactClick('email')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={16} />
                    <span className="text-sm text-justify">contact@example.com</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => handleContactClick('phone')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={16} />
                    <span className="text-sm text-justify">+33 6 12 34 56 78</span>
                  </motion.button>
                  <motion.button
                    className="flex items-center gap-1 text-gray-600 hover:text-primary transition-colors"
                    onClick={() => handleContactClick('location')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapPin size={16} />
                    <span className="text-sm text-justify">Paris, France</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Filigrane */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              animate={{ 
                opacity: isHovered ? 0.1 : 0.05,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-9xl font-bold text-primary rotate-45">CV</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Télécharger mon CV</h3>
            <p className="text-gray-600 mb-6 text-justify">
              Consultez mon CV complet pour en savoir plus sur mon parcours, mes compétences et mes réalisations.
            </p>
            <DownloadCVButton />
          </motion.div>

          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Lettre de Motivation</h3>
            <p className="text-gray-600 mb-6 text-justify">
              Découvrez ma lettre de motivation qui présente ma vision professionnelle et mes objectifs de carrière.
            </p>
            <a 
              href="/bjane asmaa cover letter.pdf" 
              download
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Download size={20} />
              <span>Télécharger ma Lettre de Motivation</span>
            </a>
          </motion.div>

          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Aperçu en ligne</h3>
            <p className="text-gray-600 mb-6 text-justify">
              Vous pouvez également consulter une version en ligne de mon CV.
            </p>
            <motion.button
              onClick={handlePreviewClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={20} />
              <span>Voir en ligne</span>
            </motion.button>
          </motion.div>

          <motion.div 
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-100"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-primary">Disponibilité</h3>
            <div className="flex items-center gap-2 text-gray-600 mb-4 text-justify">
              <Calendar size={20} className="text-primary" />
              <span>Disponible pour un stage à partir de juin 2024</span>
            </div>
            <p className="text-gray-600 text-justify">
              Je suis à la recherche d'un stage de 2 mois en développement web et IA.
              N'hésitez pas à me contacter pour discuter d'opportunités de collaboration.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default CVSection; 