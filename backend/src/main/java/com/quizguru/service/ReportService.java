package com.quizguru.service;

import com.quizguru.dto.request.ReportRequest;
import com.quizguru.dto.response.ReportResponse;

public interface ReportService {

    ReportResponse saveReport(String userEmail, ReportRequest request);

    ReportResponse getLatestReport(String userEmail);
}
