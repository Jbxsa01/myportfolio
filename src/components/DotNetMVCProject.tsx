import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Globe, Database, Code2, Layers, CheckCircle, X, Zap } from 'lucide-react';

const DotNetMVCProject: React.FC = () => {
  const galleryImages = ['/c1.jpg', '/c2.jpg', '/c3.jpg', '/c4.jpg', '/c5.jpg', '/c6.jpg', '/c7.jpg', '/c8.jpg'].filter(
    img => img  // Filtre les images qui existent
  );
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-900 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            {galleryImages.length > 0 ? (
              <>
                <img
                  src={galleryImages[previewIndex]}
                  alt=".NET MVC preview"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                <Globe className="w-12 h-12 text-white/80" />
              </div>
            )}
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Application Web .NET MVC</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Projet académique avec architecture MVC robuste, interface responsive et gestion de données SQL Server.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">.NET MVC</Badge>
              <Badge variant="secondary" className="text-xs">C#</Badge>
              <Badge variant="secondary" className="text-xs">SQL Server</Badge>
              <Badge variant="secondary" className="text-xs">Entity Framework</Badge>
            </div>

            <div className="text-xs text-primary font-semibold flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Cliquez pour explorer le projet
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Application Web .NET MVC 🌐</DialogTitle>
          <DialogDescription>
            Projet académique de développement web
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Dans le cadre de notre projet académique, nous avons conçu et développé une application web robuste et moderne utilisant le framework .NET MVC.
            </p>
            <p className="text-foreground leading-relaxed">
              Ce projet représente une mise en pratique complète des principes de développement full-stack, combinant une architecture backend solide avec une interface utilisateur intuitive et responsive.
            </p>
          </div>

          {/* Stack */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                Stack Technologique
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-foreground/90 space-y-2">
              <p>• <strong>.NET MVC</strong> : Framework robuste et évolutif</p>
              <p>• <strong>C#</strong> : Langage backend puissant</p>
              <p>• <strong>Entity Framework</strong> : ORM pour l'accès aux données</p>
              <p>• <strong>SQL Server</strong> : Base de données performante</p>
              <p>• <strong>HTML, CSS, JavaScript</strong> : Frontend responsive et dynamique</p>
            </CardContent>
          </Card>

          {/* Objectifs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-green-600" />
                  Architecture MVC
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>✅ Séparation des responsabilités</p>
                <p>✅ Code maintenable et scalable</p>
                <p>✅ Patterns d'architecture modernes</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  Interface Utilisateur
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>✅ Design intuitive</p>
                <p>✅ Responsive design</p>
                <p>✅ UX moderne et fluide</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-orange-600" />
                  Gestion Données
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>✅ SQL Server intégré</p>
                <p>✅ Entity Framework ORM</p>
                <p>✅ Requêtes optimisées</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  Compétences
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>✅ Full-stack development</p>
                <p>✅ Travail collaboratif</p>
                <p>✅ Intégration complète</p>
              </CardContent>
            </Card>
          </div>

          {/* Apprentissages */}
          <Card className="border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10">
            <CardHeader>
              <CardTitle className="text-lg">📚 Apprentissages Clés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p>Ce projet nous a permis de renforcer nos compétences en développement full-stack tout en collaborant efficacement en équipe.</p>
              <p>Nous avons approfondi notre maîtrise de l'écosystème .NET, des patterns d'architecture, et des bonnes pratiques de développement web moderne.</p>
            </CardContent>
          </Card>

          {/* Galerie scrollable */}
          {galleryImages.length > 0 && (
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
                          alt={`Project screenshot ${idx}`}
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
          )}

          {/* Stack complet */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Stack technologique</h4>
            <div className="flex flex-wrap gap-2">
              {['.NET MVC', 'C#', 'Entity Framework', 'SQL Server', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Web Development', 'Architecture Pattern'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-3">
              #DotNet #MVC #WebDevelopment #CSharp #EntityFramework #SQLServer #FullStack #ProjectDevelopment #TeamWork #Learning #Innovation #WebDesign #SoftwareEngineering
            </p>
          </div>
        </div>

        {/* Lightbox fullscreen */}
        {fullscreenIndex !== null && galleryImages.length > 0 && (
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

export default DotNetMVCProject;
