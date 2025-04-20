import { Message } from '../types/chat';

export class ChatHistoryService {
  private static instance: ChatHistoryService;
  private readonly STORAGE_KEY = 'portfolio_chat_history';
  private readonly MAX_HISTORY_LENGTH = 10; // Nombre maximum de conversations à conserver

  private constructor() {}

  public static getInstance(): ChatHistoryService {
    if (!ChatHistoryService.instance) {
      ChatHistoryService.instance = new ChatHistoryService();
    }
    return ChatHistoryService.instance;
  }

  /**
   * Sauvegarde une nouvelle conversation dans l'historique
   */
  public saveConversation(messages: Message[]): void {
    if (messages.length <= 1) return; // Ne pas sauvegarder les conversations vides ou avec juste le message de bienvenue

    const history = this.getHistory();
    const newConversation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      messages: [...messages]
    };

    // Ajouter la nouvelle conversation au début de l'historique
    history.unshift(newConversation);

    // Limiter la taille de l'historique
    if (history.length > this.MAX_HISTORY_LENGTH) {
      history.pop();
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
  }

  /**
   * Récupère l'historique complet des conversations
   */
  public getHistory(): Array<{id: string; date: string; messages: Message[]}> {
    const historyJson = localStorage.getItem(this.STORAGE_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  }

  /**
   * Récupère une conversation spécifique par son ID
   */
  public getConversationById(id: string): {id: string; date: string; messages: Message[]} | null {
    const history = this.getHistory();
    return history.find(conv => conv.id === id) || null;
  }

  /**
   * Supprime une conversation spécifique
   */
  public deleteConversation(id: string): void {
    const history = this.getHistory();
    const filteredHistory = history.filter(conv => conv.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredHistory));
  }

  /**
   * Efface tout l'historique des conversations
   */
  public clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
} 