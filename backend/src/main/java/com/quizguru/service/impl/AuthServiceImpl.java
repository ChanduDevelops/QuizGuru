package com.quizguru.service.impl;

import com.quizguru.dto.request.ForgotPasswordRequest;
import com.quizguru.dto.request.LoginRequest;
import com.quizguru.dto.request.SignupRequest;
import com.quizguru.dto.response.AuthResponse;
import com.quizguru.exception.DuplicateResourceException;
import com.quizguru.exception.InvalidCredentialsException;
import com.quizguru.exception.ResourceNotFoundException;
import com.quizguru.model.User;
import com.quizguru.repository.UserRepository;
import com.quizguru.security.JwtTokenProvider;
import com.quizguru.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Wrong password");
        }

        boolean isAdmin = adminEmail.equalsIgnoreCase(user.getEmail());
        String role = isAdmin ? "ROLE_ADMIN" : (user.getRole() != null ? user.getRole() : "ROLE_USER");
        String token = jwtTokenProvider.generateToken(user.getEmail(), role);

        log.info("User authenticated successfully: {}", user.getEmail());

        return AuthResponse.builder()
                .token(token)
                .username(user.getUsername())
                .email(user.getEmail())
                .role(role)
                .redirect(isAdmin ? "/admin" : "/main")
                .build();
    }

    @Override
    public void signup(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())
                || userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("User already exists");
        }

        boolean isAdmin = adminEmail.equalsIgnoreCase(request.getEmail());
        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(isAdmin ? "ROLE_ADMIN" : "ROLE_USER")
                .build();

        userRepository.save(user);
        log.info("New user registered: {}", request.getEmail());
    }

    @Override
    public void resetPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        log.info("Password updated for user: {}", request.getEmail());
    }
}
