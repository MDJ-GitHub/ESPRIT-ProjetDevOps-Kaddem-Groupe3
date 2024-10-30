package tn.esprit.kaddem;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import tn.esprit.spring.kaddem.controllers.UniversiteRestController;
import tn.esprit.spring.kaddem.entities.Universite;
import tn.esprit.spring.kaddem.services.IUniversiteService;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
class UniversiteRestControllerTest {

    @Mock
    private IUniversiteService universiteService;

    @InjectMocks
    private UniversiteRestController universiteController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllUniversites() {
        // Mock data
        Universite universite1 = new Universite(1, "Universite1");
        Universite universite2 = new Universite(2, "Universite2");
        List<Universite> universiteList = Arrays.asList(universite1, universite2);

        // Mocking behavior
        when(universiteService.retrieveAllUniversites()).thenReturn(universiteList);

        // Perform the test
        List<Universite> result = universiteController.getUniversites();

        // Verify the interactions
        verify(universiteService, times(1)).retrieveAllUniversites();

        // Assertions
        assertEquals(2, result.size());
        assertEquals("Universite1", result.get(0).getNomUniv());
        assertEquals("Universite2", result.get(1).getNomUniv());
    }

    @Test
    void testGetUniversiteById() {
        // Mock data
        Universite universite = new Universite(1, "Universite1");

        // Mocking behavior
        when(universiteService.retrieveUniversite(1)).thenReturn(universite);

        // Perform the test
        Universite responseUniversite = universiteController.retrieveUniversite(1);

        // Verify the interactions
        verify(universiteService, times(1)).retrieveUniversite(1);

        // Assertions
        assertNotNull(responseUniversite);
        assertEquals(universite.getIdUniv(), responseUniversite.getIdUniv());
        assertEquals(universite.getNomUniv(), responseUniversite.getNomUniv());
    }

    @Test
    void testAddUniversite() {
        // Mock data
        Universite universiteToAdd = new Universite("Universite1");
        Universite savedUniversite = new Universite(1, "Universite1");

        // Mocking behavior
        when(universiteService.addUniversite(any(Universite.class))).thenReturn(savedUniversite);

        // Perform the test
        Universite responseUniversite = universiteController.addUniversite(universiteToAdd);

        // Verify the interactions
        verify(universiteService, times(1)).addUniversite(any(Universite.class));

        // Assertions
        assertNotNull(responseUniversite);
        assertEquals(savedUniversite.getIdUniv(), responseUniversite.getIdUniv());
        assertEquals(savedUniversite.getNomUniv(), responseUniversite.getNomUniv());
    }

    @Test
    void testUpdateUniversite() {
        // Mock data
        Universite universiteToUpdate = new Universite(1, "Universite1");
        Universite updatedUniversite = new Universite(1, "UpdatedUniversite");

        // Mocking behavior
        when(universiteService.updateUniversite(any(Universite.class))).thenReturn(updatedUniversite);

        // Perform the test
        Universite responseUniversite = universiteController.updateUniversite(universiteToUpdate);

        verify(universiteService, times(1)).updateUniversite(any(Universite.class));


        assertNotNull(responseUniversite);
        assertEquals(updatedUniversite.getIdUniv(), responseUniversite.getIdUniv());
        assertEquals(updatedUniversite.getNomUniv(), responseUniversite.getNomUniv());
    }

    @Test
    void testDeleteUniversite() {

        Universite universite = new Universite(1, "Universite1");


        when(universiteService.retrieveUniversite(1)).thenReturn(universite);

        universiteController.removeUniversite(1);


        verify(universiteService, times(1)).deleteUniversite(1);
    }
}
