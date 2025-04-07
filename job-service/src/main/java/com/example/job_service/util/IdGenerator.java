package com.example.job_service.util;


import com.example.job_service.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class IdGenerator {

    private static final String PREFIX = "JOB";
    private static final Random RANDOM = new Random();

    @Autowired
    private JobRepository jobRepository;

    public String generateUniqueId() {
        String id;
        do {
            int number = RANDOM.nextInt(10000); // Generates a number between 0 and 9999
            id = PREFIX + String.format("%04d", number); // Formats the number to 4 digits with leading zeros
        } while (jobRepository.existsById(id));
        return id;
    }
}