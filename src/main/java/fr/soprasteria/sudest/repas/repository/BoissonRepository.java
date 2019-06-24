package fr.soprasteria.sudest.repas.repository;

import fr.soprasteria.sudest.repas.domain.Boisson;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Boisson entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoissonRepository extends JpaRepository<Boisson, Long> {

}
