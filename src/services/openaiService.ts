interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export class OpenAIService {
  private apiKey: string;
  private apiUrl: string = 'https://api.openai.com/v1/chat/completions';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public async generateResponse(prompt: string, context: string): Promise<string> {
    try {
      const response = await fetch(this.apiUrl, {
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
              content: `Tu es un assistant virtuel pour un portfolio de développeur. 
              Voici le contenu du portfolio : "${context}"
              
              Instructions pour répondre aux questions :
              1. Réponds toujours en français
              2. Structure tes réponses avec des emojis et du formatage Markdown
              3. Utilise des titres en gras pour chaque section
              4. Ajoute des détails pertinents basés sur le contenu du CV
              5. Si tu ne trouves pas l'information dans le contenu, dis-le simplement et suggère de consulter les sections appropriées du portfolio
              6. Pour les questions sur les compétences, liste-les de manière organisée par catégorie
              7. Pour les questions sur les projets, décris-les brièvement avec les technologies utilisées
              8. Termine toujours par une invitation à poser d'autres questions ou à consulter le CV pour plus de détails
              
              Format de réponse recommandé :
              # Titre principal
              
              ## Section 1
              Contenu détaillé...
              
              ## Section 2
              Contenu détaillé...
              
              N'hésitez pas à me poser d'autres questions sur mon parcours professionnel.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API OpenAI:', error);
      return "Désolé, je ne peux pas accéder à l'API en ce moment. Veuillez réessayer plus tard.";
    }
  }
} 