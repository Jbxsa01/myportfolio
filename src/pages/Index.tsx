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
      <div ref={cvRef} id="cv" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 transform hover:scale-[1.02] transition-all duration-300 border border-gray-100 relative group">
            {/* 3D Floating Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-500 transform group-hover:translate-x-5 group-hover:translate-y-5"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-500 transform group-hover:-translate-x-5 group-hover:-translate-y-5"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent text-center">
                Mon CV
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="transform transition-transform duration-500 hover:translate-y-[-5px]">
                  <p className="text-lg text-gray-600 leading-relaxed text-justify">
              Vous pouvez télécharger mon CV pour en savoir plus sur mon parcours professionnel, 
              mes compétences et mes expériences. N'hésitez pas à me contacter pour toute opportunité 
                    de collaboration.
            </p>
                  <div className="flex justify-center">
            <a 
                      href="/CV bjane Asmaa software engineer.pdf" 
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
