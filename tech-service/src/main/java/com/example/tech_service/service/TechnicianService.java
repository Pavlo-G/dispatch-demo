package com.example.tech_service.service;

import com.example.model.Technician;
import com.example.tech_service.entity.TechnicianEntity;
import com.example.tech_service.repository.TechnicianRepository;
import com.example.tech_service.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TechnicianService {
    @Autowired
    private TechnicianRepository technicianRepository;
    @Autowired
    private IdGenerator idGenerator;

    public List<Technician> getAllTechnicians() {
        return technicianRepository.findAll().stream()
                .map(this::convertToTechnician)
                .collect(Collectors.toList());
    }

    public Optional<Technician> getTechnicianById(String id) {
        return technicianRepository.findById(id)
                .map(this::convertToTechnician);
    }

    public Technician createTechnician(Technician technician) {
        String newId = idGenerator.generateUniqueId();
        technician.setId(newId);
        TechnicianEntity entity = convertToEntity(technician);
        entity.setId(newId);
        TechnicianEntity savedEntity = technicianRepository.save(entity);
        return convertToTechnician(savedEntity);
    }

    public Technician updateTechnician(String id, Technician technician) {
        if (technicianRepository.existsById(id)) {
            TechnicianEntity entity = convertToEntity(technician);
            entity.setId(id);
            TechnicianEntity updatedEntity = technicianRepository.save(entity);
            return convertToTechnician(updatedEntity);
        } else {
            throw new RuntimeException("Technician not found");
        }
    }

    public void deleteTechnician(String id) {
        if (!technicianRepository.existsById(id)) {
            throw new RuntimeException("Technician not found for id: " + id);
        }
        technicianRepository.deleteById(id);
    }

    private Technician convertToTechnician(TechnicianEntity entity) {
        return Technician.fromJson(entity.getJsonData());
    }

    private TechnicianEntity convertToEntity(Technician technician) {
        TechnicianEntity entity = new TechnicianEntity();
        entity.setId(technician.getId());
        entity.setJsonData(technician.toJson());
        return entity;
    }
}