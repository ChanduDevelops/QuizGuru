package com.quizguru.repository;

import com.quizguru.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

    List<Question> findByCategoryAndLevel(String category, String level);

    List<Question> findByLevel(String level);

    boolean existsByQsn(String qsn);
}
