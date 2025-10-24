package com.example.coverletteragent.service;

import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final AIService aiService;
    private final LatexService latexService;

    @Override
    public byte[] craftResume(MultipartFile resume, String jobDescription, String apiKey) throws IOException {
        String resumeText = extractTextFromPdf(resume);
        String transformedContent = aiService.transformResumeContent(resumeText, jobDescription, apiKey);
        return latexService.createLatexProjectZip(transformedContent);
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = Loader.loadPDF(file.getBytes())) {
            return new PDFTextStripper().getText(document);
        }
    }
}
