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
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/technicians")
public class TechnicianController {
    Logger logger = LoggerFactory.getLogger(TechnicianController.class);
    @Autowired
    private TechnicianService technicianService;

    @GetMapping
    public ResponseEntity<?> getAllTechnicians() {
            List<Technician> technicians = technicianService.getAllTechnicians();
            return new ResponseEntity<>(technicians, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable String id) {
        Optional<Technician> technician = technicianService.getTechnicianById(id);
        return technician.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseThrow(() -> new RuntimeException("Technician not found for id: " + id));
    }

    @PostMapping
    public ResponseEntity<?> createTechnician(@RequestBody Technician technician) {
            Technician createdTechnician = technicianService.createTechnician(technician);
            logger.info("Technician created with ID: {}", createdTechnician.getId());
            return new ResponseEntity<>(createdTechnician, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTechnician(@PathVariable String id, @RequestBody Technician technician) {
            Technician updatedTechnician = technicianService.updateTechnician(id, technician);
            return new ResponseEntity<>(updatedTechnician, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTechnician(@PathVariable String id) {
            technicianService.deleteTechnician(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}