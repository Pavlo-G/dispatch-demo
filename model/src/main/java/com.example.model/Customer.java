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
public class Customer {
    private String firstName;
    private String lastName;
    private String contactNumber;
    private Set<String> phoneNumbers;
    private Address address;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Customer() {
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

    public String getContactNumber() {
        return this.contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Set<String> getPhoneNumbers() {
        return phoneNumbers;
    }

    public void setPhoneNumbers(Set<String> phoneNumbers) {
        this.phoneNumbers = phoneNumbers;
    }

    public Address getAddress() {
        return this.address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String toString() {
        return "Customer{firstName='" + firstName + "', lastName='" + this.lastName + "', contactNumber='" + this.contactNumber + "', phoneNumbers=" + String.valueOf(this.phoneNumbers) + ", address=" + String.valueOf(this.address) + "}";
    }

    public String toJson() {
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Customer to JSON", e);
        }
    }

    public static Customer fromJson(String json) {
        try {
            return objectMapper.readValue(json, Customer.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to Customer", e);
        }
    }
}
