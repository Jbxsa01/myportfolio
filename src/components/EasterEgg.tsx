import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface EasterEggProps {
  isVisible: boolean;
  onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ isVisible, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState('');
  
  const messages = [
    "🎉 Félicitations ! Vous avez trouvé un easter egg !",
    "🌟 Vous êtes un explorateur curieux !",
    "🎮 Bien joué ! Vous avez découvert un secret !",
    "🎨 Un peu de magie dans votre journée !",
    "🚀 Vous êtes prêt pour l'aventure !"
  ];
  
  useEffect(() => {
    if (isVisible) {
      // Position aléatoire dans la fenêtre
      const x = Math.random() * (window.innerWidth - 300);
      const y = Math.random() * (window.innerHeight - 200);
      setPosition({ x, y });
      
      // Animation d'apparition
      setScale(0);
      setTimeout(() => setScale(1), 100);
      
      // Rotation aléatoire
      setRotation(Math.random() * 20 - 10);
      
      // Message aléatoire
      setMessage(messages[Math.floor(Math.random() * messages.length)]);
      
      // Animation de flottement
      const interval = setInterval(() => {
        setPosition(prev => ({
          x: prev.x + (Math.random() * 10 - 5),
          y: prev.y + (Math.random() * 10 - 5)
        }));
        setRotation(prev => prev + (Math.random() * 2 - 1));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed z-50 transition-all duration-500 ease-out"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transform: `scale(${scale}) rotate(${rotation}deg)`
      }}
    >
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-xl shadow-2xl text-white max-w-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2">
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
          <h3 className="text-xl font-bold">Easter Egg</h3>
        </div>
        
        <p className="mb-4">{message}</p>
        
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎁</span>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-white/80">
          <p>Vous avez découvert un secret !</p>
          <p className="mt-1">Continuez à explorer pour en trouver d'autres...</p>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg; 