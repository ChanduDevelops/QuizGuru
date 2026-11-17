package com.quizguru.service.impl;

import com.quizguru.dto.response.ReportResponse;
import com.quizguru.dto.response.UserProfileResponse;
import com.quizguru.exception.ResourceNotFoundException;
import com.quizguru.model.QuizReport;
import com.quizguru.model.User;
import com.quizguru.repository.QuizReportRepository;
import com.quizguru.repository.UserRepository;
import com.quizguru.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final QuizReportRepository quizReportRepository;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Override
    public UserProfileResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String role = adminEmail.equalsIgnoreCase(user.getEmail())
                ? "ROLE_ADMIN"
                : (user.getRole() != null ? user.getRole() : "ROLE_USER");

        List<QuizReport> reports = quizReportRepository.findByUserEmailOrderBySubmittedAtDesc(email);

        List<ReportResponse> recentReports = reports.stream()
                .limit(10)
                .map(r -> ReportResponse.builder()
                        .id(r.getId())
                        .category(r.getCategory())
                        .level(r.getLevel())
                        .correctAnswerCount(r.getCorrectAnswerCount())
                        .wrongAnswerCount(r.getWrongAnswerCount())
                        .unattemptedCount(r.getUnattemptedCount())
                        .submittedAt(r.getSubmittedAt())
                        .build())
                .toList();

        return UserProfileResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .role(role)
                .totalQuizzesTaken(reports.size())
                .recentReports(recentReports)
                .build();
    }
}