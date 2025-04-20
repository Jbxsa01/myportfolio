import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import EasterEgg from '@/components/EasterEgg';
import InternshipSearch from '@/components/InternshipSearch';
import { Download } from 'lucide-react';

interface IndexProps {
  cvRef: React.RefObject<HTMLDivElement>;
}

const Index: React.FC<IndexProps> = ({ cvRef }) => {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  
  // Code Konami: ↑↑↓↓←→←→BA
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  useEffect(() => {
    // Create floating code elements for background effect
    const createFloatingCode = () => {
      const codeSnippets = [
        'function init() { return true; }',
        'const app = new App();',
        'import React from "react";',
        '<div className="container">',
        'addEventListener("load", startup)',
        'export default Component;',
        'npm install tailwindcss',
        'git commit -m "Initial commit"',
        'docker-compose up -d',
        'python manage.py runserver',
        'SELECT * FROM users WHERE active = 1;',
        'const data = await fetch("/api");',
        '@tailwind base;',
        'const [state, setState] = useState();',
        'useEffect(() => { }, []);',
      ];
      
      const container = document.querySelector('body');
      
      for (let i = 0; i < 12; i++) {
        const codeElement = document.createElement('div');
        codeElement.className = `floating-code code-block-${(i % 4) + 1}`;
        codeElement.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        
        // Random positioning
        codeElement.style.top = `${Math.random() * 100}vh`;
        codeElement.style.left = `${Math.random() * 100}vw`;
        
        container?.appendChild(codeElement);
      }
    };
    
    createFloatingCode();
    
    // Cleanup function
    return () => {
      document.querySelectorAll('.floating-code').forEach(el => el.remove());
    };
  }, []);
  
  // Gestion du code Konami
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Si le code Konami est déjà activé, ne rien faire
      if (konamiActivated) return;
      
      const key = e.key.toLowerCase();
      
      // Vérifier si la touche correspond à la séquence Konami
      if (key === konamiSequence[konamiIndex].toLowerCase()) {
        // Ajouter la touche à la séquence actuelle
        setKonamiCode(prev => [...prev, key]);
        setKonamiIndex(prev => prev + 1);
        
        // Vérifier si la séquence est complète
        if (konamiIndex === konamiSequence.length - 1) {
          setKonamiActivated(true);
          setShowEasterEgg(true);
          
          // Ajouter la classe Konami au body pour les effets visuels
          document.body.classList.add('konami-activated');
          
          // Réinitialiser après un délai
          setTimeout(() => {
            setKonamiCode([]);
            setKonamiIndex(0);
          }, 5000);
        }
      } else {
        // Réinitialiser si la touche ne correspond pas
        setKonamiCode([]);
        setKonamiIndex(0);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex, konamiActivated]);
  
  // Gestion des clics sur les éléments du CV pour l'easter egg
  useEffect(() => {
    const handleCvElementClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.cv-element')) {
        // 20% de chance de déclencher l'easter egg
        if (Math.random() < 0.2) {
          setShowEasterEgg(true);
        }
      }
    };
    
    document.addEventListener('click', handleCvElementClick);
    return () => document.removeEventListener('click', handleCvElementClick);
  }, []);
  
  return (
    <div className={`min-h-screen ${konamiActivated ? 'konami-mode' : ''}`} style={{ 
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233060A9' fill-opacity='0.02' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'%3E%3C/path%3E%3C/g%3E%3C/svg%3E")` 
    }}>
      <Navbar />
      <Header />
      
      {/* Internship Search Section - Moved to the top */}
      <div className="bg-gradient-radial from-white via-primary/5 to-white">
        <InternshipSearch />
      </div>
      
      <div className="tech-pattern">
        <About />
      </div>
      
      <div className="dots-pattern">
        <Experience />
      </div>
      
      <div className="bg-gradient-radial from-white via-primary/5 to-white">
        <Projects />
      </div>
      
      <div className="circuit-pattern">
        <Skills />
      </div>
      
      {/* CV Download Section */}
      <div className="dots-pattern py-20 relative overflow-hidden perspective-1000" ref={cvRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 relative group">
            {/* 3D Floating Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500 transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500 transform group-hover:-translate-x-5 group-hover:-translate-y-5"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent text-center">
                Mon CV
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="transform transition-transform duration-500 hover:translate-y-[-5px]">
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                    Vous pouvez télécharger mon CV pour en savoir plus sur mon parcours professionnel, 
                    mes compétences et mes expériences. N'hésitez pas à me contacter pour toute opportunité 
                    de collaboration.
                  </p>
                  <div className="flex justify-center">
                    <a 
                      href="http://localhost:8080/CV-bjane-Asmaa.pdf" 
                      download 
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      <span>Télécharger mon CV</span>
                    </a>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl transform rotate-3"></div>
                    <div className="relative bg-white p-6 rounded-2xl shadow-lg transform -rotate-3">
                      <div className="space-y-4">
                        <div className="cv-element" data-type="experience">
                          <h3 className="text-xl font-semibold text-primary">Expérience</h3>
                          <p className="text-gray-600">Stagiaire Développeur Web et Réseau chez SOMAGEC</p>
                        </div>
                        <div className="cv-element" data-type="skills">
                          <h3 className="text-xl font-semibold text-primary">Compétences</h3>
                          <p className="text-gray-600">HTML, CSS, JavaScript, PHP, React, Node.js, Java, Python</p>
                        </div>
                        <div className="cv-element" data-type="education">
                          <h3 className="text-xl font-semibold text-primary">Formation</h3>
                          <p className="text-gray-600">École Marocaine des Sciences de l'Ingénieur (EMSI)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dots-pattern">
        <Contact />
      </div>
      
      <Footer />
      
      {/* Easter Egg Component */}
      <EasterEgg 
        isVisible={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />
      
      {/* Indicateur de code Konami (visible uniquement en développement) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 left-2 text-xs text-gray-400">
          {konamiCode.join(', ')}
        </div>
      )}
    </div>
  );
};

export default Index;
