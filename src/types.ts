export type Page = 'home' | 'boolean' | 'probability' | 'graph' | 'final-quiz' | 'nexus';

export interface ProgressState {
  boolean: boolean;
  probability: boolean;
  graph: boolean;
  finalQuiz: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
