package com.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import java.util.Set;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(
        ignoreUnknown = true
)
public class Technician {
    private String firstName;
    private String lastName;
    private String id;
    private Set<String> skills;
    private String phoneNumber;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Technician() {
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<String> getSkills() {
        return skills;
    }

    public void setSkills(Set<String> skills) {
        this.skills = skills;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String toString() {
        return "Technician{firstName='" + firstName + "', lastName='" + this.lastName + "', id='" + this.id + "', skills=" + String.valueOf(this.skills) + ", phoneNumber='" + this.phoneNumber + "'}";
    }

    public String toJson() {
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Technician to JSON", e);
        }
    }

    public static Technician fromJson(String json) {
        try {
            return objectMapper.readValue(json, Technician.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to Technician", e);
        }
    }
}
