import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, X, Car } from 'lucide-react';

const EparkingProject: React.FC = () => {
  const galleryImages = [
    '/logos/d1.jpg', '/logos/d2.jpg', '/logos/d3.png', '/logos/d4.png', '/logos/d5.png',
    '/logos/d6.png', '/logos/d7.png', '/logos/d8.png', '/logos/d9.png', '/logos/d10.png',
    '/logos/d11.png', '/logos/d12.png', '/logos/d13.png'
  ];

  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const recommendations = [
    { name: 'Parking Central', distance: '180 m' },
    { name: 'Parking Gare', distance: '320 m' },
    { name: 'Parking Mall', distance: '520 m' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-700 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[0]}
              alt="E-parking preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">E-parking</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Plateforme de réservation de parking en ligne avec recherche des places disponibles et recommandations des parkings les plus proches.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">Spring</Badge>
              <Badge variant="secondary" className="text-xs">Java</Badge>
              <Badge variant="secondary" className="text-xs">MySQL</Badge>
              <Badge variant="secondary" className="text-xs">React</Badge>
            </div>
            <div className="text-xs text-primary font-semibold flex items-center gap-1">
              <Car className="w-3 h-3" />
              Cliquez pour explorer le projet
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">E-parking</DialogTitle>
          <DialogDescription>
            Plateforme de réservation de parking en ligne
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-foreground leading-relaxed">
              E-parking permet de rechercher et réserver des places de parking proches de votre position, avec recommandations des parkings les plus proches et affichage des disponibilités en temps réel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm">Recommandations les plus proches</h4>
              <div className="mt-3 space-y-2">
                {recommendations.map((r, i) => (
                  <div key={i} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 p-3 rounded border">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <div className="font-medium">{r.name}</div>
                        <div className="text-xs text-muted-foreground">{r.distance} • 12 places disponibles</div>
                      </div>
                    </div>
                    <div className="text-xs text-primary font-semibold">Réserver</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Galerie du projet</h4>
              <div className="relative h-32 overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-800 shadow mt-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="flex gap-3 animate-marquee-slow">
                    {galleryImages.concat(galleryImages).map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        onClick={() => { setPreviewIndex(idx % galleryImages.length); setFullscreenIndex(idx % galleryImages.length); }}
                        className="h-28 w-48 flex-shrink-0 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 flex items-center justify-center p-1 hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                      >
                        <img src={img} alt={`E-parking ${idx}`} className="w-full h-full object-contain" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {fullscreenIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
              <button onClick={() => setFullscreenIndex(null)} className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-51">
                <X className="w-8 h-8" />
              </button>
              <div className="w-full h-full flex items-center justify-center">
                <img src={galleryImages[fullscreenIndex]} alt="Fullscreen" className="w-full h-full object-contain" />
              </div>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-sm">Stack technologique</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {['Spring', 'Java', 'MySQL', 'React'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EparkingProject;
