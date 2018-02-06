package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.BaseAnswerService;
import com.mycompany.myapp.domain.BaseAnswer;
import com.mycompany.myapp.repository.BaseAnswerRepository;
import com.mycompany.myapp.service.dto.BaseAnswerDTO;
import com.mycompany.myapp.service.mapper.BaseAnswerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing BaseAnswer.
 */
@Service
@Transactional
public class BaseAnswerServiceImpl implements BaseAnswerService {

    private final Logger log = LoggerFactory.getLogger(BaseAnswerServiceImpl.class);

    private final BaseAnswerRepository baseAnswerRepository;

    private final BaseAnswerMapper baseAnswerMapper;

    public BaseAnswerServiceImpl(BaseAnswerRepository baseAnswerRepository, BaseAnswerMapper baseAnswerMapper) {
        this.baseAnswerRepository = baseAnswerRepository;
        this.baseAnswerMapper = baseAnswerMapper;
    }

    /**
     * Save a baseAnswer.
     *
     * @param baseAnswerDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public BaseAnswerDTO save(BaseAnswerDTO baseAnswerDTO) {
        log.debug("Request to save BaseAnswer : {}", baseAnswerDTO);
        BaseAnswer baseAnswer = baseAnswerMapper.toEntity(baseAnswerDTO);
        baseAnswer = baseAnswerRepository.save(baseAnswer);
        return baseAnswerMapper.toDto(baseAnswer);
    }

    /**
     * Get all the baseAnswers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<BaseAnswerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all BaseAnswers");
        return baseAnswerRepository.findAll(pageable)
            .map(baseAnswerMapper::toDto);
    }

    /**
     * Get one baseAnswer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public BaseAnswerDTO findOne(Long id) {
        log.debug("Request to get BaseAnswer : {}", id);
        BaseAnswer baseAnswer = baseAnswerRepository.findOne(id);
        return baseAnswerMapper.toDto(baseAnswer);
    }

    /**
     * Delete the baseAnswer by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BaseAnswer : {}", id);
        baseAnswerRepository.delete(id);
    }
}
