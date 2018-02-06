package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterDemo2App;

import com.mycompany.myapp.domain.UserAnswerStatistics;
import com.mycompany.myapp.repository.UserAnswerStatisticsRepository;
import com.mycompany.myapp.service.UserAnswerStatisticsService;
import com.mycompany.myapp.service.dto.UserAnswerStatisticsDTO;
import com.mycompany.myapp.service.mapper.UserAnswerStatisticsMapper;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserAnswerStatisticsResource REST controller.
 *
 * @see UserAnswerStatisticsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterDemo2App.class)
public class UserAnswerStatisticsResourceIntTest {

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;

    private static final Long DEFAULT_RIGHT_TIMES = 1L;
    private static final Long UPDATED_RIGHT_TIMES = 2L;

    private static final Long DEFAULT_WRONG_TIMES = 1L;
    private static final Long UPDATED_WRONG_TIMES = 2L;

    private static final Long DEFAULT_CONTINUOUS_RIGHT_TIMES = 1L;
    private static final Long UPDATED_CONTINUOUS_RIGHT_TIMES = 2L;

    private static final Long DEFAULT_CONTINUOUS_WRONG_TIMES = 1L;
    private static final Long UPDATED_CONTINUOUS_WRONG_TIMES = 2L;

    @Autowired
    private UserAnswerStatisticsRepository userAnswerStatisticsRepository;

    @Autowired
    private UserAnswerStatisticsMapper userAnswerStatisticsMapper;

    @Autowired
    private UserAnswerStatisticsService userAnswerStatisticsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserAnswerStatisticsMockMvc;

