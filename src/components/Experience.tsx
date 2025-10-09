import React from 'react';
import AnimatedSection from './AnimatedSection';
import { GraduationCap, Code, Award, BookOpen, Calendar, GanttChart, Bot, Smartphone } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from './ui/badge';

const experienceData = [
  {
    id: 1,
    year: "2021",
    title: "Baccalauréat en Sciences Physiques",
    institution: "Lycée El Baroudi",
    type: "education"
  },
  {
    id: 2,
    year: "2021–2023",
    title: "Classes préparatoires intégrées",
    institution: "EMSI Casablanca",
    type: "education"
  },
  {
    id: 3,
    year: "2023–2026",
    title: "Cycle Ingénieur: Software Architecture & Data Engineering (MIAGE)",
    institution: "EMSI Casablanca",
    type: "education"
  },
  {
    id: 4,
    year: "07/24 - 08/24",
    title: "Backend Integration & Full-Stack Contribution",
    institution: "SOMAGEC GROUP",
    type: "professional"
  },
  {
    id: 5,
    year: "03/25 - 04/25",
    title: "UI/UX Architect & Functional Lead",
    institution: "Oriigami",
    type: "professional"
  },
  {
    id: 6,
    year: "07/25 - 08/25",
    title: "Mobile & AI Engineering: React Implementation",
    institution: "AfriTechia, Casablanca",
    type: "professional"
  }
];

const Experience: React.FC = () => {
  // Separate the data by type
  const education = experienceData.filter(item => item.type === "education");
  const certifications = experienceData.filter(item => item.type === "certification");
  const professional = experienceData.filter(item => item.type === "professional");
  
  return (
    <AnimatedSection id="experience" className="section-container">
      {/* Header Section - Style Professionnel */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
          <span className="text-xs font-mono text-blue-600 uppercase tracking-[0.3em]">PROFESSIONAL JOURNEY</span>
          <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
        </div>
        <h2 className="text-4xl font-display font-light text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          Parcours Professionnel
      </h2>
        <div className="w-20 h-px bg-blue-200 mx-auto mb-6"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
          Évolution de mes expériences académiques vers l'ingénierie logicielle moderne
        </p>
      </div>
      
      {/* Timeline Simple et Professionnelle */}
      <div className="relative max-w-7xl mx-auto">
        {/* Ligne horizontale simple */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2"></div>
        
        {/* Container avec grille simple */}
        <div className="grid grid-cols-6 gap-0 relative py-12">
          {experienceData.map((item, index) => {
            // Logique de progression : Education -> Professional
            const isEducation = item.type === "education";
            const isFirstProfessional = item.type === "professional" && index === 3;
            const isLastItem = index === experienceData.length - 1;
            
            return (
              <div key={item.id} className="flex flex-col items-center relative group">
                {/* Point simple et élégant */}
                <div className={`w-4 h-4 rounded-full z-10 border-2 mb-6 transition-all duration-300 hover:scale-125 ${
                  isEducation 
                    ? 'bg-white dark:bg-gray-900 border-gray-400' 
                    : isFirstProfessional 
                    ? 'bg-white dark:bg-gray-900 border-blue-400' 
                    : 'bg-white dark:bg-gray-900 border-blue-500'
                }`}>
                  <div className={`w-2 h-2 rounded-full mx-auto mt-0.5 transition-all duration-300 ${
                    isEducation 
                      ? 'bg-gray-400' 
                      : isFirstProfessional 
                      ? 'bg-blue-400' 
                      : 'bg-blue-500'
                  }`}></div>
            </div>
            
                {/* Ligne de connexion simple */}
                {!isLastItem && (
                  <div className="absolute top-1/2 left-1/2 w-full h-px bg-gray-300 transform translate-x-1/2 -translate-y-1/2 z-0"></div>
                )}
                
                {/* Contenu simple */}
                <div className="text-center w-full px-2 relative z-10">
                  {/* Badge de date simple */}
                  <div className={`inline-block text-xs font-mono px-3 py-1.5 rounded-full border mb-3 tracking-wide font-medium transition-all duration-300 hover:scale-105 ${
                    isEducation 
                      ? 'text-gray-600 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                      : isFirstProfessional 
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' 
                      : 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600'
                  }`}>
                    {item.year}
                  </div>
                  
                  {/* Titre simple */}
                  <h3 className={`text-sm font-medium mb-2 leading-tight tracking-tight transition-all duration-300 hover:scale-105 ${
                    isEducation 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : isFirstProfessional 
                      ? 'text-gray-800 dark:text-gray-200' 
                      : 'text-gray-900 dark:text-gray-100'
                  }`}>
                    {item.title}
                  </h3>
                  
                  {/* Institution simple */}
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {item.institution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cartes d'Expériences Professionnelles - Style minimal et pro */}
      <div className="max-w-6xl mx-auto mt-12 space-y-6">
        {professional.map((item) => {
          let details: string[] = [];
          let tag = '';
          let logoSrc = '';
          if (item.institution === 'AfriTechia, Casablanca') {
            tag = 'IA & Mobile';
            logoSrc = '/logo-afritechia.png';
            details = [
              "Conception d'un système intelligent intégrant OCR, STT et TTS pour la traduction Darija",
              "Amélioration de 80% de la communication multilingue",
              'Technologies : IA, NLP, Machine Learning, Développement Mobile'
            ];
          } else if (item.institution === 'Oriigami') {
            tag = 'Gestion de Projet';
            logoSrc = '/oriigami.png';
            details = [
              'Rédaction des Cahiers des Charges Fonctionnels (Web et Mobile)',
              "Étude de marché et analyse des besoins utilisateurs",
              'Développement de stratégies de communication et création de contenu digital'
            ];
          } else if (item.institution === 'SOMAGEC GROUP') {
            tag = 'Réseau & Développement';
            logoSrc = '/images.jpg';
            details = [
              "Développement d'une application de gestion des équipements et ressources",
              'Configuration et gestion de serveurs virtuels (VMware, Hyper-V, Proxmox)',
              'Administration Linux/Windows Server, GLPI, Active Directory, câblage réseau'
            ];
          }

          return (
            <div key={item.id} className="group relative flex items-start gap-5 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="min-w-0">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.institution} • {item.year}
                    </p>
                </div>
                  {tag && (
                    <span className="px-2 py-1 rounded-md text-xs font-mono bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 whitespace-nowrap">
                      {tag}
                    </span>
                  )}
          </div>
                <ul className="space-y-1.5">
                  {details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="mt-2 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {logoSrc && (
                <img src={logoSrc} alt={`${item.institution} Logo`} className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
              )}
            </div>
          );
        })}
      </div>
    </AnimatedSection>
  );
};

export default Experience;
