package com.quizguru.controller;

import com.quizguru.dto.request.QuizFetchRequest;
import com.quizguru.dto.response.ApiResponse;
import com.quizguru.dto.response.QuestionResponse;
import com.quizguru.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> getQuestions(
            @RequestParam("category") String category,
            @RequestParam("level") String level
    ) {
        List<QuestionResponse> questions = questionService.getQuestionsByCategoryAndLevel(category, level);
        return ResponseEntity.ok(ApiResponse.ok("Questions retrieved successfully", questions));
    }

    @PostMapping("/fetch")
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> fetchQuestions(
            @Valid @RequestBody QuizFetchRequest request
    ) {
        List<QuestionResponse> questions = questionService.getQuestionsByCategoryAndLevel(
                request.getTestCategory(),
                request.getTestLevel()
        );
        return ResponseEntity.ok(ApiResponse.ok("Questions retrieved successfully", questions));
    }
}
