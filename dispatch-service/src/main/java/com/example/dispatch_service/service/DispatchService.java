package com.example.dispatch_service.service;

import com.example.dispatch_service.entity.DispatchEntity;
import com.example.dispatch_service.repository.DispatchRepository;
import com.example.job_service.model.Dispatch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DispatchService {

    @Autowired
    private DispatchRepository dispatchRepository;

    public List<Dispatch> getAllDispatches() {
        List<DispatchEntity> entities = dispatchRepository.findAll();
        return entities.stream().map(this::convertToDispatch).collect(Collectors.toList());
    }

    public Optional<Dispatch> getDispatchById(String id) {
        Optional<DispatchEntity> entity = dispatchRepository.findById(id);
        return entity.map(this::convertToDispatch);
    }

    public Dispatch createDispatch(Dispatch dispatch) {
        DispatchEntity entity = convertToEntity(dispatch);
        DispatchEntity savedEntity = dispatchRepository.save(entity);
        return convertToDispatch(savedEntity);
    }

    public Dispatch updateDispatch(String id, Dispatch dispatch) {
        if (!dispatchRepository.existsById(id)) {
            throw new RuntimeException("Dispatch not found");
        }
        DispatchEntity entity = convertToEntity(dispatch);
        entity.setId(id);
        DispatchEntity updatedEntity = dispatchRepository.save(entity);
        return convertToDispatch(updatedEntity);
    }

    public void deleteDispatch(String id) {
        if (!dispatchRepository.existsById(id)) {
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