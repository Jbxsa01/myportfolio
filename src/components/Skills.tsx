import React from 'react';
import AnimatedSection from './AnimatedSection';
import SkillBadge from './SkillBadge';
import LanguageLogo from './LanguageLogo';
import ProgressBar from './ui/ProgressBar';
import { Code, Database, Server, BookOpen, GitBranch, Terminal, Cpu, Layers, BrainCircuit } from 'lucide-react';
import { Badge } from './ui/badge';

// Logos des langages de programmation
const languageLogos = [
  { name: "PHP", icon: "/logos/php.svg" },
  { name: "Python", icon: "/logos/PYTHON.png" },
  { name: "Java", icon: "/logos/java.svg" },
  { name: "JavaScript", icon: "/logos/javascript.svg" },
  { name: "HTML", icon: "/logos/HTML.png" },
  { name: "CSS", icon: "/logos/CSS3_Logo.PNG.webp" },
  { name: "C#", icon: "/logos/sharp.jpeg" },
  { name: "C", icon: "/logos/C.png" },
  { name: "React", icon: "/logos/react.svg" },
  { name: "Vue.js", icon: "/logos/vue.svg" },
  { name: "Tailwind", icon: "/logos/tailwind.svg" },
  { name: "Laravel", icon: "/logos/Laravel.svg.png" },
  { name: "MySQL", icon: "/logos/mysql.png" },
  { name: "Node.js", icon: "/logos/png-transparent-js-logo-node-logos-and-brands-icon-thumbnail.png" },
  { name: "TypeScript", icon: "/logos/typescript.svg" },
  { name: "Git", icon: "/logos/git.svg" },
  { name: "Jupyter", icon: "/logos/jupyter.jpg" },
  { name: "Arduino", icon: "/logos/ArduinoLogo_®.svg.png" },
  { name: "IA", icon: "/logos/artificial-intelligence-icon-sign-logo-vector-49693366.jpg" }
];

const skillCategories = [
  {
    title: "Développement",
    icon: <Code className="text-primary" size={24} />,
    skills: ["PHP", "Python", "Java", "C", "C#", "JEE", "JavaScript", "HTML", "CSS"],
    delay: 100
  },
  {
    title: "Frameworks",
    icon: <Layers className="text-secondary" size={24} />,
    skills: ["Laravel", "ASP.NET", "Tailwind CSS", "Bootstrap", "React", "Vue.js"],
    delay: 200
  },
  {
    title: "Systèmes",
    icon: <Terminal className="text-primary" size={24} />,
    skills: ["Linux", "Unix", "Windows Server", "Administration système"],
    delay: 300
  },
  {
    title: "Bases de données",
    icon: <Database className="text-secondary" size={24} />,
    skills: ["MySQL", "SQL Server", "PostgreSQL", "MongoDB"],
    delay: 400
  },
  {
    title: "Technologies",
    icon: <Cpu className="text-primary" size={24} />,
    skills: ["IA", "Big Data", "Arduino", "Virtualisation", "Cloud Computing"],
    delay: 500
  },
  {
    title: "DevOps",
    icon: <GitBranch className="text-secondary" size={24} />,
    skills: ["Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Jenkins", "Git"],
    delay: 600
  }
];

const Skills: React.FC = () => {
  return (
    <AnimatedSection id="skills" className="section-container" animation="slide-up">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
        Compétences
      </h2>
      <p className="section-subtitle">
        Un aperçu des technologies et outils que je maîtrise.
      </p>
      
      {/* Logos de langages */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-6 text-center text-primary">
          Langages & Technologies
        </h3>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {languageLogos.map((lang, index) => (
            <LanguageLogo 
              key={index} 
              name={lang.name} 
              icon={lang.icon} 
              delay={index * 50}
              className="appear"
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="somagec-card" style={{animationDelay: `${category.delay}ms`}}>
            <div className="flex items-center gap-3 mb-4">
              {category.icon}
              <h3 className="text-xl font-semibold text-primary">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <SkillBadge 
                  key={skillIndex} 
                  name={skill} 
                  delay={(skillIndex % 5) * 100}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-6 text-primary">Méthodologies</h3>
        <div className="flex flex-wrap justify-center gap-3">
          <SkillBadge name="Agile" icon={<BrainCircuit size={18} />} className="bg-primary/5 border-primary/10 text-primary" />
          <SkillBadge name="Scrum" icon={<BrainCircuit size={18} />} className="bg-secondary/5 border-secondary/10 text-secondary" delay={100} />
          <SkillBadge name="Kanban" icon={<BrainCircuit size={18} />} className="bg-primary/5 border-primary/10 text-primary" delay={200} />
          <SkillBadge name="Lean" icon={<BrainCircuit size={18} />} className="bg-secondary/5 border-secondary/10 text-secondary" delay={300} />
          <SkillBadge name="DevOps" icon={<BrainCircuit size={18} />} className="bg-primary/5 border-primary/10 text-primary" delay={400} />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
