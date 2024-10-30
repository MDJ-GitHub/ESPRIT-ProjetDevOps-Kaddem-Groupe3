package tn.esprit.kaddem;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import tn.esprit.spring.kaddem.entities.Universite;
import tn.esprit.spring.kaddem.repositories.UniversiteRepository;

import java.util.NoSuchElementException;

import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(SpringExtension.class)
class UniversiteRepositoryUnitTest {

    @Mock
    UniversiteRepository universiteRepository;

    @BeforeEach
    void setUp() {
        universiteRepository.save(new Universite(1, "Manar"));
        universiteRepository.save(new Universite(2, "Sfax"));
    }

    @AfterEach
    void destroy() {
        universiteRepository.deleteAll();
    }

    @Test
    void testGetInvalidUniversite() {
        assertThrows(NoSuchElementException.class, () -> {
            universiteRepository.findById(1).get();
        });
    }

    @Test
    void testDeleteUniversite() {
        Universite saved = new Universite(5, "ron");
        universiteRepository.save(saved);
        universiteRepository.delete(saved);

        assertThrows(NoSuchElementException.class, () -> {
            universiteRepository.findById(5).get();
        });
    }
}
