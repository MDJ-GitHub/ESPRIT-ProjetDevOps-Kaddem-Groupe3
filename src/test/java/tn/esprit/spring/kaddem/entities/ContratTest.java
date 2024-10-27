package tn.esprit.spring.kaddem.entities;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class ContratTest {

    private Contrat contrat;

    @BeforeEach
    void setUp() {
        contrat = new Contrat();
    }

    @Test
    void testGetAndSetIdContrat() {
        contrat.setIdContrat(1);
        assertEquals(1, contrat.getIdContrat());
    }

    @Test
    void testGetAndSetDateDebutContrat() {
        Date dateDebut = new Date();
        contrat.setDateDebutContrat(dateDebut);
        assertEquals(dateDebut, contrat.getDateDebutContrat());
    }

    @Test
    void testGetAndSetDateFinContrat() {
        Date dateFin = new Date();
        contrat.setDateFinContrat(dateFin);
        assertEquals(dateFin, contrat.getDateFinContrat());
    }

    @Test
    void testGetAndSetSpecialite() {
        Specialite specialite = Specialite.SOME_SPECIALITE; // Replace with a valid value
        contrat.setSpecialite(specialite);
        assertEquals(specialite, contrat.getSpecialite());
    }

    @Test
    void testGetAndSetArchive() {
        contrat.setArchive(true);
        assertTrue(contrat.getArchive());
    }

    @Test
    void testGetAndSetMontantContrat() {
        contrat.setMontantContrat(1000);
        assertEquals(1000, contrat.getMontantContrat());
    }

    @Test
    void testGetAndSetEtudiant() {
        Etudiant etudiant = new Etudiant(); // Assuming you have an Etudiant class
        contrat.setEtudiant(etudiant);
        assertEquals(etudiant, contrat.getEtudiant());
    }
}
