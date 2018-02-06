package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.BaseQuestionService;
import com.mycompany.myapp.domain.BaseQuestion;
import com.mycompany.myapp.repository.BaseQuestionRepository;
import com.mycompany.myapp.service.dto.BaseQuestionDTO;
import com.mycompany.myapp.service.mapper.BaseQuestionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BaseQuestion.
 */
@Service
@Transactional
public class BaseQuestionServiceImpl implements BaseQuestionService {

    private final Logger log = LoggerFactory.getLogger(BaseQuestionServiceImpl.class);

    private final BaseQuestionRepository baseQuestionRepository;

    private final BaseQuestionMapper baseQuestionMapper;

    public BaseQuestionServiceImpl(BaseQuestionRepository baseQuestionRepository, BaseQuestionMapper baseQuestionMapper) {
        this.baseQuestionRepository = baseQuestionRepository;
        this.baseQuestionMapper = baseQuestionMapper;
    }

    /**
     * Save a baseQuestion.
     *
     * @param baseQuestionDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BaseQuestionDTO save(BaseQuestionDTO baseQuestionDTO) {
        log.debug("Request to save BaseQuestion : {}", baseQuestionDTO);
        BaseQuestion baseQuestion = baseQuestionMapper.toEntity(baseQuestionDTO);
        baseQuestion = baseQuestionRepository.save(baseQuestion);
        return baseQuestionMapper.toDto(baseQuestion);
    }

    /**
     * Get all the baseQuestions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BaseQuestionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BaseQuestions");
        return baseQuestionRepository.findAll(pageable)
            .map(baseQuestionMapper::toDto);
    }

    /**
     * Get one baseQuestion by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BaseQuestionDTO findOne(Long id) {
        log.debug("Request to get BaseQuestion : {}", id);
        BaseQuestion baseQuestion = baseQuestionRepository.findOne(id);
        return baseQuestionMapper.toDto(baseQuestion);
    }

    /**
     * Delete the baseQuestion by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BaseQuestion : {}", id);
        baseQuestionRepository.delete(id);
    }
}
