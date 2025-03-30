package com.example.job_service.service;


import com.example.job_service.entity.JobEntity;
import com.example.job_service.model.Job;
import com.example.job_service.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public Job createJob(Job job) {
        JobEntity jobEntity = new JobEntity();
        jobEntity.setJsonData(job.toJson());
        return Job.fromJson(jobRepository.save(jobEntity).getJsonData());
    }

    public Job updateJob(String jobId, Job job) {
        Optional<JobEntity> jobOptional = jobRepository.findById(jobId);
        if (jobOptional.isPresent()) {
            JobEntity jobEntity = jobOptional.get();
            jobEntity.setJsonData(job.toJson());
            return Job.fromJson(jobRepository.save(jobEntity).getJsonData());
        } else {
            throw new RuntimeException("Job not found");
        }
    }

    public void deleteJob(String jobId) {
        jobRepository.deleteById(jobId);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll().stream()
                .map(jobEntity -> Job.fromJson(jobEntity.getJsonData()))
                .collect(Collectors.toList());
    }

    public Job getJobById(String jobId) {
        JobEntity jobEntity = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));
        return Job.fromJson(jobEntity.getJsonData());
    }
}