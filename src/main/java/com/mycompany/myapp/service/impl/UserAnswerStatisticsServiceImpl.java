package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.UserAnswerStatisticsService;
import com.mycompany.myapp.domain.UserAnswerStatistics;
import com.mycompany.myapp.repository.UserAnswerStatisticsRepository;
import com.mycompany.myapp.service.dto.UserAnswerStatisticsDTO;
import com.mycompany.myapp.service.mapper.UserAnswerStatisticsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing UserAnswerStatistics.
 */
@Service
@Transactional
public class UserAnswerStatisticsServiceImpl implements UserAnswerStatisticsService {

    private final Logger log = LoggerFactory.getLogger(UserAnswerStatisticsServiceImpl.class);

    private final UserAnswerStatisticsRepository userAnswerStatisticsRepository;

    private final UserAnswerStatisticsMapper userAnswerStatisticsMapper;

    public UserAnswerStatisticsServiceImpl(UserAnswerStatisticsRepository userAnswerStatisticsRepository, UserAnswerStatisticsMapper userAnswerStatisticsMapper) {
        this.userAnswerStatisticsRepository = userAnswerStatisticsRepository;
        this.userAnswerStatisticsMapper = userAnswerStatisticsMapper;
    }

    /**
     * Save a userAnswerStatistics.
     *
     * @param userAnswerStatisticsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserAnswerStatisticsDTO save(UserAnswerStatisticsDTO userAnswerStatisticsDTO) {
        log.debug("Request to save UserAnswerStatistics : {}", userAnswerStatisticsDTO);
        UserAnswerStatistics userAnswerStatistics = userAnswerStatisticsMapper.toEntity(userAnswerStatisticsDTO);
        userAnswerStatistics = userAnswerStatisticsRepository.save(userAnswerStatistics);
        return userAnswerStatisticsMapper.toDto(userAnswerStatistics);
    }

    /**
     * Get all the userAnswerStatistics.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<UserAnswerStatisticsDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserAnswerStatistics");
        return userAnswerStatisticsRepository.findAll(pageable)
            .map(userAnswerStatisticsMapper::toDto);
    }

    /**
     * Get one userAnswerStatistics by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public UserAnswerStatisticsDTO findOne(Long id) {
        log.debug("Request to get UserAnswerStatistics : {}", id);
        UserAnswerStatistics userAnswerStatistics = userAnswerStatisticsRepository.findOne(id);
        return userAnswerStatisticsMapper.toDto(userAnswerStatistics);
    }

    /**
     * Delete the userAnswerStatistics by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserAnswerStatistics : {}", id);
        userAnswerStatisticsRepository.delete(id);
    }
}
