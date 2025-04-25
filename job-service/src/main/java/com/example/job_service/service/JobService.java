package com.example.job_service.service;


import com.example.job_service.entity.JobEntity;

import com.example.job_service.repository.JobRepository;
import com.example.job_service.util.IdGenerator;
import com.example.model.Job;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobService {
    Logger logger = LoggerFactory.getLogger(JobService.class);
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private IdGenerator idGenerator;


    public Job createJob(Job job) {
        String newId = idGenerator.generateUniqueId();
        job.setId(newId);
        JobEntity jobEntity =convertToEntity(job);
        jobEntity.setId(newId);
        jobEntity.setJsonData(job.toJson());
        return Job.fromJson(jobRepository.save(jobEntity).getJsonData());
    }

    public Job updateJob(String jobId, Job job) {
        Optional<JobEntity> jobOptional = jobRepository.findById(jobId);
        if (jobOptional.isPresent()) {
            JobEntity jobEntity = jobOptional.get();
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode existingJson = objectMapper.readTree(jobEntity.getJsonData());
                JsonNode incomingJson = objectMapper.readTree(job.toJson());
                JsonNode mergedJson = objectMapper.readerForUpdating(existingJson).readValue(incomingJson);

                jobEntity.setJsonData(mergedJson.toString());
                JobEntity savedJob = jobRepository.save(jobEntity);
                logger.info("Job with ID: {} updated", savedJob.getId());
                return convertToJob(savedJob);
            } catch (Exception e) {
                logger.error("Error updating job with ID: {}", jobId, e);
                throw new RuntimeException("Failed to update job: " + e.getMessage());
            }
        } else {
            logger.error("Job with ID: {} not found for update", jobId);
            throw new RuntimeException("Job not found for id: " + jobId);
        }
    }

    public void deleteJob(String jobId) {
        if (!jobRepository.existsById(jobId)) {
            logger.error("Job with ID: {} not found for update", jobId);
            throw new RuntimeException("Job not found for id: " + jobId);
        }
        jobRepository.deleteById(jobId);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(jobEntity -> Job.fromJson(jobEntity.getJsonData()))
                .collect(Collectors.toList());
    }

    public Job getJobById(String jobId) {
        JobEntity jobEntity = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found for id: " + jobId));
        return Job.fromJson(jobEntity.getJsonData());
    }

    private Job convertToJob(JobEntity entity) {
        return Job.fromJson(entity.getJsonData());
    }

    private JobEntity convertToEntity(Job job) {
        JobEntity entity = new JobEntity();
        entity.setId(job.getId());
        entity.setJsonData(job.toJson());
        return entity;
    }
}