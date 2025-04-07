package com.example.dispatch_service.controller;

import com.example.model.Dispatch;
import com.example.dispatch_service.service.DispatchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dispatches")
public class DispatchController {

    Logger logger = LoggerFactory.getLogger(DispatchController.class);

    @Autowired
    private DispatchService dispatchService;

    @GetMapping
    public ResponseEntity<?> getAllDispatches() {
        try {
            List<Dispatch> dispatches = dispatchService.getAllDispatches();
            return new ResponseEntity<>(dispatches, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error fetching dispatches: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dispatch> getDispatchById(@PathVariable String id) {
        Optional<Dispatch> dispatch = dispatchService.getDispatchById(id);
        return dispatch.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<?> createDispatch(@RequestBody Dispatch dispatch) {
        try {
          logger.info("Creating dispatch for job: {} and tech:{}", dispatch.getJob().getId(), dispatch.getTechnician().getId());
            Dispatch createdDispatch = dispatchService.createDispatch(dispatch);
            return new ResponseEntity<>(createdDispatch, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating dispatch: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDispatch(@PathVariable String id, @RequestBody Dispatch dispatch) {
        try {
            Dispatch updatedDispatch = dispatchService.updateDispatch(id, dispatch);
            return new ResponseEntity<>(updatedDispatch, HttpStatus.OK);
        } catch (RuntimeException e) {
            logger.error("Error updating dispatch: ", e);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error updating dispatch: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDispatch(@PathVariable String id) {
        try {
            dispatchService.deleteDispatch(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            logger.error("Error deleting dispatch: ", e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            logger.error("Error deleting dispatch: ", e);
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}