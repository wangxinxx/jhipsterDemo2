package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.BaseAnswerService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.BaseAnswerDTO;
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
 * REST controller for managing BaseAnswer.
 */
@RestController
@RequestMapping("/api")
public class BaseAnswerResource {

    private final Logger log = LoggerFactory.getLogger(BaseAnswerResource.class);

    private static final String ENTITY_NAME = "baseAnswer";

    private final BaseAnswerService baseAnswerService;

    public BaseAnswerResource(BaseAnswerService baseAnswerService) {
        this.baseAnswerService = baseAnswerService;
    }

    /**
     * POST  /base-answers : Create a new baseAnswer.
     *
     * @param baseAnswerDTO the baseAnswerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new baseAnswerDTO, or with status 400 (Bad Request) if the baseAnswer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/base-answers")
    @Timed
    public ResponseEntity<BaseAnswerDTO> createBaseAnswer(@RequestBody BaseAnswerDTO baseAnswerDTO) throws URISyntaxException {
        log.debug("REST request to save BaseAnswer : {}", baseAnswerDTO);
        if (baseAnswerDTO.getId() != null) {
            throw new BadRequestAlertException("A new baseAnswer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BaseAnswerDTO result = baseAnswerService.save(baseAnswerDTO);
        return ResponseEntity.created(new URI("/api/base-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /base-answers : Updates an existing baseAnswer.
     *
     * @param baseAnswerDTO the baseAnswerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated baseAnswerDTO,
     * or with status 400 (Bad Request) if the baseAnswerDTO is not valid,
     * or with status 500 (Internal Server Error) if the baseAnswerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/base-answers")
    @Timed
    public ResponseEntity<BaseAnswerDTO> updateBaseAnswer(@RequestBody BaseAnswerDTO baseAnswerDTO) throws URISyntaxException {
        log.debug("REST request to update BaseAnswer : {}", baseAnswerDTO);
        if (baseAnswerDTO.getId() == null) {
            return createBaseAnswer(baseAnswerDTO);
        }
        BaseAnswerDTO result = baseAnswerService.save(baseAnswerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, baseAnswerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /base-answers : get all the baseAnswers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of baseAnswers in body
     */
    @GetMapping("/base-answers")
    @Timed
    public ResponseEntity<List<BaseAnswerDTO>> getAllBaseAnswers(Pageable pageable) {
        log.debug("REST request to get a page of BaseAnswers");
        Page<BaseAnswerDTO> page = baseAnswerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/base-answers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /base-answers/:id : get the "id" baseAnswer.
     *
     * @param id the id of the baseAnswerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the baseAnswerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/base-answers/{id}")
    @Timed
    public ResponseEntity<BaseAnswerDTO> getBaseAnswer(@PathVariable Long id) {
        log.debug("REST request to get BaseAnswer : {}", id);
        BaseAnswerDTO baseAnswerDTO = baseAnswerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(baseAnswerDTO));
    }

    /**
     * DELETE  /base-answers/:id : delete the "id" baseAnswer.
     *
     * @param id the id of the baseAnswerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/base-answers/{id}")
    @Timed
    public ResponseEntity<Void> deleteBaseAnswer(@PathVariable Long id) {
        log.debug("REST request to delete BaseAnswer : {}", id);
        baseAnswerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
