package com.example.tech_service.repository;


import com.example.tech_service.entity.TechnicianEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicianRepository extends JpaRepository<TechnicianEntity, String> {
}