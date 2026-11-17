package com.quizguru.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reports")
public class QuizReport {

    @Id
    private String id;

    private String userEmail;

    private String category;

    private String level;

    private int correctAnswerCount;

    private int wrongAnswerCount;

    private int unattemptedCount;

    @Builder.Default
    private Instant submittedAt = Instant.now();
}
