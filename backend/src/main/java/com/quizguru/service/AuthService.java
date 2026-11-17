package com.quizguru.service;

import com.quizguru.dto.request.ForgotPasswordRequest;
import com.quizguru.dto.request.LoginRequest;
import com.quizguru.dto.request.SignupRequest;
import com.quizguru.dto.response.AuthResponse;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    void signup(SignupRequest request);

    void resetPassword(ForgotPasswordRequest request);
}
