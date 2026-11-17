package com.quizguru.service;

import com.quizguru.dto.response.UserProfileResponse;

public interface UserService {

    UserProfileResponse getUserProfile(String email);
}