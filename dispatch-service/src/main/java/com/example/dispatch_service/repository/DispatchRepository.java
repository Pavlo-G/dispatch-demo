package com.example.dispatch_service.repository;

import com.example.dispatch_service.entity.DispatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DispatchRepository extends JpaRepository<DispatchEntity, String> {
}