package com.quizguru.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bits")
public class Question {

    @Id
    private String id;

    private String category;

    private String level;

    @Indexed(unique = true)
    private String qsn;

    private String a;

    private String b;

    private String c;

    private String d;

    private String ans;
}
