import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Smartphone, MapPin, Database, Users, CheckCircle, X, Zap } from 'lucide-react';

const FournissMaProject: React.FC = () => {
  const galleryImages = ['/f0.jpg', '/f1.jpg', '/f3.jpg', '/f4.jpg', '/f5.jpg', '/f6.jpg', '/f7.jpg', '/f8.jpg', '/f9.jpg'];
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-800 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[previewIndex]}
              alt="Fourniss'Ma preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Fourniss'Ma</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Application mobile Android pour la gestion des ventes avec géolocalisation, Firebase et équipe collaborative.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">Android</Badge>
              <Badge variant="secondary" className="text-xs">Java</Badge>
              <Badge variant="secondary" className="text-xs">Firebase</Badge>
              <Badge variant="secondary" className="text-xs">Géolocalisation</Badge>
            </div>

            <div className="text-xs text-primary font-semibold flex items-center gap-1">
              <Smartphone className="w-3 h-3" />
              Cliquez pour explorer le projet
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Fourniss'Ma 📱</DialogTitle>
          <DialogDescription>
            Application mobile pour la gestion des ventes
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Réalisé dans le cadre de notre 4ème année à l'EMSI, filière Informatique & Réseaux.
            </p>
            <p className="text-foreground leading-relaxed">
              Avec ma binôme <strong>Nouhaila EL Khaoudi</strong>, nous avons conçu et développé une application mobile nommée <strong>Fourniss'Ma</strong> 📦, dédiée à la gestion des ventes avec des fonctionnalités avancées de suivi et de localisation.
            </p>
          </div>

          {/* Stack */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Stack Technologique
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-foreground/90 space-y-2">
              <p>• <strong>Java</strong> : Langage principal du projet</p>
              <p>• <strong>Android Studio</strong> : Environnement de développement</p>
              <p>• <strong>Firebase</strong> : Authentification et base de données en temps réel</p>
              <p>• <strong>Géolocalisation</strong> 📍 : Intégration GPS pour suivi des livraisons</p>
            </CardContent>
          </Card>

          {/* Apprentissages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Compétences
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>✅ Développement Android</p>
                <p>✅ Gestion données temps réel</p>
                <p>✅ Intégration Firebase</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>✅ Travail d'équipe</p>
                <p>✅ Autonomie</p>
                <p>✅ Suivi de projet</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-600" />
                  Géolocalisation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>📍 Suivi des livraisons</p>
                <p>📍 Localisation client</p>
                <p>📍 Optimisation routes</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-red-600" />
                  Données Temps Réel
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>🔄 Firebase Realtime DB</p>
                <p>🔄 Synchronisation clients</p>
                <p>🔄 Gestion ventes</p>
              </CardContent>
            </Card>
          </div>

          {/* Merci */}
          <Card className="border-amber-200 dark:border-amber-700 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/10 dark:to-yellow-900/10">
            <CardContent className="pt-6 text-sm leading-relaxed text-foreground/90">
              <p>Développé avec passion dans le cadre du cursus EMSI.</p>
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
                        alt={`Fourniss'Ma screenshot ${idx}`}
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

          {/* Stack complet */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Stack technologique</h4>
            <div className="flex flex-wrap gap-2">
              {['Android', 'Java', 'Android Studio', 'Firebase', 'Realtime Database', 'Authentication', 'Google Maps API', 'Géolocalisation', 'GPS', 'Mobile Development'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-4">
              #Android #Java #Firebase #MobileApp #StudentProject #Géolocalisation #EMSI #FournissMa #SalesManagement #TeamWork #Innovation #AndroidDevelopment #MobileDevelopment #UniversityProject #EMSI2024-2025
            </p>
          </div>
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
      </DialogContent>
    </Dialog>
  );
};

export default FournissMaProject;
