package com.quizguru.controller;

import com.quizguru.dto.request.ReportRequest;
import com.quizguru.dto.response.ApiResponse;
import com.quizguru.dto.response.ReportResponse;
import com.quizguru.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<ApiResponse<ReportResponse>> submitReport(
            Authentication authentication,
            @Valid @RequestBody ReportRequest request
    ) {
        ReportResponse report = reportService.saveReport(authentication.getName(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Report saved successfully", report));
    }

    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<ReportResponse>> getLatestReport(Authentication authentication) {
        ReportResponse report = reportService.getLatestReport(authentication.getName());
        return ResponseEntity.ok(ApiResponse.ok("Latest report retrieved", report));
    }
}
