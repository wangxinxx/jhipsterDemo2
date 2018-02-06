package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.UserAnswerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing UserAnswer.
 */
public interface UserAnswerService {

    /**
     * Save a userAnswer.
     *
     * @param userAnswerDTO the entity to save
     * @return the persisted entity
     */
    UserAnswerDTO save(UserAnswerDTO userAnswerDTO);

    /**
     * Get all the userAnswers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UserAnswerDTO> findAll(Pageable pageable);

    /**
     * Get the "id" userAnswer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserAnswerDTO findOne(Long id);

    /**
     * Delete the "id" userAnswer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
