import React, { useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Code2, Database, Cpu, Hammer, GitBranch, Cloud, Brain, Zap } from 'lucide-react';

interface Technology {
  category: string;
  icon: React.ReactNode;
  items: string[];
  delay: number;
}

const LanguagesTechnologies: React.FC = () => {
  const [cvData, setCvData] = useState<any>(null);

  useEffect(() => {
    const fetchCVData = async () => {
      try {
        const response = await fetch('/cv-content.json');
        const data = await response.json();
        setCvData(data);
      } catch (error) {
        console.error('Error loading CV data:', error);
      }
    };

    fetchCVData();
  }, []);

  if (!cvData?.sections?.languages_technologies) {
    return null;
  }

  const technologies: Technology[] = [
    {
      category: "Langages de Programmation",
      icon: <Code2 className="text-gray-900" size={24} />,
      items: ["C", "C++", "Python", "Java", "JavaScript", "PHP"],
      delay: 100
    },
    {
      category: "Frameworks Web",
      icon: <Zap className="text-gray-900" size={24} />,
      items: ["React", "Node.js", "Symfony", ".NET MVC", "Django", "JavaFX"],
      delay: 200
    },
    {
      category: "Frontend",
      icon: <Code2 className="text-gray-900" size={24} />,
      items: ["HTML", "CSS", "Tailwind CSS", "TypeScript", "Vite"],
      delay: 300
    },
    {
      category: "Bases de Données",
      icon: <Database className="text-gray-900" size={24} />,
      items: ["SQL", "PL/SQL", "MySQL"],
      delay: 400
    },
    {
      category: "Modélisation",
      icon: <Hammer className="text-gray-900" size={24} />,
      items: ["UML", "StarUML", "PowerAMC"],
      delay: 500
    },
    {
      category: "Mobiles & Embarquées",
      icon: <Cpu className="text-gray-900" size={24} />,
      items: ["Android", "Arduino", "Emu8086", "Isis Proteus"],
      delay: 600
    },
    {
      category: "Infrastructure & DevOps",
      icon: <Cloud className="text-gray-900" size={24} />,
      items: ["Proxmox", "ESXi", "Agile", "DevOps"],
      delay: 700
    },
    {
      category: "Big Data & IA",
      icon: <Brain className="text-gray-900" size={24} />,
      items: ["Concepts fondamentaux", "Traitement de données", "Machine Learning"],
      delay: 800
    },
    {
      category: "Outils & Méthodologies",
      icon: <GitBranch className="text-gray-900" size={24} />,
      items: ["Git", "Gestion de projet", "Méthodologies Agile"],
      delay: 900
    }
  ];

  return (
    <AnimatedSection id="languages-technologies" className="section-container" animation="slide-up">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
        Langages & Technologies
      </h2>
      <p className="section-subtitle">
        Maîtrise complète des technologies modernes et outils professionnels
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {technologies.map((tech, index) => (
          <div
            key={index}
            style={{
              animation: `fadeInUp 0.6s ease-out forwards`,
              animationDelay: `${tech.delay}ms`,
              opacity: 0
            }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {tech.icon}
                  <CardTitle className="text-lg">{tech.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </AnimatedSection>
  );
};

export default LanguagesTechnologies;
