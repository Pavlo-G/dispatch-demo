package com.example.dispatch_service.client;

import com.example.dispatch_service.controller.DispatchController;
import com.example.model.Job;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Component
public class JobServiceRestClient {

    Logger logger = LoggerFactory.getLogger(JobServiceRestClient.class);

    @Value("${job.service.url}")
    private String jobServiceUrl;

    private final RestTemplate restTemplate;

    public JobServiceRestClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void updateJob(String jobId, Job job) {
        logger.info("Updating job with id: {}", jobId);
        String url = jobServiceUrl + "/jobs/" + jobId;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");
        HttpEntity<Job> requestEntity = new HttpEntity<>(job, headers);
        try {
            ResponseEntity<Job> response = restTemplate.exchange(url, HttpMethod.PUT, requestEntity, Job.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                logger.error("Failed to update job with id: {}. Status code: {}", jobId, response);
                throw new RuntimeException("Failed to update job with id: " + jobId);
            }else{
                logger.info("Successfully updated job with id: {}", jobId);
            }
        } catch (Exception e) {
            // Log the error details
            logger.error("Error occurred while updating job: {} ", jobId, e);
            throw new RuntimeException("Failed to update job with id: " + jobId, e);
        }
    }
}