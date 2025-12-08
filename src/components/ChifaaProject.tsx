import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, Brain, Stethoscope, Video, FileText, Lock, X } from 'lucide-react';

const galleryImages = Array.from({ length: 20 }, (_, i) => `/certifications/w${i + 1}.png`);

const ChifaaProject: React.FC = () => {
  const [previewIndex, setPreviewIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-glass overflow-hidden appear appear-delay-900 h-full cursor-pointer hover:shadow-lg transition-shadow group">
          <div className="h-48 overflow-hidden relative bg-slate-200 dark:bg-slate-700">
            <img
              src={galleryImages[previewIndex]}
              alt="CHIFAA preview"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">CHIFAA</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
              AI-powered healthcare platform blending intelligence and care. From symptom checking to secure consultations and medical reports.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="text-xs">AI Healthcare</Badge>
              <Badge variant="secondary" className="text-xs">Telemedicine</Badge>
              <Badge variant="secondary" className="text-xs">Medical AI</Badge>
              <Badge variant="secondary" className="text-xs">Digital Health</Badge>
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
          <DialogTitle className="text-2xl">CHIFAA - Healthcare Innovation</DialogTitle>
          <DialogDescription>
            From idea to innovation — blending AI and care in one intelligent platform
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-8">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              A bold step from idea to innovation — blending AI and care in one intelligent platform. Here's a glimpse of what we've built. But CHIFAA is more than what this video reveals.
            </p>
          </div>
          {/* Visible Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg text-blue-600">What you see:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-600" />
                    AI-powered symptom checker
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground/80">
                  Intelligent diagnosis support powered by machine learning algorithms.
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-cyan-600" />
                    Smart recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground/80">
                  Personalized recommendations by medical specialty based on symptoms.
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 md:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Lab result interpretation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground/80">
                  Complex lab results translated into simple, accessible language for patients.
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Hidden Features */}
          <div className="space-y-3">
            <h4 className="font-semibold text-lg text-purple-600">What you don't see (but we built with the same love):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="bg-purple-50 border-purple-200 p-4">
                <p className="text-sm font-semibold text-purple-700 mb-1">Appointment Booking</p>
                <p className="text-xs text-foreground/80">Seamless scheduling with healthcare professionals.</p>
              </Card>
              <Card className="bg-pink-50 border-pink-200 p-4">
                <p className="text-sm font-semibold text-pink-700 mb-1">Video Consultations</p>
                <p className="text-xs text-foreground/80">Secure remote consultations for accessible care.</p>
              </Card>
              <Card className="bg-orange-50 border-orange-200 p-4">
                <p className="text-sm font-semibold text-orange-700 mb-1">Digital Prescriptions</p>
                <p className="text-xs text-foreground/80">Instant prescriptions generated by certified doctors.</p>
              </Card>
              <Card className="bg-amber-50 border-amber-200 p-4">
                <p className="text-sm font-semibold text-amber-700 mb-1">Medical Reports</p>
                <p className="text-xs text-foreground/80">Dynamic medical report generation and tracking.</p>
              </Card>
              <Card className="bg-teal-50 border-teal-200 p-4">
                <p className="text-sm font-semibold text-teal-700 mb-1">Patient History</p>
                <p className="text-xs text-foreground/80">Complete patient history management and follow-up.</p>
              </Card>
              <Card className="bg-indigo-50 border-indigo-200 p-4">
                <p className="text-sm font-semibold text-indigo-700 mb-1">Integrated Communication</p>
                <p className="text-xs text-foreground/80">Seamless communication between all stakeholders.</p>
              </Card>
              <Card className="bg-red-50 border-red-200 p-4 md:col-span-2">
                <p className="text-sm font-semibold text-red-700 mb-1">End-to-End Encryption</p>
                <p className="text-xs text-foreground/80">Data security built for trust and compliance with healthcare regulations.</p>
              </Card>
            </div>
          </div>
          {/* Valeur ajoutée */}
          <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="text-lg">The CHIFAA Difference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p>
                CHIFAA is not just another healthcare app. It's a comprehensive ecosystem where <strong>AI meets empathy</strong>.
              </p>
              <p>
                We've engineered a platform that understands patients, supports doctors, and creates a secure bridge between all stakeholders in the healthcare journey.
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
                        alt={`CHIFAA screenshot ${idx}`}
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
              {['React', 'Node.js', 'WebSocket', 'PHP', 'Tailwind CSS', 'AI/ML', 'Real-time Communication', 'Encryption', 'Healthcare Compliance'].map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
          {/* Hashtags */}
          <div className="text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground/70">Hashtags du projet</p>
            <p className="line-clamp-3">
              #CHIFAA #HealthcareInnovation #AIinHealthcare #Telemedicine #DigitalHealth #MedicalAI #HealthTech #Innovation #TechForGood #PatientCare #WebDevelopment #ReactJS #NodeJS #SecureHealthcare
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChifaaProject;
