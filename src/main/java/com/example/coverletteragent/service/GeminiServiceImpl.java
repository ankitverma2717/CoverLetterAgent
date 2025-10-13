package com.example.coverletteragent.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Service
public class GeminiServiceImpl implements AIService {

    private static final Logger logger = LoggerFactory.getLogger(GeminiServiceImpl.class);

    @Value("${ai.provider.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String generateCoverLetterBody(String resumeText, String templateText, String jobDescription, String apiKey) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // --- START OF FIX: Calculate current date in India ---
        ZoneId indiaZoneId = ZoneId.of("Asia/Kolkata");
        LocalDate today = LocalDate.now(indiaZoneId);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH);
        String formattedDate = today.format(formatter);
        // --- END OF FIX ---

        String prompt = buildMasterPrompt(resumeText, jobDescription, formattedDate); // Pass the formatted date to the prompt
        String requestBody = buildGeminiRequestBody(prompt);
        String finalUrl = apiUrl + "?key=" + apiKey;
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);
        try {
            String response = restTemplate.postForObject(finalUrl, request, String.class);
            return parseGeminiResponse(response);
        } catch (Exception e) {
            logger.error("Error calling Gemini API: {}", e.getMessage());
            return "Error: Could not generate cover letter due to an API issue.";
        }
    }

    private String buildMasterPrompt(String resumeText, String jobDescription, String currentDate) {
        return """
        You are an expert career assistant and professional writer. Your mission is to generate a well-proportioned and impactful cover letter that fits comfortably on a single page.

        **CRITICAL INSTRUCTIONS:**

        1.  **ANALYZE THE RESUME:** From the provided resume text, you MUST extract the following details for the applicant:
            *   Full Name
            *   Location (e.g., City, State)
            *   Phone Number
            *   Email Address
            *   Analyze the applicant's projects and professional experience to understand their key skills and achievements.

        2.  **ANALYZE THE JOB DESCRIPTION:** From the job description, you MUST identify:
            *   The Job Title/Position they are applying for.
            *   The Company Name.
            *   The Company's Location (if available). If no location is mentioned, you MUST omit the company address line completely.

        3.  **GENERATE A DYNAMIC COVER LETTER:** You will now write a professional cover letter.
            *   The main body (3-4 paragraphs) MUST be dynamically generated. It should connect the applicant's specific experiences and skills from their resume directly to the key requirements mentioned in the job description.
            *   Use a confident, direct, and professional tone. Focus on results and achievements.

        4.  **STRICT FORMATTING RULES:** You must structure your entire output using the following markers ONLY. Do not add any other text or explanation.
            *   `[H1]` for the applicant's name (extracted from the resume).
            *   `[H2]` for each line of the applicant's contact details (Location, Phone, Email - extracted from the resume).
            *   `[DATE]` **You must use the exact date string provided here: %s**.
            *   `[H3]` for each line of the recipient's details (Hiring Manager, Company Name, and optional Company Location - identified from the job description).
            *   `[SUBJECT]` for the Subject line (referencing the identified Job Title).
            *   `[GREETING]` for the salutation.
            *   `[P]` for each regular paragraph in the body of the letter.
            *   `[CLOSING]` for the sign-off.

        **EXAMPLE OUTPUT FORMAT:**
        [H1]Ankit Verma
        [H2]Ahmedabad, Gujarat
        [H2]+91 9104146947
        [H2]ankitv2717@outlook.com
        [DATE]%s
        [H3]Hiring Manager
        [H3]Mastercard
        [H3]Pune, Maharashtra
        [SUBJECT]Subject: Application for Senior Software Engineer Position
        [GREETING]Dear Hiring Manager,
        [P]I am writing to express my great enthusiasm to apply for the Senior Software Engineer position at Mastercard, which I found on LinkedIn. Having reviewed the requirements, I am confident that my experience in developing robust software solutions and my skills in Java and Spring Boot align perfectly with the responsibilities of this role.
        [P]In my previous role at...
        [CLOSING]Sincerely,
        [H1]Ankit Verma

        ---
        MY RESUME:
        %s

        ---
        JOB DESCRIPTION:
        %s
        """.formatted(currentDate, currentDate, resumeText, jobDescription);
    }

    private String buildGeminiRequestBody(String prompt) {
        String escapedPrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n");
        return """
        {
            "contents": [{
                "parts": [{
                    "text": "%s"
                }]
            }]
        }
        """.formatted(escapedPrompt);
    }

    private String parseGeminiResponse(String jsonResponse) {
        try {
            GeminiResponse response = objectMapper.readValue(jsonResponse, GeminiResponse.class);
            if (response != null && response.candidates != null && !response.candidates.isEmpty()) {
                GeminiCandidate firstCandidate = response.candidates.get(0);
                if (firstCandidate.content != null && firstCandidate.content.parts != null && !firstCandidate.content.parts.isEmpty()) {
                    return firstCandidate.content.parts.get(0).text;
                }
            }
            return "Error: Could not find content in AI response.";
        } catch (Exception e) {
            return "Error parsing AI response.";
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeminiResponse { public List<GeminiCandidate> candidates; }
    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeminiCandidate { public GeminiContent content; }
    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeminiContent { public List<GeminiPart> parts; }
    @JsonIgnoreProperties(ignoreUnknown = true)
    private static class GeminiPart { public String text; }
}