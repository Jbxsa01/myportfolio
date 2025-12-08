import { CVService } from './cvService';
import { ChatResponse } from '../types/chat';

export class ChatService {
  private cvService: CVService;
  private apiKey: string | null = null;

  constructor(cvRef: React.RefObject<HTMLElement>, apiKey?: string) {
    this.cvService = CVService.getInstance();
    
    // Priorité à la clé API fournie en paramètre
    if (apiKey) {
      this.apiKey = apiKey;
    } 
    // Sinon, essayer de récupérer depuis localStorage
    else {
      const storedApiKey = localStorage.getItem('openai_api_key');
      if (storedApiKey) {
        this.apiKey = storedApiKey;
      }
      // En dernier recours, essayer de récupérer depuis les variables d'environnement (Vite)
      else if (import.meta.env.VITE_OPENAI_API_KEY) {
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        // Stocker dans localStorage pour les utilisations futures
        localStorage.setItem('openai_api_key', this.apiKey);
      }
    }
  }

  /**
   * Traite une requête utilisateur et retourne une réponse
   */
  public async processQuery(query: string): Promise<ChatResponse> {
    try {
      // Vérifier si le CV est chargé
      if (!this.cvService.isCVLoaded()) {
        await this.cvService.loadCV();
      }

      // Si l'API key est disponible, utiliser OpenAI
      if (this.apiKey) {
        try {
          return await this.useOpenAI(query);
        } catch (openaiError) {
          console.error('OpenAI API error:', openaiError);
          // Fallback to local content if OpenAI fails
          return this.findRelevantContent(query);
        }
      }

      // Sinon, utiliser la méthode de recherche de contenu pertinent
      return this.findRelevantContent(query);
    } catch (error) {
      console.error('Error processing query:', error);
      return {
        response: "Je suis désolé, mais je rencontre des difficultés pour accéder à mes informations. Pouvez-vous reformuler votre question ?",
        error: "Erreur de traitement",
        confidence: 0
      };
    }
  }

