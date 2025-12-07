import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Sparkles, Mic, Globe, Image as ImageIcon, Brain, X } from 'lucide-react';

const DarijaAIProject: React.FC = () => {
  const galleryImages = Array.from({ length: 10 }, (_, i) => `/m${i + 1}.jpg`);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-600 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[previewIndex]}
              alt="Darija AI preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Darija AI</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Plateforme IA pour la transcription, traduction et clonage vocal en Darija – Un pont culturel pour la langue marocaine.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">Speech Recognition</Badge>
              <Badge variant="secondary" className="text-xs">Voice Cloning</Badge>
              <Badge variant="secondary" className="text-xs">NLP</Badge>
              <Badge variant="secondary" className="text-xs">ML</Badge>
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
          <DialogTitle className="text-2xl">Darija AI</DialogTitle>
          <DialogDescription>
            Une plateforme IA pour la transcription, traduction et clonage vocal en Darija
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              La Darija est une langue vivante, expressive, mais souvent absente des outils numériques modernes. Avec ce projet, j'ai voulu lui donner une place dans un espace où elle est rarement représentée : celui de l'intelligence artificielle appliquée à la traduction.
            </p>
          </div>

          {/* Fonctionnalités clés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Mic className="w-4 h-4 text-blue-600" />
                  Transcription
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                La parole en Darija est comprise et transformée en texte avec précision.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-600" />
                  Traduction
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                Le texte voyage vers d'autres langues en préservant le sens et les nuances.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                  Clonage Vocal
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                Restitution par une voix naturelle proche de l'orateur, dimension humaine garantie.
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-600" />
                  OCR & Traduction
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground/80">
                Détection automatique de texte dans images, documents, panneaux, menus.
              </CardContent>
            </Card>
          </div>

          {/* Valeur ajoutée */}
          <Card className="border-green-200 dark:border-green-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
            <CardHeader>
              <CardTitle className="text-lg">La valeur ajoutée</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p>
                Ce n'est pas seulement un traducteur. C'est un <strong>pont culturel</strong>.
              </p>
              <p>
                Un système où la Darija peut être entendue, comprise et projetée dans d'autres langues, sans perdre son identité.
              </p>
              <p>
                Une démonstration que la technologie peut être au service de la diversité linguistique et culturelle et que chaque langue mérite d'avoir sa voix dans l'ère numérique.
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
                        alt={`Darija AI screenshot ${idx}`}
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
              {['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Speech Recognition', 'Voice Cloning', 'OCR', 'Deep Learning', 'Machine Learning', 'API REST', 'Mobile'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-3">
              #MarocTech #AIinMorocco #InnovationMaroc #DarijaAI #MoroccoEngineering #ÉtudiantsMaroc #TechMaroc #StartupsMaroc #EMSI #ArtificialIntelligence #VoiceAI #MachineLearning #DeepLearning #NLP #VoiceCloning #SpeechRecognition #OCRTechnology #AITech #FutureOfTech #TechForGood
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DarijaAIProject;
