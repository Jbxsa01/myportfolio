import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  link,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "card-glass overflow-hidden appear h-full",
        delay ? `appear-delay-${delay}` : ''
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 overflow-hidden relative">
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        {/* Enrichissement spécifique pour Application médicale */}
        {title === "Application médicale" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded border border-emerald-200 text-gray-800 text-sm mb-2">
              💡 Repenser la santé digitale avec Medicare 💡<br />
              Dans un monde où la technologie transforme nos modes de vie, j’ai choisi de mettre mes compétences au service de la santé en développant Medicare : une plateforme innovante qui simplifie l’accès aux soins pour tous.
            </div>
            <div>
              <span className="font-bold text-emerald-700">🎯 Fonctionnalités clés :</span>
              <ul className="list-disc ml-5 text-sm mt-1">
                <li>📅 Prise de rendez-vous rapide et intuitive avec des médecins, adaptée à tous les profils.</li>
                <li>💊 Commande de médicaments auprès des pharmacies les plus proches grâce à une optimisation par géolocalisation.</li>
                <li>💻 Consultations en ligne pour des cas simples, permettant d’obtenir des prescriptions médicales sans se déplacer inutilement.</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-emerald-700">🌟 Contributions techniques :</span>
              <ul className="list-disc ml-5 text-sm mt-1">
                <li>Back-end : PHP & MySQL</li>
                <li>Front-end : HTML, CSS, JavaScript, Tailwind CSS</li>
                <li>Expérience utilisateur : simplicité, rapidité, navigation intuitive</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-yellow-700">🔍 Défis actuels :</span>
              <ul className="list-disc ml-5 text-sm mt-1">
                <li>Algorithmes intelligents pour suggestions personnalisées</li>
                <li>Sécurité RGPD et secteur médical</li>
                <li>Architecture scalable</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-green-700">💡 Prochaines étapes :</span>
              <ul className="list-disc ml-5 text-sm mt-1">
                <li>Consultations vidéo et intégration avancée avec pharmacies/établissements</li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {['#SantéDigitale', '#FemmesDansLaTech', '#InnovationSanté', '#WebDevelopment', '#PHP', '#TailwindCSS'].map(tag => (
                <span key={tag} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">{tag}</span>
              ))}
            </div>
            {/* Galerie d'images a1-a13 */}
            <div className="mt-4">
              <span className="font-bold text-emerald-700">Galerie du projet :</span>
              <div className="flex gap-2 overflow-x-auto mt-2 pb-2">
                {Array.from({ length: 13 }, (_, i) => `/a${i + 1}.jpg`).map((img, idx) => (
                  <img key={img} src={img} alt={`Medicare ${idx + 1}`} className="h-20 w-32 object-cover rounded shadow" />
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-3 rounded text-center text-xs mt-2">
              🌍 Ensemble, construisons un avenir où la santé est connectée, accessible et toujours plus humaine.
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {link && (
          <a 
            href={link} 
            className="inline-flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            target="_blank" 
            rel="noreferrer"
          >
            Voir le projet <ArrowUpRight size={16} className="ml-1" />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
