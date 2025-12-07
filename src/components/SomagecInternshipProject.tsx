import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Server, Settings2, MonitorCheck, X } from 'lucide-react';

const galleryImages = Array.from({ length: 9 }, (_, i) => `/g${i + 1}.jpg`);

const SomagecInternshipProject: React.FC = () => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-800 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[previewIndex]}
              alt="Somagec preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Soutenance de Stage Somagec</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              🌟 Un chapitre important de mon parcours : optimisation IT, développement d'une application de gestion de parc, et gestion quotidienne des équipements.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">Virtualisation</Badge>
              <Badge variant="secondary" className="text-xs">Configuration Système</Badge>
              <Badge variant="secondary" className="text-xs">Gestion Parc IT</Badge>
              <Badge variant="secondary" className="text-xs">Développement Application</Badge>
            </div>
            <div className="text-xs text-primary font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Cliquez pour explorer le projet
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Soutenance de Stage chez SOMAGEC GROUP</DialogTitle>
          <DialogDescription>
            Un chapitre important de mon parcours professionnel
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Aujourd'hui est un jour particulièrement significatif pour moi : je présente officiellement le résultat de mon stage chez Somagec. Cette expérience a été une aventure enrichissante qui m'a permis de développer des compétences essentielles et de contribuer à des projets ambitieux.
            </p>
          </div>
          {/* Missions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-600" />
                  Optimisation IT
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                Optimiser la virtualisation et la configuration des systèmes pour améliorer la performance et la fiabilité des infrastructures IT.
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-green-600" />
                  Application de gestion de parc
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                Conception et développement d'une application complète pour la gestion des équipements, suivi des pannes, maintenances, achats et allocations.
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MonitorCheck className="w-4 h-4 text-amber-600" />
                  Gestion quotidienne des équipements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                Suivi du bon fonctionnement, mise en place de procédures de résolution rapide des incidents pour maintenir la performance opérationnelle.
              </CardContent>
            </Card>
          </div>
          {/* Valeur ajoutée */}
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-lg">Valeur ajoutée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p>
                Cette expérience a marqué une étape décisive dans mon parcours professionnel, me permettant d'acquérir des compétences clés et de contribuer à des projets innovants.
              </p>
              <p>
                Je suis fière de ce que nous avons accompli et enthousiaste pour les perspectives futures.
              </p>
            </CardContent>
          </Card>
          {/* Galerie scrollable */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Galerie du projet</h4>
            <div className="relative h-32 overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-800 shadow">
              <div className="absolute inset-0 flex items-center">
                <div className="flex gap-3 animate-marquee-slow">
                  {galleryImages.concat(galleryImages).map((img, idx) => (
                    <button
                      key={`${img}-${idx}`}
                      onClick={() => {
                        setPreviewIndex(idx % galleryImages.length);
                        setFullscreenIndex(idx % galleryImages.length);
                      }}
                      className="h-28 w-48 flex-shrink-0 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 flex items-center justify-center p-1 hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`Somagec screenshot ${idx}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Cliquez sur une image pour l'afficher en grand</p>
          </div>
          {/* Lightbox fullscreen */}
          {fullscreenIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
              <button
                onClick={() => setFullscreenIndex(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-51"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={galleryImages[fullscreenIndex]}
                  alt="Fullscreen"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          )}
          {/* Stack */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Stack technologique</h4>
            <div className="flex flex-wrap gap-2">
              {['Virtualisation', 'Configuration Système', 'Développement Application', 'Gestion Parc IT', 'PHP', 'AJAX', 'Tailwind CSS', 'HTML', 'JS'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
          {/* Hashtags */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-3">
              #SoutenanceDeStage #Somagec #Virtualisation #ConfigurationSystème #DéveloppementApplication #GestionParcIT #Innovation #DéveloppementProfessionnel #EMSI #Ingénierie
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SomagecInternshipProject;
