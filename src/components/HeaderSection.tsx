import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import DownloadCVButton from './ui/DownloadCVButton';
import AnimatedSection from './AnimatedSection';

const HeaderSection: React.FC = () => {
  const socialLinks = [
    {
      icon: <Github size={24} />,
      href: 'https://github.com/votre-compte',
      label: 'GitHub'
    },
    {
      icon: <Linkedin size={24} />,
      href: 'https://linkedin.com/in/votre-compte',
      label: 'LinkedIn'
    },
    {
      icon: <Mail size={24} />,
      href: 'mailto:contact@votredomaine.com',
      label: 'Email'
    }
  ];

  return (
    <AnimatedSection id="header" className="section-container min-h-screen flex items-center" animation="fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Texte de présentation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Bonjour, je suis <span className="text-primary">Asmaa</span>
          </h1>
          
          <p className="text-xl text-gray-600">
            Développeuse Full Stack passionnée par la création d'applications web modernes et performantes.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <DownloadCVButton />
            
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Image ou illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            {/* Vous pouvez ajouter votre photo ou une illustration ici */}
            <span className="text-6xl font-bold text-primary">A</span>
          </div>
          
          {/* Éléments décoratifs */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default HeaderSection; 