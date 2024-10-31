package tn.esprit.spring.kaddem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.spring.kaddem.entities.Reclamation;
import tn.esprit.spring.kaddem.repositories.ReclamationRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ReclamationService implements IReclamationService {

    @Autowired
    private ReclamationRepository reclamationRepository;

    @Override
    public List<Reclamation> findAll() {
        return reclamationRepository.findAll();
    }

    @Override
    public Optional<Reclamation> findById(Long id) {
        return reclamationRepository.findById(id);
    }

    @Override
    public Reclamation save(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    @Override
    public void deleteById(Long id) {
        reclamationRepository.deleteById(id);
    }
}
