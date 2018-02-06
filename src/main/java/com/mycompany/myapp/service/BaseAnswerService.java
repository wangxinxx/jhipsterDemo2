package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.BaseAnswerDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing BaseAnswer.
 */
public interface BaseAnswerService {

    /**
     * Save a baseAnswer.
     *
     * @param baseAnswerDTO the entity to save
     * @return the persisted entity
     */
    BaseAnswerDTO save(BaseAnswerDTO baseAnswerDTO);

    /**
     * Get all the baseAnswers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BaseAnswerDTO> findAll(Pageable pageable);

    /**
     * Get the "id" baseAnswer.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BaseAnswerDTO findOne(Long id);

    /**
     * Delete the "id" baseAnswer.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
