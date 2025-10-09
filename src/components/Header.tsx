import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, Code, Terminal, Cpu, Braces, Globe2, Github, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const roles = ["Développeuse Web", "Software Engineer and AI", "Future Ingénieure", "Web Designer", "Programmeuse"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimeout: NodeJS.Timeout;
    
    const type = () => {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        if (typingRef.current) {
          typingRef.current.textContent = currentRole.substring(0, charIndex - 1);
        }
        charIndex--;
      } else {
        if (typingRef.current) {
          typingRef.current.textContent = currentRole.substring(0, charIndex + 1);
        }
        charIndex++;
      }
      
      if (!isDeleting && charIndex === currentRole.length) {
        // Pause at the end of typing
        isDeleting = true;
        typeTimeout = setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeTimeout = setTimeout(type, 500);
      } else {
        // Typing speed
        const typingSpeed = isDeleting ? 100 : 150;
        typeTimeout = setTimeout(type, typingSpeed);
      }
    };
    
    typeTimeout = setTimeout(type, 1000);
    
    return () => clearTimeout(typeTimeout);
  }, []);
  
  return (
    <header className="min-h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-radial from-gray-50 via-transparent to-white"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between py-16 sm:py-24 relative">
        {/* Left content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          {/* Floating icon decorations */}
          <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-xl shadow-lg opacity-30 rotate-12 flex items-center justify-center hidden md:flex">
            <Cpu className="text-foreground w-8 h-8" />
          </div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-white rounded-xl shadow-lg opacity-30 -rotate-6 flex items-center justify-center hidden md:flex">
            <Globe2 className="text-foreground w-8 h-8" />
          </div>
          <div className="absolute top-1/3 left-20 w-12 h-12 bg-white rounded-xl shadow-lg opacity-30 rotate-45 flex items-center justify-center hidden md:flex">
            <Braces className="text-foreground w-6 h-6" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4 appear appear-delay-100">
            <span className="text-foreground">
              Bjane Asmaa
            </span>
          </h1>
          
          <div className="flex items-center gap-2 text-xl md:text-2xl text-muted-foreground mb-8 appear appear-delay-200">
            <Terminal size={24} className="text-foreground" />
            <span ref={typingRef} className="typing-cursor"></span>
          </div>
          
          <div className="px-6 py-4 rounded-lg bg-slate-900 text-slate-100 font-mono text-sm mb-8 max-w-lg mx-auto appear appear-delay-300 shadow-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-2 text-slate-400">
              <Code size={16} />
              <span>portfolio.js</span>
            </div>
            <p className="typewriter">
              const developer = new Engineer("Bjane Asmaa", "5IIR", 5);
            </p>
            <p className="mt-2 text-slate-500 text-xs">// AI et Dev Full Stack</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 appear appear-delay-300">
            <a 
              href="#about" 
              className="px-6 py-3 rounded-lg bg-foreground text-white hover:bg-foreground/90 transition-all duration-300 font-medium flex items-center justify-center gap-2 group"
            >
              <span>En savoir plus</span>
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg bg-white border border-gray-300 text-foreground hover:bg-gray-50 transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              Me contacter
            </a>
          </div>
          
          {/* Social links */}
          <div className="flex gap-4 mt-8 appear appear-delay-400">
            <a href="https://github.com/votre-compte" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-foreground/10 text-foreground hover:text-foreground transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/votre-compte" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-foreground/10 text-foreground hover:text-foreground transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="mailto:contact@votredomaine.com" className="p-2 rounded-full bg-gray-100 hover:bg-foreground/10 text-foreground hover:text-foreground transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Right content - Large square image */}
        <div className="w-full md:w-1/2 flex justify-center appear appear-delay-200">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-100">
              <img 
                src="/src/unnamed.png" 
                alt="Portrait" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Portrait';
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <a href="#about" className="flex flex-col items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <span className="mb-2">Découvrir</span>
          <ArrowDown size={20} className="text-foreground" />
        </a>
      </div>
    </header>
  );
};

export default Header;
