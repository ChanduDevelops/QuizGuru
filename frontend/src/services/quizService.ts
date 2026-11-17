import apiClient from './apiClient';
import { ApiResponse } from '../types/common.types';
import {
  CreateQuestionPayload,
  QuestionItem,
  ReportData,
  ReportPayload,
} from '../types/quiz.types';

export const quizService = {
  async fetchQuestions(category: string, level: string): Promise<QuestionItem[]> {
    const response = await apiClient.get<ApiResponse<QuestionItem[]>>('/questions', {
      params: { category, level },
    });
    return response.data.data;
  },

  async createQuestion(payload: CreateQuestionPayload): Promise<ApiResponse<QuestionItem>> {
    const response = await apiClient.post<ApiResponse<QuestionItem>>(
      '/admin/questions',
      payload
    );
    return response.data;
  },

  async submitReport(payload: ReportPayload): Promise<ApiResponse<ReportData>> {
    const response = await apiClient.post<ApiResponse<ReportData>>('/reports', payload);
    return response.data;
  },

  async getLatestReport(): Promise<ReportData> {
    const response = await apiClient.get<ApiResponse<ReportData>>('/reports/latest');
    return response.data.data;
  },
};
