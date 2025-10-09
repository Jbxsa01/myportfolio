
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
    <footer className="bg-black text-white py-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="/unnamed0-removebg-preview.png" 
                alt="Bjane Asmaa Logo" 
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-xl font-semibold">Asmaa Bjane</h3>
            </div>
            <p className="text-white/70 text-sm">Software Engineer and AI</p>
          </div>
          
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          {/* Contacts en longueur */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 mb-5">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Mail size={16} className="text-white/60" />
              <span>bjane.asmaa1@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Phone size={16} className="text-white/60" />
              <span>+212 652 846 950</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <MapPin size={16} className="text-white/60" />
              <span>Casablanca, Maroc</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Calendar size={16} className="text-white/60" />
              <span>Disponible pour des opportunités</span>
            </div>
          </div>
          
          {/* Liens sociaux centrés */}
          <div className="flex justify-center items-center gap-3">
            <a href="#" className="p-2 rounded-md border border-white/15 hover:bg-white/10 transition-colors" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="#" className="p-2 rounded-md border border-white/15 hover:bg-white/10 transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" className="p-2 rounded-md border border-white/15 hover:bg-white/10 transition-colors" aria-label="Mail">
              <Mail size={18} />
            </a>
            <button 
              onClick={scrollToTop}
              className="p-2 rounded-md border border-white/15 hover:bg-white/10 transition-colors"
              aria-label="Retour en haut"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Asmaa Bjane. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
