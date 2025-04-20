
import React from 'react';
import AnimatedSection from './AnimatedSection';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Gestion de parc IT",
    description: "Application web pour la gestion complète d'un parc informatique avec suivi des équipements et interventions.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
    technologies: ["PHP", "AJAX", "Tailwind CSS", "HTML", "JS"],
    delay: 100
  },
  {
    title: "Gestion de voyage d'affaires (SkyTravel)",
    description: "Plateforme de gestion des voyages d'affaires permettant la réservation et le suivi des déplacements professionnels.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    technologies: ["PHP", "Python"],
    delay: 200
  },
  {
    title: "Gestion des hôpitaux",
    description: "Système de gestion hospitalière pour optimiser les ressources, les rendez-vous et le suivi des patients.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    technologies: ["C"],
    delay: 300
  },
  {
    title: "Application esthétique",
    description: "Application de gestion pour salon d'esthétique avec réservation de rendez-vous et suivi des clients.",
    image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
    technologies: [".NET", "ASP.NET", "SQL Server"],
    delay: 400
  },
  {
    title: "Application médicale",
    description: "Plateforme médicale pour la gestion des patients, des rendez-vous et des dossiers médicaux.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    technologies: ["PHP", "Laravel", "Tailwind CSS", "JS", "HTML"],
    delay: 500
  }
];

const Projects: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="section-container py-24">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
        Mes Projets
      </h2>
      <p className="section-subtitle">
        Découvrez quelques-uns des projets sur lesquels j'ai travaillé.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            technologies={project.technologies}
            delay={project.delay}
          />
        ))}
      </div>
    </AnimatedSection>
  );
};

export default Projects;
