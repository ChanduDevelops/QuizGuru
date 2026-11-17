import { QuizLevel } from '../types/quiz.types';

export interface CategoryMeta {
  label: string;
  sidebarLabel: string;
  slug: string;
  iconClass: string;
}

export const QUIZ_CATEGORIES: CategoryMeta[] = [
  {
    label: 'Arithmetic',
    sidebarLabel: 'Arithmetic',
    slug: 'arithmetic',
    iconClass: 'fa fa-calculator',
  },
  {
    label: 'Quantitative',
    sidebarLabel: 'Quantitative',
    slug: 'quantitative',
    iconClass: 'fa fa-bar-chart',
  },
  {
    label: 'Reasoning',
    sidebarLabel: 'Reasoning',
    slug: 'reasoning',
    iconClass: 'fa fa-lightbulb-o',
  },
  {
    label: 'Verbal',
    sidebarLabel: 'Verbal',
    slug: 'verbal',
    iconClass: 'fa fa-language',
  },
  {
    label: 'Current Affairs',
    sidebarLabel: 'GK',
    slug: 'current_affairs',
    iconClass: 'fa fa-newspaper-o',
  },
  {
    label: 'Random Test',
    sidebarLabel: 'Random Test',
    slug: 'random',
    iconClass: 'fa fa-random',
  },
];

export const QUIZ_LEVELS: { label: string; value: QuizLevel }[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];
