import React, { useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Sparkles, BrainCircuit, CodeXml, Trophy, CheckCircle, XCircle } from 'lucide-react';

interface FunQuizProps {
  open: boolean;
  onClose: () => void;
}

interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  tag: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'jee-endpoint',
    prompt: "En Java EE, quel composant expose le plus simplement une API REST prête pour la prod ?",
    options: [
      'Un EJB Stateful sans annotations',
      'Une Servlet avec @WebServlet et du JSON manuel',
      'Une ressource JAX-RS annotée @Path + @GET/@POST',
      'Un JSP avec du JavaScript inline'
    ],
    answer: 'Une ressource JAX-RS annotée @Path + @GET/@POST',
    tag: 'Java EE'
  },
  {
    id: 'ai-vector',
    prompt: "Pour un chatbot IA, quelle stratégie réduit le plus les hallucinations ?",
    options: [
      "Augmenter la température à 1.5",
      "Désactiver le contexte",
      "Ajouter du RAG avec un vecteur store",
      "N'utiliser que des modèles GPT-3"
    ],
    answer: 'Ajouter du RAG avec un vecteur store',
    tag: 'IA'
  },
  {
    id: 'team-culture',
    prompt: "Travailler avec moi, c'est surtout…",
    options: [
      'Livrer vite avec zéro dette',
      'Communiquer clair, tester et livrer',
      'Coder seul en mode tunnel',
      'Multiplier les réunions sans décision'
    ],
    answer: 'Communiquer clair, tester et livrer',
    tag: 'Collab'
  }
];

const FunQuiz: React.FC<FunQuizProps> = ({ open, onClose }) => {
  const [current, setCurrent] = useState(0);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, { status: 'correct' | 'wrong'; key: number }>>({});

  const currentQuestion = quizQuestions[current];

  const score = useMemo(() => {
    return quizQuestions.reduce((acc, q) => acc + (choices[q.id] === q.answer ? 1 : 0), 0);
  }, [choices]);

  const progress = Math.round(((current + 1) / quizQuestions.length) * 100);

  const selectOption = (option: string) => {
    const status = option === currentQuestion.answer ? 'correct' : 'wrong';
    setChoices(prev => ({ ...prev, [currentQuestion.id]: option }));
    setFeedback(prev => ({ ...prev, [currentQuestion.id]: { status, key: Date.now() } }));
  };

  const goNext = () => {
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setChoices({});
    setCurrent(0);
    setShowResult(false);
    setFeedback({});
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Sparkles className="w-6 h-6 text-primary" />
            Quiz express : Java EE & IA
          </DialogTitle>
          <DialogDescription>
            3 questions rapides pour clôturer la visite en douceur.
          </DialogDescription>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{current + 1}/{quizQuestions.length}</Badge>
                <span className="flex items-center gap-2"><CodeXml className="w-4 h-4" />{currentQuestion.tag}</span>
              </div>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="space-y-4">
              <p className="text-lg font-semibold text-foreground">{currentQuestion.prompt}</p>
              <div className="space-y-2">
                {currentQuestion.options.map(option => {
                  const isSelected = choices[currentQuestion.id] === option;
                  const status = feedback[currentQuestion.id]?.status;
                  return (
                    <button
                      key={option}
                      onClick={() => selectOption(option)}
                      className={`w-full text-left px-4 py-3 rounded-md border transition ${
                        isSelected
                          ? status === 'correct'
                            ? 'border-green-500 bg-green-50 text-green-800 animate-pulse'
                            : 'border-red-500 bg-red-50 text-red-800 animate-pulse'
                          : 'border-border hover:border-primary/40 hover:bg-muted'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
                {feedback[currentQuestion.id] && (
                  <div
                    key={feedback[currentQuestion.id].key}
                    className={`flex items-center gap-2 text-sm font-medium ${
                      feedback[currentQuestion.id].status === 'correct'
                        ? 'text-green-700 animate-bounce'
                        : 'text-red-700 animate-pulse'
                    }`}
                  >
                    {feedback[currentQuestion.id].status === 'correct' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    {feedback[currentQuestion.id].status === 'correct' ? 'Bonne réponse !' : 'Raté, essaie encore.'}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={handleRestart}>Recommencer</Button>
              <Button onClick={goNext} disabled={!choices[currentQuestion.id]}>
                {current === quizQuestions.length - 1 ? 'Voir le score' : 'Question suivante'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-400/10 p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.15),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1),transparent_45%)] animate-pulse" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg animate-bounce">
                  <Trophy className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">Bravo ! Score : {score}/{quizQuestions.length}</p>
                  <p className="text-sm text-muted-foreground">Un petit trophée pour fêter ça 🏆</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {quizQuestions.map(q => {
                const userAnswer = choices[q.id];
                const correct = userAnswer === q.answer;
                return (
                  <div key={q.id} className="p-3 rounded-md border bg-muted/40">
                    <p className="font-medium">{q.prompt}</p>
                    <p className={`text-sm mt-1 ${correct ? 'text-green-600' : 'text-red-600'}`}>
                      Votre réponse : {userAnswer || '—'}
                    </p>
                    {!correct && (
                      <p className="text-sm text-muted-foreground">Bonne réponse : {q.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button variant="secondary" onClick={handleRestart}>Rejouer</Button>
              <Button onClick={onClose}>Fermer</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FunQuiz;
