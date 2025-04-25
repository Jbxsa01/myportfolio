import React, { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface EasterEggProps {
  isVisible: boolean;
  onClose: () => void;
  position?: Position;
  scale?: number;
  rotation?: number;
  message?: string;
}

const EasterEgg: React.FC<EasterEggProps> = ({ 
  isVisible, 
  onClose,
  position = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  scale = 1,
  rotation = 0,
  message
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const [currentScale, setCurrentScale] = useState(scale);
  const [currentRotation, setCurrentRotation] = useState(rotation);
  const [currentMessage, setCurrentMessage] = useState(message);
  
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
      setCurrentPosition({ x, y });
      
      // Animation d'apparition
      setCurrentScale(0);
      setTimeout(() => setCurrentScale(1), 100);
      
      // Rotation aléatoire
      setCurrentRotation(Math.random() * 20 - 10);
      
      // Message aléatoire
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
      
      // Animation de flottement
      const interval = setInterval(() => {
        setCurrentPosition(prev => ({
          x: prev.x + (Math.random() * 10 - 5),
          y: prev.y + (Math.random() * 10 - 5)
        }));
        setCurrentRotation(prev => prev + (Math.random() * 2 - 1));
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="relative transform-gpu transition-all duration-500 ease-out"
        style={{
          transform: `translate(${currentPosition.x}px, ${currentPosition.y}px) scale(${currentScale}) rotate(${currentRotation}deg)`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-lg bg-white p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <h3 className="text-xl font-semibold text-gray-900">
              {currentMessage || "Easter Egg Found!"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg; 