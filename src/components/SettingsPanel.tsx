import React from 'react';
import { Settings, Languages, Volume2, VolumeX, Eye, EyeOff, X, Presentation, ChevronUp, ChevronDown, EyeIcon, EyeOffIcon, ChevronUpIcon, ChevronDownIcon, MousePointer, Layout, Keyboard, Globe, Mic, Zap, Shield, Lock, Star, Award, Trophy, Crown, Search, Book, Bookmark, BookmarkCheck, BookOpen, Maximize, Minimize, Type, Columns, Rows, AlignLeft, AlignCenter, AlignRight, Sliders, Save, Trash2, Plus, Edit, Check, X as XIcon } from 'lucide-react';

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
  // Nouvelles fonctionnalités premium
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
  // Nouvelles fonctionnalités premium non liées au thème
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  notes: {[key: string]: string};
  onAddNote: (id: string, note: string) => void;
  onRemoveNote: (id: string) => void;
  presentationTransitions: string;
  onPresentationTransitionChange: (transition: string) => void;
  customShortcuts: {[key: string]: string};
  onUpdateShortcut: (action: string, shortcut: string) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
  searchResults: any[];
  showSearch: boolean;
  onToggleSearch: () => void;
  readingMode: boolean;
  onReadingModeChange: (value: boolean) => void;
  readingOptions: {
    fontSize: number;
    lineHeight: number;
    maxWidth: number;
    fontFamily: string;
  };
  onReadingOptionsChange: (options: any) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  language,
  onLanguageChange,
  sound,
  onSoundChange,
  animations,
  onAnimationsChange,
  cursorType,
  onCursorTypeChange,
  fontSize,
  onFontSizeChange,
  presentationMode,
  onPresentationModeChange,
  showScrollProgress,
  onScrollProgressChange,
  showQuickNav,
  onQuickNavChange,
  showFloatingElements,
  onFloatingElementsChange,
  onKonamiHint,
  // Nouvelles fonctionnalités premium
  highContrastMode,
  onHighContrastModeChange,
  reducedMotion,
  onReducedMotionChange,
  screenReader,
  onScreenReaderChange,
  keyboardNavigation,
  onKeyboardNavigationChange,
  portfolioLayout,
  onPortfolioLayoutChange,
  interactiveMode,
  onInteractiveModeChange,
  premiumFeatures,
  onPremiumFeaturesChange,
  // Nouvelles fonctionnalités premium non liées au thème
  favorites,
  onToggleFavorite,
  notes,
  onAddNote,
  onRemoveNote,
  presentationTransitions,
  onPresentationTransitionChange,
  customShortcuts,
  onUpdateShortcut,
  searchQuery,
  onSearch,
  searchResults,
  showSearch,
  onToggleSearch,
  readingMode,
  onReadingModeChange,
  readingOptions,
  onReadingOptionsChange,
}) => {
  const [activeTab, setActiveTab] = React.useState<'appearance' | 'accessibility' | 'interaction' | 'premium'>('appearance');
  const [cursorSize, setCursorSize] = React.useState(20);
  const [cursorColor, setCursorColor] = React.useState('#3B82F6');
  const [layoutMode, setLayoutMode] = React.useState('default');
  const [shortcuts, setShortcuts] = React.useState({
    toggleQuickNav: 'Ctrl+N',
    toggleSettings: 'Ctrl+,',
  });

  React.useEffect(() => {
    console.log('SettingsPanel mounted, isOpen:', isOpen);
    if (isOpen) {
      console.log('Setting active tab to appearance');
      setActiveTab('appearance');
    }
  }, [isOpen]);

  React.useEffect(() => {
    console.log('Active tab changed to:', activeTab);
  }, [activeTab]);

  if (!isOpen) return null;

  const handleTabChange = (tab: string) => {
    console.log('Changing tab to:', tab);
    setActiveTab(tab as 'appearance' | 'accessibility' | 'interaction' | 'premium');
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-100 p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Paramètres</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => handleTabChange('appearance')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'appearance' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Eye className="w-5 h-5" />
                <span>Apparence</span>
              </button>
              <button
                onClick={() => handleTabChange('accessibility')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'accessibility' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span>Accessibilité</span>
              </button>
              <button
                onClick={() => handleTabChange('interaction')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'interaction' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MousePointer className="w-5 h-5" />
                <span>Interaction</span>
              </button>
              <button
                onClick={() => handleTabChange('premium')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'premium' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Crown className="w-5 h-5" />
                <span>Premium</span>
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Apparence</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Layout className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Mise en page</span>
                    </div>
                    <select
                      value={portfolioLayout}
                      onChange={(e) => onPortfolioLayoutChange(e.target.value)}
                      className="px-3 py-1 rounded-lg bg-gray-100 border border-gray-200"
                    >
                      <option value="classic">Classique</option>
                      <option value="modern">Moderne</option>
                      <option value="minimal">Minimaliste</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Presentation className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Mode présentation</span>
                    </div>
                    <button
                      onClick={() => onPresentationModeChange(!presentationMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        presentationMode ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          presentationMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'accessibility' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Accessibilité</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Mode contraste élevé</span>
                    </div>
                    <button
                      onClick={() => onHighContrastModeChange(!highContrastMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        highContrastMode ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          highContrastMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Mic className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Lecteur d'écran</span>
                    </div>
                    <button
                      onClick={() => onScreenReaderChange(!screenReader)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        screenReader ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          screenReader ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Keyboard className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Navigation au clavier</span>
                    </div>
                    <button
                      onClick={() => onKeyboardNavigationChange(!keyboardNavigation)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        keyboardNavigation ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          keyboardNavigation ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Réduire les animations</span>
                    </div>
                    <button
                      onClick={() => onReducedMotionChange(!reducedMotion)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        reducedMotion ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          reducedMotion ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'interaction' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Interaction</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MousePointer className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Mode interactif</span>
                    </div>
                    <button
                      onClick={() => onInteractiveModeChange(!interactiveMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        interactiveMode ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          interactiveMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'premium' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Fonctionnalités Premium</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Crown className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">Activer les fonctionnalités premium</span>
                    </div>
                    <button
                      onClick={() => onPremiumFeaturesChange(!premiumFeatures)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        premiumFeatures ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          premiumFeatures ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {premiumFeatures && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Fonctionnalités Premium activées :</h4>
                      <ul className="space-y-2 text-sm text-blue-700">
                        <li className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Mode contraste élevé</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Mic className="w-4 h-4" />
                          <span>Support lecteur d'écran</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Keyboard className="w-4 h-4" />
                          <span>Navigation au clavier avancée</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>Contrôle des animations</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Layout className="w-4 h-4" />
                          <span>Mises en page personnalisées</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <MousePointer className="w-4 h-4" />
                          <span>Mode interactif</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 