package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.UserAnswerStatisticsService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.UserAnswerStatisticsDTO;
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
 * REST controller for managing UserAnswerStatistics.
 */
@RestController
@RequestMapping("/api")
public class UserAnswerStatisticsResource {

    private final Logger log = LoggerFactory.getLogger(UserAnswerStatisticsResource.class);

    private static final String ENTITY_NAME = "userAnswerStatistics";

    private final UserAnswerStatisticsService userAnswerStatisticsService;

    public UserAnswerStatisticsResource(UserAnswerStatisticsService userAnswerStatisticsService) {
        this.userAnswerStatisticsService = userAnswerStatisticsService;
    }

    /**
     * POST  /user-answer-statistics : Create a new userAnswerStatistics.
     *
     * @param userAnswerStatisticsDTO the userAnswerStatisticsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userAnswerStatisticsDTO, or with status 400 (Bad Request) if the userAnswerStatistics has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-answer-statistics")
    @Timed
    public ResponseEntity<UserAnswerStatisticsDTO> createUserAnswerStatistics(@RequestBody UserAnswerStatisticsDTO userAnswerStatisticsDTO) throws URISyntaxException {
        log.debug("REST request to save UserAnswerStatistics : {}", userAnswerStatisticsDTO);
        if (userAnswerStatisticsDTO.getId() != null) {
            throw new BadRequestAlertException("A new userAnswerStatistics cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserAnswerStatisticsDTO result = userAnswerStatisticsService.save(userAnswerStatisticsDTO);
        return ResponseEntity.created(new URI("/api/user-answer-statistics/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-answer-statistics : Updates an existing userAnswerStatistics.
     *
     * @param userAnswerStatisticsDTO the userAnswerStatisticsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userAnswerStatisticsDTO,
     * or with status 400 (Bad Request) if the userAnswerStatisticsDTO is not valid,
     * or with status 500 (Internal Server Error) if the userAnswerStatisticsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-answer-statistics")
    @Timed
    public ResponseEntity<UserAnswerStatisticsDTO> updateUserAnswerStatistics(@RequestBody UserAnswerStatisticsDTO userAnswerStatisticsDTO) throws URISyntaxException {
        log.debug("REST request to update UserAnswerStatistics : {}", userAnswerStatisticsDTO);
        if (userAnswerStatisticsDTO.getId() == null) {
            return createUserAnswerStatistics(userAnswerStatisticsDTO);
        }
        UserAnswerStatisticsDTO result = userAnswerStatisticsService.save(userAnswerStatisticsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userAnswerStatisticsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-answer-statistics : get all the userAnswerStatistics.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userAnswerStatistics in body
     */
    @GetMapping("/user-answer-statistics")
    @Timed
    public ResponseEntity<List<UserAnswerStatisticsDTO>> getAllUserAnswerStatistics(Pageable pageable) {
        log.debug("REST request to get a page of UserAnswerStatistics");
        Page<UserAnswerStatisticsDTO> page = userAnswerStatisticsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-answer-statistics");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-answer-statistics/:id : get the "id" userAnswerStatistics.
     *
     * @param id the id of the userAnswerStatisticsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userAnswerStatisticsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-answer-statistics/{id}")
    @Timed
    public ResponseEntity<UserAnswerStatisticsDTO> getUserAnswerStatistics(@PathVariable Long id) {
        log.debug("REST request to get UserAnswerStatistics : {}", id);
        UserAnswerStatisticsDTO userAnswerStatisticsDTO = userAnswerStatisticsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userAnswerStatisticsDTO));
    }

    /**
     * DELETE  /user-answer-statistics/:id : delete the "id" userAnswerStatistics.
     *
     * @param id the id of the userAnswerStatisticsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-answer-statistics/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserAnswerStatistics(@PathVariable Long id) {
        log.debug("REST request to delete UserAnswerStatistics : {}", id);
        userAnswerStatisticsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
