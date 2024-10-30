package tn.esprit.kaddem;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import tn.esprit.spring.kaddem.entities.Universite;
import tn.esprit.spring.kaddem.repositories.UniversiteRepository;
import tn.esprit.spring.kaddem.services.UniversiteServiceImpl;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class UniversiteServiceUnitTest {

    @Mock
    UniversiteRepository universiteRepository;

    @InjectMocks
    UniversiteServiceImpl iUniversiteService;

    @BeforeEach
    public void setup() {

    }

    @Test
    void testGetUniveristesList() {
        Universite universite1 = new Universite(9, "ben");
        Universite universite2 = new Universite(8, "kevin");
        when(universiteRepository.findAll()).thenReturn(Arrays.asList(universite1, universite2));
        List<Universite> universiteList = iUniversiteService.retrieveAllUniversites();
        assertEquals(2, universiteList.size());
        assertEquals("ben", universiteList.get(0).getNomUniv());
        assertEquals("kevin", universiteList.get(1).getNomUniv());
    }


    @Test
    void testGetUniveristeById() {
        Universite universite = new Universite(10, "george");
        when(universiteRepository.findById(10)).thenReturn(Optional.of(universite));
        Universite universiteById = iUniversiteService.retrieveUniversite(10);
        assertNotEquals(null, universiteById);
        assertEquals("george", universiteById.getNomUniv());
    }

    @Test
    void testGetInvalidUniversiteById() {
        when(universiteRepository.findById(17)).thenThrow(new RuntimeException("Universite Not Found with ID"));

        Exception exception = assertThrows(RuntimeException.class, () -> {
            iUniversiteService.retrieveUniversite(17);
        });

        assertTrue(exception.getMessage().contains("Universite Not Found with ID"));
    }


    @Test
    void testCreateUniversite() {
        Universite universite = new Universite(12, "john");
        iUniversiteService.addUniversite(universite);
        verify(universiteRepository, times(1)).save(universite);
        ArgumentCaptor<Universite> universiteArgumentCaptor = ArgumentCaptor.forClass(Universite.class);
        verify(universiteRepository).save(universiteArgumentCaptor.capture());
        Universite universiteCreated = universiteArgumentCaptor.getValue();
        assertNotNull(universiteCreated.getIdUniv());
        assertEquals("john", universiteCreated.getNomUniv());
    }

    @Test
    void testDeleteuniversite() {
        Universite universite = new Universite(13, "simen");
        when(universiteRepository.findById(13)).thenReturn(Optional.of(universite));
        iUniversiteService.deleteUniversite(universite.getIdUniv());
        // Verify that the delete method is called with the correct argument
        verify(universiteRepository, times(1)).delete(universite);
        // Optional: You can also use ArgumentCaptor to capture the deleted entity and make additional assertions
        ArgumentCaptor<Universite> universiteArgumentCaptor = ArgumentCaptor.forClass(Universite.class);
        verify(universiteRepository).delete(universiteArgumentCaptor.capture());
        Universite deletedUniversite = universiteArgumentCaptor.getValue();
        assertNotNull(deletedUniversite);
        assertEquals(13, deletedUniversite.getIdUniv());
    }
}
