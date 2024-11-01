import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import tn.esprit.spring.kaddem.entities.Contrat;
import tn.esprit.spring.kaddem.entities.Departement;
import tn.esprit.spring.kaddem.entities.Equipe;
import tn.esprit.spring.kaddem.entities.Etudiant;
import tn.esprit.spring.kaddem.entities.Option;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class EtudiantTest {
    private Etudiant etudiant;

    @BeforeEach
    void setUp() {
        etudiant = new Etudiant("John", "Doe", Option.GAMIX);
    }

    @Test
    void testGettersSetters() {
        etudiant.setNomE("Jane");
        etudiant.setPrenomE("Doe");
        etudiant.setOp(Option.SIM);

        assertEquals("Jane", etudiant.getNomE());
        assertEquals("Doe", etudiant.getPrenomE());
        assertEquals(Option.SIM, etudiant.getOp());
    }

    @Test
    void testAddDepartementAndContrats() {
        Departement departement = new Departement();
        etudiant.setDepartement(departement);

        Set<Contrat> contrats = new HashSet<>();
        etudiant.setContrats(contrats);

        assertEquals(departement, etudiant.getDepartement());
        assertEquals(contrats, etudiant.getContrats());
    }

    @Test
    void testConstructorWithParameters() {
        Etudiant etudiantWithId = new Etudiant(1, "Alex", "Smith", Option.SIM);

        assertEquals("Alex", etudiantWithId.getNomE());
        assertEquals("Smith", etudiantWithId.getPrenomE());
        assertEquals(Option.SIM, etudiantWithId.getOp());
        assertEquals(1, etudiantWithId.getIdEtudiant());
    }
}
