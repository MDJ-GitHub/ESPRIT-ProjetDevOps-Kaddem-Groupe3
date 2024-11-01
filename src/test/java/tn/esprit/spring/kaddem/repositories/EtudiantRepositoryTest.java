package tn.esprit.spring.kaddem.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import tn.esprit.spring.kaddem.entities.Etudiant;
import tn.esprit.spring.kaddem.entities.Departement;

import java.util.List;

@DataJpaTest
public class EtudiantRepositoryTest {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private DepartementRepository departementRepository; // Assuming you have this repository

    private Departement departement;

    @BeforeEach
    public void setUp() {
        // Create a department and save it to the repository
        departement = new Departement();
        departement.setNomDepart("Computer Science");
        departementRepository.save(departement);

        // Create and save a student
        Etudiant etudiant = new Etudiant();
        etudiant.setNomE("John");
        etudiant.setPrenomE("Doe");
        etudiant.setDepartement(departement);
        etudiantRepository.save(etudiant);
    }

    @Test
    public void testFindByNomEAndPrenomE() {
        Etudiant etudiant = etudiantRepository.findByNomEAndPrenomE("John", "Doe");
        assertNotNull(etudiant);
        assertEquals("John", etudiant.getNomE());
        assertEquals("Doe", etudiant.getPrenomE());
        assertEquals(departement.getIdDepart(), etudiant.getDepartement().getIdDepart());
    }

    @Test
    public void testFindEtudiantsByDepartement_IdDepart() {
        List<Etudiant> etudiants = etudiantRepository.findEtudiantsByDepartement_IdDepart(departement.getIdDepart());
        assertNotNull(etudiants);
        assertEquals(1, etudiants.size()); // Ensure we get one student
        assertEquals(departement.getIdDepart(), etudiants.get(0).getDepartement().getIdDepart());
    }

    @Test
    public void testFindByNomEAndPrenomE_NotFound() {
        Etudiant etudiant = etudiantRepository.findByNomEAndPrenomE("NonExistent", "Student");
        assertEquals(null, etudiant); // Expecting null when student doesn't exist
    }

    @Test
    public void testFindEtudiantsByDepartement_IdDepart_Empty() {
        List<Etudiant> etudiants = etudiantRepository.findEtudiantsByDepartement_IdDepart(999); // Assuming this ID doesn't exist
        assertNotNull(etudiants);
        assertEquals(0, etudiants.size()); // Expecting empty list
    }
}
