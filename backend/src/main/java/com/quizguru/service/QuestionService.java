package com.quizguru.service;

import com.quizguru.dto.request.QuestionRequest;
import com.quizguru.dto.response.QuestionResponse;

import java.util.List;

public interface QuestionService {

    List<QuestionResponse> getQuestionsByCategoryAndLevel(String category, String level);

    QuestionResponse addQuestion(QuestionRequest request);
}
