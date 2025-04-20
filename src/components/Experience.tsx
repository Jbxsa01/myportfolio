
import React from 'react';
import AnimatedSection from './AnimatedSection';
import { GraduationCap, Code, Award, BookOpen, Calendar, GanttChart } from 'lucide-react';
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
    details: "Option Français",
    icon: <GraduationCap className="text-primary" />,
    type: "education"
  },
  {
    id: 2,
    year: "2021",
    title: "Intégration à l'EMSI",
    institution: "École Marocaine des Sciences de l'Ingénieur",
    details: "Début du parcours en Ingénierie Informatique et Réseaux",
    icon: <GraduationCap className="text-primary" />,
    type: "education"
  },
  {
    id: 3,
    year: "2022",
    title: "Introduction to Java and Object-Oriented Programming",
    institution: "Coursera",
    details: "Certification en programmation Java et POO",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/KGRJCO03PUID",
    icon: <Award className="text-secondary" />,
    type: "certification"
  },
  {
    id: 4,
    year: "2023",
    title: "React Basics",
    institution: "Coursera",
    details: "Certification en développement avec React",
    certificateLink: "https://www.coursera.org/account/accomplishments/records/VOTWKG2IVW4E",
    icon: <Award className="text-secondary" />,
    type: "certification"
  },
  {
    id: 5,
    year: "2023",
    title: "Interactivity with JavaScript",
    institution: "Coursera",
    details: "Certification en JavaScript interactif",
    certificateLink: "https://www.coursera.org/account/accomplishments/verify/AH42Z2KS5J27",
    icon: <Award className="text-secondary" />,
    type: "certification"
  },
  {
    id: 6,
    year: "2024",
    title: "Stage en Réseau et Développement",
    institution: "SOMAGEC GROUP",
    details: "Développement d'application et administration réseau",
    icon: <Code className="text-primary" />,
    type: "professional"
  },
];

const Experience: React.FC = () => {
  // Separate the data by type
  const education = experienceData.filter(item => item.type === "education");
  const certifications = experienceData.filter(item => item.type === "certification");
  const professional = experienceData.filter(item => item.type === "professional");
  
  return (
    <AnimatedSection id="experience" className="section-container">
      <h2 className="section-title before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-1 before:bg-secondary before:rounded-full relative inline-block">
        Parcours
      </h2>
      <p className="section-subtitle">
        Mon parcours académique, professionnel et mes certifications.
      </p>
      
      {/* Timeline */}
      <div className="relative mt-16 mb-12 max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/50"></div>
        
        {experienceData.map((item, index) => (
          <div 
            key={item.id}
            className={`relative mb-16 flex items-center ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <div className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 bg-white border-4 ${
              item.type === 'certification' ? 'border-secondary' : 'border-primary'
            }`}>
              {item.icon}
            </div>
            
            <Card className={`w-5/12 shadow-lg hover:shadow-xl transition-all ${
              index % 2 === 0 ? 'mr-auto' : 'ml-auto'
            } appear appear-delay-${index * 100 % 500}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-display text-primary">{item.title}</CardTitle>
                  <Badge variant="outline" className="bg-primary/5 text-primary flex items-center gap-1">
                    <Calendar size={14} />
                    {item.year}
                  </Badge>
                </div>
                <CardDescription className="text-sm flex items-center gap-1">
                  <span className="font-medium">{item.institution}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{item.details}</p>
                {item.certificateLink && (
                  <a 
                    href={item.certificateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-secondary flex items-center gap-1 mt-2 hover:underline"
                  >
                    <Award size={14} />
                    Voir le certificat
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Certifications Table */}
      <div className="mt-20">
        <div className="flex items-center gap-3 justify-center mb-6">
          <BookOpen size={24} className="text-primary" />
          <h3 className="text-2xl font-display font-semibold text-primary">Certifications</h3>
        </div>
        
        <Card className="appear">
          <CardContent className="p-0 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Année</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Organisme</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certifications.map(cert => (
                  <TableRow key={cert.id} className="hover:bg-secondary/5">
                    <TableCell className="font-medium">{cert.year}</TableCell>
                    <TableCell>{cert.title}</TableCell>
                    <TableCell>{cert.institution}</TableCell>
                    <TableCell className="text-right">
                      {cert.certificateLink && (
                        <a 
                          href={cert.certificateLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-secondary hover:underline inline-flex items-center gap-1"
                        >
                          <Award size={14} />
                          Certificat
                        </a>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
