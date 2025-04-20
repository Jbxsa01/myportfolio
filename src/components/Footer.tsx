
import React from 'react';
import { ArrowUp, Mail, Linkedin, Github, MapPin, Phone, Code, Server, Calendar, User, Briefcase, Cpu, MessageSquare, Hash } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="bg-primary text-white py-12 relative overflow-hidden">
      {/* Code pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="code-bg"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 bg-white text-primary rounded-lg shadow-md">
                <Code size={20} />
              </div>
              <h3 className="text-xl font-semibold">Asmaa Bjane</h3>
            </div>
            <p className="text-green-200 text-sm">Élève Ingénieure en Informatique et Réseaux</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm">
            <a 
              href="#about" 
              className="text-green-200 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <User size={14} />
              <span>À Propos</span>
            </a>
            <a 
              href="#projects" 
              className="text-green-200 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Briefcase size={14} />
              <span>Projets</span>
            </a>
            <a 
              href="#skills" 
              className="text-green-200 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Cpu size={14} />
              <span>Compétences</span>
            </a>
            <a 
              href="#contact" 
              className="text-green-200 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <MessageSquare size={14} />
              <span>Contact</span>
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/20">
          <div>
            <h4 className="text-sm font-semibold mb-4 text-secondary flex items-center gap-2">
              <Code size={16} />
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Mail size={16} className="text-secondary" />
                <span>bjane.asmaa1@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Phone size={16} className="text-secondary" />
                <span>+212 652 846 950</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <MapPin size={16} className="text-secondary" />
                <span>Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-green-200">
                <Calendar size={16} className="text-secondary" />
                <span>Disponible pour des opportunités</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-secondary flex items-center gap-2">
              <Hash size={16} />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">React</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">JavaScript</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">PHP</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">Java</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">Python</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">HTML/CSS</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">MySQL</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-xs">Docker</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4 text-secondary flex items-center gap-2">
              <Server size={16} />
              Liens
            </h4>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors" aria-label="Mail">
                <Mail size={20} />
              </a>
              <button 
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-secondary text-white hover:bg-secondary/90 transition-colors ml-auto"
                aria-label="Retour en haut"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-green-200 text-sm">
            &copy; {new Date().getFullYear()} Asmaa Bjane. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
