package com.quizguru.repository;

import com.quizguru.model.QuizReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface QuizReportRepository extends MongoRepository<QuizReport, String> {

    Optional<QuizReport> findTopByUserEmailOrderBySubmittedAtDesc(String userEmail);
    List<QuizReport> findByUserEmailOrderBySubmittedAtDesc(String userEmail);
}
