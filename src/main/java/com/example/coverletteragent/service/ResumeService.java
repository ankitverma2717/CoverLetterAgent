package com.example.coverletteragent.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ResumeService {
    byte[] craftResume(MultipartFile resume, String jobDescription, String apiKey) throws IOException;
}
