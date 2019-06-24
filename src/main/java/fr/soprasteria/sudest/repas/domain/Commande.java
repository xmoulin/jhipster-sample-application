package fr.soprasteria.sudest.repas.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "commande")
    private Set<Plat> employees = new HashSet<>();

    @OneToMany(mappedBy = "commande")
    private Set<Boisson> employees = new HashSet<>();

    @OneToMany(mappedBy = "commande")
    private Set<Dessert> employees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Commande name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Plat> getEmployees() {
        return employees;
    }

    public Commande employees(Set<Plat> plats) {
        this.employees = plats;
        return this;
    }

    public Commande addEmployee(Plat plat) {
        this.employees.add(plat);
        plat.setCommande(this);
        return this;
    }

    public Commande removeEmployee(Plat plat) {
        this.employees.remove(plat);
        plat.setCommande(null);
        return this;
    }

    public void setEmployees(Set<Plat> plats) {
        this.employees = plats;
    }

    public Set<Boisson> getEmployees() {
        return employees;
    }

    public Commande employees(Set<Boisson> boissons) {
        this.employees = boissons;
        return this;
    }

    public Commande addEmployee(Boisson boisson) {
        this.employees.add(boisson);
        boisson.setCommande(this);
        return this;
    }

    public Commande removeEmployee(Boisson boisson) {
        this.employees.remove(boisson);
        boisson.setCommande(null);
        return this;
    }

    public void setEmployees(Set<Boisson> boissons) {
        this.employees = boissons;
    }

    public Set<Dessert> getEmployees() {
        return employees;
    }

    public Commande employees(Set<Dessert> desserts) {
        this.employees = desserts;
        return this;
    }

    public Commande addEmployee(Dessert dessert) {
        this.employees.add(dessert);
        dessert.setCommande(this);
        return this;
    }

    public Commande removeEmployee(Dessert dessert) {
        this.employees.remove(dessert);
        dessert.setCommande(null);
        return this;
    }

    public void setEmployees(Set<Dessert> desserts) {
        this.employees = desserts;
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
            ", name='" + getName() + "'" +
            "}";
    }
}
