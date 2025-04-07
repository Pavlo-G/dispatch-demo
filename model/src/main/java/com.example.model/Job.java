package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(
        ignoreUnknown = true
)
public class Job {
    private String id;
    private String state;
    private Address address;
    private Customer customer;
    private String technicianId;
    private String dispatchId;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Job() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getState() {
        return this.state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getDispatchId() {
        return dispatchId;
    }

    public void setDispatchId(String dispatchId) {
        this.dispatchId = dispatchId;
    }

    public String getTechnicianId() {
        return technicianId;
    }

    public void setTechnicianId(String technicianId) {
        this.technicianId = technicianId;
    }

    public String toString() {
        return "Job{state='" + state + "', address=" + String.valueOf(address) + ", customer=" + String.valueOf(customer) + ", technicianId=" + technicianId + ", dispatchId=" + dispatchId + "}";
    }

    public String toJson() {
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Job to JSON", e);
        }
    }

    public static Job fromJson(String json) {
        try {
            return objectMapper.readValue(json, Job.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to Job", e);
        }
    }
}
