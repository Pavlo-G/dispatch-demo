package com.example.job_service.controller;

import com.example.model.Job;
import com.example.job_service.service.JobService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {
    Logger logger = LoggerFactory.getLogger(JobController.class);
    @Autowired
    private JobService jobService;

    @PostMapping
    public ResponseEntity<?> createJob(@RequestBody Job job) {
            Job createdJob = jobService.createJob(job);
            logger.info("Job created with ID: {}", createdJob.getId());
            return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<?> updateJob(@PathVariable String jobId, @RequestBody Job job) {

            Job updatedJob = jobService.updateJob(jobId, job);
            return new ResponseEntity<>(updatedJob, HttpStatus.OK);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<?> deleteJob(@PathVariable String jobId) {
            jobService.deleteJob(jobId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> getAllJobs() {
            List<Job> jobs = jobService.getAllJobs();
            return new ResponseEntity<>(jobs, HttpStatus.OK);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<?> getJobById(@PathVariable String jobId) {
            Job job = jobService.getJobById(jobId);
            return new ResponseEntity<>(job, HttpStatus.OK);
    }
}