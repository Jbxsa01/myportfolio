import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Code, User, Briefcase, Cpu, MessageSquare, Github, Linkedin, GanttChart, Palette } from 'lucide-react';

interface NavbarProps {
  onSettingsClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSettingsClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 transition-all duration-500",
        scrolled 
          ? "bg-white shadow-xl" 
          : "bg-white/80"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12">
            <img 
              src="/logos/BJANE_ASMAA_Monogram_Option_4-removebg-preview.png" 
              alt="Bjane Asmaa Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold text-lg">Bjane Asmaa</span>
            <span className="text-gray-600 text-sm font-medium">Software Engineer & AI Specialist</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <a href="#about" className="nav-link flex items-center gap-1.5 px-3 py-2">
            <User size={18} />
            <span>À Propos</span>
          </a>
          <a href="#experience" className="nav-link flex items-center gap-1.5 px-3 py-2">
            <GanttChart size={18} />
            <span>Parcours</span>
          </a>
          <a href="#projects" className="nav-link flex items-center gap-1.5 px-3 py-2">
            <Briefcase size={18} />
            <span>Projets</span>
          </a>
          <a href="#skills" className="nav-link flex items-center gap-1.5 px-3 py-2">
            <Cpu size={18} />
            <span>Compétences</span>
          </a>
          <a href="#contact" className="nav-link-primary flex items-center gap-1.5">
            <MessageSquare size={18} />
            <span>Contact</span>
          </a>
          <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-300">
            <a href="https://github.com/Jbxsa01" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/bjaneasmaa/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <button 
              onClick={onSettingsClick}
              className="text-gray-600 hover:text-primary transition-colors"
              aria-label="Paramètres d'apparence"
            >
              <Palette size={20} />
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="block md:hidden text-primary"
          aria-label="Menu"
        >
          {isOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg px-4 py-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            <a 
              href="#about" 
              className="py-2 px-4 hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} className="text-primary" />
              <span>À Propos</span>
            </a>
            <a 
              href="#experience" 
              className="py-2 px-4 hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <GanttChart size={18} className="text-primary" />
              <span>Parcours</span>
            </a>
            <a 
              href="#projects" 
              className="py-2 px-4 hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Briefcase size={18} className="text-primary" />
              <span>Projets</span>
            </a>
            <a 
              href="#skills" 
              className="py-2 px-4 hover:bg-primary/5 rounded-lg transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Cpu size={18} className="text-primary" />
              <span>Compétences</span>
            </a>
            <a 
              href="#contact" 
              className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <MessageSquare size={18} />
              <span>Contact</span>
            </a>
            <div className="flex items-center gap-3 pt-2 mt-2 border-t border-gray-100">
              <a 
                href="https://github.com/Jbxsa01" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} className="text-gray-600" />
              </a>
              <a 
                href="https://www.linkedin.com/in/bjaneasmaa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-gray-600" />
              </a>
              <button 
                onClick={() => {
                  onSettingsClick();
                  setIsOpen(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Paramètres d'apparence"
              >
                <Palette size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
