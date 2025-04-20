import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, HelpCircle, Settings, History, Trash2, Download, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ChatService } from '../services/chatService';
import { ChatHistoryService } from '../services/chatHistoryService';
import { Message, Conversation } from '../types/chat';
import { CVService } from '../services/cvService';

interface ChatBotProps {
  cvRef: React.RefObject<HTMLDivElement>;
}

const ChatBot: React.FC<ChatBotProps> = ({ cvRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isCVLoaded, setIsCVLoaded] = useState(false);
  const [isCVLoading, setIsCVLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatService = useRef<ChatService | null>(null);
  const chatHistoryService = useRef<ChatHistoryService>(ChatHistoryService.getInstance());
  const cvService = useRef<CVService>(CVService.getInstance());
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Suggestions de questions professionnelles
  const questionSuggestions = [
    "Quelles sont vos compétences techniques ?",
    "Pouvez-vous me parler de votre expérience professionnelle ?",
    "Quelle est votre formation ?",
    "Avez-vous des projets à me montrer ?",
    "Comment puis-je vous contacter ?",
    "Quels sont vos objectifs professionnels ?",
    "Quelles sont vos disponibilités ?",
    "Êtes-vous à la recherche d'un stage ?",
    "Quels sont vos intérêts en IA ?",
    "Quelle est votre expérience en apprentissage autonome ?"
  ];

  useEffect(() => {
    const loadCV = async () => {
      if (cvService.current.isCVLoaded()) {
        setIsCVLoaded(true);
        return;
      }

      setIsCVLoading(true);
      try {
        await cvService.current.loadCV();
        setIsCVLoaded(true);
        const apiKey = localStorage.getItem('openai_api_key');
        if (apiKey) {
          chatService.current = new ChatService(cvRef, apiKey);
        } else {
          chatService.current = new ChatService(cvRef);
        }
        setMessages([
          {
            id: Date.now(),
            content: 'Bonjour ! Je suis votre assistant CV. Comment puis-je vous aider ?',
            type: 'bot',
            timestamp: new Date().toISOString()
          }
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement du CV:', error);
        setMessages([
          {
            id: Date.now(),
            content: 'Désolé, je ne peux pas accéder au CV pour le moment. Veuillez réessayer plus tard.',
            type: 'bot',
            timestamp: new Date().toISOString()
          }
        ]);
      } finally {
        setIsCVLoading(false);
      }
    };

    loadCV();
    loadConversations();
  }, [cvRef]);

  const loadConversations = () => {
    const history = chatHistoryService.current.getHistory();
    setConversations(history.map(conv => ({
      id: Number(conv.id),
      messages: conv.messages,
      lastUpdated: conv.date || new Date().toISOString()
    })));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toISOString();
    const userMessage: Message = {
      id: Date.now(),
      content: input,
      type: 'user',
      timestamp
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      if (!chatService.current) {
        throw new Error('Chat service not initialized');
      }

      const response = await chatService.current.processQuery(input);
      
      if (response.error) {
        throw new Error(response.error);
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        content: response.response,
        type: 'bot',
        timestamp: new Date().toISOString()
      };
      
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);

      // Sauvegarder la conversation
      chatHistoryService.current.saveConversation(updatedMessages);
      loadConversations();

      // Afficher un toast de succès si la réponse a une confiance élevée
      if (response.confidence && response.confidence > 0.8) {
        toast.success('Réponse générée avec succès');
      }
    } catch (error) {
      console.error('Error processing query:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        content: "Désolé, une erreur s'est produite. " + 
                (error instanceof Error ? error.message : "Veuillez réessayer ou configurer une clé API OpenAI pour de meilleures réponses."),
        type: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages([...newMessages, errorMessage]);
      toast.error('Erreur lors du traitement de votre demande');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      try {
        localStorage.setItem('openai_api_key', apiKey.trim());
        chatService.current = new ChatService(cvRef, apiKey.trim());
        setShowApiKeyInput(false);
        
        const successMessage: Message = {
          id: Date.now(),
          content: "✅ Clé API configurée avec succès ! Je vais maintenant utiliser ChatGPT pour répondre à vos questions de manière plus pertinente.",
          type: 'bot',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, successMessage]);
        toast.success('Clé API configurée avec succès');
      } catch (error) {
        console.error('Error setting API key:', error);
        toast.error('Erreur lors de la configuration de la clé API');
      }
    }
  };

  const handleLoadConversation = (conversation: Conversation) => {
    const messages: Message[] = conversation.messages.map(msg => ({
      id: typeof msg.id === 'string' ? Number(msg.id) : msg.id,
      content: msg.content,
      type: msg.type as 'user' | 'bot',
      timestamp: msg.timestamp
    }));
    setMessages(messages);
    setShowHistory(false);
  };

  const handleDeleteConversation = (id: number) => {
    chatHistoryService.current.deleteConversation(String(id));
    loadConversations();
  };

  // Fonction pour formater le texte avec des sauts de ligne
  const formatMessage = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fonction pour télécharger le CV
  const handleDownloadCV = () => {
    // Créer un lien temporaire pour télécharger le CV
    const link = document.createElement('a');
    link.href = '/CV-bjane-Asmaa.pdf';  // Assurez-vous que ce fichier existe dans votre dossier public
    link.download = 'CV-bjane-Asmaa.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Fonction pour envoyer un email de contact
  const handleEmailContact = () => {
    window.location.href = 'mailto:bjane.asmaa1@gmail.com?subject=Proposition de stage';
  };

  // Fonction pour appeler
  const handlePhoneContact = () => {
    window.location.href = 'tel:0652846950';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
        >
          <Bot className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 border-b flex justify-between items-center bg-primary text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-medium">Assistant Portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
                title="Historique des conversations"
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
                title="Configurer l'API ChatGPT"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showApiKeyInput && (
            <div className="p-4 border-b bg-gray-50">
              <form onSubmit={handleApiKeySubmit} className="space-y-2">
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Configuration de l'API OpenAI</p>
                  <p className="mb-2">Pour des réponses plus intelligentes et personnalisées, entrez votre clé API OpenAI :</p>
                  <ol className="list-decimal pl-5 mb-2 text-xs">
                    <li>Créez un compte sur <a href="https://platform.openai.com/signup" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OpenAI</a></li>
                    <li>Générez une clé API dans la section "API keys"</li>
                    <li>Collez votre clé ci-dessous</li>
                  </ol>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    Valider
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  Votre clé API est stockée localement et n'est jamais envoyée à nos serveurs.
                </div>
              </form>
            </div>
          )}

          {showHistory ? (
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Historique des conversations</h3>
              {conversations.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune conversation enregistrée</p>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id} 
                      className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => handleLoadConversation(conversation)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {formatDate(conversation.lastUpdated)}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation.id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {conversation.messages.find(m => m.type === 'user')?.content || 'Conversation'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {isCVLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2">Chargement du CV...</span>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.type === 'bot' ? (
                        <div className="whitespace-pre-line">
                          {formatMessage(message.content)}
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              
              {showSuggestions && messages.length > 1 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Suggestions de questions :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {questionSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}

          {!showHistory && (
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading || !isCVLoaded}
                />
                <button
                  onClick={handleSend}
                  className={`bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 ${
                    isLoading || !isCVLoaded ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading || !isCVLoaded}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Actions rapides */}
              <div className="mt-3 flex justify-between">
                <button
                  onClick={handleDownloadCV}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
                  title="Télécharger le CV"
                >
                  <Download className="w-4 h-4" />
                  <span>CV</span>
                </button>
                <button
                  onClick={handleEmailContact}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
                  title="Envoyer un email"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </button>
                <button
                  onClick={handlePhoneContact}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-primary transition-colors"
                  title="Appeler"
                >
                  <Phone className="w-4 h-4" />
                  <span>Téléphone</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot; 