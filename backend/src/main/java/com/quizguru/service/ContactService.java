package com.quizguru.service;

import com.quizguru.dto.request.ContactRequest;

public interface ContactService {

    void submitContactMessage(ContactRequest request);
}
