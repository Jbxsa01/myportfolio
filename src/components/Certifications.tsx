import React, { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Award, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  ExternalLink, 
  Calendar,
  Star,
  Trophy,
  Medal,
  TrendingUp,
  Target,
  CheckCircle,
  PlayCircle,
  PauseCircle
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  category: 'completed' | 'in-progress' | 'planned';
  progress?: number;
  description: string;
  skills: string[];
  link?: string;
  validity?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  credentialId?: string;
}

const eventParticipations: Certification[] = [
  {
    id: 'um6ss-ehealth-forum',
    title: 'eHealth Forum 2025',
    issuer: 'UM6SS',
    date: '2025',
    image: '/certifications/ehealth .png',
    category: 'completed',
    progress: 100,
    description: 'Participation au forum eHealth 2025 organisé par l\'Université Mohammed VI des Sciences de la Santé (UM6SS), événement majeur sur les technologies de la santé numérique et l\'innovation médicale.',
    skills: ['eHealth', 'Digital Health', 'Healthcare Innovation', 'Medical Technology', 'Health Information Systems'],
    level: 'intermediate'
  }
];

const certifications: Certification[] = [
  {
    id: 'ibm-containers-kubernetes',
    title: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift',
    issuer: 'IBM',
    date: '31 Mai 2025',
    image: '/certifications/images/kubernet.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur les conteneurs, le déploiement d\'applications cloud-native avec Docker, Kubernetes, OpenShift et Istio. Gestion du cycle de vie, configuration par YAML, CI/CD, microservices et virtualisation. 17 heures de formation.',
    skills: ['Command-Line Interface', 'Kubernetes', 'Cloud-Native Computing', 'Virtualization', 'Openshift', 'CI/CD', 'Istio', 'Scalability', 'Microservices', 'Containerization', 'DevOps', 'Docker (Software)'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/4ZYWQ3KYX2B3',
    credentialId: '4ZYWQ3KYX2B3'
  },
  {
    id: 'whizlabs-azure-networks',
    title: 'Virtual Networks in Azure',
    issuer: 'Whizlabs',
    date: '31 Mai 2025',
    image: '/certifications/images/virtualisation.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur les réseaux virtuels Azure, l\'équilibrage de charge, DNS et la surveillance des réseaux virtuels. 6 heures de formation.',
    skills: ['Load Balancing', 'Network Monitoring', 'Network Security', 'Virtual Machines', 'Microsoft Azure', 'Cloud Infrastructure', 'Network Troubleshooting', 'Network Administration', 'Virtual Private Networks (VPN)', 'Network Architecture', 'Scalability'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/1CXK8W5DPOFN',
    credentialId: '1CXK8W5DPOFN'
  },
  {
    id: 'upenn-java-oop',
    title: 'Introduction to Java and Object-Oriented Programming',
    issuer: 'University of Pennsylvania',
    date: '2 Janvier 2025',
    image: '/certifications/images/java.png',
    category: 'completed',
    progress: 100,
    description: 'Formation fondamentale sur Java et la programmation orientée objet. Identification des aspects fondamentaux de la POO et des fonctionnalités du langage Java. 19 heures de formation.',
    skills: ['Program Development', 'Java', 'Software Testing', 'Computer Programming', 'Object Oriented Programming (OOP)', 'Unit Testing', 'Object Oriented Design', 'Programming Principles', 'Data Structures', 'Test Driven Development (TDD)', 'Java Programming'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/KGRJCO03PUID',
    credentialId: 'KGRJCO03PUID'
  },
  {
    id: 'meta-react-basics',
    title: 'React Basics',
    issuer: 'Meta',
    date: '3 Janvier 2025',
    image: '/certifications/images/react.png',
    category: 'completed',
    progress: 100,
    description: 'Formation complète sur les fondamentaux de React. Utilisation de composants réutilisables, organisation de projets React, gestion des props et création d\'applications web dynamiques. 30 heures de formation.',
    skills: ['Event-Driven Programming', 'React.js', 'Mobile Development', 'UI Components', 'Front-End Web Development', 'Web Applications', 'HTML and CSS', 'Javascript', 'Application development'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/VOTWKG2IVW4E',
    credentialId: 'VOTWKG2IVW4E'
  },
  {
    id: 'umich-js-interactivity',
    title: 'Interactivity with JavaScript',
    issuer: 'University of Michigan',
    date: '18 Janvier 2024',
    image: '/certifications/images/js.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur l\'interactivité avec JavaScript, la gestion des événements utilisateurs, l\'accessibilité et le développement d\'interfaces interactives. 9 heures de formation.',
    skills: ['Web Development Tools', 'Interactive Design', 'Event-Driven Programming', 'User Interface (UI)', 'Debugging', 'Web Development', 'Web Applications', 'HTML and CSS', 'Web Design and Development', 'JavaScript', 'Web Content Accessibility Guidelines'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/AH42Z2KS5J27',
    credentialId: 'AH42Z2KS5J27'
  },
  {
    id: 'umich-css3',
    title: 'Introduction to CSS3',
    issuer: 'University of Michigan',
    date: '6 Janvier 2024',
    image: '/certifications/images/css.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur l\'importance de la séparation contenu/style, l\'écriture de règles CSS, la modification de l\'apparence du texte et la conception responsive. 17 heures de formation.',
    skills: ['Usability', 'Cascading Style Sheets (CSS)', 'Hypertext Markup Language (HTML)', 'Debugging', 'Web Development', 'Responsive Web Design', 'HTML and CSS', 'Web Design', 'Javascript', 'Browser Compatibility', 'Web Content Accessibility Guidelines'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/LCRNJX8HT849',
    credentialId: 'LCRNJX8HT849'
  },
  {
    id: 'umich-html5',
    title: 'Introduction to HTML5',
    issuer: 'University of Michigan',
    date: '1 Janvier 2024',
    image: '/certifications/images/html.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur les balises HTML5, l\'édition de code, la création d\'images et de liens, et la validation des données. 11 heures de formation.',
    skills: ['Web Development Tools', 'Web Servers', 'Usability', 'Data Validation', 'Semantic Web', 'Cascading Style Sheets (CSS)', 'Hypertext Markup Language (HTML)', 'Cloud Hosting', 'Web Design', 'Web Design and Development', 'Web Content Accessibility Guidelines'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/M4JVKFVDUQSS',
    credentialId: 'M4JVKFVDUQSS'
  },
  {
    id: 'epfl-cpp-oop',
    title: 'Introduction à la programmation orientée objet (en C++)',
    issuer: 'École Polytechnique Fédérale de Lausanne',
    date: '20 Janvier 2024',
    image: '/certifications/images/cpp.png',
    category: 'completed',
    progress: 100,
    description: 'Formation approfondie sur la programmation orientée objet en C++, les principes de conception, le débogage et les design patterns. 31 heures de formation.',
    skills: ['C and C++', 'C++ (Programming Language)', 'Computer Programming', 'Object Oriented Programming (OOP)', 'Object Oriented Design', 'Debugging', 'Programming Principles', 'Software Design Patterns'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/D8NS2YL6TJ4J',
    credentialId: 'D8NS2YL6TJ4J'
  },
  {
    id: 'polytechnique-recherche',
    title: 'La recherche documentaire',
    issuer: 'École Polytechnique',
    date: '30 Avril 2024',
    image: '/certifications/images/recherche.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur la recherche documentaire, la gestion de l\'information, la méthodologie de recherche, la collecte et l\'analyse de données. 3 heures de formation.',
    skills: ['Databases', 'Legal Research', 'Record Keeping', 'Intellectual Property', 'Document Management', 'Investigation', 'Research Methodologies', 'Data Collection', 'Research'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/AE8NURARDCNU',
    credentialId: 'AE8NURARDCNU'
  },
  {
    id: 'coursera-soft-skills',
    title: 'Soft Skills Specialization',
    issuer: 'Coursera',
    date: '',
    image: '/certifications/images/soft.png',
    category: 'completed',
    progress: 100,
    description: 'Spécialisation Coursera validant un ensemble de compétences transversales (soft skills) essentielles pour le monde professionnel : communication, gestion du temps, travail en équipe, résolution de problèmes, leadership, etc.',
    skills: ['Communication', 'Time Management', 'Teamwork', 'Problem Solving', 'Leadership', 'Adaptability', 'Emotional Intelligence', 'Critical Thinking', 'Collaboration'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/specialization/3MH5CXERK49B',
    credentialId: '3MH5CXERK49B'
  },
  {
    id: 'umich-python-everybody',
    title: 'Programming for Everybody (Getting Started with Python)',
    issuer: 'University of Michigan',
    date: '20 Septembre 2023',
    image: '/certifications/images/python.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur l\'installation de Python, l\'écriture de programmes, l\'utilisation de variables, de fonctions et de boucles. 18 heures de formation.',
    skills: ['Development Environment', 'Computer Programming', 'Programming Principles', 'Software Installation', 'Python Programming'],
    level: 'beginner',
    link: 'https://www.coursera.org/account/accomplishments/verify/U2RXNLD6Z598',
    credentialId: 'U2RXNLD6Z598'
  },
  {
    id: 'hkust-software-eng',
    title: 'Software Engineering: Software Design and Project Management',
    issuer: 'The Hong Kong University of Science and Technology',
    date: '30 Avril 2024',
    image: '/certifications/images/eng.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur la gestion de projet logiciel, la conception logicielle, l\'architecture, les design patterns, la modélisation UML et l\'assurance qualité. 19 heures de formation.',
    skills: ['Project Management', 'Software Design', 'Object Oriented Design', 'Systems Design', 'Unified Modeling Language', 'Software Design Patterns', 'Process Driven Development', 'Software Architecture', 'Software Development Life Cycle', 'Quality Assurance', 'Systems Analysis', 'Software Quality Assurance'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/VND7CDR88DW5',
    credentialId: 'VND7CDR88DW5'
  },
  {
    id: 'uci-arduino-c',
    title: 'The Arduino Platform and C Programming',
    issuer: 'University of California, Irvine',
    date: '19 Mars 2023',
    image: '/certifications/images/arduino.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur la plateforme Arduino, la programmation en C, les composants électroniques, l\'environnement de développement et le débogage. 12 heures de formation.',
    skills: ['Electronic Components', 'Development Environment', 'Electronic Hardware', 'Digital Communications', 'Embedded Software', 'Computer Programming', 'C (Programming Language)', 'Embedded Systems', 'Computer Hardware', 'Integrated Development Environments', 'Debugging', 'Computer Programming Tools'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/DTSZK8ASLSHV',
    credentialId: 'DTSZK8ASLSHV'
  },
  {
    id: 'cuboulder-sql',
    title: 'The Structured Query Language (SQL)',
    issuer: 'University of Colorado Boulder',
    date: '18 Avril 2023',
    image: '/certifications/images/sql.png',
    category: 'completed',
    progress: 100,
    description: 'Formation sur l\'histoire, la syntaxe et l\'utilisation de SQL pour l\'analyse de données dans des bases relationnelles. 27 heures de formation.',
    skills: ['Database Design', 'Database Management', 'Data Analysis', 'Data Modeling', 'Data Science', 'Data Manipulation', 'Data Access', 'Query Languages', 'Relational Databases', 'Database Administration', 'Database Theory', 'SQL'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/N87CQKS2X8JH',
    credentialId: 'N87CQKS2X8JH'
  },
  {
    id: 'jhu-web-development',
    title: 'The HTML, CSS, and Javascript for Web Developers',
    issuer: 'Johns Hopkins Whiting School of Engineering',
    date: '2024',
    image: '/certifications/images/htmlcss.png',
    category: 'completed',
    progress: 100,
    description: 'Formation complète sur la création de pages web avec HTML, CSS et JavaScript, couvrant la structure, la mise en forme, les bases du responsive design et le développement web moderne.',
    skills: ['HTML', 'CSS', 'Responsive Design', 'Web Development', 'Bootstrap', 'JavaScript'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/certificate/TJV6PUU82WUS',
    credentialId: 'TJV6PUU82WUS'
  },
  {
    id: 'jhu-unix-workbench',
    title: 'The Unix Workbench',
    issuer: 'The Johns Hopkins University',
    date: 'Avril 2024',
    image: '/certifications/images/unix.png',
    category: 'completed',
    progress: 100,
    description: 'Formation complète sur l\'environnement Unix, le scripting shell et la ligne de commande. 19 heures de formation.',
    skills: ['Command-Line Interface', 'Shell Script', 'GitHub', 'Bash', 'Version Control', 'Git', 'Programming Principles', 'File Management', 'Unix Commands', 'Linux'],
    level: 'intermediate',
    link: 'https://www.coursera.org/account/accomplishments/verify/YQD5QP6KNYTY',
    credentialId: 'YQD5QP6KNYTY'
  },
  {
    id: 'oracle-ai-vector-search',
    title: 'Oracle AI Vector Search Certified Professional',
    issuer: 'Oracle',
    date: 'Nov 2025',
    image: '/certifications/images/AI VECTOR CERTIF ORACLE.png',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=7FED0E6CC4A8683904F1F3449B4DC4FC3E7AFF42D0CE154993E07ACED773007A',
    category: 'completed',
    description: 'Certification professionnelle Oracle validant l\'expertise en recherche vectorielle IA, technologies de base de données vectorielles et solutions IA avancées.',
    skills: ['AI Vector Search', 'Oracle Database', 'Machine Learning', 'Vector Databases', 'AI Solutions'],
    level: 'advanced',
    credentialId: '7FED0E6CC4A8683904F1F3449B4DC4FC3E7AFF42D0CE154993E07ACED773007A'
  },
  {
    id: 'oracle-oci-ai-foundations',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Nov 2025',
    image: '/certifications/Associate Ai.png',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=30919A7F6F704604561EFB47DA6EEFB6870BA89B11A5F16A5C45CE98FCF7E343',
    category: 'completed',
    description: 'Certification Oracle Cloud Infrastructure validant les fondamentaux de l\'intelligence artificielle, les services AI sur OCI et l\'implémentation de solutions IA dans le cloud.',
    skills: ['Oracle Cloud', 'AI Foundations', 'Cloud AI Services', 'OCI', 'Machine Learning'],
    level: 'intermediate',
    credentialId: '30919A7F6F704604561EFB47DA6EEFB6870BA89B11A5F16A5C45CE98FCF7E343'
  },
  {
    id: 'oracle-oci-generative-ai',
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle',
    date: 'Oct 2025',
    image: '/certifications/gen ai.png',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=A8E05DEE90AF8A6482B87ABFB7EA7FA005F14E97239C63AB31EDCC4A9029A366',
    category: 'completed',
    description: 'Certification professionnelle Oracle Cloud Infrastructure validant l\'expertise en IA générative, modèles de langage, prompt engineering et implémentation de solutions GenAI sur OCI.',
    skills: ['Generative AI', 'Oracle Cloud', 'Large Language Models', 'Prompt Engineering', 'OCI', 'GenAI Solutions'],
    level: 'advanced',
    credentialId: 'A8E05DEE90AF8A6482B87ABFB7EA7FA005F14E97239C63AB31EDCC4A9029A366'
  },
  {
    id: 'oracle-apex-cloud-developer',
    title: 'Oracle APEX Cloud Developer Certified Professional',
    issuer: 'Oracle',
    date: 'Nov 2025',
    image: '/certifications/apex.png',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=6F6DB37AF0330A82F922CDD86085DDC49AFF1136A8B6C93DCA643FC76FF2A6F6',
    category: 'completed',
    description: 'Certification professionnelle Oracle validant l\'expertise en développement d\'applications cloud avec Oracle APEX, incluant la création d\'applications web modernes et la gestion de bases de données.',
    skills: ['Oracle APEX', 'Cloud Development', 'Web Applications', 'Oracle Database', 'Low-Code Development'],
    level: 'advanced',
    credentialId: '6F6DB37AF0330A82F922CDD86085DDC49AFF1136A8B6C93DCA643FC76FF2A6F6'
  },
  {
    id: 'oracle-oci-data-science',
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    issuer: 'Oracle',
    date: 'Nov 2025',
    image: '/certifications/data.png',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=77C56AB5A7F8CB59EF98E9D33CB5753569E0A363E63617EE8F93A8796328E3E1',
    category: 'completed',
    description: 'Certification professionnelle Oracle Cloud Infrastructure validant l\'expertise en Data Science, machine learning, analyse de données et implémentation de modèles ML sur OCI.',
    skills: ['Data Science', 'Machine Learning', 'Oracle Cloud', 'OCI', 'Data Analysis', 'ML Models'],
    level: 'advanced',
    credentialId: '77C56AB5A7F8CB59EF98E9D33CB5753569E0A363E63617EE8F93A8796328E3E1'
  },
  {
    id: 'oracle-oci-devops-professional',
    title: 'Oracle Cloud Infrastructure 2025 Certified DevOps Professional',
    issuer: 'Oracle',
    date: 'Nov 2025',
    image: '/certifications/devops.png',
    link: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=77C56AB5A7F8CB59EF98E9D33CB57535BDD4AF2831AADB31EF2271C2AB56994E',
    category: 'completed',
    description: 'Certification professionnelle Oracle Cloud Infrastructure validant l\'expertise en DevOps, CI/CD, automatisation et gestion d\'infrastructure cloud sur OCI.',
    skills: ['Oracle Cloud', 'DevOps', 'CI/CD', 'Infrastructure as Code', 'OCI', 'Automation'],
    level: 'advanced',
    credentialId: '77C56AB5A7F8CB59EF98E9D33CB57535BDD4AF2831AADB31EF2271C2AB56994E'
  }
];

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'beginner': return <Star className="w-4 h-4 text-green-500" />;
    case 'intermediate': return <Star className="w-4 h-4 text-yellow-500" />;
    case 'advanced': return <Star className="w-4 h-4 text-orange-500" />;
    case 'expert': return <Star className="w-4 h-4 text-red-500" />;
    default: return <Star className="w-4 h-4 text-gray-500" />;
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'expert': return 'bg-red-100 text-red-800 border-red-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in-progress': return <PlayCircle className="w-5 h-5 text-blue-500" />;
    case 'planned': return <PauseCircle className="w-5 h-5 text-gray-500" />;
    default: return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const completedCerts = certifications.filter(cert => cert.category === 'completed');
  const inProgressCerts = certifications.filter(cert => cert.category === 'in-progress');
  const plannedCerts = certifications.filter(cert => cert.category === 'planned');

  const totalProgress = Math.round(
    (completedCerts.length + (inProgressCerts.reduce((sum, cert) => sum + (cert.progress || 0), 0) / 100)) / 
    certifications.length * 100
  );

  const allEvents = eventParticipations;
  const completedEvents = allEvents.filter(c => c.category === 'completed');

  const renderCertificationCard = (cert: Certification) => (
    <Card 
      key={cert.id} 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 overflow-hidden bg-white dark:bg-slate-900"
      onClick={() => setSelectedCert(cert)}
    >
      {/* Image de certification en pleine largeur avec lazy loading */}
      <div className="relative w-full h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={cert.image} 
          alt={`${cert.title} certification`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800"><div class="text-slate-400 text-center text-sm">Image non disponible</div></div>';
            }
          }}
        />
        {cert.category === 'completed' && (
          <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-3 shadow-lg">
            <CheckCircle className="w-5 h-5" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
          <div className="flex items-center justify-between">
            <Badge className={`${getLevelColor(cert.level)} text-sm px-3 py-1`}>
              {getLevelIcon(cert.level)}
              <span className="ml-1 capitalize">{cert.level}</span>
            </Badge>
            <div className="flex items-center gap-2">
              {getCategoryIcon(cert.category)}
              {cert.link && (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-white/20 hover:bg-white/30 text-white border-white/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(cert.link, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
            {cert.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {cert.description}
          </p>
          
          {cert.category === 'in-progress' && cert.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span className="font-medium">{cert.progress}%</span>
              </div>
              <Progress value={cert.progress} className="h-2" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-1">
            {cert.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {cert.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{cert.skills.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{cert.date}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <AnimatedSection id="certifications" className="section-container py-24 bg-white dark:bg-slate-950">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block text-slate-900 dark:text-white">
        Certifications & Formations
      </h2>
      <p className="section-subtitle text-slate-600 dark:text-slate-400">
        Mon parcours de formation et mes certifications professionnelles
      </p>

      {/* Section Événements et Participations */}
      {allEvents.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 text-slate-900 dark:text-white">
            <Star className="w-6 h-6 text-yellow-500" />
            Événements & Participations
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Participation à des événements professionnels et forums d'innovation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map(renderCertificationCard)}
          </div>
        </div>
      )}

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-primary">{completedCerts.length}</div>
            <p className="text-sm text-muted-foreground">Certifications obtenues</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-primary">{inProgressCerts.length}</div>
            <p className="text-sm text-muted-foreground">En cours</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-8 h-8 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-primary">{plannedCerts.length}</div>
            <p className="text-sm text-muted-foreground">Planifiées</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-2">
              <Medal className="w-8 h-8 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-primary">{totalProgress}%</div>
            <p className="text-sm text-muted-foreground">Progression globale</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs pour filtrer les certifications */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Toutes ({certifications.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Obtenues ({completedCerts.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4" />
            En cours ({inProgressCerts.length})
          </TabsTrigger>
          <TabsTrigger value="planned" className="flex items-center gap-2">
            <PauseCircle className="w-4 h-4" />
            Planifiées ({plannedCerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map(renderCertificationCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedCerts.map(renderCertificationCard)}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inProgressCerts.map(renderCertificationCard)}
          </div>
        </TabsContent>

        <TabsContent value="planned" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plannedCerts.map(renderCertificationCard)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de détail */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          {selectedCert && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-4">
                  {selectedCert.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image de certification en pleine taille */}
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={selectedCert.image} 
                      alt={`${selectedCert.title} certification`}
                      className="w-full h-auto max-h-[600px] rounded-lg object-contain border-2 border-gray-200 shadow-xl"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                        e.currentTarget.className = 'w-full h-auto max-h-[600px] rounded-lg bg-gray-100 flex items-center justify-center border-2 border-gray-200 shadow-xl';
                        e.currentTarget.innerHTML = '<div class="text-gray-400 text-lg text-center p-8">Image non disponible</div>';
                      }}
                    />
                    {selectedCert.category === 'completed' && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-3 shadow-lg">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  
                  {/* Informations de base */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge className={getLevelColor(selectedCert.level)}>
                        {getLevelIcon(selectedCert.level)}
                        <span className="ml-1 capitalize">{selectedCert.level}</span>
                      </Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedCert.date}</span>
                      </div>
                    </div>
                    {selectedCert.link && (
                      <Button asChild>
                        <a href={selectedCert.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Vérifier la certification
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Détails de la certification */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Émetteur</h4>
                    <p className="text-muted-foreground">{selectedCert.issuer}</p>
                    {selectedCert.credentialId && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ID de certification: <span className="font-mono">{selectedCert.credentialId}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">{selectedCert.description}</p>
                  </div>

                  {selectedCert.category === 'in-progress' && selectedCert.progress !== undefined && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Progression</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Avancement</span>
                          <span className="font-medium">{selectedCert.progress}%</span>
                        </div>
                        <Progress value={selectedCert.progress} className="h-3" />
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-lg mb-3">Compétences acquises</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {selectedCert.validity && (
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Validité</h4>
                      <p className="text-muted-foreground">{selectedCert.validity}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
};

export default Certifications; 