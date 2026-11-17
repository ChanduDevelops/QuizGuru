package com.quizguru.service.impl;

import com.quizguru.dto.request.ReportRequest;
import com.quizguru.dto.response.ReportResponse;
import com.quizguru.exception.ResourceNotFoundException;
import com.quizguru.model.QuizReport;
import com.quizguru.repository.QuizReportRepository;
import com.quizguru.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final QuizReportRepository quizReportRepository;

    @Override
    public ReportResponse saveReport(String userEmail, ReportRequest request) {
        QuizReport report = QuizReport.builder()
                .userEmail(userEmail)
                .category(request.getCategory())
                .level(request.getLevel())
                .correctAnswerCount(request.getCorrectAnswerCount())
                .wrongAnswerCount(request.getWrongAnswerCount())
                .unattemptedCount(request.getUnattemptedCount())
                .submittedAt(Instant.now())
                .build();

        QuizReport saved = quizReportRepository.save(report);
        log.info("Quiz report saved for user={}, correct={}, wrong={}, unattempted={}",
                userEmail, saved.getCorrectAnswerCount(), saved.getWrongAnswerCount(), saved.getUnattemptedCount());

        return toResponse(saved);
    }

    @Override
    public ReportResponse getLatestReport(String userEmail) {
        QuizReport report = quizReportRepository.findTopByUserEmailOrderBySubmittedAtDesc(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("No quiz report found"));
        return toResponse(report);
    }

    private ReportResponse toResponse(QuizReport report) {
        return ReportResponse.builder()
                .id(report.getId())
                .category(report.getCategory())
                .level(report.getLevel())
                .correctAnswerCount(report.getCorrectAnswerCount())
                .wrongAnswerCount(report.getWrongAnswerCount())
                .unattemptedCount(report.getUnattemptedCount())
                .submittedAt(report.getSubmittedAt())
                .build();
    }
}
