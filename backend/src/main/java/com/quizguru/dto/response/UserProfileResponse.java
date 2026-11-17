package com.quizguru.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {

    private String username;
    private String email;
    private String role;
    private int totalQuizzesTaken;
    private List<ReportResponse> recentReports;
}