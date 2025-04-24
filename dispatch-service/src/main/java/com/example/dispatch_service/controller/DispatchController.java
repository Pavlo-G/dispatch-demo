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
            List<Dispatch> dispatches = dispatchService.getAllDispatches();
            return new ResponseEntity<>(dispatches, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dispatch> getDispatchById(@PathVariable String id) {
        Optional<Dispatch> dispatch = dispatchService.getDispatchById(id);
        return dispatch.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseThrow(()-> new RuntimeException("Dispatch not found for id: " + id));
    }

    @PostMapping
    public ResponseEntity<?> createDispatch(@RequestBody Dispatch dispatch) {
          logger.info("Creating dispatch for job: {} and tech:{}", dispatch.getJob().getId(), dispatch.getTechnician().getId());
            Dispatch createdDispatch = dispatchService.createDispatch(dispatch);
            return new ResponseEntity<>(createdDispatch, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDispatch(@PathVariable String id, @RequestBody Dispatch dispatch) {
            Dispatch updatedDispatch = dispatchService.updateDispatch(id, dispatch);
            return new ResponseEntity<>(updatedDispatch, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDispatch(@PathVariable String id) {
            dispatchService.deleteDispatch(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}