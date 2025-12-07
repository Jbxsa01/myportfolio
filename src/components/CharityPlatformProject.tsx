import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, Heart, BarChart3, Lock, Gift, X, Zap } from 'lucide-react';

const CharityPlatformProject: React.FC = () => {
  const galleryImages = Array.from({ length: 11 }, (_, i) => `/p${i + 1}.jpg`);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-700 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[previewIndex]}
              alt="Charity Platform preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Plateforme de Donation Caritative</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Solution digitale pour l'impact social : donations transparentes, sécurisées et engageantes avec gamification et analytics.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">Spring Boot</Badge>
              <Badge variant="secondary" className="text-xs">Stripe</Badge>
              <Badge variant="secondary" className="text-xs">JPA/Hibernate</Badge>
              <Badge variant="secondary" className="text-xs">Analytics</Badge>
            </div>

            <div className="text-xs text-primary font-semibold flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Cliquez pour explorer le projet
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Plateforme de Donation Caritative</DialogTitle>
          <DialogDescription>
            Une solution digitale pour l'impact social
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              Je suis ravi de présenter ma plateforme de donation caritative, développée sous l'excellente supervision de Madame Khadija A. Ce projet représente une fusion parfaite entre technologie et impact social, visant à révolutionner la façon dont nous contribuons aux causes qui nous tiennent à cœur.
            </p>
          </div>

          {/* Vision */}
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-red-200 dark:border-red-700">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                Notre Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-foreground/90">
              Transformer l'expérience de don en une démarche transparente, sécurisée et engageante, tout en créant un pont digital entre les donateurs et les organisations caritatives.
            </CardContent>
          </Card>

          {/* Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Backend Robuste
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>• Spring Boot & Spring Security</p>
                <p>• JPA/Hibernate</p>
                <p>• Architecture d'entreprise</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-600" />
                  Paiement Sécurisé
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>• Intégration Stripe</p>
                <p>• Niveau entreprise</p>
                <p>• Transactions sécurisées</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  Analytics & Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>• Tableau de bord temps réel</p>
                <p>• Thymeleaf dynamique</p>
                <p>• Visualisations avancées</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-600" />
                  Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80 space-y-1">
                <p>• Gamification</p>
                <p>• Points & Badges</p>
                <p>• Communauté engagée</p>
              </CardContent>
            </Card>
          </div>

          {/* Innovations */}
          <Card className="border-blue-200 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
            <CardHeader>
              <CardTitle className="text-lg">✨ Innovations Clés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p>• <strong>Gamification</strong> : Points, badges et récompenses pour motiver les donateurs</p>
              <p>• <strong>Reçus fiscaux</strong> : Génération automatique de PDF</p>
              <p>• <strong>Notifications intelligentes</strong> : Alertes pertinentes et personnalisées</p>
              <p>• <strong>Gestion avancée</strong> : Profils utilisateurs sophistiqués et sécurisés</p>
              <p>• <strong>Filtrage & Tri</strong> : Recherche puissante des transactions et causes</p>
            </CardContent>
          </Card>

          {/* Impact */}
          <Card className="border-green-200 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
            <CardHeader>
              <CardTitle className="text-lg">🚀 Impact</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-relaxed text-foreground/90">
              Cette plateforme ne se contente pas de faciliter les dons, elle crée une communauté engagée et transparente, où chaque contribution compte et est traçable. Un véritable pont entre la technologie et l'impact social.
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
                        alt={`Charity Platform screenshot ${idx}`}
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
              {['Spring Boot', 'Spring Security', 'Stripe', 'JPA/Hibernate', 'Thymeleaf', 'Bootstrap', 'PDF Generation', 'Java Enterprise', 'REST API', 'MySQL', 'Security'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-3">
              #InnovationDigitale #TechForGood #SpringBoot #JavaEnterprise #ImpactSocial #DigitalTransformation #CharityTech #WebDevelopment #Stripe #Gamification #SocialImpact #EngineeringMaroc #TechMaroc
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

export default CharityPlatformProject;
