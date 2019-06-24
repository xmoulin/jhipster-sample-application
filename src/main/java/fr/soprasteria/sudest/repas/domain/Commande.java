package fr.soprasteria.sudest.repas.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "plat")
    private String plat;

    @Column(name = "dessert")
    private String dessert;

    @Column(name = "boisson")
    private String boisson;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlat() {
        return plat;
    }

    public Commande plat(String plat) {
        this.plat = plat;
        return this;
    }

    public void setPlat(String plat) {
        this.plat = plat;
    }

    public String getDessert() {
        return dessert;
    }

    public Commande dessert(String dessert) {
        this.dessert = dessert;
        return this;
    }

    public void setDessert(String dessert) {
        this.dessert = dessert;
    }

    public String getBoisson() {
        return boisson;
    }

    public Commande boisson(String boisson) {
        this.boisson = boisson;
        return this;
    }

    public void setBoisson(String boisson) {
        this.boisson = boisson;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", plat='" + getPlat() + "'" +
            ", dessert='" + getDessert() + "'" +
            ", boisson='" + getBoisson() + "'" +
            "}";
    }
}
