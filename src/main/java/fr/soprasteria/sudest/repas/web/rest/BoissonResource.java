package fr.soprasteria.sudest.repas.web.rest;

import fr.soprasteria.sudest.repas.domain.Boisson;
import fr.soprasteria.sudest.repas.repository.BoissonRepository;
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
 * REST controller for managing {@link fr.soprasteria.sudest.repas.domain.Boisson}.
 */
@RestController
@RequestMapping("/api")
public class BoissonResource {

    private final Logger log = LoggerFactory.getLogger(BoissonResource.class);

    private static final String ENTITY_NAME = "boisson";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BoissonRepository boissonRepository;

    public BoissonResource(BoissonRepository boissonRepository) {
        this.boissonRepository = boissonRepository;
    }

    /**
     * {@code POST  /boissons} : Create a new boisson.
     *
     * @param boisson the boisson to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new boisson, or with status {@code 400 (Bad Request)} if the boisson has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/boissons")
    public ResponseEntity<Boisson> createBoisson(@RequestBody Boisson boisson) throws URISyntaxException {
        log.debug("REST request to save Boisson : {}", boisson);
        if (boisson.getId() != null) {
            throw new BadRequestAlertException("A new boisson cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Boisson result = boissonRepository.save(boisson);
        return ResponseEntity.created(new URI("/api/boissons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /boissons} : Updates an existing boisson.
     *
     * @param boisson the boisson to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated boisson,
     * or with status {@code 400 (Bad Request)} if the boisson is not valid,
     * or with status {@code 500 (Internal Server Error)} if the boisson couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/boissons")
    public ResponseEntity<Boisson> updateBoisson(@RequestBody Boisson boisson) throws URISyntaxException {
        log.debug("REST request to update Boisson : {}", boisson);
        if (boisson.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Boisson result = boissonRepository.save(boisson);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, boisson.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /boissons} : get all the boissons.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of boissons in body.
     */
    @GetMapping("/boissons")
    public List<Boisson> getAllBoissons() {
        log.debug("REST request to get all Boissons");
        return boissonRepository.findAll();
    }

    /**
     * {@code GET  /boissons/:id} : get the "id" boisson.
     *
     * @param id the id of the boisson to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the boisson, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/boissons/{id}")
    public ResponseEntity<Boisson> getBoisson(@PathVariable Long id) {
        log.debug("REST request to get Boisson : {}", id);
        Optional<Boisson> boisson = boissonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(boisson);
    }

    /**
     * {@code DELETE  /boissons/:id} : delete the "id" boisson.
     *
     * @param id the id of the boisson to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/boissons/{id}")
    public ResponseEntity<Void> deleteBoisson(@PathVariable Long id) {
        log.debug("REST request to delete Boisson : {}", id);
        boissonRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
