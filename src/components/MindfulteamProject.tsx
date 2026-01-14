import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, X } from 'lucide-react';

const rawImages = [
  "Capture d’écran 2025-12-11 185152.png",
  "Capture d’écran 2025-12-11 185226.png",
  "Capture d’écran 2025-12-11 185251.png",
  "Capture d’écran 2025-12-11 185323.png",
  "Capture d’écran 2025-12-11 185355.png",
  "Capture d’écran 2025-12-11 185615.png",
  "Capture d’écran 2025-12-11 190620.png",
  "Capture d’écran 2025-12-11 190657.png",
  "Capture d’écran 2025-12-11 191112.png",
  "Capture d’écran 2025-12-11 191131.png",
  "Capture d’écran 2025-12-11 191907.png",
  "Capture d’écran 2025-12-11 192221.png",
  "Capture d’écran 2025-12-11 192236.png",
  "Capture d’écran 2025-12-11 192313.png",
];

const galleryImages = rawImages.map((name) => `/mindfulteam/${encodeURIComponent(name)}`);

const MindfulteamProject: React.FC = () => {
  const initialIndex = 0;
  const [previewIndex, setPreviewIndex] = useState(initialIndex);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const title = 'Mindful Team — Application de bien‑être collaboratif';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-800 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img src={galleryImages[previewIndex]} alt="Mindful Team preview" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Application dédiée au bien‑être en entreprise: gestion d'activités, suivi du moral et ressources d'accompagnement.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">React</Badge>
              <Badge variant="secondary" className="text-xs">TypeScript</Badge>
              <Badge variant="secondary" className="text-xs">Tailwind</Badge>
              <Badge variant="secondary" className="text-xs">Node.js</Badge>
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
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>
            Plateforme pour améliorer le bien‑être des équipes grâce à des suivis, ateliers et ressources.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-foreground leading-relaxed">
              Mindful Team centralise les actions de bien‑être: sondages anonymes, ateliers guidés, suivi d'humeur, et documentation d'accompagnement.
            </p>
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
                      <img src={img} alt={`Mindful ${idx}`} className="w-full h-full object-contain" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Cliquez sur une image pour l'afficher en grand</p>
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
              {['React', 'TypeScript', 'Tailwind', 'Node.js', 'Express'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-3">#BienEtre #Mindfulness #TeamBuilding #React #TypeScript</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MindfulteamProject;
