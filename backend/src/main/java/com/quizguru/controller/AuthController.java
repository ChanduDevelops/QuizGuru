package com.quizguru.controller;

import com.quizguru.dto.request.ForgotPasswordRequest;
import com.quizguru.dto.request.LoginRequest;
import com.quizguru.dto.request.SignupRequest;
import com.quizguru.dto.response.ApiResponse;
import com.quizguru.dto.response.AuthResponse;
import com.quizguru.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("Login successful!", response));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(@Valid @RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Successfully registered!", null));
    }

    @PutMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.ok("Successfully updated password!", null));
    }
}
