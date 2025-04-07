package com.example.dispatch_service.service;

import com.example.dispatch_service.client.JobServiceRestClient;
import com.example.dispatch_service.controller.DispatchController;
import com.example.dispatch_service.entity.DispatchEntity;
import com.example.dispatch_service.repository.DispatchRepository;
import com.example.dispatch_service.util.IdGenerator;
import com.example.model.Dispatch;
import com.example.model.Job;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DispatchService {
    Logger logger = LoggerFactory.getLogger(DispatchService.class);
    @Autowired
    private DispatchRepository dispatchRepository;
    @Autowired
    private JobServiceRestClient jobServiceRestClient;
    @Autowired
    private IdGenerator idGenerator;

    public List<Dispatch> getAllDispatches() {
        List<DispatchEntity> entities = dispatchRepository.findAll();
        return entities.stream().map(this::convertToDispatch).collect(Collectors.toList());
    }

    public Optional<Dispatch> getDispatchById(String id) {
        Optional<DispatchEntity> entity = dispatchRepository.findById(id);
        return entity.map(this::convertToDispatch);
    }

    public Dispatch createDispatch(Dispatch dispatch) {
        String newId = idGenerator.generateUniqueId();
        dispatch.setId(newId);

        Job jobToUpdate = dispatch.getJob();
        jobToUpdate.setState("SCHEDULED");
        jobToUpdate.setDispatchId(dispatch.getId());
        jobToUpdate.setTechnicianId(dispatch.getTechnician().getId());
        jobServiceRestClient.updateJob(jobToUpdate.getId(), jobToUpdate);

        DispatchEntity entity = convertToEntity(dispatch);
        entity.setId(newId);
        DispatchEntity savedEntity = dispatchRepository.save(entity);
        logger.info("Dispatch created with ID: {}, for job: {} and tech: {}", savedEntity.getId(),jobToUpdate.getId(), jobToUpdate.getTechnicianId());
        return convertToDispatch(savedEntity);
    }

    public Dispatch updateDispatch(String id, Dispatch dispatch) {
        if (!dispatchRepository.existsById(id)) {
            logger.error("Dispatch with ID: {} not found for update", id);
            throw new RuntimeException("Dispatch not found");
        }
        DispatchEntity entity = convertToEntity(dispatch);
        entity.setId(id);
        DispatchEntity updatedEntity = dispatchRepository.save(entity);
        return convertToDispatch(updatedEntity);
    }
    public void deleteDispatch(String id) {
        if (!dispatchRepository.existsById(id)) {
            logger.error("Dispatch with ID: {} not found for update", id);
            throw new RuntimeException("Dispatch not found");
        }
        dispatchRepository.deleteById(id);
    }

    private Dispatch convertToDispatch(DispatchEntity entity) {
        return Dispatch.fromJson(entity.getJsonData());
    }

    private DispatchEntity convertToEntity(Dispatch dispatch) {
        DispatchEntity entity = new DispatchEntity();
        entity.setId(dispatch.getId());
        entity.setJsonData(dispatch.toJson());
        return entity;
    }
}