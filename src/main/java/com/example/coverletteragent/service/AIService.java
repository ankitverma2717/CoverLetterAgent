package com.example.coverletteragent.service;

public interface AIService {
    String generateCoverLetterBody(String resumeText, String templateText, String jobDescription, String apiKey);
    String transformResumeContent(String resumeText, String jobDescription, String apiKey);
}
