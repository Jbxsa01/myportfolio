import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import EasterEgg from '@/components/EasterEgg';
import InternshipSearch from '@/components/InternshipSearch';
import SettingsPanel from '@/components/SettingsPanel';
import SettingsButton from '@/components/SettingsButton';
import CustomCursor from '@/components/CustomCursor';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { Download, Home, User, Briefcase, Code, Wrench, FileText, Mail, Presentation, ChevronUp, Globe, Mic, Volume2, VolumeX, Eye, EyeOff, Keyboard, MousePointer, Layout, Zap, Shield, Lock, Star, Award, Trophy, Crown } from 'lucide-react';
import ReadingProgress from '../components/ReadingProgress';
import QuickNav from '../components/QuickNav';

interface IndexProps {
  cvRef: React.RefObject<HTMLDivElement>;
}

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  sound: boolean;
  onSoundChange: (value: boolean) => void;
  animations: boolean;
  onAnimationsChange: (value: boolean) => void;
  cursorType: string;
  onCursorTypeChange: (type: string) => void;
  fontSize: string;
  onFontSizeChange: (size: string) => void;
  presentationMode: boolean;
  onPresentationModeChange: (value: boolean) => void;
  showScrollProgress: boolean;
  onScrollProgressChange: (value: boolean) => void;
  showQuickNav: boolean;
  onQuickNavChange: (value: boolean) => void;
  showFloatingElements: boolean;
  onFloatingElementsChange: (value: boolean) => void;
  onKonamiHint: () => void;
  // Premium features
  highContrastMode: boolean;
  onHighContrastModeChange: (value: boolean) => void;
  reducedMotion: boolean;
  onReducedMotionChange: (value: boolean) => void;
  screenReader: boolean;
  onScreenReaderChange: (value: boolean) => void;
  keyboardNavigation: boolean;
  onKeyboardNavigationChange: (value: boolean) => void;
  portfolioLayout: string;
  onPortfolioLayoutChange: (layout: string) => void;
  interactiveMode: boolean;
  onInteractiveModeChange: (value: boolean) => void;
  premiumFeatures: boolean;
  onPremiumFeaturesChange: (value: boolean) => void;
}

const sections = [
  { id: 'home', label: 'Accueil', icon: <Home size={16} /> },
  { id: 'about', label: 'À propos', icon: <User size={16} /> },
  { id: 'experience', label: 'Expérience', icon: <Briefcase size={16} /> },
  { id: 'projects', label: 'Projets', icon: <Code size={16} /> },
  { id: 'skills', label: 'Compétences', icon: <Wrench size={16} /> },
  { id: 'languages-technologies', label: 'Langages & Tech', icon: <Zap size={16} /> },
  { id: 'certifications', label: 'Certifications', icon: <Award size={16} /> },
  { id: 'cv', label: 'CV', icon: <FileText size={16} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={16} /> },
];

const portfolioLayouts = [
  { id: 'classic', name: 'Classique', icon: <Layout size={16} /> },
  { id: 'modern', name: 'Moderne', icon: <Zap size={16} /> },
  { id: 'minimal', name: 'Minimaliste', icon: <Eye size={16} /> },
  { id: 'creative', name: 'Créatif', icon: <Star size={16} /> },
  { id: 'professional', name: 'Professionnel', icon: <Award size={16} /> },
  { id: 'premium', name: 'Premium', icon: <Crown size={16} /> }
];

