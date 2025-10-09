import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Briefcase, GraduationCap, Award, Bot, Smartphone, Code, Users, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <AnimatedSection id="about" className="section-container">
      {/* Header Section - Design Humain et Moderne */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-[0.2em]">About Me</span>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
        </div>
        <h2 className="text-5xl font-display font-light text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
        À Propos
      </h2>
        <div className="w-24 h-px bg-slate-200 mx-auto mb-8"></div>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
          Software Engineer & AI Specialist avec une expertise en développement full-stack et intelligence artificielle. 
          Mon parcours allie rigueur technique et vision stratégique pour créer des solutions innovantes.
        </p>
      </div>
      
      {/* Main Content - Design Professionnel et Moderne */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Academic Background */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <GraduationCap size={20} className="text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-display font-light text-slate-900 dark:text-slate-100">Formation</h3>
          </div>
          
          <div className="space-y-5">
            <div className="border-l-2 border-slate-200 dark:border-slate-700 pl-5">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-base font-medium text-slate-900 dark:text-slate-100">Cycle Ingénieur - 5ème Année</h4>
                <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  En cours
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-2 text-sm">École Marocaine des Sciences de l'Ingénieur (EMSI)</p>
              <div className="inline-block px-3 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-mono rounded">
                MIAGE - Méthodes Informatiques Appliquées à la Gestion
            </div>
          </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-5 border border-slate-200 dark:border-slate-700">
              <h5 className="font-medium text-slate-900 dark:text-slate-100 mb-2 text-sm">Spécialisation Professionnelle</h5>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Formation d'excellence combinant expertise technique avancée et vision stratégique d'entreprise. 
                Développement de compétences en architecture logicielle, gestion de projet et innovation technologique.
              </p>
            </div>
          </div>
        </div>
        
        {/* Expertise */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
              <Award size={20} className="text-slate-600 dark:text-slate-400" />
            </div>
            <h3 className="text-xl font-display font-light text-slate-900 dark:text-slate-100">Expertise</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="group p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Bot size={16} className="text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Intelligence Artificielle</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Machine Learning & NLP</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Développement d'agents intelligents, OCR, STT, TTS et solutions de traduction automatique.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Smartphone size={16} className="text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Mobile Development</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Applications natives</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Conception et développement d'applications mobiles performantes et intuitives.
                  </p>
                </div>
          </div>
        </div>
        
            <div className="group p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Target size={16} className="text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Gestion de Projet</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Méthodologies Agile</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Rédaction de cahiers des charges, analyse des besoins et communication digitale.
                  </p>
                </div>
            </div>
          </div>
          
            <div className="group p-5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                  <Code size={16} className="text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">Full Stack Development</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Architecture complète</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Développement d'applications web complètes avec technologies modernes.
                  </p>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
          
    </AnimatedSection>
  );
};

export default About;
