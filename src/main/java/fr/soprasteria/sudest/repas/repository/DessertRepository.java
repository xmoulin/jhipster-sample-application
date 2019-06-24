package fr.soprasteria.sudest.repas.repository;

import fr.soprasteria.sudest.repas.domain.Dessert;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dessert entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DessertRepository extends JpaRepository<Dessert, Long> {

}
