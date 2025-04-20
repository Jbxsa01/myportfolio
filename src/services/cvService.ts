// Service pour gérer l'accès au CV
export class CVService {
  private static instance: CVService;
  private cvContent: any = null;
  private loaded: boolean = false;
  private loading: boolean = false;
  private error: string | null = null;

  private constructor() {}

  public static getInstance(): CVService {
    if (!CVService.instance) {
      CVService.instance = new CVService();
    }
    return CVService.instance;
  }

  public async loadCV(): Promise<void> {
    if (this.loaded) return;
    if (this.loading) return;

    this.loading = true;
    this.error = null;

    try {
      const response = await fetch('/cv-content.json');
      if (!response.ok) {
        throw new Error(`Erreur lors du chargement du CV: ${response.statusText}`);
      }
      this.cvContent = await response.json();
      this.loaded = true;
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'Erreur inconnue';
      this.loaded = false;
      throw error;
    } finally {
      this.loading = false;
    }
  }

  public isCVLoaded(): boolean {
    return this.loaded;
  }

  public isLoading(): boolean {
    return this.loading;
  }

  public getError(): string | null {
    return this.error;
  }

  public getCVContent(): any {
    if (!this.loaded) {
      throw new Error('Le CV n\'est pas encore chargé');
    }
    return this.cvContent;
  }

  public getSections(): string[] {
    if (!this.loaded) {
      throw new Error('Le CV n\'est pas encore chargé');
    }
    return Object.keys(this.cvContent);
  }

  public getSectionContent(section: string): any {
    if (!this.loaded) {
      throw new Error('Le CV n\'est pas encore chargé');
    }
    return this.cvContent[section];
  }
} 