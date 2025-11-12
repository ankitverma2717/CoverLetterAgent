package com.example.coverletteragent.controller;

import com.example.coverletteragent.service.CoverLetterService;
import com.example.coverletteragent.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/cover-letter")
@RequiredArgsConstructor
public class CoverLetterController {

    private final CoverLetterService coverLetterService;

    private final JwtTokenProvider tokenProvider;

    // ENDPOINT 1: Generates ONLY the text content
    @PostMapping("/generate-content")
    public ResponseEntity<Map<String, String>> generateContent(
            @RequestParam("resumes") MultipartFile[] resumes,
            @RequestParam("jobDescription") String jobDescription,
            @RequestParam("apiKey") String apiKey) throws IOException {

        if (resumes == null || resumes.length == 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "No resume file provided."));
        }
        MultipartFile resume = resumes[0];

        String aiContent = coverLetterService.generateContent(resume, jobDescription, apiKey);
        return ResponseEntity.ok(Map.of("content", aiContent));
    }

    @PostMapping("/create-document")
    public ResponseEntity<Map<String, String>> createDocument(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CreateDocRequest request) {

        try {
            String jwt = authHeader.substring(7);
            String googleRefreshToken = tokenProvider.getGoogleRefreshTokenFromToken(jwt);

            if (googleRefreshToken == null || googleRefreshToken.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of(
                    "error", "No refresh token available. Please log out and log in again to grant document creation permissions."
                ));
            }

            // MODIFIED: This now returns the document ID
            String documentId = coverLetterService.createGoogleDoc(
                    googleRefreshToken,
                    request.getTitle(),
                    request.getContent()
            );
            // Return the ID, not the URL
            return ResponseEntity.ok(Map.of("documentId", documentId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "error", "Failed to create document: " + e.getMessage()
            ));
        }
    }
}