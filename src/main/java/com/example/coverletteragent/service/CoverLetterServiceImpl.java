package com.example.coverletteragent.service;

import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.security.GeneralSecurityException;

@Service
@RequiredArgsConstructor
public class CoverLetterServiceImpl implements CoverLetterService {

    private static final Logger logger = LoggerFactory.getLogger(CoverLetterServiceImpl.class);
    private final AIService aiService;
    private final GoogleDocsService googleDocsService;

    @Override
    public String generateContent(MultipartFile resume, String jobDescription, String apiKey) throws IOException {
        logger.info("Generating content...");
        String resumeText = extractTextFromPdf(resume);
        String aiGeneratedContent = aiService.generateCoverLetterBody(resumeText, "", jobDescription, apiKey);
        logger.info("Content generation complete.");
        return aiGeneratedContent;
    }

    @Override
    public String createGoogleDoc(String googleRefreshToken, String title, String content)
            throws IOException, GeneralSecurityException {
        if (googleRefreshToken == null || googleRefreshToken.isEmpty()) {
            logger.error("Refresh token is null or empty - cannot create Google Doc");
            throw new IllegalArgumentException("Google refresh token is required to create documents. Please log out and log in again.");
        }
        
        logger.info("Creating Google Doc using refresh token...");
        try {
            // This now returns the document ID
            String documentId = googleDocsService.createCoverLetter(googleRefreshToken, title, content);
            logger.info("Successfully created Google Doc with ID: {}", documentId);
            return documentId;
        } catch (Exception e) {
            logger.error("Failed to create Google Doc: {}", e.getMessage(), e);
            throw new IOException("Failed to create Google Doc. This may be due to expired credentials. Please log out and log in again.", e);
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        byte[] fileBytes = file.getInputStream().readAllBytes();
        try (PDDocument document = Loader.loadPDF(fileBytes)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            return pdfStripper.getText(document);
        }
    }
}