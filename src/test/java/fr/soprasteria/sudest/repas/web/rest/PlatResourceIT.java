package fr.soprasteria.sudest.repas.web.rest;

import fr.soprasteria.sudest.repas.ResaRepas2App;
import fr.soprasteria.sudest.repas.domain.Plat;
import fr.soprasteria.sudest.repas.repository.PlatRepository;
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
 * Integration tests for the {@Link PlatResource} REST controller.
 */
@SpringBootTest(classes = ResaRepas2App.class)
public class PlatResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    @Autowired
    private PlatRepository platRepository;

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

    private MockMvc restPlatMockMvc;

    private Plat plat;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlatResource platResource = new PlatResource(platRepository);
        this.restPlatMockMvc = MockMvcBuilders.standaloneSetup(platResource)
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
    public static Plat createEntity(EntityManager em) {
        Plat plat = new Plat()
            .label(DEFAULT_LABEL);
        return plat;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plat createUpdatedEntity(EntityManager em) {
        Plat plat = new Plat()
            .label(UPDATED_LABEL);
        return plat;
    }

    @BeforeEach
    public void initTest() {
        plat = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlat() throws Exception {
        int databaseSizeBeforeCreate = platRepository.findAll().size();

        // Create the Plat
        restPlatMockMvc.perform(post("/api/plats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plat)))
            .andExpect(status().isCreated());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeCreate + 1);
        Plat testPlat = platList.get(platList.size() - 1);
        assertThat(testPlat.getLabel()).isEqualTo(DEFAULT_LABEL);
    }

    @Test
    @Transactional
    public void createPlatWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = platRepository.findAll().size();

        // Create the Plat with an existing ID
        plat.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlatMockMvc.perform(post("/api/plats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plat)))
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlats() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        // Get all the platList
        restPlatMockMvc.perform(get("/api/plats?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plat.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL.toString())));
    }
    
    @Test
    @Transactional
    public void getPlat() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        // Get the plat
        restPlatMockMvc.perform(get("/api/plats/{id}", plat.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plat.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPlat() throws Exception {
        // Get the plat
        restPlatMockMvc.perform(get("/api/plats/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlat() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        int databaseSizeBeforeUpdate = platRepository.findAll().size();

        // Update the plat
        Plat updatedPlat = platRepository.findById(plat.getId()).get();
        // Disconnect from session so that the updates on updatedPlat are not directly saved in db
        em.detach(updatedPlat);
        updatedPlat
            .label(UPDATED_LABEL);

        restPlatMockMvc.perform(put("/api/plats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlat)))
            .andExpect(status().isOk());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
        Plat testPlat = platList.get(platList.size() - 1);
        assertThat(testPlat.getLabel()).isEqualTo(UPDATED_LABEL);
    }

    @Test
    @Transactional
    public void updateNonExistingPlat() throws Exception {
        int databaseSizeBeforeUpdate = platRepository.findAll().size();

        // Create the Plat

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlatMockMvc.perform(put("/api/plats")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plat)))
            .andExpect(status().isBadRequest());

        // Validate the Plat in the database
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlat() throws Exception {
        // Initialize the database
        platRepository.saveAndFlush(plat);

        int databaseSizeBeforeDelete = platRepository.findAll().size();

        // Delete the plat
        restPlatMockMvc.perform(delete("/api/plats/{id}", plat.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Plat> platList = platRepository.findAll();
        assertThat(platList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plat.class);
        Plat plat1 = new Plat();
        plat1.setId(1L);
        Plat plat2 = new Plat();
        plat2.setId(plat1.getId());
        assertThat(plat1).isEqualTo(plat2);
        plat2.setId(2L);
        assertThat(plat1).isNotEqualTo(plat2);
        plat1.setId(null);
        assertThat(plat1).isNotEqualTo(plat2);
    }
}
