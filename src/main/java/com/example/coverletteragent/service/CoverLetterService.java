package com.example.coverletteragent.service;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.security.GeneralSecurityException;

public interface CoverLetterService {
    // Method 1: Generates text
    String generateContent(MultipartFile resume, String jobDescription, String apiKey) throws IOException;

    // Method 2: MODIFIED signature
    String createGoogleDoc(String googleRefreshToken, String title, String content) throws IOException, GeneralSecurityException;
}