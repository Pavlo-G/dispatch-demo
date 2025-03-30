package com.example.tech_service.controller;

import com.example.job_service.model.Technician;
import com.example.tech_service.service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/technicians")
public class TechnicianController {
    @Autowired
    private TechnicianService technicianService;

    @GetMapping
    public ResponseEntity<List<Technician>> getAllTechnicians() {
        try {
            List<Technician> technicians = technicianService.getAllTechnicians();
            return new ResponseEntity<>(technicians, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable String id) {
        Optional<Technician> technician = technicianService.getTechnicianById(id);
        return technician.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Technician> createTechnician(@RequestBody Technician technician) {
        try {
            Technician createdTechnician = technicianService.createTechnician(technician);
            return new ResponseEntity<>(createdTechnician, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Technician> updateTechnician(@PathVariable String id, @RequestBody Technician technician) {
        try {
            Technician updatedTechnician = technicianService.updateTechnician(id, technician);
            return new ResponseEntity<>(updatedTechnician, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechnician(@PathVariable String id) {
        try {
            technicianService.deleteTechnician(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}