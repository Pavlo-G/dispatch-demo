package com.example.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(
        ignoreUnknown = true
)
public class Dispatch {
    private String id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private OffsetDateTime appointmentDateTime;
    private Job job;
    private Technician technician;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Dispatch() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public OffsetDateTime getAppointmentDateTime() {
        return appointmentDateTime;
    }

    public void setAppointmentDateTime(OffsetDateTime appointmentDateTime) {
        this.appointmentDateTime = appointmentDateTime;
    }

    public Job getJob() {
        return this.job;
    }

    public void setJob(Job job) {
        this.job = job;
    }

    public Technician getTechnician() {
        return this.technician;
    }

    public void setTechnician(Technician technician) {
        this.technician = technician;
    }

    public String toString() {
        return "Dispatch{id='" + id + "', appointmentDateTime='" + String.valueOf(this.appointmentDateTime) + "', job=" + String.valueOf(this.job) + ", technician=" + String.valueOf(this.technician) + "}";
    }

    public String toJson() {
        try {
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Dispatch to JSON", e);
        }
    }

    public static Dispatch fromJson(String json) {
        try {
            return objectMapper.readValue(json, Dispatch.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to Dispatch", e);
        }
    }
}
