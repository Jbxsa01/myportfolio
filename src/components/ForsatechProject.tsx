import React from 'react';

const images = [
  '/forsatech/2.png',
  '/forsatech/r1.png',
  '/forsatech/r3.png',
  '/forsatech/r4.png',
  '/forsatech/r5.png',
  '/forsatech/r6.png',
  '/forsatech/r7.png',
  '/forsatech/r8.png',
  '/forsatech/r9.png'
];

const ForsatechProject: React.FC = () => {
  const title = "L'ingénierie au service de l'employabilité";
  const description = `À l'aube de mon futur stage de fin d'études, je marque aujourd'hui la finalisation du dernier projet de fin d'année (PFA) de mon cursus réalisé avec ma binôme Nouhaila EL Khaoudi. Nous avons développé une plateforme intelligente de matching emploi-compétences intégrant scoring IA, simulateur ATS en temps réel et accompagnement proactif des candidats.`;
  const technologies = [
    'Java Spring Boot',
    'React JS',
    'Machine Learning',
    'LLM',
    'Web Scraping'
  ];

  return (
    <div className="card-glass overflow-hidden appear h-full">
      <div className="h-48 overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>

        <div className="space-y-3 text-sm mb-3">
          <p>
            L'objectif est d'automatiser la rencontre entre le talent et le besoin grâce à une
            analyse de compatibilité (scoring IA), un simulateur ATS en temps réel et un
            accompagnement pour la montée en compétences.
          </p>

          <p>
            Architecture modulaire et scalable : backend en Java Spring Boot, frontend en
            React JS. Intelligence portée par des modèles de Machine Learning et des LLM,
            complétés par un moteur de web scraping performant.
          </p>

          <div>
            <strong>Remerciements :</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>Madame Khadija A. — rigueur et maîtrise de Spring Boot et J2EE</li>
              <li>Madame Dr. Anibou Chaimae — expertise en Deep Learning</li>
            </ul>
          </div>

          <p className="text-xs text-gray-600">Ce projet valide une étape cruciale de ma formation et ouvre la voie vers mon PFE.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((t) => (
            <span key={t} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        <div>
          <strong className="text-sm">Galerie :</strong>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((src) => (
              <img key={src} src={src} alt={src} className="h-24 w-full object-cover rounded shadow" />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {['#Ingénierie', '#IntelligenceArtificielle', '#FullStack', '#MachineLearning', '#Innovation', '#MatchingEmploi', '#Java', '#ReactJS'].map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForsatechProject;
