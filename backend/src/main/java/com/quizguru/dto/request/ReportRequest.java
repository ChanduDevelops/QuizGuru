package com.quizguru.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class ReportRequest {

    private String category;

    private String level;

    @Min(value = 0, message = "Correct answer count cannot be negative")
    private int correctAnswerCount;

    @Min(value = 0, message = "Wrong answer count cannot be negative")
    private int wrongAnswerCount;

    @Min(value = 0, message = "Unattempted count cannot be negative")
    private int unattemptedCount;
}
