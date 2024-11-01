package tn.esprit.spring.kaddem.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import tn.esprit.spring.kaddem.entities.Etudiant;
import tn.esprit.spring.kaddem.entities.Option;
import tn.esprit.spring.kaddem.repositories.EtudiantRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class EtudiantServiceImplTest {

    @Mock
    private EtudiantRepository etudiantRepository;

    @InjectMocks
    private EtudiantServiceImpl etudiantService; // Removed instantiation here

    private Etudiant etudiant;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        etudiant = new Etudiant("John", "Doe", Option.SIM);
        etudiant.setIdEtudiant(1);
    }

    @Test
    void testCreateEtudiant() {
        when(etudiantRepository.save(any(Etudiant.class))).thenReturn(etudiant);
        Etudiant createdEtudiant = etudiantService.addEtudiant(etudiant);
        assertEquals("John", createdEtudiant.getNomE());
        verify(etudiantRepository, times(1)).save(etudiant);
    }

    @Test
    void testFindEtudiantById() {
        when(etudiantRepository.findById(1)).thenReturn(Optional.of(etudiant));
        Etudiant foundEtudiant = etudiantService.retrieveEtudiant(1);
        assertEquals("John", foundEtudiant.getNomE());
        verify(etudiantRepository, times(1)).findById(1);
    }

    @Test
    void testFindEtudiantById_NotFound() {
        when(etudiantRepository.findById(2)).thenReturn(Optional.empty());
        Etudiant foundEtudiant = etudiantService.retrieveEtudiant(2);
        assertEquals(null, foundEtudiant); // Or throw a custom exception
        verify(etudiantRepository, times(1)).findById(2);
    }
}
