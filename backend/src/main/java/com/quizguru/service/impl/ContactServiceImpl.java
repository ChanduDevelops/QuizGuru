package com.quizguru.service.impl;

import com.quizguru.dto.request.ContactRequest;
import com.quizguru.model.ContactMessage;
import com.quizguru.repository.ContactMessageRepository;
import com.quizguru.service.ContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository contactMessageRepository;

    @Override
    public void submitContactMessage(ContactRequest request) {
        ContactMessage message = ContactMessage.builder()
                .name(request.getName().trim())
                .phone(request.getPhone().trim())
                .email(request.getEmail().trim())
                .subject(request.getSubject().trim())
                .message(request.getMessage().trim())
                .createdAt(Instant.now())
                .build();

        contactMessageRepository.save(message);
        log.info("Contact inquiry saved from email={}, subject={}", message.getEmail(), message.getSubject());
    }
}