    private UserAnswerStatistics userAnswerStatistics;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserAnswerStatisticsResource userAnswerStatisticsResource = new UserAnswerStatisticsResource(userAnswerStatisticsService);
        this.restUserAnswerStatisticsMockMvc = MockMvcBuilders.standaloneSetup(userAnswerStatisticsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAnswerStatistics createEntity(EntityManager em) {
        UserAnswerStatistics userAnswerStatistics = new UserAnswerStatistics()
            .userId(DEFAULT_USER_ID)
            .rightTimes(DEFAULT_RIGHT_TIMES)
            .wrongTimes(DEFAULT_WRONG_TIMES)
            .continuousRightTimes(DEFAULT_CONTINUOUS_RIGHT_TIMES)
            .continuousWrongTimes(DEFAULT_CONTINUOUS_WRONG_TIMES);
        return userAnswerStatistics;
    }

    @Before
    public void initTest() {
        userAnswerStatistics = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserAnswerStatistics() throws Exception {
        int databaseSizeBeforeCreate = userAnswerStatisticsRepository.findAll().size();

        // Create the UserAnswerStatistics
        UserAnswerStatisticsDTO userAnswerStatisticsDTO = userAnswerStatisticsMapper.toDto(userAnswerStatistics);
        restUserAnswerStatisticsMockMvc.perform(post("/api/user-answer-statistics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAnswerStatisticsDTO)))
            .andExpect(status().isCreated());

        // Validate the UserAnswerStatistics in the database
        List<UserAnswerStatistics> userAnswerStatisticsList = userAnswerStatisticsRepository.findAll();
        assertThat(userAnswerStatisticsList).hasSize(databaseSizeBeforeCreate + 1);
        UserAnswerStatistics testUserAnswerStatistics = userAnswerStatisticsList.get(userAnswerStatisticsList.size() - 1);
        assertThat(testUserAnswerStatistics.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testUserAnswerStatistics.getRightTimes()).isEqualTo(DEFAULT_RIGHT_TIMES);
        assertThat(testUserAnswerStatistics.getWrongTimes()).isEqualTo(DEFAULT_WRONG_TIMES);
        assertThat(testUserAnswerStatistics.getContinuousRightTimes()).isEqualTo(DEFAULT_CONTINUOUS_RIGHT_TIMES);
        assertThat(testUserAnswerStatistics.getContinuousWrongTimes()).isEqualTo(DEFAULT_CONTINUOUS_WRONG_TIMES);
    }

    @Test
    @Transactional
    public void createUserAnswerStatisticsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userAnswerStatisticsRepository.findAll().size();

        // Create the UserAnswerStatistics with an existing ID
        userAnswerStatistics.setId(1L);
        UserAnswerStatisticsDTO userAnswerStatisticsDTO = userAnswerStatisticsMapper.toDto(userAnswerStatistics);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserAnswerStatisticsMockMvc.perform(post("/api/user-answer-statistics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAnswerStatisticsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserAnswerStatistics in the database
        List<UserAnswerStatistics> userAnswerStatisticsList = userAnswerStatisticsRepository.findAll();
        assertThat(userAnswerStatisticsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserAnswerStatistics() throws Exception {
        // Initialize the database
        userAnswerStatisticsRepository.saveAndFlush(userAnswerStatistics);

        // Get all the userAnswerStatisticsList
        restUserAnswerStatisticsMockMvc.perform(get("/api/user-answer-statistics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAnswerStatistics.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].rightTimes").value(hasItem(DEFAULT_RIGHT_TIMES.intValue())))
            .andExpect(jsonPath("$.[*].wrongTimes").value(hasItem(DEFAULT_WRONG_TIMES.intValue())))
            .andExpect(jsonPath("$.[*].continuousRightTimes").value(hasItem(DEFAULT_CONTINUOUS_RIGHT_TIMES.intValue())))
            .andExpect(jsonPath("$.[*].continuousWrongTimes").value(hasItem(DEFAULT_CONTINUOUS_WRONG_TIMES.intValue())));
    }

    @Test
    @Transactional
    public void getUserAnswerStatistics() throws Exception {
        // Initialize the database
        userAnswerStatisticsRepository.saveAndFlush(userAnswerStatistics);

        // Get the userAnswerStatistics
        restUserAnswerStatisticsMockMvc.perform(get("/api/user-answer-statistics/{id}", userAnswerStatistics.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userAnswerStatistics.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.rightTimes").value(DEFAULT_RIGHT_TIMES.intValue()))
            .andExpect(jsonPath("$.wrongTimes").value(DEFAULT_WRONG_TIMES.intValue()))
            .andExpect(jsonPath("$.continuousRightTimes").value(DEFAULT_CONTINUOUS_RIGHT_TIMES.intValue()))
            .andExpect(jsonPath("$.continuousWrongTimes").value(DEFAULT_CONTINUOUS_WRONG_TIMES.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserAnswerStatistics() throws Exception {
        // Get the userAnswerStatistics
        restUserAnswerStatisticsMockMvc.perform(get("/api/user-answer-statistics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserAnswerStatistics() throws Exception {
        // Initialize the database
        userAnswerStatisticsRepository.saveAndFlush(userAnswerStatistics);
        int databaseSizeBeforeUpdate = userAnswerStatisticsRepository.findAll().size();

        // Update the userAnswerStatistics
        UserAnswerStatistics updatedUserAnswerStatistics = userAnswerStatisticsRepository.findOne(userAnswerStatistics.getId());
        // Disconnect from session so that the updates on updatedUserAnswerStatistics are not directly saved in db
        em.detach(updatedUserAnswerStatistics);
        updatedUserAnswerStatistics
            .userId(UPDATED_USER_ID)
            .rightTimes(UPDATED_RIGHT_TIMES)
            .wrongTimes(UPDATED_WRONG_TIMES)
            .continuousRightTimes(UPDATED_CONTINUOUS_RIGHT_TIMES)
            .continuousWrongTimes(UPDATED_CONTINUOUS_WRONG_TIMES);
        UserAnswerStatisticsDTO userAnswerStatisticsDTO = userAnswerStatisticsMapper.toDto(updatedUserAnswerStatistics);

        restUserAnswerStatisticsMockMvc.perform(put("/api/user-answer-statistics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAnswerStatisticsDTO)))
            .andExpect(status().isOk());

        // Validate the UserAnswerStatistics in the database
        List<UserAnswerStatistics> userAnswerStatisticsList = userAnswerStatisticsRepository.findAll();
        assertThat(userAnswerStatisticsList).hasSize(databaseSizeBeforeUpdate);
        UserAnswerStatistics testUserAnswerStatistics = userAnswerStatisticsList.get(userAnswerStatisticsList.size() - 1);
        assertThat(testUserAnswerStatistics.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testUserAnswerStatistics.getRightTimes()).isEqualTo(UPDATED_RIGHT_TIMES);
        assertThat(testUserAnswerStatistics.getWrongTimes()).isEqualTo(UPDATED_WRONG_TIMES);
        assertThat(testUserAnswerStatistics.getContinuousRightTimes()).isEqualTo(UPDATED_CONTINUOUS_RIGHT_TIMES);
        assertThat(testUserAnswerStatistics.getContinuousWrongTimes()).isEqualTo(UPDATED_CONTINUOUS_WRONG_TIMES);
    }

    @Test
    @Transactional
    public void updateNonExistingUserAnswerStatistics() throws Exception {
        int databaseSizeBeforeUpdate = userAnswerStatisticsRepository.findAll().size();

        // Create the UserAnswerStatistics
        UserAnswerStatisticsDTO userAnswerStatisticsDTO = userAnswerStatisticsMapper.toDto(userAnswerStatistics);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserAnswerStatisticsMockMvc.perform(put("/api/user-answer-statistics")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userAnswerStatisticsDTO)))
            .andExpect(status().isCreated());

        // Validate the UserAnswerStatistics in the database
        List<UserAnswerStatistics> userAnswerStatisticsList = userAnswerStatisticsRepository.findAll();
        assertThat(userAnswerStatisticsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserAnswerStatistics() throws Exception {
        // Initialize the database
        userAnswerStatisticsRepository.saveAndFlush(userAnswerStatistics);
        int databaseSizeBeforeDelete = userAnswerStatisticsRepository.findAll().size();

        // Get the userAnswerStatistics
        restUserAnswerStatisticsMockMvc.perform(delete("/api/user-answer-statistics/{id}", userAnswerStatistics.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserAnswerStatistics> userAnswerStatisticsList = userAnswerStatisticsRepository.findAll();
        assertThat(userAnswerStatisticsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserAnswerStatistics.class);
        UserAnswerStatistics userAnswerStatistics1 = new UserAnswerStatistics();
        userAnswerStatistics1.setId(1L);
        UserAnswerStatistics userAnswerStatistics2 = new UserAnswerStatistics();
        userAnswerStatistics2.setId(userAnswerStatistics1.getId());
        assertThat(userAnswerStatistics1).isEqualTo(userAnswerStatistics2);
        userAnswerStatistics2.setId(2L);
        assertThat(userAnswerStatistics1).isNotEqualTo(userAnswerStatistics2);
        userAnswerStatistics1.setId(null);
        assertThat(userAnswerStatistics1).isNotEqualTo(userAnswerStatistics2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserAnswerStatisticsDTO.class);
        UserAnswerStatisticsDTO userAnswerStatisticsDTO1 = new UserAnswerStatisticsDTO();
        userAnswerStatisticsDTO1.setId(1L);
        UserAnswerStatisticsDTO userAnswerStatisticsDTO2 = new UserAnswerStatisticsDTO();
        assertThat(userAnswerStatisticsDTO1).isNotEqualTo(userAnswerStatisticsDTO2);
        userAnswerStatisticsDTO2.setId(userAnswerStatisticsDTO1.getId());
        assertThat(userAnswerStatisticsDTO1).isEqualTo(userAnswerStatisticsDTO2);
        userAnswerStatisticsDTO2.setId(2L);
        assertThat(userAnswerStatisticsDTO1).isNotEqualTo(userAnswerStatisticsDTO2);
        userAnswerStatisticsDTO1.setId(null);
        assertThat(userAnswerStatisticsDTO1).isNotEqualTo(userAnswerStatisticsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userAnswerStatisticsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userAnswerStatisticsMapper.fromId(null)).isNull();
    }
}
