package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterDemo2App;

import com.mycompany.myapp.domain.BaseQuestion;
import com.mycompany.myapp.repository.BaseQuestionRepository;
import com.mycompany.myapp.service.BaseQuestionService;
import com.mycompany.myapp.service.dto.BaseQuestionDTO;
import com.mycompany.myapp.service.mapper.BaseQuestionMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.domain.enumeration.QuestionType;
import com.mycompany.myapp.domain.enumeration.QuestionDifficult;
/**
 * Test class for the BaseQuestionResource REST controller.
 *
 * @see BaseQuestionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterDemo2App.class)
public class BaseQuestionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final QuestionType DEFAULT_TYPE = QuestionType.MULTIPLE_CHOICE;
    private static final QuestionType UPDATED_TYPE = QuestionType.MORE_MULTIPLE_CHOICE;

    private static final QuestionDifficult DEFAULT_DIFFICULT = QuestionDifficult.SO_EASY;
    private static final QuestionDifficult UPDATED_DIFFICULT = QuestionDifficult.EASY;

    private static final Long DEFAULT_COURSE_ID = 1L;
    private static final Long UPDATED_COURSE_ID = 2L;

    private static final Long DEFAULT_EXPOSE_TIMES = 1L;
    private static final Long UPDATED_EXPOSE_TIMES = 2L;

    private static final Long DEFAULT_RIGHT_TIMES = 1L;
    private static final Long UPDATED_RIGHT_TIMES = 2L;

    private static final Long DEFAULT_WRONG_TIMES = 1L;
    private static final Long UPDATED_WRONG_TIMES = 2L;

    private static final String DEFAULT_TIPS = "AAAAAAAAAA";
    private static final String UPDATED_TIPS = "BBBBBBBBBB";

    private static final String DEFAULT_TAGS = "AAAAAAAAAA";
    private static final String UPDATED_TAGS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_JUDGE_RESULT = false;
    private static final Boolean UPDATED_JUDGE_RESULT = true;

    private static final String DEFAULT_TEXT_RESULT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT_RESULT = "BBBBBBBBBB";

    @Autowired
    private BaseQuestionRepository baseQuestionRepository;

    @Autowired
    private BaseQuestionMapper baseQuestionMapper;

    @Autowired
    private BaseQuestionService baseQuestionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBaseQuestionMockMvc;

    private BaseQuestion baseQuestion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BaseQuestionResource baseQuestionResource = new BaseQuestionResource(baseQuestionService);
        this.restBaseQuestionMockMvc = MockMvcBuilders.standaloneSetup(baseQuestionResource)
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
    public static BaseQuestion createEntity(EntityManager em) {
        BaseQuestion baseQuestion = new BaseQuestion()
            .name(DEFAULT_NAME)
            .content(DEFAULT_CONTENT)
            .type(DEFAULT_TYPE)
            .difficult(DEFAULT_DIFFICULT)
            .courseId(DEFAULT_COURSE_ID)
            .exposeTimes(DEFAULT_EXPOSE_TIMES)
            .rightTimes(DEFAULT_RIGHT_TIMES)
            .wrongTimes(DEFAULT_WRONG_TIMES)
            .tips(DEFAULT_TIPS)
            .tags(DEFAULT_TAGS)
            .judgeResult(DEFAULT_JUDGE_RESULT)
            .textResult(DEFAULT_TEXT_RESULT);
        return baseQuestion;
    }

    @Before
    public void initTest() {
        baseQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createBaseQuestion() throws Exception {
        int databaseSizeBeforeCreate = baseQuestionRepository.findAll().size();

        // Create the BaseQuestion
        BaseQuestionDTO baseQuestionDTO = baseQuestionMapper.toDto(baseQuestion);
        restBaseQuestionMockMvc.perform(post("/api/base-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseQuestionDTO)))
            .andExpect(status().isCreated());

        // Validate the BaseQuestion in the database
        List<BaseQuestion> baseQuestionList = baseQuestionRepository.findAll();
        assertThat(baseQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        BaseQuestion testBaseQuestion = baseQuestionList.get(baseQuestionList.size() - 1);
        assertThat(testBaseQuestion.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBaseQuestion.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testBaseQuestion.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testBaseQuestion.getDifficult()).isEqualTo(DEFAULT_DIFFICULT);
        assertThat(testBaseQuestion.getCourseId()).isEqualTo(DEFAULT_COURSE_ID);
        assertThat(testBaseQuestion.getExposeTimes()).isEqualTo(DEFAULT_EXPOSE_TIMES);
        assertThat(testBaseQuestion.getRightTimes()).isEqualTo(DEFAULT_RIGHT_TIMES);
        assertThat(testBaseQuestion.getWrongTimes()).isEqualTo(DEFAULT_WRONG_TIMES);
        assertThat(testBaseQuestion.getTips()).isEqualTo(DEFAULT_TIPS);
        assertThat(testBaseQuestion.getTags()).isEqualTo(DEFAULT_TAGS);
        assertThat(testBaseQuestion.isJudgeResult()).isEqualTo(DEFAULT_JUDGE_RESULT);
        assertThat(testBaseQuestion.getTextResult()).isEqualTo(DEFAULT_TEXT_RESULT);
    }

    @Test
    @Transactional
    public void createBaseQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = baseQuestionRepository.findAll().size();

        // Create the BaseQuestion with an existing ID
        baseQuestion.setId(1L);
        BaseQuestionDTO baseQuestionDTO = baseQuestionMapper.toDto(baseQuestion);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBaseQuestionMockMvc.perform(post("/api/base-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseQuestionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BaseQuestion in the database
        List<BaseQuestion> baseQuestionList = baseQuestionRepository.findAll();
        assertThat(baseQuestionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBaseQuestions() throws Exception {
        // Initialize the database
        baseQuestionRepository.saveAndFlush(baseQuestion);

        // Get all the baseQuestionList
        restBaseQuestionMockMvc.perform(get("/api/base-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(baseQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].difficult").value(hasItem(DEFAULT_DIFFICULT.toString())))
            .andExpect(jsonPath("$.[*].courseId").value(hasItem(DEFAULT_COURSE_ID.intValue())))
            .andExpect(jsonPath("$.[*].exposeTimes").value(hasItem(DEFAULT_EXPOSE_TIMES.intValue())))
            .andExpect(jsonPath("$.[*].rightTimes").value(hasItem(DEFAULT_RIGHT_TIMES.intValue())))
            .andExpect(jsonPath("$.[*].wrongTimes").value(hasItem(DEFAULT_WRONG_TIMES.intValue())))
            .andExpect(jsonPath("$.[*].tips").value(hasItem(DEFAULT_TIPS.toString())))
            .andExpect(jsonPath("$.[*].tags").value(hasItem(DEFAULT_TAGS.toString())))
            .andExpect(jsonPath("$.[*].judgeResult").value(hasItem(DEFAULT_JUDGE_RESULT.booleanValue())))
            .andExpect(jsonPath("$.[*].textResult").value(hasItem(DEFAULT_TEXT_RESULT.toString())));
    }

    @Test
    @Transactional
    public void getBaseQuestion() throws Exception {
        // Initialize the database
        baseQuestionRepository.saveAndFlush(baseQuestion);

        // Get the baseQuestion
        restBaseQuestionMockMvc.perform(get("/api/base-questions/{id}", baseQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(baseQuestion.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.difficult").value(DEFAULT_DIFFICULT.toString()))
            .andExpect(jsonPath("$.courseId").value(DEFAULT_COURSE_ID.intValue()))
            .andExpect(jsonPath("$.exposeTimes").value(DEFAULT_EXPOSE_TIMES.intValue()))
            .andExpect(jsonPath("$.rightTimes").value(DEFAULT_RIGHT_TIMES.intValue()))
            .andExpect(jsonPath("$.wrongTimes").value(DEFAULT_WRONG_TIMES.intValue()))
            .andExpect(jsonPath("$.tips").value(DEFAULT_TIPS.toString()))
            .andExpect(jsonPath("$.tags").value(DEFAULT_TAGS.toString()))
            .andExpect(jsonPath("$.judgeResult").value(DEFAULT_JUDGE_RESULT.booleanValue()))
            .andExpect(jsonPath("$.textResult").value(DEFAULT_TEXT_RESULT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBaseQuestion() throws Exception {
        // Get the baseQuestion
        restBaseQuestionMockMvc.perform(get("/api/base-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBaseQuestion() throws Exception {
        // Initialize the database
        baseQuestionRepository.saveAndFlush(baseQuestion);
        int databaseSizeBeforeUpdate = baseQuestionRepository.findAll().size();

        // Update the baseQuestion
        BaseQuestion updatedBaseQuestion = baseQuestionRepository.findOne(baseQuestion.getId());
        // Disconnect from session so that the updates on updatedBaseQuestion are not directly saved in db
        em.detach(updatedBaseQuestion);
        updatedBaseQuestion
            .name(UPDATED_NAME)
            .content(UPDATED_CONTENT)
            .type(UPDATED_TYPE)
            .difficult(UPDATED_DIFFICULT)
            .courseId(UPDATED_COURSE_ID)
            .exposeTimes(UPDATED_EXPOSE_TIMES)
            .rightTimes(UPDATED_RIGHT_TIMES)
            .wrongTimes(UPDATED_WRONG_TIMES)
            .tips(UPDATED_TIPS)
            .tags(UPDATED_TAGS)
            .judgeResult(UPDATED_JUDGE_RESULT)
            .textResult(UPDATED_TEXT_RESULT);
        BaseQuestionDTO baseQuestionDTO = baseQuestionMapper.toDto(updatedBaseQuestion);

        restBaseQuestionMockMvc.perform(put("/api/base-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseQuestionDTO)))
            .andExpect(status().isOk());

        // Validate the BaseQuestion in the database
        List<BaseQuestion> baseQuestionList = baseQuestionRepository.findAll();
        assertThat(baseQuestionList).hasSize(databaseSizeBeforeUpdate);
        BaseQuestion testBaseQuestion = baseQuestionList.get(baseQuestionList.size() - 1);
        assertThat(testBaseQuestion.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBaseQuestion.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testBaseQuestion.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testBaseQuestion.getDifficult()).isEqualTo(UPDATED_DIFFICULT);
        assertThat(testBaseQuestion.getCourseId()).isEqualTo(UPDATED_COURSE_ID);
        assertThat(testBaseQuestion.getExposeTimes()).isEqualTo(UPDATED_EXPOSE_TIMES);
        assertThat(testBaseQuestion.getRightTimes()).isEqualTo(UPDATED_RIGHT_TIMES);
        assertThat(testBaseQuestion.getWrongTimes()).isEqualTo(UPDATED_WRONG_TIMES);
        assertThat(testBaseQuestion.getTips()).isEqualTo(UPDATED_TIPS);
        assertThat(testBaseQuestion.getTags()).isEqualTo(UPDATED_TAGS);
        assertThat(testBaseQuestion.isJudgeResult()).isEqualTo(UPDATED_JUDGE_RESULT);
        assertThat(testBaseQuestion.getTextResult()).isEqualTo(UPDATED_TEXT_RESULT);
    }

    @Test
    @Transactional
    public void updateNonExistingBaseQuestion() throws Exception {
        int databaseSizeBeforeUpdate = baseQuestionRepository.findAll().size();

        // Create the BaseQuestion
        BaseQuestionDTO baseQuestionDTO = baseQuestionMapper.toDto(baseQuestion);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBaseQuestionMockMvc.perform(put("/api/base-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseQuestionDTO)))
            .andExpect(status().isCreated());

        // Validate the BaseQuestion in the database
        List<BaseQuestion> baseQuestionList = baseQuestionRepository.findAll();
        assertThat(baseQuestionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBaseQuestion() throws Exception {
        // Initialize the database
        baseQuestionRepository.saveAndFlush(baseQuestion);
        int databaseSizeBeforeDelete = baseQuestionRepository.findAll().size();

        // Get the baseQuestion
        restBaseQuestionMockMvc.perform(delete("/api/base-questions/{id}", baseQuestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BaseQuestion> baseQuestionList = baseQuestionRepository.findAll();
        assertThat(baseQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BaseQuestion.class);
        BaseQuestion baseQuestion1 = new BaseQuestion();
        baseQuestion1.setId(1L);
        BaseQuestion baseQuestion2 = new BaseQuestion();
        baseQuestion2.setId(baseQuestion1.getId());
        assertThat(baseQuestion1).isEqualTo(baseQuestion2);
        baseQuestion2.setId(2L);
        assertThat(baseQuestion1).isNotEqualTo(baseQuestion2);
        baseQuestion1.setId(null);
        assertThat(baseQuestion1).isNotEqualTo(baseQuestion2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BaseQuestionDTO.class);
        BaseQuestionDTO baseQuestionDTO1 = new BaseQuestionDTO();
        baseQuestionDTO1.setId(1L);
        BaseQuestionDTO baseQuestionDTO2 = new BaseQuestionDTO();
        assertThat(baseQuestionDTO1).isNotEqualTo(baseQuestionDTO2);
        baseQuestionDTO2.setId(baseQuestionDTO1.getId());
        assertThat(baseQuestionDTO1).isEqualTo(baseQuestionDTO2);
        baseQuestionDTO2.setId(2L);
        assertThat(baseQuestionDTO1).isNotEqualTo(baseQuestionDTO2);
        baseQuestionDTO1.setId(null);
        assertThat(baseQuestionDTO1).isNotEqualTo(baseQuestionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(baseQuestionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(baseQuestionMapper.fromId(null)).isNull();
    }
}
