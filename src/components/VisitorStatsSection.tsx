import React, { useState, useEffect } from 'react';
import { Eye, TrendingUp, Users, Globe, Clock } from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  weeklyVisitors: number;
  monthlyVisitors: number;
  averageSessionTime: string;
  bounceRate: number;
  returningVisitors: number;
  newVisitors: number;
  topCountries: { country: string; count: number }[];
  dailyVisits: { date: string; count: number }[];
}

const VisitorStatsSection: React.FC = () => {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    todayVisitors: 0,
    weeklyVisitors: 0,
    monthlyVisitors: 0,
    averageSessionTime: '0m 0s',
    bounceRate: 0,
    returningVisitors: 0,
    newVisitors: 0,
    topCountries: [],
    dailyVisits: [
      { date: 'Mon', count: 0 },
      { date: 'Tue', count: 0 },
      { date: 'Wed', count: 0 },
      { date: 'Thu', count: 0 },
      { date: 'Fri', count: 0 },
      { date: 'Sat', count: 0 },
      { date: 'Sun', count: 0 },
    ],
  });

  const [isLive, setIsLive] = useState(true);

  // Charger les stats réelles du service analytics
  useEffect(() => {
    // Track la visite actuelle
    analyticsService.trackVisit();

    // Mettre à jour les stats
    const updateStats = () => {
      setStats({
        totalVisitors: analyticsService.getTotalVisitors(),
        todayVisitors: analyticsService.getTodayVisitors(),
        weeklyVisitors: analyticsService.getWeeklyVisitors(),
        monthlyVisitors: analyticsService.getMonthlyVisitors(),
        averageSessionTime: analyticsService.getAverageSessionTime(),
        bounceRate: analyticsService.getBounceRate(),
        returningVisitors: analyticsService.getReturningVisitors(),
        newVisitors: analyticsService.getNewVisitors(),
        topCountries: analyticsService.getTopCountries(),
        dailyVisits: analyticsService.getDailyVisits(),
      });
    };

    updateStats();

    // Rafraîchir les stats toutes les 10 secondes si en mode LIVE
    if (!isLive) return;

    const interval = setInterval(updateStats, 10000);
    return () => clearInterval(interval);
  }, [isLive]);

  const maxDailyVisits = Math.max(...stats.dailyVisits.map((d) => d.count));

  return (
    <section className="section-container py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-px bg-primary"></div>
              <span className="text-xs font-mono text-primary uppercase tracking-widest">Analytics</span>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`text-xs font-mono px-3 py-1 rounded border transition-all ${
                isLive
                  ? 'bg-primary text-white border-primary'
                  : 'border-slate-300 dark:border-slate-700 text-foreground'
              }`}
            >
              {isLive ? '● LIVE' : '○ OFFLINE'}
            </button>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-4">
            Statistiques de Visite
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Suivi en temps réel de l'engagement des visiteurs et des performances du portfolio.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-5 h-5 text-primary" />
              <span className="text-xs font-mono text-muted-foreground">TOTAL</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{stats.totalVisitors.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Visiteurs uniques</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-mono text-muted-foreground">CETTE SEMAINE</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{stats.weeklyVisitors}</p>
            <p className="text-sm text-muted-foreground">Visites</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-5 h-5 text-green-500" />
              <span className="text-xs font-mono text-muted-foreground">MOYENNE</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{stats.averageSessionTime}</p>
            <p className="text-sm text-muted-foreground">Durée session</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-xs font-mono text-muted-foreground">AUJOURD'HUI</span>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{stats.todayVisitors}</p>
            <p className="text-sm text-muted-foreground">Visiteurs</p>
          </div>
        </div>

        {/* Charts and Details */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Daily Visits Chart */}
          <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <h3 className="font-semibold text-foreground mb-6">Activité Hebdomadaire</h3>
            <div className="relative h-64">
              <svg
                viewBox="0 0 560 200"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Grid Background */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`grid-${i}`}
                    x1="40"
                    y1={40 + i * 40}
                    x2="540"
                    y2={40 + i * 40}
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.1"
                  />
                ))}

                {/* Axes */}
                <line x1="40" y1="180" x2="540" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.2" />
                <line x1="40" y1="20" x2="40" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.2" />

                {/* Curve Path */}
                <polyline
                  points="70,130 132,95 194,110 256,60 318,80 380,115 442,85"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Fill under curve */}
                <polygon
                  points="70,130 132,95 194,110 256,60 318,80 380,115 442,85 442,180 380,180 318,180 256,180 194,180 132,180 70,180"
                  fill="url(#gradientFill)"
                  opacity="0.1"
                />

                {/* Data Points */}
                {stats.dailyVisits.map((day, idx) => {
                  const x = 70 + idx * 62;
                  const y = 180 - (day.count / maxDailyVisits) * 120;
                  return (
                    <g key={`point-${idx}`}>
                      <circle cx={x} cy={y} r="4" fill="url(#gradient)" className="hover:r-6 transition-all" />
                      <text
                        x={x}
                        y={y - 15}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-foreground"
                        opacity="0.7"
                      >
                        {day.count}
                      </text>
                    </g>
                  );
                })}

                {/* X-axis Labels */}
                {stats.dailyVisits.map((day, idx) => (
                  <text
                    key={`label-${idx}`}
                    x={70 + idx * 62}
                    y="195"
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                  >
                    {day.date}
                  </text>
                ))}

                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(139, 92, 246)', stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.3 }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center">
              <p>Max: {maxDailyVisits} visites | Moyenne: {Math.round(stats.dailyVisits.reduce((a, b) => a + b.count, 0) / stats.dailyVisits.length)} visites</p>
            </div>
          </div>

          {/* Visitor Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
            <h3 className="font-semibold text-foreground mb-6">Type de Visiteur</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Nouveaux</span>
                  <span className="text-sm font-semibold text-foreground">{stats.newVisitors}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${stats.newVisitors}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Retour</span>
                  <span className="text-sm font-semibold text-foreground">{stats.returningVisitors}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${stats.returningVisitors}%` }}></div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs text-muted-foreground mb-2">Taux de rebond</p>
                <p className="text-2xl font-bold text-foreground">{stats.bounceRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Top Pays</h3>
          </div>
          <div className="space-y-4">
            {stats.topCountries.map((item, idx) => {
              const maxCount = Math.max(...stats.topCountries.map((c) => c.count));
              return (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-foreground">{item.country}</span>
                    <span className="text-sm font-semibold text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-blue-500"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Les statistiques sont mises à jour en temps réel. Dernier update: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisitorStatsSection;
