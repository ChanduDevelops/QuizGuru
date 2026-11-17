package com.quizguru.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class QuizFetchRequest {

    @NotBlank(message = "Test category is required")
    private String testCategory;

    @NotBlank(message = "Test level is required")
    private String testLevel;
}
