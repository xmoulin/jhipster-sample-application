package fr.soprasteria.sudest.repas.web.rest;

import fr.soprasteria.sudest.repas.ResaRepas2App;
import fr.soprasteria.sudest.repas.domain.Boisson;
import fr.soprasteria.sudest.repas.repository.BoissonRepository;
import fr.soprasteria.sudest.repas.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static fr.soprasteria.sudest.repas.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link BoissonResource} REST controller.
 */
@SpringBootTest(classes = ResaRepas2App.class)
public class BoissonResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private BoissonRepository boissonRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBoissonMockMvc;

    private Boisson boisson;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BoissonResource boissonResource = new BoissonResource(boissonRepository);
        this.restBoissonMockMvc = MockMvcBuilders.standaloneSetup(boissonResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Boisson createEntity(EntityManager em) {
        Boisson boisson = new Boisson()
            .label(DEFAULT_LABEL);
        return boisson;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Boisson createUpdatedEntity(EntityManager em) {
        Boisson boisson = new Boisson()
            .label(UPDATED_LABEL);
        return boisson;
    }

    @BeforeEach
    public void initTest() {
        boisson = createEntity(em);
    }

    @Test
    @Transactional
    public void createBoisson() throws Exception {
        int databaseSizeBeforeCreate = boissonRepository.findAll().size();

        // Create the Boisson
        restBoissonMockMvc.perform(post("/api/boissons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(boisson)))
            .andExpect(status().isCreated());

        // Validate the Boisson in the database
        List<Boisson> boissonList = boissonRepository.findAll();
        assertThat(boissonList).hasSize(databaseSizeBeforeCreate + 1);
        Boisson testBoisson = boissonList.get(boissonList.size() - 1);
        assertThat(testBoisson.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createBoissonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = boissonRepository.findAll().size();

        // Create the Boisson with an existing ID
        boisson.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBoissonMockMvc.perform(post("/api/boissons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(boisson)))
            .andExpect(status().isBadRequest());

        // Validate the Boisson in the database
        List<Boisson> boissonList = boissonRepository.findAll();
        assertThat(boissonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBoissons() throws Exception {
        // Initialize the database
        boissonRepository.saveAndFlush(boisson);

        // Get all the boissonList
        restBoissonMockMvc.perform(get("/api/boissons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(boisson.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())));
    }
    
    @Test
    @Transactional
    public void getBoisson() throws Exception {
        // Initialize the database
        boissonRepository.saveAndFlush(boisson);

        // Get the boisson
        restBoissonMockMvc.perform(get("/api/boissons/{id}", boisson.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(boisson.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBoisson() throws Exception {
        // Get the boisson
        restBoissonMockMvc.perform(get("/api/boissons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBoisson() throws Exception {
        // Initialize the database
        boissonRepository.saveAndFlush(boisson);

        int databaseSizeBeforeUpdate = boissonRepository.findAll().size();

        // Update the boisson
        Boisson updatedBoisson = boissonRepository.findById(boisson.getId()).get();
        // Disconnect from session so that the updates on updatedBoisson are not directly saved in db
        em.detach(updatedBoisson);
        updatedBoisson
            .label(UPDATED_LABEL);

        restBoissonMockMvc.perform(put("/api/boissons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBoisson)))
            .andExpect(status().isOk());

        // Validate the Boisson in the database
        List<Boisson> boissonList = boissonRepository.findAll();
        assertThat(boissonList).hasSize(databaseSizeBeforeUpdate);
        Boisson testBoisson = boissonList.get(boissonList.size() - 1);
        assertThat(testBoisson.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingBoisson() throws Exception {
        int databaseSizeBeforeUpdate = boissonRepository.findAll().size();

        // Create the Boisson

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBoissonMockMvc.perform(put("/api/boissons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(boisson)))
            .andExpect(status().isBadRequest());

        // Validate the Boisson in the database
        List<Boisson> boissonList = boissonRepository.findAll();
        assertThat(boissonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBoisson() throws Exception {
        // Initialize the database
        boissonRepository.saveAndFlush(boisson);

        int databaseSizeBeforeDelete = boissonRepository.findAll().size();

        // Delete the boisson
        restBoissonMockMvc.perform(delete("/api/boissons/{id}", boisson.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Boisson> boissonList = boissonRepository.findAll();
        assertThat(boissonList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Boisson.class);
        Boisson boisson1 = new Boisson();
        boisson1.setId(1L);
        Boisson boisson2 = new Boisson();
        boisson2.setId(boisson1.getId());
        assertThat(boisson1).isEqualTo(boisson2);
        boisson2.setId(2L);
        assertThat(boisson1).isNotEqualTo(boisson2);
        boisson1.setId(null);
        assertThat(boisson1).isNotEqualTo(boisson2);
    }
}
