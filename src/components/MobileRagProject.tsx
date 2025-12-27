import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Cpu, X, Smartphone } from 'lucide-react';

const MobileRagProject: React.FC = () => {
  const galleryImages = [
    '/logos/l1.jpeg', '/logos/l2.jpeg', '/logos/l3.jpeg', '/logos/l4.jpeg',
    '/logos/l5.jpeg', '/logos/l6.jpeg', '/logos/l7.jpeg', '/logos/l8.jpeg'
  ];

  // User requested Flutter preview should start with l4.jpeg
  const initialIndex = galleryImages.indexOf('/logos/l4.jpeg') >= 0 ? galleryImages.indexOf('/logos/l4.jpeg') : 0;
  const [previewIndex, setPreviewIndex] = useState(initialIndex);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const recommendations = [
    { name: 'Assistant conversationnel', desc: 'RAG + LangChain pour réponses contextuelles' },
    { name: 'Recherche intelligente', desc: 'Indexation vecteur + LSTM pour séries temporelles' },
    { name: 'Moteur de résumé', desc: 'RAG pour extraire réponses rapides' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-800 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[previewIndex]}
              alt="Mobile RAG preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Mobile AI (RAG + Assistant)</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              Application mobile avec Retrieval-Augmented Generation, assistant conversationnel, pipelines LangChain et modèles LSTM pour traitements séquentiels.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">RAG</Badge>
              <Badge variant="secondary" className="text-xs">Assistant AI</Badge>
              <Badge variant="secondary" className="text-xs">LangChain</Badge>
              <Badge variant="secondary" className="text-xs">LSTM</Badge>
              <Badge variant="secondary" className="text-xs">Flutter</Badge>
            </div>
            <div className="text-xs text-primary font-semibold flex items-center gap-1">
              <Smartphone className="w-3 h-3" />
              Cliquez pour explorer le projet mobile
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Mobile AI — RAG & Assistant</DialogTitle>
          <DialogDescription>
            Application mobile démontrant RAG, assistant conversationnel et pipelines LangChain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-foreground leading-relaxed">
              Prototype mobile intégrant un assistant AI capable de répondre avec contexte (RAG), d'exécuter des flux LangChain et d'analyser des séries avec des LSTM pour fonctionnalités avancées (prévision, détection d'anomalies).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm">Use-cases & composants</h4>
              <ul className="mt-3 list-disc ml-5 text-sm space-y-2">
                <li>Assistant conversationnel contextuel (RAG + embeddings)</li>
                <li>Pipeline LangChain pour orchestration des prompts et outils</li>
                <li>Module LSTM pour analyses séquentielles et prévisions</li>
                <li>Frontend mobile en Flutter, intégration native et stockage Firebase</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm">Galerie</h4>
              <div className="relative h-32 overflow-hidden rounded-xl border bg-slate-100 dark:bg-slate-800 shadow mt-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="flex gap-3 animate-marquee-slow">
                    {galleryImages.concat(galleryImages).map((img, idx) => (
                      <button
                        key={`${img}-${idx}`}
                        onClick={() => { setPreviewIndex(idx % galleryImages.length); setFullscreenIndex(idx % galleryImages.length); }}
                        className="h-28 w-48 flex-shrink-0 overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700 flex items-center justify-center p-1 hover:ring-2 hover:ring-primary transition-all cursor-pointer"
                      >
                        <img src={img} alt={`Mobile ${idx}`} className="w-full h-full object-contain" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm">Composants AI</h4>
            <div className="mt-2 space-y-2">
              {recommendations.map((r, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-700 p-3 rounded border">
                  <Cpu className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.desc}</div>
                  </div>
                </div>
              ))}
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
              {['RAG', 'LangChain', 'LSTM', 'Flutter', 'Dart', 'Firebase'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MobileRagProject;
