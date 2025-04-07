package com.example.dispatch_service.client;

import com.example.model.Job;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Component
public class JobServiceRestClient {

    @Value("${job.service.url}")
    private String jobServiceUrl;

    private final RestTemplate restTemplate;

    public JobServiceRestClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void updateJob(String jobId, Job job) {
        String url = jobServiceUrl + "/jobs/" + jobId;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<Job> requestEntity = new HttpEntity<>(job, headers);
        try {
            ResponseEntity<Job> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Job.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to update job with id: " + jobId);
            }
        } catch (Exception e) {
            // Log the error details
            System.err.println("Error occurred while updating job: " + e.getMessage());
            throw new RuntimeException("Failed to update job with id: " + jobId, e);
        }
    }
}