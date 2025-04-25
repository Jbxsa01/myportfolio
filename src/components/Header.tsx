import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown, Code, Terminal, Cpu, Braces, Globe2, Github, Linkedin, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const roles = ["Développeuse Web", "Étudiante en IIR", "Future Ingénieure", "Web Designer", "Programmeuse"];
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
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full hex-pattern opacity-70"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between py-16 sm:py-24 relative">
        {/* Left content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          {/* Floating icon decorations */}
          <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-xl shadow-xl opacity-20 rotate-12 flex items-center justify-center hidden md:flex">
            <Cpu className="text-primary w-8 h-8" />
          </div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-white rounded-xl shadow-xl opacity-20 -rotate-6 flex items-center justify-center hidden md:flex">
            <Globe2 className="text-primary w-8 h-8" />
          </div>
          <div className="absolute top-1/3 left-20 w-12 h-12 bg-white rounded-xl shadow-xl opacity-20 rotate-45 flex items-center justify-center hidden md:flex">
            <Braces className="text-primary w-6 h-6" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 appear appear-delay-100">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              Bjane Asmaa
            </span>
          </h1>
          
          <div className="flex items-center gap-2 text-xl md:text-2xl text-muted-foreground mb-8 appear appear-delay-200">
            <Terminal size={24} className="text-primary" />
            <span ref={typingRef} className="typing-cursor"></span>
          </div>
          
          <div className="px-6 py-4 rounded-xl bg-black/80 text-green-400 font-mono text-sm mb-8 max-w-lg mx-auto appear appear-delay-300 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-white/70">
              <Code size={16} />
              <span>portfolio.js</span>
            </div>
            <p className="typewriter">
              const developer = new Engineer("Asmaa", "IIR", 4);
            </p>
            <p className="mt-2 text-white/50 text-xs">// Computer Engineering Student at EMSI</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 appear appear-delay-300">
            <a 
              href="#about" 
              className="somagec-btn flex items-center justify-center gap-2 group"
            >
              <span>En savoir plus</span>
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-1" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-primary hover:bg-gray-50 transition-all duration-300 font-medium flex items-center justify-center gap-2"
            >
              Me contacter
            </a>
          </div>
          
          {/* Social links */}
          <div className="flex gap-4 mt-8 appear appear-delay-400">
            <a href="https://github.com/votre-compte" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/votre-compte" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="mailto:contact@votredomaine.com" className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        {/* Right content - Large square image */}
        <div className="w-full md:w-1/2 flex justify-center appear appear-delay-200">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-3xl transform -rotate-6"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/lovable-uploads/FB_IMG_1711219821349-removebg-preview.png" 
                alt="Portrait" 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Portrait';
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <a href="#about" className="flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors">
          <span className="mb-2">Découvrir</span>
          <ArrowDown size={20} className="text-primary" />
        </a>
      </div>
    </header>
  );
};

export default Header;
