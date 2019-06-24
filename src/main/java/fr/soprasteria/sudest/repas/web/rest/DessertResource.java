package fr.soprasteria.sudest.repas.web.rest;

import fr.soprasteria.sudest.repas.domain.Dessert;
import fr.soprasteria.sudest.repas.repository.DessertRepository;
import fr.soprasteria.sudest.repas.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.soprasteria.sudest.repas.domain.Dessert}.
 */
@RestController
@RequestMapping("/api")
public class DessertResource {

    private final Logger log = LoggerFactory.getLogger(DessertResource.class);

    private static final String ENTITY_NAME = "dessert";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DessertRepository dessertRepository;

    public DessertResource(DessertRepository dessertRepository) {
        this.dessertRepository = dessertRepository;
    }

    /**
     * {@code POST  /desserts} : Create a new dessert.
     *
     * @param dessert the dessert to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dessert, or with status {@code 400 (Bad Request)} if the dessert has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/desserts")
    public ResponseEntity<Dessert> createDessert(@RequestBody Dessert dessert) throws URISyntaxException {
        log.debug("REST request to save Dessert : {}", dessert);
        if (dessert.getId() != null) {
            throw new BadRequestAlertException("A new dessert cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dessert result = dessertRepository.save(dessert);
        return ResponseEntity.created(new URI("/api/desserts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /desserts} : Updates an existing dessert.
     *
     * @param dessert the dessert to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dessert,
     * or with status {@code 400 (Bad Request)} if the dessert is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dessert couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/desserts")
    public ResponseEntity<Dessert> updateDessert(@RequestBody Dessert dessert) throws URISyntaxException {
        log.debug("REST request to update Dessert : {}", dessert);
        if (dessert.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dessert result = dessertRepository.save(dessert);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dessert.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /desserts} : get all the desserts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of desserts in body.
     */
    @GetMapping("/desserts")
    public List<Dessert> getAllDesserts() {
        log.debug("REST request to get all Desserts");
        return dessertRepository.findAll();
    }

    /**
     * {@code GET  /desserts/:id} : get the "id" dessert.
     *
     * @param id the id of the dessert to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dessert, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/desserts/{id}")
    public ResponseEntity<Dessert> getDessert(@PathVariable Long id) {
        log.debug("REST request to get Dessert : {}", id);
        Optional<Dessert> dessert = dessertRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dessert);
    }

    /**
     * {@code DELETE  /desserts/:id} : delete the "id" dessert.
     *
     * @param id the id of the dessert to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/desserts/{id}")
    public ResponseEntity<Void> deleteDessert(@PathVariable Long id) {
        log.debug("REST request to delete Dessert : {}", id);
        dessertRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
