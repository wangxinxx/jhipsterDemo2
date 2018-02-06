package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.BaseQuestionService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.BaseQuestionDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing BaseQuestion.
 */
@RestController
@RequestMapping("/api")
public class BaseQuestionResource {

    private final Logger log = LoggerFactory.getLogger(BaseQuestionResource.class);

    private static final String ENTITY_NAME = "baseQuestion";

    private final BaseQuestionService baseQuestionService;

    public BaseQuestionResource(BaseQuestionService baseQuestionService) {
        this.baseQuestionService = baseQuestionService;
    }

    /**
     * POST  /base-questions : Create a new baseQuestion.
     *
     * @param baseQuestionDTO the baseQuestionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new baseQuestionDTO, or with status 400 (Bad Request) if the baseQuestion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/base-questions")
    @Timed
    public ResponseEntity<BaseQuestionDTO> createBaseQuestion(@RequestBody BaseQuestionDTO baseQuestionDTO) throws URISyntaxException {
        log.debug("REST request to save BaseQuestion : {}", baseQuestionDTO);
        if (baseQuestionDTO.getId() != null) {
            throw new BadRequestAlertException("A new baseQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BaseQuestionDTO result = baseQuestionService.save(baseQuestionDTO);
        return ResponseEntity.created(new URI("/api/base-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /base-questions : Updates an existing baseQuestion.
     *
     * @param baseQuestionDTO the baseQuestionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated baseQuestionDTO,
     * or with status 400 (Bad Request) if the baseQuestionDTO is not valid,
     * or with status 500 (Internal Server Error) if the baseQuestionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/base-questions")
    @Timed
    public ResponseEntity<BaseQuestionDTO> updateBaseQuestion(@RequestBody BaseQuestionDTO baseQuestionDTO) throws URISyntaxException {
        log.debug("REST request to update BaseQuestion : {}", baseQuestionDTO);
        if (baseQuestionDTO.getId() == null) {
            return createBaseQuestion(baseQuestionDTO);
        }
        BaseQuestionDTO result = baseQuestionService.save(baseQuestionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, baseQuestionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /base-questions : get all the baseQuestions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of baseQuestions in body
     */
    @GetMapping("/base-questions")
    @Timed
    public ResponseEntity<List<BaseQuestionDTO>> getAllBaseQuestions(Pageable pageable) {
        log.debug("REST request to get a page of BaseQuestions");
        Page<BaseQuestionDTO> page = baseQuestionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/base-questions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /base-questions/:id : get the "id" baseQuestion.
     *
     * @param id the id of the baseQuestionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the baseQuestionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/base-questions/{id}")
    @Timed
    public ResponseEntity<BaseQuestionDTO> getBaseQuestion(@PathVariable Long id) {
        log.debug("REST request to get BaseQuestion : {}", id);
        BaseQuestionDTO baseQuestionDTO = baseQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(baseQuestionDTO));
    }

    /**
     * DELETE  /base-questions/:id : delete the "id" baseQuestion.
     *
     * @param id the id of the baseQuestionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/base-questions/{id}")
    @Timed
    public ResponseEntity<Void> deleteBaseQuestion(@PathVariable Long id) {
        log.debug("REST request to delete BaseQuestion : {}", id);
        baseQuestionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
