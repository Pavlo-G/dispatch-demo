package com.example.tech_service.service;

import com.example.model.Technician;
import com.example.tech_service.entity.TechnicianEntity;
import com.example.tech_service.repository.TechnicianRepository;
import com.example.tech_service.util.IdGenerator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TechnicianService {
    Logger logger = LoggerFactory.getLogger(TechnicianService.class);
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
        Optional<TechnicianEntity> technicianOptional = technicianRepository.findById(id);
        if (technicianOptional.isPresent()) {
            TechnicianEntity technicianEntity = technicianOptional.get();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode existingJson = objectMapper.readTree(technicianEntity.getJsonData());
                JsonNode incomingJson = objectMapper.readTree(technician.toJson());
                JsonNode mergedJson = objectMapper.readerForUpdating(existingJson).readValue(incomingJson);

                technicianEntity.setJsonData(mergedJson.toString());
                TechnicianEntity savedTechnician = technicianRepository.save(technicianEntity);
                logger.info("Technician with ID: {} updated", savedTechnician.getId());
                return convertToTechnician(savedTechnician);
            } catch (Exception e) {
                logger.error("Error updating technician with ID: {}", id, e);
                throw new RuntimeException("Failed to update technician: " + e.getMessage());
            }
        } else {
            logger.error("Technician with ID: {} not found for update", id);
            throw new RuntimeException("Technician not found for id: " + id);
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