const Index: React.FC<IndexProps> = ({ cvRef }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [sound, setSound] = useState(true);
  const [animations, setAnimations] = useState(true);
  const [fontSize, setFontSize] = useState('16');
  const [cursorType, setCursorType] = useState('default');
  const [presentationMode, setPresentationMode] = useState(false);
  const [showScrollProgress, setShowScrollProgress] = useState(true);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [showFloatingElements, setShowFloatingElements] = useState(true);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showKonamiHint, setShowKonamiHint] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [activeSection, setActiveSection] = useState('home');
  
  // Nouvelles fonctionnalités premium
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(false);
  const [portfolioLayout, setPortfolioLayout] = useState('classic');
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [premiumFeatures, setPremiumFeatures] = useState(false);
  const [showPremiumBanner, setShowPremiumBanner] = useState(false);
  const [showPortfolioPreview, setShowPortfolioPreview] = useState(false);
  const [activePortfolioLayout, setActivePortfolioLayout] = useState('classic');
  
  // Nouvelles fonctionnalités premium non liées au thème
  const [favorites, setFavorites] = useState<string[]>([]);
  const [notes, setNotes] = useState<{[key: string]: string}>({});
  const [presentationTransitions, setPresentationTransitions] = useState('default');
  const [customShortcuts, setCustomShortcuts] = useState<{[key: string]: string}>({
    toggleQuickNav: 'Ctrl+N',
    toggleSettings: 'Ctrl+,',
    togglePresentation: 'Ctrl+P',
    toggleSearch: 'Ctrl+F',
    toggleFavorites: 'Ctrl+B'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [readingMode, setReadingMode] = useState(false);
  const [readingOptions, setReadingOptions] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    maxWidth: 800,
    fontFamily: 'sans-serif'
  });
  
  const konamiHintTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Code Konami: ↑↑↓↓←→←→BA
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  
  // Appliquer la taille de police
  useEffect(() => {
    document.documentElement.style.fontSize = `${parseInt(fontSize, 10)}px`;
  }, [fontSize]);
  
  // Appliquer les animations
  useEffect(() => {
    if (!animations || reducedMotion) {
      document.documentElement.classList.add('no-animations');
    } else {
      document.documentElement.classList.remove('no-animations');
    }
  }, [animations, reducedMotion]);
  
  // Appliquer le mode contraste élevé
  useEffect(() => {
    if (highContrastMode) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrastMode]);
  
  // Appliquer le mode lecteur d'écran
  useEffect(() => {
    if (screenReader) {
      document.documentElement.classList.add('screen-reader-friendly');
    } else {
      document.documentElement.classList.remove('screen-reader-friendly');
    }
  }, [screenReader]);
  
  // Appliquer la navigation au clavier
  useEffect(() => {
    if (keyboardNavigation) {
      document.documentElement.classList.add('keyboard-navigation');
    } else {
      document.documentElement.classList.remove('keyboard-navigation');
    }
  }, [keyboardNavigation]);
  
  // Appliquer le layout du portfolio
  useEffect(() => {
    document.documentElement.setAttribute('data-portfolio-layout', portfolioLayout);
    setActivePortfolioLayout(portfolioLayout);
  }, [portfolioLayout]);
  
  // Appliquer les fonctionnalités premium non liées au thème
  useEffect(() => {
    // Appliquer le mode de lecture
    if (readingMode) {
      document.documentElement.classList.add('reading-mode');
      document.documentElement.style.setProperty('--reading-font-size', `${readingOptions.fontSize}px`);
      document.documentElement.style.setProperty('--reading-line-height', readingOptions.lineHeight.toString());
      document.documentElement.style.setProperty('--reading-max-width', `${readingOptions.maxWidth}px`);
      document.documentElement.style.setProperty('--reading-font-family', readingOptions.fontFamily);
    } else {
      document.documentElement.classList.remove('reading-mode');
    }
  }, [readingMode, readingOptions]);
  
  // Appliquer les transitions de présentation
  useEffect(() => {
    document.documentElement.setAttribute('data-presentation-transition', presentationTransitions);
  }, [presentationTransitions]);
  
  // Gérer les raccourcis clavier personnalisés
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Vérifier si c'est un raccourci personnalisé
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey;
      const shift = e.shiftKey;
      const alt = e.altKey;
      
      // Format: Ctrl+N, Ctrl+Shift+F, etc.
      const shortcut = [
        ctrl ? 'Ctrl' : '',
        shift ? 'Shift' : '',
        alt ? 'Alt' : '',
        key.charAt(0).toUpperCase() + key.slice(1)
      ].filter(Boolean).join('+');
      
      // Vérifier si le raccourci correspond à une action
      Object.entries(customShortcuts).forEach(([action, customShortcut]) => {
        if (shortcut === customShortcut) {
          e.preventDefault();
          switch (action) {
            case 'toggleQuickNav':
              toggleQuickNav();
              break;
            case 'toggleSettings':
              setSettingsOpen(true);
              break;
            case 'togglePresentation':
              togglePresentationMode();
              break;
            case 'toggleSearch':
              toggleSearch();
              break;
            case 'toggleFavorites':
              // Afficher les favoris
              break;
            default:
              break;
          }
        }
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [customShortcuts]);
  
  // Gérer le type de curseur
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorType('pointer');
      } else if (target.closest('.cv-element')) {
        setCursorType('help');
      } else {
        setCursorType('default');
      }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
    return () => document.removeEventListener('mouseover', handleMouseOver);
  }, []);
  
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
    
    if (showFloatingElements) {
    createFloatingCode();
    }
    
    // Cleanup function
    return () => {
      document.querySelectorAll('.floating-code').forEach(el => el.remove());
    };
  }, [showFloatingElements]);
  
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

  // Intersection Observer pour les animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  
  // Gestion des paramètres
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const toggleSound = () => {
    setSound(!sound);
  };

  const toggleAnimations = () => {
    setAnimations(!animations);
  };

  const changeFontSize = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = `${parseInt(size, 10)}px`;
  };

  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode);
  };

  const toggleScrollProgress = () => {
    setShowScrollProgress(!showScrollProgress);
  };

  const toggleQuickNav = () => {
    setShowQuickNav(!showQuickNav);
  };

  const toggleFloatingElements = () => {
    setShowFloatingElements(!showFloatingElements);
  };

  const showKonamiHintHandler = () => {
    setShowKonamiHint(true);
    if (konamiHintTimeout.current) {
      clearTimeout(konamiHintTimeout.current);
    }
    konamiHintTimeout.current = setTimeout(() => {
      setShowKonamiHint(false);
    }, 5000);
  };
  
  // Nouvelles fonctionnalités premium
  const toggleHighContrastMode = () => {
    setHighContrastMode(!highContrastMode);
  };
  
  const toggleReducedMotion = () => {
    setReducedMotion(!reducedMotion);
  };
  
  const toggleScreenReader = () => {
    setScreenReader(!screenReader);
  };
  
  const toggleKeyboardNavigation = () => {
    setKeyboardNavigation(!keyboardNavigation);
  };
  
  const changePortfolioLayout = (layout: string) => {
    setPortfolioLayout(layout);
  };
  
  const toggleInteractiveMode = () => {
    setInteractiveMode(!interactiveMode);
  };
  
  const togglePremiumFeatures = () => {
    setPremiumFeatures(!premiumFeatures);
    if (!premiumFeatures) {
      setShowPremiumBanner(true);
      setTimeout(() => setShowPremiumBanner(false), 5000);
    }
  };
  
  const showPortfolioPreviewHandler = () => {
    setShowPortfolioPreview(true);
    setTimeout(() => setShowPortfolioPreview(false), 5000);
  };
  
  // Nouvelles fonctions pour les fonctionnalités premium non liées au thème
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  const addNote = (id: string, note: string) => {
    setNotes({...notes, [id]: note});
  };
  
  const removeNote = (id: string) => {
    const newNotes = {...notes};
    delete newNotes[id];
    setNotes(newNotes);
  };
  
  const changePresentationTransition = (transition: string) => {
    setPresentationTransitions(transition);
  };
  
  const updateShortcut = (action: string, shortcut: string) => {
    setCustomShortcuts({...customShortcuts, [action]: shortcut});
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Recherche simple dans les sections
    const results = sections
      .filter(section => 
        section.label.toLowerCase().includes(query.toLowerCase()) ||
        section.id.toLowerCase().includes(query.toLowerCase())
      )
      .map(section => ({
        id: section.id,
        type: 'section',
        label: section.label,
        icon: section.icon
      }));
    
    setSearchResults(results);
  };
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };
  
  const toggleReadingMode = () => {
    setReadingMode(!readingMode);
  };
  
  const updateReadingOptions = (options: any) => {
    setReadingOptions({...readingOptions, ...options});
  };
  
  return (
    <div className={`relative min-h-screen portfolio-layout-${activePortfolioLayout}`}>
      <Navbar onSettingsClick={() => setSettingsOpen(true)} />
      <Header />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
      <div ref={cvRef} id="cv" className="relative py-32 overflow-hidden">
        {/* Background avec effet premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.05),transparent_50%)]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - Design Éditorial */}
          <div className="text-center mb-28">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-white/20"></div>
              <span className="text-xs font-mono text-white/60 uppercase tracking-[0.4em]">Professional Profile</span>
              <div className="w-12 h-px bg-white/20"></div>
            </div>
            <h2 className="text-8xl font-display font-extralight text-white mb-10 tracking-tight leading-none">
              Profil
            </h2>
            <p className="text-3xl font-light text-white/80 tracking-wide">Professionnel</p>
          </div>

          {/* Layout Asymétrique Premium */}
          <div className="grid lg:grid-cols-5 gap-20 items-start">
            {/* Left Column - Principal (3 cols) */}
            <div className="lg:col-span-3 space-y-16">
              {/* Titre Principal avec Design Moderne */}
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  <div className="pl-8">
                    <p className="text-xs font-mono text-white/50 uppercase tracking-[0.35em] mb-6">Expertise Principale</p>
                    <h3 className="text-5xl font-extralight text-white leading-tight tracking-tight mb-4">
                      Ingénieure Logiciel
                    </h3>
                    <p className="text-3xl font-light text-white/90 leading-tight mb-6">
                      Full Stack Development
                    </p>
                    <div className="flex items-center gap-5 text-sm text-white/60 font-light">
                      <span>Intelligence Artificielle</span>
                      <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                      <span>Architecture Logicielle</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Value Proposition - Design Magazine */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                <div className="pl-8 space-y-6">
                  <p className="text-xs font-mono text-white/50 uppercase tracking-[0.35em]">Proposition de Valeur</p>
                  <p className="text-xl text-white/90 leading-relaxed font-light">
                    <span className="text-white font-normal">Expertise technique avancée</span> en développement full-stack, 
                    alliant innovation rapide et solutions production-ready. Capacité d'adaptation aux défis techniques 
                    complexes avec création de valeur immédiate.
                  </p>
                  <div className="inline-block px-6 py-3 border border-white/20 backdrop-blur-sm">
                    <p className="text-sm text-white font-light tracking-wide">
                      Disponible dès maintenant pour un PFE
                    </p>
                  </div>
                </div>
              </div>

              {/* Compétences en Colonnes */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 h-px w-8 bg-white/30"></div>
                    <div className="pl-8">
                      <p className="text-xs font-mono text-white/50 uppercase tracking-[0.3em] mb-4">Stack Technique</p>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        React • Node.js • Python<br/>
                        TypeScript • PostgreSQL<br/>
                        Docker • Git
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-4 top-0 h-px w-8 bg-white/30"></div>
                    <div className="pl-8">
                      <p className="text-xs font-mono text-white/50 uppercase tracking-[0.3em] mb-4">Soft Skills</p>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        Autonomie Professionnelle<br/>
                        Leadership Technique<br/>
                        Collaboration Agile
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 h-px w-8 bg-white/30"></div>
                    <div className="pl-8">
                      <p className="text-xs font-mono text-white/50 uppercase tracking-[0.3em] mb-4">Spécialités</p>
                      <p className="text-sm text-white/80 leading-relaxed font-light">
                        Intelligence Artificielle<br/>
                        Machine Learning<br/>
                        Architecture Web<br/>
                        Database Design
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA - Design Minimaliste Premium */}
              <div className="pt-8">
                <a 
                  href="/bjane Asmaa.pdf" 
                  download
                  className="group relative inline-flex items-center gap-6 border border-white/30 hover:border-white/60 px-10 py-6 transition-all duration-500 backdrop-blur-sm"
                >
                  <Download className="w-5 h-5 text-white" />
                  <span className="text-base font-light tracking-widest text-white uppercase">Télécharger CV</span>
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-700"></div>
                </a>
              </div>
            </div>

            {/* Right Column - Stats & Propositions (2 cols) */}
            <div className="lg:col-span-2 space-y-16">
              {/* Stats Verticales Premium */}
              <div className="space-y-10">
                <div className="relative pb-8 border-b border-white/10">
                  <p className="text-5xl font-extralight text-white mb-2">22+</p>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Certifications Obtenues</p>
                </div>
                
                <div className="relative pb-8 border-b border-white/10">
                  <p className="text-5xl font-extralight text-white mb-2">5 ans</p>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Formation Ingénieur</p>
                </div>
                
                <div className="relative pb-8 border-b border-white/10">
                  <p className="text-5xl font-extralight text-white mb-2">Full Stack</p>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Développement</p>
                </div>
                
                <div className="relative pb-8">
                  <p className="text-5xl font-extralight text-white mb-2">IA & ML</p>
                  <p className="text-xs font-mono text-white/50 uppercase tracking-wider">Spécialisation</p>
                </div>
              </div>

              {/* Propositions de Valeur */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <p className="text-xs font-mono text-white/50 uppercase tracking-[0.35em] mb-8">Impact</p>
                
                <div className="space-y-6">
                  <div className="relative pl-6 border-l border-white/20 hover:border-white/50 transition-colors duration-300">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      Solutions scalables et architecture performante
                    </p>
                  </div>
                  
                  <div className="relative pl-6 border-l border-white/20 hover:border-white/50 transition-colors duration-300">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      Intégration IA & ML innovante
                    </p>
                  </div>
                  
                  <div className="relative pl-6 border-l border-white/20 hover:border-white/50 transition-colors duration-300">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      Optimisation système avancée
                    </p>
                  </div>
                  
                  <div className="relative pl-6 border-l border-white/20 hover:border-white/50 transition-colors duration-300">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      Mentorat technique d'équipe
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
      
      {/* Boutons et composants flottants */}
      <ScrollToTopButton />
      <SettingsButton onClick={() => setSettingsOpen(true)} />
      <QuickNav sections={sections} />
      {showScrollProgress && <ReadingProgress />}
      <CustomCursor cursorType={cursorType} />
      
      {/* Panneau de paramètres avec les nouvelles options */}
      {settingsOpen && (
        <SettingsPanel
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          language={language}
          onLanguageChange={changeLanguage}
          sound={sound}
          onSoundChange={toggleSound}
          animations={animations}
          onAnimationsChange={toggleAnimations}
          cursorType={cursorType}
          onCursorTypeChange={setCursorType}
          fontSize={fontSize}
          onFontSizeChange={changeFontSize}
          presentationMode={presentationMode}
          onPresentationModeChange={togglePresentationMode}
          showScrollProgress={showScrollProgress}
          onScrollProgressChange={toggleScrollProgress}
          showQuickNav={showQuickNav}
          onQuickNavChange={toggleQuickNav}
          showFloatingElements={showFloatingElements}
          onFloatingElementsChange={toggleFloatingElements}
          onKonamiHint={showKonamiHintHandler}
          highContrastMode={highContrastMode}
          onHighContrastModeChange={toggleHighContrastMode}
          reducedMotion={reducedMotion}
          onReducedMotionChange={toggleReducedMotion}
          screenReader={screenReader}
          onScreenReaderChange={toggleScreenReader}
          keyboardNavigation={keyboardNavigation}
          onKeyboardNavigationChange={toggleKeyboardNavigation}
          portfolioLayout={portfolioLayout}
          onPortfolioLayoutChange={changePortfolioLayout}
          interactiveMode={interactiveMode}
          onInteractiveModeChange={toggleInteractiveMode}
          premiumFeatures={premiumFeatures}
          onPremiumFeaturesChange={togglePremiumFeatures}
          favorites={favorites}
          onToggleFavorite={(id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])}
          notes={notes}
          onAddNote={(id: string, note: string) => setNotes(prev => ({...prev, [id]: note}))}
          onRemoveNote={(id: string) => setNotes(prev => {const newNotes = {...prev}; delete newNotes[id]; return newNotes;})}
          presentationTransitions={presentationTransitions}
          onPresentationTransitionChange={setPresentationTransitions}
          customShortcuts={customShortcuts}
          onUpdateShortcut={(action: string, shortcut: string) => setCustomShortcuts(prev => ({...prev, [action]: shortcut}))}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          searchResults={searchResults}
          showSearch={showSearch}
          onToggleSearch={() => setShowSearch(!showSearch)}
          readingMode={readingMode}
          onReadingModeChange={toggleReadingMode}
          readingOptions={readingOptions}
          onReadingOptionsChange={updateReadingOptions}
        />
      )}
      
      {/* Easter Egg Component */}
      <EasterEgg 
        isVisible={showEasterEgg}
        onClose={() => setShowEasterEgg(false)}
      />
      
      {/* Indicateur de section active */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-2 z-50">
        <span className="text-sm font-medium text-gray-700">
          {sections.find(s => s.id === activeSection)?.label || 'Accueil'}
        </span>
        <ChevronUp size={16} className="text-primary" />
      </div>
      
      {/* Indice pour le code Konami */}
      {showKonamiHint && (
        <div className="fixed top-4 left-4 bg-yellow-100 text-yellow-800 p-3 rounded-lg shadow-lg animate-pulse z-50">
          <p className="text-sm font-medium">Indice: Essayez le code Konami!</p>
        </div>
      )}
      
      {/* Bannière Premium */}
      {showPremiumBanner && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg shadow-xl z-50 animate-fade-in">
          <div className="flex items-center space-x-3">
            <Crown className="h-6 w-6 text-yellow-300" />
            <div>
              <h3 className="font-bold">Fonctionnalités Premium Activées</h3>
              <p className="text-sm">Profitez de toutes les fonctionnalités avancées!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Aperçu du Portfolio */}
      {showPortfolioPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Aperçu du Portfolio</h2>
              <button 
                onClick={() => setShowPortfolioPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {portfolioLayouts.map((layout) => (
                <div 
                  key={layout.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    activePortfolioLayout === layout.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                  onClick={() => setActivePortfolioLayout(layout.id)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {layout.icon}
                    <span className="font-medium">{layout.name}</span>
                  </div>
                  <div className="h-24 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-sm text-gray-500">Aperçu du layout {layout.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowPortfolioPreview(false)}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
