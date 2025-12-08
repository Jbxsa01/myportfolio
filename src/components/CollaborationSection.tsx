import React from 'react';
import { Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const CollaborationSection: React.FC = () => {
  return (
    <section className="section-container py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-primary"></div>
            <span className="text-xs font-mono text-primary uppercase tracking-widest">Opportunité</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
            Ouverte à la Collaboration
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Je suis à la recherche de projets freelance stimulants, de partenariats stratégiques et de collaborations innovantes. Ensemble, transformons vos idées en solutions technologiques d'excellence.
          </p>
        </div>

        {/* Main Card */}
        <div className="relative mb-16">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 shadow-sm hover:shadow-md transition-shadow duration-300">
            {/* Content Grid */}
            <div className="grid md:grid-cols-3 gap-12">
              {/* Column 1 */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Projets Freelance</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Développement full-stack, intégration IA/ML, solutions sur mesure adaptées à vos besoins spécifiques.
                  </p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Partenariats Stratégiques</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Collaborations à long terme, croissance mutuelle et création d'impact technologique durable.
                  </p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Expertise Technique</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Conseils en architecture, audit technique et mentorat pour optimiser vos projets.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-12 h-px bg-slate-200 dark:bg-slate-800"></div>

            {/* CTA Section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-2">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Disponibilité</p>
                <p className="text-foreground font-semibold">Immédiate pour les bonnes opportunités</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
                >
                  Commençons un Projet
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 text-foreground font-semibold px-8 py-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300"
                >
                  Me Contacter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Info Pills */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Réponse rapide aux demandes</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Mode de travail flexible et remote</p>
          </div>
          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
            <p className="text-sm text-muted-foreground">Engagement envers l'excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborationSection;
