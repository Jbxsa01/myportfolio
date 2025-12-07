import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

const MedicareProject: React.FC = () => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  // Array of images a1 through a13 with conditional filtering for missing files
  const allImages = Array.from({ length: 13 }, (_, i) => `/a${i + 1}.jpg`);
  
  // Filter out potentially missing images (keep only those that exist)
  const medicareImages = allImages.filter((_, index) => {
    // Assuming a1-a13 exist, but we can add exceptions here if needed
    return true;
  });

  const handleImageClick = (index: number) => {
    setFullscreenIndex(index);
  };

  const handlePreviousImage = () => {
    setPreviewIndex((prev) => (prev - 1 + medicareImages.length) % medicareImages.length);
  };

  const handleNextImage = () => {
    setPreviewIndex((prev) => (prev + 1) % medicareImages.length);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="group relative bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 rounded-lg overflow-hidden cursor-pointer h-80 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fadeIn"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="absolute inset-0 opacity-20 bg-pattern"></div>
          
          {medicareImages.length > 0 ? (
            <>
              <img
                src={medicareImages[previewIndex]}
                alt="Medicare"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <p className="text-white font-semibold">Medicare - Santé Digitale</p>
                  <p className="text-gray-200 text-sm">Plateforme médicale innovante</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">Medicare</p>
                <p className="text-sm opacity-80">Santé Digitale</p>
              </div>
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b pb-6">
            <h2 className="text-3xl font-bold text-emerald-600 mb-2">
              💡 Repenser la santé digitale avec Medicare 💡
            </h2>
            <p className="text-gray-600">Plateforme médicale innovante pour l'accès aux soins</p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-200">
            <p className="text-gray-800 leading-relaxed">
              Dans un monde où la technologie transforme nos modes de vie, j'ai choisi de mettre mes compétences au service de la santé en développant Medicare : une plateforme innovante qui simplifie l'accès aux soins pour tous.
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">🎯 Les fonctionnalités clés de Medicare :</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-l-4 border-emerald-500">
                <p className="font-semibold text-emerald-700">📅 Prise de rendez-vous rapide</p>
                <p className="text-sm text-gray-600 mt-2">Interface intuitive adaptée à tous les profils pour réserver avec des médecins.</p>
              </Card>
              <Card className="p-4 border-l-4 border-green-500">
                <p className="font-semibold text-green-700">💊 Commande de médicaments</p>
                <p className="text-sm text-gray-600 mt-2">Optimisation par géolocalisation pour trouver les pharmacies les plus proches.</p>
              </Card>
              <Card className="p-4 border-l-4 border-teal-500 md:col-span-2">
                <p className="font-semibold text-teal-700">💻 Consultations en ligne</p>
                <p className="text-sm text-gray-600 mt-2">Pour les cas simples, obtenir des prescriptions médicales sans déplacement inutile.</p>
              </Card>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900">🌟 Mes contributions techniques :</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">💻 Back-end</p>
                <p className="text-sm text-gray-700">Développement performant en PHP avec gestion efficace des données via MySQL.</p>
              </Card>
              <Card className="p-4 bg-purple-50 border-purple-200">
                <p className="font-semibold text-purple-900 mb-2">🎨 Front-end</p>
                <p className="text-sm text-gray-700">Interface ergonomique avec HTML, CSS, JavaScript et Tailwind CSS.</p>
              </Card>
              <Card className="p-4 bg-orange-50 border-orange-200">
                <p className="font-semibold text-orange-900 mb-2">⚡ UX/Performance</p>
                <p className="text-sm text-gray-700">Priorité à la simplicité, rapidité et navigation intuitive.</p>
              </Card>
            </div>
          </div>

          {/* Current Challenges */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-yellow-900 mb-4">🔍 Mes défis actuels :</h3>
            <ul className="space-y-2 text-gray-800">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-3 font-bold">•</span>
                <span>Intégrer des algorithmes intelligents pour personnaliser les suggestions (pharmacies proches, créneaux disponibles).</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-3 font-bold">•</span>
                <span>Garantir une sécurité optimale des données patients, en conformité avec les normes RGPD et du secteur médical.</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-3 font-bold">•</span>
                <span>Développer une architecture scalable pour anticiper la croissance du nombre d'utilisateurs.</span>
              </li>
            </ul>
          </div>

          {/* Next Steps */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-900 mb-4">💡 Prochaines étapes :</h3>
            <p className="text-gray-800 mb-4">
              Je travaille actuellement sur l'intégration de consultations vidéo pour les cas nécessitant un suivi plus poussé, tout en renforçant les interactions avec les bases de données des pharmacies et des établissements de santé.
            </p>
            <p className="text-gray-800 italic">
              La santé numérique représente, selon moi, un véritable levier pour démocratiser l'accès aux soins. Si vous avez des idées, des retours ou simplement envie d'échanger sur le sujet, je serai ravie d'en discuter.
            </p>
          </div>

          {/* Gallery */}
          {medicareImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Galerie du Projet</h3>
              
              {/* Scrollable Gallery */}
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="marquee-slow flex gap-2 p-2">
                    {medicareImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Medicare ${index + 1}`}
                        className="h-32 w-40 object-cover rounded cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
                        onClick={() => handleImageClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fullscreen Lightbox */}
          {fullscreenIndex !== null && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <button
                onClick={() => setFullscreenIndex(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>
              
              <img
                src={medicareImages[fullscreenIndex]}
                alt="Fullscreen"
                className="w-full h-full object-contain max-w-6xl max-h-[90vh]"
              />
            </div>
          )}

          {/* Stack Badges */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Stack Technologique</h3>
            <div className="flex flex-wrap gap-2">
              {['PHP', 'Laravel', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'].map((tech) => (
                <Badge key={tech} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-300">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Hashtags */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold">Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {['#SantéDigitale', '#FemmesDansLaTech', '#InnovationSanté', '#WebDevelopment', '#PHP', '#TailwindCSS'].map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-emerald-100 text-emerald-700">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white p-6 rounded-lg text-center">
            <p className="text-lg font-semibold mb-2">🌍 Ensemble, construisons un avenir où la santé est connectée, accessible et toujours plus humaine.</p>
            <p className="text-sm opacity-90">Avez-vous des idées ou envie d'échanger ? Contactez-moi !</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicareProject;
