package com.quizguru.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "contact_messages")
public class ContactMessage {

    @Id
    private String id;

    private String name;

    private String phone;

    private String email;

    private String subject;

    private String message;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
