import React, { useEffect, useState } from 'react';
import { Briefcase, Calendar, MapPin, Code, Brain, Users, Clock, Mail, Rocket, Sparkles, Target, Zap } from 'lucide-react';

const InternshipSearch: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-3xl shadow-xl p-10 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          {/* Animated background elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-20 h-20 bg-purple-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-block mb-4">
                <span className="inline-block animate-bounce">
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent inline-block">
                  STAGE DISPONIBLE À PARTIR DE JUILLET 2024
                </h2>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>
                  <Sparkles className="w-8 h-8 text-yellow-400" />
                </span>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Je suis disponible pour un stage passionnant de 2 mois dans le développement web et l'intelligence artificielle.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl border border-primary/10">
                <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
                  <Target className="mr-2 text-primary" />
                  Ce que je recherche
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Code className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Un stage en développement web full stack</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Brain className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Des projets innovants utilisant l'IA</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Users className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Un environnement d'apprentissage stimulant</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Users className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Un mentorat technique</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl border border-primary/10">
                <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
                  <Rocket className="mr-2 text-primary" />
                  Ce que je peux apporter
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Code className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Compétences en développement web moderne</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Brain className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Intérêt et connaissances en IA</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Users className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Capacité d'apprentissage autonome</span>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                      <Zap className="text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors">Motivation et engagement</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/10">
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
                <Clock className="mr-2 text-primary" />
                Disponibilités
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                    <Calendar className="text-primary" />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Stage de 2 mois à partir de juillet 2024</span>
                </div>
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="text-primary" />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Flexible sur la localisation</span>
                </div>
                <div className="flex items-center group">
                  <div className="bg-primary/10 p-2 rounded-full mr-3 group-hover:bg-primary/20 transition-colors">
                    <Users className="text-primary" />
                  </div>
                  <span className="group-hover:text-primary transition-colors">Possibilité de télétravail partiel</span>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <a 
                href="mailto:bjane.asmaa1@gmail.com" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-lg hover:from-blue-600 hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-lg font-medium group"
              >
                <Mail className="w-5 h-5 group-hover:animate-bounce" />
                <span>Contactez-moi pour discuter d'une opportunité de collaboration</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom animations to global styles */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>
    </section>
  );
};

export default InternshipSearch; 