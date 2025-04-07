package com.example.tech_service.controller;

import com.example.model.Technician;
import com.example.tech_service.service.TechnicianService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/technicians")
public class TechnicianController {
    Logger logger = LoggerFactory.getLogger(TechnicianController.class);
    @Autowired
    private TechnicianService technicianService;

    @GetMapping
    public ResponseEntity<?> getAllTechnicians() {
        try {
            List<Technician> technicians = technicianService.getAllTechnicians();
            return new ResponseEntity<>(technicians, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error fetching technicians: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable String id) {
        Optional<Technician> technician = technicianService.getTechnicianById(id);
        return technician.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createTechnician(@RequestBody Technician technician) {
        try {
            Technician createdTechnician = technicianService.createTechnician(technician);
            logger.info("Technician created with ID: {}", createdTechnician.getId());
            return new ResponseEntity<>(createdTechnician, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error fetching technician: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTechnician(@PathVariable String id, @RequestBody Technician technician) {
        try {
            Technician updatedTechnician = technicianService.updateTechnician(id, technician);
            return new ResponseEntity<>(updatedTechnician, HttpStatus.OK);
        } catch (RuntimeException e) {
            logger.error("Error updating technician: ", e);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error updating technician: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTechnician(@PathVariable String id) {
        try {
            technicianService.deleteTechnician(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            logger.error("Error deleting technician: ", e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error deleting technician: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}