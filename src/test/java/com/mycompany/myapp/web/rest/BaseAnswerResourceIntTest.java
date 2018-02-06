package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterDemo2App;

import com.mycompany.myapp.domain.BaseAnswer;
import com.mycompany.myapp.repository.BaseAnswerRepository;
import com.mycompany.myapp.service.BaseAnswerService;
import com.mycompany.myapp.service.dto.BaseAnswerDTO;
import com.mycompany.myapp.service.mapper.BaseAnswerMapper;
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
 * Test class for the BaseAnswerResource REST controller.
 *
 * @see BaseAnswerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterDemo2App.class)
public class BaseAnswerResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Boolean DEFAULT_RESULT = false;
    private static final Boolean UPDATED_RESULT = true;

    @Autowired
    private BaseAnswerRepository baseAnswerRepository;

    @Autowired
    private BaseAnswerMapper baseAnswerMapper;

    @Autowired
    private BaseAnswerService baseAnswerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBaseAnswerMockMvc;

    private BaseAnswer baseAnswer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BaseAnswerResource baseAnswerResource = new BaseAnswerResource(baseAnswerService);
        this.restBaseAnswerMockMvc = MockMvcBuilders.standaloneSetup(baseAnswerResource)
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
    public static BaseAnswer createEntity(EntityManager em) {
        BaseAnswer baseAnswer = new BaseAnswer()
            .content(DEFAULT_CONTENT)
            .result(DEFAULT_RESULT);
        return baseAnswer;
    }

    @Before
    public void initTest() {
        baseAnswer = createEntity(em);
    }

    @Test
    @Transactional
    public void createBaseAnswer() throws Exception {
        int databaseSizeBeforeCreate = baseAnswerRepository.findAll().size();

        // Create the BaseAnswer
        BaseAnswerDTO baseAnswerDTO = baseAnswerMapper.toDto(baseAnswer);
        restBaseAnswerMockMvc.perform(post("/api/base-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseAnswerDTO)))
            .andExpect(status().isCreated());

        // Validate the BaseAnswer in the database
        List<BaseAnswer> baseAnswerList = baseAnswerRepository.findAll();
        assertThat(baseAnswerList).hasSize(databaseSizeBeforeCreate + 1);
        BaseAnswer testBaseAnswer = baseAnswerList.get(baseAnswerList.size() - 1);
        assertThat(testBaseAnswer.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testBaseAnswer.isResult()).isEqualTo(DEFAULT_RESULT);
    }

    @Test
    @Transactional
    public void createBaseAnswerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = baseAnswerRepository.findAll().size();

        // Create the BaseAnswer with an existing ID
        baseAnswer.setId(1L);
        BaseAnswerDTO baseAnswerDTO = baseAnswerMapper.toDto(baseAnswer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBaseAnswerMockMvc.perform(post("/api/base-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseAnswerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the BaseAnswer in the database
        List<BaseAnswer> baseAnswerList = baseAnswerRepository.findAll();
        assertThat(baseAnswerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBaseAnswers() throws Exception {
        // Initialize the database
        baseAnswerRepository.saveAndFlush(baseAnswer);

        // Get all the baseAnswerList
        restBaseAnswerMockMvc.perform(get("/api/base-answers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(baseAnswer.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT.booleanValue())));
    }

    @Test
    @Transactional
    public void getBaseAnswer() throws Exception {
        // Initialize the database
        baseAnswerRepository.saveAndFlush(baseAnswer);

        // Get the baseAnswer
        restBaseAnswerMockMvc.perform(get("/api/base-answers/{id}", baseAnswer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(baseAnswer.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.result").value(DEFAULT_RESULT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingBaseAnswer() throws Exception {
        // Get the baseAnswer
        restBaseAnswerMockMvc.perform(get("/api/base-answers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBaseAnswer() throws Exception {
        // Initialize the database
        baseAnswerRepository.saveAndFlush(baseAnswer);
        int databaseSizeBeforeUpdate = baseAnswerRepository.findAll().size();

        // Update the baseAnswer
        BaseAnswer updatedBaseAnswer = baseAnswerRepository.findOne(baseAnswer.getId());
        // Disconnect from session so that the updates on updatedBaseAnswer are not directly saved in db
        em.detach(updatedBaseAnswer);
        updatedBaseAnswer
            .content(UPDATED_CONTENT)
            .result(UPDATED_RESULT);
        BaseAnswerDTO baseAnswerDTO = baseAnswerMapper.toDto(updatedBaseAnswer);

        restBaseAnswerMockMvc.perform(put("/api/base-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseAnswerDTO)))
            .andExpect(status().isOk());

        // Validate the BaseAnswer in the database
        List<BaseAnswer> baseAnswerList = baseAnswerRepository.findAll();
        assertThat(baseAnswerList).hasSize(databaseSizeBeforeUpdate);
        BaseAnswer testBaseAnswer = baseAnswerList.get(baseAnswerList.size() - 1);
        assertThat(testBaseAnswer.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testBaseAnswer.isResult()).isEqualTo(UPDATED_RESULT);
    }

    @Test
    @Transactional
    public void updateNonExistingBaseAnswer() throws Exception {
        int databaseSizeBeforeUpdate = baseAnswerRepository.findAll().size();

        // Create the BaseAnswer
        BaseAnswerDTO baseAnswerDTO = baseAnswerMapper.toDto(baseAnswer);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBaseAnswerMockMvc.perform(put("/api/base-answers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(baseAnswerDTO)))
            .andExpect(status().isCreated());

        // Validate the BaseAnswer in the database
        List<BaseAnswer> baseAnswerList = baseAnswerRepository.findAll();
        assertThat(baseAnswerList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBaseAnswer() throws Exception {
        // Initialize the database
        baseAnswerRepository.saveAndFlush(baseAnswer);
        int databaseSizeBeforeDelete = baseAnswerRepository.findAll().size();

        // Get the baseAnswer
        restBaseAnswerMockMvc.perform(delete("/api/base-answers/{id}", baseAnswer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<BaseAnswer> baseAnswerList = baseAnswerRepository.findAll();
        assertThat(baseAnswerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BaseAnswer.class);
        BaseAnswer baseAnswer1 = new BaseAnswer();
        baseAnswer1.setId(1L);
        BaseAnswer baseAnswer2 = new BaseAnswer();
        baseAnswer2.setId(baseAnswer1.getId());
        assertThat(baseAnswer1).isEqualTo(baseAnswer2);
        baseAnswer2.setId(2L);
        assertThat(baseAnswer1).isNotEqualTo(baseAnswer2);
        baseAnswer1.setId(null);
        assertThat(baseAnswer1).isNotEqualTo(baseAnswer2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BaseAnswerDTO.class);
        BaseAnswerDTO baseAnswerDTO1 = new BaseAnswerDTO();
        baseAnswerDTO1.setId(1L);
        BaseAnswerDTO baseAnswerDTO2 = new BaseAnswerDTO();
        assertThat(baseAnswerDTO1).isNotEqualTo(baseAnswerDTO2);
        baseAnswerDTO2.setId(baseAnswerDTO1.getId());
        assertThat(baseAnswerDTO1).isEqualTo(baseAnswerDTO2);
        baseAnswerDTO2.setId(2L);
        assertThat(baseAnswerDTO1).isNotEqualTo(baseAnswerDTO2);
        baseAnswerDTO1.setId(null);
        assertThat(baseAnswerDTO1).isNotEqualTo(baseAnswerDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(baseAnswerMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(baseAnswerMapper.fromId(null)).isNull();
    }
}
