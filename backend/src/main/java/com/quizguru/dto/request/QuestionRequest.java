package com.quizguru.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class QuestionRequest {

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Level is required")
    private String level;

    @NotBlank(message = "Question text is required")
    private String qsn;

    @NotBlank(message = "Option A is required")
    private String a;

    @NotBlank(message = "Option B is required")
    private String b;

    @NotBlank(message = "Option C is required")
    private String c;

    @NotBlank(message = "Option D is required")
    private String d;

    @NotBlank(message = "Correct answer is required")
    @Pattern(regexp = "^[a-dA-D]$", message = "Answer must be one of a, b, c, or d")
    private String ans;
}
