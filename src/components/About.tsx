
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const About: React.FC = () => {
  return (
    <AnimatedSection id="about" className="section-container">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
        À Propos
      </h2>
      <p className="section-subtitle">
        Élève ingénieure passionnée par le développement et les réseaux.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
        <div className="space-y-6 slide-in-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <GraduationCap size={28} />
            </div>
            <h3 className="text-2xl font-display font-semibold text-primary">Mon Parcours</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed border-l-4 border-secondary pl-4 py-2">
            Actuellement en 4ème année à l'EMSI en filière Ingénierie Informatique et Réseaux (IIR), 
            je me spécialise dans le développement d'applications et l'administration de systèmes et réseaux.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ma formation polyvalente me permet d'avoir une vision complète des projets informatiques, 
            du développement au déploiement. Ma passion pour les nouvelles technologies et ma curiosité 
            m'ont permis de développer de solides compétences techniques à travers divers projets académiques et personnels.
          </p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 bg-primary/10 rounded-lg text-primary text-sm font-medium">4ème année IIR</div>
            <div className="px-4 py-2 bg-secondary/10 rounded-lg text-secondary text-sm font-medium">Développement</div>
            <div className="px-4 py-2 bg-primary/10 rounded-lg text-primary text-sm font-medium">Réseaux</div>
          </div>
        </div>
        
        <div className="space-y-6 slide-in-right">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
              <Briefcase size={28} />
            </div>
            <h3 className="text-2xl font-display font-semibold text-primary">Expérience Professionnelle</h3>
          </div>
          
          <div className="somagec-card relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary"></div>
            <div className="pl-4">
              <div className="flex items-start gap-4">
                <div>
                  <h4 className="font-semibold text-lg text-primary">Stagiaire en Réseau et Développement</h4>
                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                    <img 
                      src="/lovable-uploads/822ecd8e-c2a8-4596-bf2b-733dd8f63579.png" 
                      alt="SOMAGEC Logo" 
                      className="h-4 inline-block"
                    /> 
                    SOMAGEC GROUP | Juillet 2024 - Août 2024
                  </p>
                  <Separator className="my-4" />
                  <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                    <li>Développement d'une application de gestion des équipements et ressources</li>
                    <li>Configuration et gestion de serveurs virtuels (VMware, Hyper-V, Proxmox)</li>
                    <li>Installation et brassage de câbles réseaux</li>
                    <li>Utilisation de GLPI pour le suivi des actifs et gestion des incidents</li>
                    <li>Administration de serveurs Linux (Ubuntu) et Windows Server</li>
                    <li>Gestion d'Active Directory</li>
                    <li>Résolution de problèmes physiques de réseaux</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="flex items-center gap-2 text-primary mt-4 text-sm">
              <Award size={16} />
              <span>Compétences acquises en environnement professionnel</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
