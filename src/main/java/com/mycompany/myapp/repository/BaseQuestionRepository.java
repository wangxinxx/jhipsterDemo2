package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.BaseQuestion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the BaseQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BaseQuestionRepository extends JpaRepository<BaseQuestion, Long> {

}
