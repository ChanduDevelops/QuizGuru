export type QuizLevel = 'easy' | 'medium' | 'hard';

export type QuizOptionKey = 'a' | 'b' | 'c' | 'd';

export interface QuestionItem {
  id: string;
  category: string;
  level: string;
  qsn: string;
  a: string;
  b: string;
  c: string;
  d: string;
  ans: QuizOptionKey;
  checked?: boolean;
  userAnswer?: QuizOptionKey | null;
}

export interface CreateQuestionPayload {
  category: string;
  level: string;
  qsn: string;
  a: string;
  b: string;
  c: string;
  d: string;
  ans: string;
}

export interface ReportPayload {
  category?: string;
  level?: string;
  correctAnswerCount: number;
  wrongAnswerCount: number;
  unattemptedCount: number;
}

export interface ReportData {
  id?: string;
  category?: string;
  level?: string;
  correctAnswerCount: number;
  wrongAnswerCount: number;
  unattemptedCount: number;
  submittedAt?: string;
}
