import React from 'react';
import AnimatedSection from './AnimatedSection';
import ProjectCard from './ProjectCard';
import DarijaAIProject from './DarijaAIProject';
import CharityPlatformProject from './CharityPlatformProject';
import FournissMaProject from './FournissMaProject';
import DotNetMVCProject from './DotNetMVCProject';
import MedicareProject from './MedicareProject';

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
    image: "/skytravel.jpg",
    technologies: ["PHP", "Python"],
    delay: 200
  }
];

const Projects: React.FC = () => {
  return (
    <AnimatedSection id="projects" className="section-container py-24">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
        Mes Projets
      </h2>
      <p className="section-subtitle text-justify">
        Découvrez mes réalisations et projets personnels
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <DarijaAIProject />
        <CharityPlatformProject />
        <FournissMaProject />
        <DotNetMVCProject />
        <MedicareProject />
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
