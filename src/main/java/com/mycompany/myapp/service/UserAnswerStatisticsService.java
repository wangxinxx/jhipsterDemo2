package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.UserAnswerStatisticsDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing UserAnswerStatistics.
 */
public interface UserAnswerStatisticsService {

    /**
     * Save a userAnswerStatistics.
     *
     * @param userAnswerStatisticsDTO the entity to save
     * @return the persisted entity
     */
    UserAnswerStatisticsDTO save(UserAnswerStatisticsDTO userAnswerStatisticsDTO);

    /**
     * Get all the userAnswerStatistics.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<UserAnswerStatisticsDTO> findAll(Pageable pageable);

    /**
     * Get the "id" userAnswerStatistics.
     *
     * @param id the id of the entity
     * @return the entity
     */
    UserAnswerStatisticsDTO findOne(Long id);

    /**
     * Delete the "id" userAnswerStatistics.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
