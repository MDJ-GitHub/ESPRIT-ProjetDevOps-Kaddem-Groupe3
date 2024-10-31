package tn.esprit.spring.kaddem.services;

import tn.esprit.spring.kaddem.entities.Reclamation;

import java.util.List;
import java.util.Optional;

public interface IReclamationService {

    List<Reclamation> findAll();

    Optional<Reclamation> findById(Long id);

    Reclamation save(Reclamation reclamation);

    void deleteById(Long id);
}
