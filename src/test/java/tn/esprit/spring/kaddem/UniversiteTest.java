package tn.esprit.spring.kaddem;

import org.junit.Before;
import org.junit.Test;
import tn.esprit.spring.kaddem.entities.Departement;
import tn.esprit.spring.kaddem.entities.Universite;

import java.util.HashSet;

import static org.junit.Assert.*;

public class UniversiteTest {

    private Universite universite;

    @Before
    public void setUp() {
        universite = new Universite();
    }

    @Test
    public void testGettersAndSetters() {

        String nom = "University of Test";
        universite.setNomUniv(nom);
        assertEquals(nom, universite.getNomUniv());


        Integer id = 1;
        universite.setIdUniv(id);
        assertEquals(id, universite.getIdUniv());

        HashSet<Departement> departements = new HashSet<>();
        universite.setDepartements(departements);
        assertEquals(departements, universite.getDepartements());
    }

    @Test
    public void testConstructors() {
        Universite universiteWithName = new Universite("Test University");
        assertEquals("Test University", universiteWithName.getNomUniv());

        Universite universiteWithIdAndName = new Universite(1, "Test University");
        assertEquals(Integer.valueOf(1), universiteWithIdAndName.getIdUniv());
        assertEquals("Test University", universiteWithIdAndName.getNomUniv());
    }
}
