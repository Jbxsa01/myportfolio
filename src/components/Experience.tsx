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
    year: "2021-2023",
    title: "Classes préparatoires intégrées",
    institution: "EMSI Casablanca",
    type: "education"
  },
  {
    id: 3,
    year: "2023-2026",
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
      
      {/* Timeline Horizontale Style Premium */}
      <div className="relative max-w-7xl mx-auto py-20">
        {/* Ligne horizontale principale avec gradient */}
        <div className="absolute top-[120px] left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-purple-500 via-blue-500 via-green-500 to-red-500 shadow-lg"></div>
        
        {/* Container avec disposition alternée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 relative">
          {experienceData.map((item, index) => {
            const isEducation = item.type === "education";
            const colors = [
              { border: 'border-orange-400', bg: 'bg-orange-400', text: 'text-orange-600', bgLight: 'bg-orange-50', shadow: 'shadow-orange-200' },
              { border: 'border-purple-500', bg: 'bg-purple-500', text: 'text-purple-600', bgLight: 'bg-purple-50', shadow: 'shadow-purple-200' },
              { border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-600', bgLight: 'bg-blue-50', shadow: 'shadow-blue-200' },
              { border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-600', bgLight: 'bg-green-50', shadow: 'shadow-green-200' },
              { border: 'border-teal-500', bg: 'bg-teal-500', text: 'text-teal-600', bgLight: 'bg-teal-50', shadow: 'shadow-teal-200' },
              { border: 'border-red-500', bg: 'bg-red-500', text: 'text-red-600', bgLight: 'bg-red-50', shadow: 'shadow-red-200' }
            ];
            const color = colors[index % colors.length];
            const isTop = index % 2 === 0;
            
            return (
              <div key={item.id} className="relative flex flex-col items-center group">
                {/* Contenu alterné (haut/bas) */}
                <div className={`flex flex-col items-center w-full ${isTop ? 'mb-8' : 'mt-8 flex-col-reverse'}`}>
                  {/* Card avec contenu */}
                  <div className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${color.border} hover:-translate-y-2 w-full ${color.shadow}`}>
                    {/* Badge d'année circulaire */}
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full border-4 ${color.border} ${color.bgLight} flex items-center justify-center font-bold ${color.text} text-lg shadow-lg`}>
                      {item.year.length <= 4 ? item.year : item.year.split('-')[0].trim()}
                    </div>
                    
                    {/* Titre avec label */}
                    <div className={`inline-block px-3 py-1 rounded-full ${color.bgLight} ${color.text} text-xs font-bold mb-3 uppercase tracking-wide`}>
                      {isEducation ? 'Formation' : 'Expérience'}
                    </div>
                    
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {item.institution}
                    </p>
                    
                    {/* Période complète en bas */}
                    <div className={`mt-4 pt-3 border-t ${color.border} border-opacity-20`}>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-medium">{item.year}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Connecteur vertical avec cercle */}
                  <div className="relative flex flex-col items-center my-2">
                    <div className={`w-1 h-12 ${color.bg}`}></div>
                    <div className={`w-6 h-6 rounded-full ${color.bg} border-4 border-white dark:border-gray-900 shadow-lg z-20 group-hover:scale-125 transition-transform duration-300`}></div>
                  </div>
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
