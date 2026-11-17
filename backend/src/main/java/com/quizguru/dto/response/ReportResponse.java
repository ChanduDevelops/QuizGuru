package com.quizguru.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {

    private String id;
    private String category;
    private String level;
    private int correctAnswerCount;
    private int wrongAnswerCount;
    private int unattemptedCount;
    private Instant submittedAt;
}
