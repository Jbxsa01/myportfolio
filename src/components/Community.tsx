import React from 'react';
import AnimatedSection from './AnimatedSection';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Sparkles, Users, Mic2, Layers, Link as LinkIcon } from 'lucide-react';

const Community: React.FC = () => {
  const galleryImages = [
    { src: '/certifications/images/devminds.jpg', alt: 'DevMinds Morocco' },
    { src: '/certifications/images/workshop1.jpg', alt: 'Workshop DevMinds' },
    { src: '/certifications/images/workshop 2.jpg', alt: 'Workshop DevMinds' },
    { src: '/chess.jpg', alt: 'Compétition d’échecs' },
    { src: '/cohort.jpg', alt: 'Cohorte coding program' },
    { src: '/event1.jpg', alt: 'Événement tech avec clubs' },
    { src: '/podcast.jpg', alt: 'Podcast DevMinds' },
  ];

  return (
    <AnimatedSection id="community" className="section-container py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Hors académique
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white leading-tight">
            Head of Tech & Community – DevMinds Morocco
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            Je pilote l'écosystème DevMinds : ateliers pratiques, events et mentoring pour faire grandir la communauté tech.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-sm">Workshops techniques</Badge>
            <Badge variant="secondary" className="text-sm">Organisation d'events</Badge>
            <Badge variant="secondary" className="text-sm">Mentorat</Badge>
            <Badge variant="secondary" className="text-sm">Leadership</Badge>
          </div>
          <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-amber-100 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
            <CardContent className="py-4 flex flex-col gap-3 text-slate-800 dark:text-slate-200">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Users className="w-4 h-4" />
                Impact communautaire
              </div>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li className="flex items-start gap-2"><Mic2 className="w-4 h-4 mt-0.5" /> Workshops réguliers pour partager les bonnes pratiques.</li>
                <li className="flex items-start gap-2"><Layers className="w-4 h-4 mt-0.5" /> Coordination d'événements et de cycles thématiques.</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 mt-0.5" /> Coaching et aide directe aux membres sur leurs projets.</li>
                <li className="flex items-start gap-2"><LinkIcon className="w-4 h-4 mt-0.5" /> Workshops co-animés avec Kawtar Amezzar (DevMinds) : salles complètes, liste d'attente sur Discord et demandes pour reprogrammer.</li>
                <li className="flex items-start gap-2"><Sparkles className="w-4 h-4 mt-0.5" /> Podcasts avec des invités de haut niveau pour partager des retours terrain.</li>
                <li className="flex items-start gap-2"><Mic2 className="w-4 h-4 mt-0.5" /> Compétitions d'échecs pour stimuler la stratégie et la prise de décision.</li>
                <li className="flex items-start gap-2"><Layers className="w-4 h-4 mt-0.5" /> Cohort Coding Program (Team Lead MERN – Cohort 1) : accompagnement, revue de code et delivery.</li>
                <li className="flex items-start gap-2"><Users className="w-4 h-4 mt-0.5" /> Events avec des clubs d'écoles (ex. Codex ENSA Khouribga) pour élargir l'impact.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-amber-100 blur-3xl opacity-70" />
          <div className="space-y-4">
            <div className="rounded-2xl border shadow-xl overflow-hidden bg-white dark:bg-slate-900 dark:border-slate-800">
              <img
                src="/certifications/images/devminds.jpg"
                alt="DevMinds Morocco"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-48 overflow-hidden rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 shadow">
              <div className="absolute inset-0 flex items-center">
                <div className="flex gap-4 animate-marquee">
                  {galleryImages.concat(galleryImages).map((img, idx) => (
                    <div key={`${img.src}-${idx}`} className="h-40 w-64 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-2">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Community;
