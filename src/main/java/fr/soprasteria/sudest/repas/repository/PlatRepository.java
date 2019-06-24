package fr.soprasteria.sudest.repas.repository;

import fr.soprasteria.sudest.repas.domain.Plat;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Plat entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlatRepository extends JpaRepository<Plat, Long> {

}
