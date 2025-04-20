import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Server, BookOpen, GitBranch, Terminal, Cpu, Layers, BrainCircuit } from 'lucide-react';
import SkillCard from './ui/SkillCard';
import AnimatedSection from './AnimatedSection';

interface Skill {
  icon: any;
  title: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Développement",
    icon: Code,
    skills: [
      { icon: Code, title: "PHP", level: 90, color: "primary" },
      { icon: Code, title: "Python", level: 85, color: "secondary" },
      { icon: Code, title: "Java", level: 80, color: "success" },
      { icon: Code, title: "JavaScript", level: 85, color: "warning" }
    ]
  },
  {
    title: "Frameworks",
    icon: Layers,
    skills: [
      { icon: Layers, title: "Laravel", level: 85, color: "primary" },
      { icon: Layers, title: "React", level: 80, color: "secondary" },
      { icon: Layers, title: "Vue.js", level: 75, color: "success" }
    ]
  },
  {
    title: "Bases de données",
    icon: Database,
    skills: [
      { icon: Database, title: "MySQL", level: 90, color: "primary" },
      { icon: Database, title: "PostgreSQL", level: 80, color: "secondary" },
      { icon: Database, title: "MongoDB", level: 75, color: "success" }
    ]
  },
  {
    title: "DevOps",
    icon: GitBranch,
    skills: [
      { icon: GitBranch, title: "Docker", level: 80, color: "primary" },
      { icon: GitBranch, title: "Git", level: 85, color: "secondary" },
      { icon: GitBranch, title: "CI/CD", level: 75, color: "success" }
    ]
  }
];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(skillCategories[0].title);

  return (
    <AnimatedSection id="skills" className="section-container" animation="slide-up">
      <div className="text-center mb-16">
        <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
          Compétences
        </h2>
        <p className="section-subtitle">
          Un aperçu des technologies et outils que je maîtrise.
        </p>
      </div>

      {/* Catégories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {skillCategories.map((category, index) => (
          <motion.button
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setActiveCategory(category.title)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 ${
              activeCategory === category.title
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <category.icon size={20} />
            <span>{category.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Grille de compétences */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories
            .find(cat => cat.title === activeCategory)
            ?.skills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                icon={skill.icon}
                title={skill.title}
                level={skill.level}
                color={skill.color}
                delay={index * 0.1}
              />
            ))}
        </motion.div>
      </AnimatePresence>
    </AnimatedSection>
  );
};

export default SkillsSection; 