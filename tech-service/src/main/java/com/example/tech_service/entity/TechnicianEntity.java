package com.example.tech_service.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Technician")
public class TechnicianEntity {

    @Id
    private String id;
    private String jsonData;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setJsonData(String jsonData) {
        this.jsonData = jsonData;
    }
}
