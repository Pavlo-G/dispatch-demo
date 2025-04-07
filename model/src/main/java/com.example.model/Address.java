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
public class Address {
    private String streetName;
    private String streetNumber;
    private String city;
    private String province;
    private String postalCode;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Address() {
    }

    public String getStreetName() {
        return this.streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetNumber() {
        return this.streetNumber;
    }

    public void setStreetNumber(String streetNumber) {
        this.streetNumber = streetNumber;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return this.province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getPostalCode() {
        return this.postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String toString() {
        return "Address{streetName='" + this.streetName + "', streetNumber='" + this.streetNumber + "', city='" + this.city + "', province='" + this.province + "', postalCode='" + this.postalCode + "'}";
    }

    public String toJson() {
        try {
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting Address to JSON", e);
        }
    }

    public static Address fromJson(String json) {
        try {
            return objectMapper.readValue(json, Address.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting JSON to Address", e);
        }
    }
}