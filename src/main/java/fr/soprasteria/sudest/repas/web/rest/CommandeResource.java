package fr.soprasteria.sudest.repas.web.rest;

import fr.soprasteria.sudest.repas.domain.Commande;
import fr.soprasteria.sudest.repas.repository.CommandeRepository;
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
 * REST controller for managing {@link fr.soprasteria.sudest.repas.domain.Commande}.
 */
@RestController
@RequestMapping("/api")
public class CommandeResource {

    private final Logger log = LoggerFactory.getLogger(CommandeResource.class);

    private static final String ENTITY_NAME = "commande";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandeRepository commandeRepository;

    public CommandeResource(CommandeRepository commandeRepository) {
        this.commandeRepository = commandeRepository;
    }

    /**
     * {@code POST  /commandes} : Create a new commande.
     *
     * @param commande the commande to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commande, or with status {@code 400 (Bad Request)} if the commande has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commandes")
    public ResponseEntity<Commande> createCommande(@RequestBody Commande commande) throws URISyntaxException {
        log.debug("REST request to save Commande : {}", commande);
        if (commande.getId() != null) {
            throw new BadRequestAlertException("A new commande cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commande result = commandeRepository.save(commande);
        return ResponseEntity.created(new URI("/api/commandes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commandes} : Updates an existing commande.
     *
     * @param commande the commande to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commande,
     * or with status {@code 400 (Bad Request)} if the commande is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commande couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commandes")
    public ResponseEntity<Commande> updateCommande(@RequestBody Commande commande) throws URISyntaxException {
        log.debug("REST request to update Commande : {}", commande);
        if (commande.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Commande result = commandeRepository.save(commande);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, commande.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /commandes} : get all the commandes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commandes in body.
     */
    @GetMapping("/commandes")
    public List<Commande> getAllCommandes() {
        log.debug("REST request to get all Commandes");
        return commandeRepository.findAll();
    }

    /**
     * {@code GET  /commandes/:id} : get the "id" commande.
     *
     * @param id the id of the commande to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commande, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commandes/{id}")
    public ResponseEntity<Commande> getCommande(@PathVariable Long id) {
        log.debug("REST request to get Commande : {}", id);
        Optional<Commande> commande = commandeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commande);
    }

    /**
     * {@code DELETE  /commandes/:id} : delete the "id" commande.
     *
     * @param id the id of the commande to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commandes/{id}")
    public ResponseEntity<Void> deleteCommande(@PathVariable Long id) {
        log.debug("REST request to delete Commande : {}", id);
        commandeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
