package com.example.coverletteragent.controller;

import com.example.coverletteragent.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/craft")
    public ResponseEntity<byte[]> craftResume(
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam("apiKey") String apiKey) {
        try {
            byte[] zipBytes = resumeService.craftResume(resume, jobDescription, apiKey);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"resume.zip\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(zipBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
