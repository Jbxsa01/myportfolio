// Service pour récupérer les stats de Vercel Analytics
// Note: Utilise des données mockées avec variations réalistes

export interface VisitEntry {
  timestamp: number;
  path: string;
  country?: string;
  sessionDuration?: number;
  isReturning?: boolean;
}

class AnalyticsService {
  private readonly STORAGE_KEY = 'portfolio_analytics';
  private readonly SESSION_KEY = 'portfolio_session_id';
  private readonly SESSION_DURATION_KEY = 'portfolio_session_start';

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
      sessionStorage.setItem(this.SESSION_DURATION_KEY, Date.now().toString());
    }
    return sessionId;
  }

  trackVisit(path: string = window.location.pathname, country?: string): void {
    // Les données sont mockées, juste pour tracking
    this.getSessionId();
  }

  getTotalVisitors(): number {
    // Mock data : généralement 2500-3500
    return 2847 + Math.floor(Math.random() * 500);
  }

  getTodayVisitors(): number {
    // Normal : 30-50, Exceptionnellement : jusqu'à +150
    const baseVisitors = 35 + Math.floor(Math.random() * 25);
    const isExceptional = Math.random() < 0.1; // 10% de chance d'être exceptionnel
    
    if (isExceptional) {
      return baseVisitors + 80 + Math.floor(Math.random() * 70); // +80 à +150
    }
    return baseVisitors;
  }

  getWeeklyVisitors(): number {
    // Mock : ~280-320
    return 287 + Math.floor(Math.random() * 50);
  }

  getMonthlyVisitors(): number {
    // Mock : ~1200-1400
    return 1205 + Math.floor(Math.random() * 200);
  }

  getAverageSessionTime(): string {
    // Mock : 3-5 minutes
    const minutes = 3 + Math.floor(Math.random() * 3);
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}m ${seconds}s`;
  }

  getReturningVisitors(): number {
    // Mock : 65-72%
    return 65 + Math.floor(Math.random() * 10);
  }

  getNewVisitors(): number {
    return 100 - this.getReturningVisitors();
  }

  getBounceRate(): number {
    // Mock : 20-30% (arrondi à 1 décimale)
    return Math.round((20 + Math.random() * 10) * 10) / 10;
  }

  getTopCountries(): { country: string; count: number }[] {
    return [
      { country: 'Morocco', count: 892 + Math.floor(Math.random() * 100) },
      { country: 'France', count: 445 + Math.floor(Math.random() * 50) },
      { country: 'United States', count: 328 + Math.floor(Math.random() * 40) },
      { country: 'Canada', count: 187 + Math.floor(Math.random() * 30) },
      { country: 'Spain', count: 156 + Math.floor(Math.random() * 25) },
    ];
  }

  getDailyVisits(): { date: string; count: number }[] {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const baseCounts = [32, 45, 38, 52, 47, 28, 42];
    
    return days.map((date, index) => ({
      date,
      // Variation ±20% autour de la base
      count: Math.round(baseCounts[index] * (0.8 + Math.random() * 0.4)),
    }));
  }

  clearData(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    sessionStorage.removeItem(this.SESSION_DURATION_KEY);
  }
}

export const analyticsService = new AnalyticsService();
