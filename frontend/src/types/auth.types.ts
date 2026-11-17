import { ReportData } from './quiz.types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  token: string;
  username: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  redirect: string;
}

export interface UserProfile {
  username: string;
  email: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
  totalQuizzesTaken: number;
  recentReports: ReportData[];
}