  /**
   * Utilise l'API OpenAI pour générer une réponse
   */
  private async useOpenAI(query: string): Promise<ChatResponse> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is not available');
    }

    const cvContent = this.cvService.getCVContent();
    const cvText = JSON.stringify(cvContent, null, 2);

    const prompt = `
Tu es un assistant qui répond aux questions sur le CV d'Asmaa. 
Voici le contenu du CV:
${cvText}

Question: ${query}

Instructions:
1. Réponds toujours en français
2. Structure ta réponse avec des emojis et du formatage Markdown
3. Utilise des titres en gras pour chaque section
4. Ajoute des détails pertinents basés sur le contenu du CV
5. Si tu ne trouves pas l'information dans le contenu, dis-le simplement
6. Pour les questions sur les compétences, liste-les de manière organisée par catégorie
7. Pour les questions sur les projets, décris-les brièvement avec les technologies utilisées
8. Termine toujours par une invitation à poser d'autres questions

Réponds de manière professionnelle et concise.`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: 'Tu es un assistant professionnel qui aide à répondre aux questions sur le CV d\'Asmaa. Tu dois toujours répondre en français de manière claire et structurée.' 
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API error response:', errorData);
        throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      return {
        response: aiResponse,
        error: null,
        confidence: 0.9
      };
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }

  /**
   * Trouve le contenu pertinent dans le CV en fonction de la requête
   */
  private findRelevantContent(query: string): ChatResponse {
    try {
      const cvContent = this.cvService.getCVContent();
      const sections = cvContent.sections;
      const queryLower = query.toLowerCase();

      if (queryLower.includes("stage") || queryLower.includes("internship") || queryLower.includes("recherche")) {
        return this.formatInternshipResponse(sections.internship);
      }

      if (queryLower.includes("expérience") || queryLower.includes("experience")) {
        return this.formatExperienceResponse(sections.experience);
      }

      if (queryLower.includes('compétence') || queryLower.includes('skill') || queryLower.includes('technologie') || queryLower.includes('langage')) {
        return this.formatSkillsResponse(sections.skills);
      } else if (queryLower.includes('formation') || queryLower.includes('éducation') || queryLower.includes('diplôme') || queryLower.includes('école')) {
        return this.formatEducationResponse(sections.education);
      } else if (queryLower.includes('contact') || queryLower.includes('email') || queryLower.includes('téléphone') || queryLower.includes('adresse')) {
        return this.formatContactResponse(sections.contact);
      } else if (queryLower.includes('projet') || queryLower.includes('réalisations') || queryLower.includes('portfolio')) {
        return this.formatProjectsResponse(sections.projects);
      } else {
        // Réponse générique si aucune section spécifique n'est demandée
        return {
          response: "Je peux vous fournir des informations sur mon expérience, mes compétences, ma formation, mes projets, ma recherche de stage ou mes coordonnées. Que souhaitez-vous savoir ?",
          error: null,
          confidence: 0.5
        };
      }
    } catch (error) {
      console.error('Error finding relevant content:', error);
      return {
        response: "Je suis désolé, mais je rencontre des difficultés pour accéder à mes informations. Pouvez-vous reformuler votre question ?",
        error: "Erreur de recherche",
        confidence: 0
      };
    }
  }

  /**
   * Formate la réponse pour la section expérience
   */
  private formatExperienceResponse(experience: string): ChatResponse {
    if (!experience) {
      return {
        response: "Je n'ai pas encore ajouté d'informations sur mon expérience professionnelle.",
        error: null,
        confidence: 0.8
      };
    }

    return {
      response: `📋 **Expérience professionnelle**\n\n${experience}\n\nSouhaitez-vous des détails sur une expérience particulière ?`,
      error: null,
      confidence: 0.9
    };
  }

  /**
   * Formate la réponse pour la section compétences
   */
  private formatSkillsResponse(skills: string): ChatResponse {
    if (!skills) {
      return {
        response: "Je n'ai pas encore ajouté d'informations sur mes compétences.",
        error: null,
        confidence: 0.8
      };
    }

    return {
      response: `🛠️ **Compétences techniques**\n\n${skills}\n\nJe suis particulièrement intéressé par l'intelligence artificielle et l'apprentissage automatique. Je suis autonome dans mon apprentissage et je m'efforce constamment d'améliorer mes compétences dans ces domaines.\n\nSouhaitez-vous des détails sur une compétence particulière ?`,
      error: null,
      confidence: 0.9
    };
  }

  /**
   * Formate la réponse pour la section formation
   */
  private formatEducationResponse(education: string): ChatResponse {
    if (!education) {
      return {
        response: "Je n'ai pas encore ajouté d'informations sur ma formation.",
        error: null,
        confidence: 0.8
      };
    }

    return {
      response: `🎓 **Formation**\n\n${education}\n\nSouhaitez-vous des détails sur une formation particulière ?`,
      error: null,
      confidence: 0.9
    };
  }

  /**
   * Formate la réponse pour la section contact
   */
  private formatContactResponse(contact: string): ChatResponse {
    if (!contact) {
      return {
        response: "Je n'ai pas encore ajouté d'informations de contact.",
        error: null,
        confidence: 0.8
      };
    }

    return {
      response: `📧 **Coordonnées**\n\n${contact}\n\nN'hésitez pas à me contacter pour toute opportunité de collaboration ou de stage.`,
      error: null,
      confidence: 0.9
    };
  }

  /**
   * Formate la réponse pour la section projets
   */
  private formatProjectsResponse(projects: string): ChatResponse {
    if (!projects) {
      return {
        response: "Je n'ai pas encore ajouté d'informations sur mes projets.",
        error: null,
        confidence: 0.8
      };
    }

    return {
      response: `🚀 **Projets**\n\n${projects}\n\nSouhaitez-vous des détails sur un projet particulier ?`,
      error: null,
      confidence: 0.9
    };
  }

  /**
   * Formate la réponse pour la recherche de stage
   */
  private formatInternshipResponse(internship: string): ChatResponse {
    if (!internship) {
      return {
        response: "Je n'ai pas encore ajouté d'informations sur ma recherche de stage.",
        error: null,
        confidence: 0.8
      };
    }

    return {
      response: `🎯 **Recherche de stage**\n\n${internship}\n\nSouhaitez-vous des détails sur ma recherche de stage ?`,
      error: null,
      confidence: 0.9
    };
  }
} 