package com.quizguru.service.impl;

import com.quizguru.dto.request.QuestionRequest;
import com.quizguru.dto.response.QuestionResponse;
import com.quizguru.exception.DuplicateResourceException;
import com.quizguru.exception.ResourceNotFoundException;
import com.quizguru.model.Question;
import com.quizguru.repository.QuestionRepository;
import com.quizguru.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepository;

    @Override
    public List<QuestionResponse> getQuestionsByCategoryAndLevel(String category, String level) {
        String normalizedCategory = category.trim().toLowerCase();
        String normalizedLevel = level.trim().toLowerCase();

        List<Question> questions = questionRepository.findByCategoryAndLevel(normalizedCategory, normalizedLevel);

        if (questions.isEmpty() && "random".equals(normalizedCategory)) {
            questions = questionRepository.findByLevel(normalizedLevel);
            Collections.shuffle(questions);
        }

        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("Questions not found! Try again later!!");
        }

        return questions.stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public QuestionResponse addQuestion(QuestionRequest request) {
        if (questionRepository.existsByQsn(request.getQsn())) {
            throw new DuplicateResourceException("Data already exists in the server");
        }

        Question question = Question.builder()
                .category(request.getCategory().trim().toLowerCase())
                .level(request.getLevel().trim().toLowerCase())
                .qsn(request.getQsn().trim())
                .a(request.getA().trim())
                .b(request.getB().trim())
                .c(request.getC().trim())
                .d(request.getD().trim())
                .ans(request.getAns().trim().toLowerCase())
                .build();

        Question saved = questionRepository.save(question);
        log.info("Question inserted by admin in category={}, level={}", saved.getCategory(), saved.getLevel());
        return toResponse(saved);
    }

    private QuestionResponse toResponse(Question q) {
        return QuestionResponse.builder()
                .id(q.getId())
                .category(q.getCategory())
                .level(q.getLevel())
                .qsn(q.getQsn())
                .a(q.getA())
                .b(q.getB())
                .c(q.getC())
                .d(q.getD())
                .ans(q.getAns())
                .build();
    }
}
