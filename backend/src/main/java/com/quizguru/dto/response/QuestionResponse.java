package com.quizguru.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private String id;
    private String category;
    private String level;
    private String qsn;
    private String a;
    private String b;
    private String c;
    private String d;
    private String ans;
}
