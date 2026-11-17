package com.quizguru.controller;

import com.quizguru.dto.request.QuestionRequest;
import com.quizguru.dto.response.ApiResponse;
import com.quizguru.dto.response.QuestionResponse;
import com.quizguru.service.QuestionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class AdminController {

    private final QuestionService questionService;

    @PostMapping("/questions")
    public ResponseEntity<ApiResponse<QuestionResponse>> createQuestion(@Valid @RequestBody QuestionRequest request) {
        QuestionResponse created = questionService.addQuestion(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Successfully uploaded", created));
    }
}
