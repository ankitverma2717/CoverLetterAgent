package com.example.coverletteragent.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.docs.v1.Docs;
import com.google.api.services.docs.v1.model.*;
import com.google.api.services.drive.Drive;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.UserCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Service
public class GoogleDocsService {

    private static final String APPLICATION_NAME = "AI Cover Letter Agent";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;
    
    @Value("${spring.security.oauth2.client.provider.google.token-uri}")
    private String tokenUri;

    private UserCredentials getCredentials(String refreshToken) {
        try {
            return UserCredentials.newBuilder()
                    .setClientId(clientId)
                    .setClientSecret(clientSecret)
                    .setRefreshToken(refreshToken)
                    .setTokenServerUri(new java.net.URI(tokenUri))
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to create credentials", e);
        }
    }

    public String createCoverLetter(String googleRefreshToken, String documentTitle, String aiContent)
            throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        UserCredentials credentials = getCredentials(googleRefreshToken);
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);

        Docs docsService = new Docs.Builder(HTTP_TRANSPORT, JSON_FACTORY, requestInitializer)
                .setApplicationName(APPLICATION_NAME)
                .build();

        Document document = new Document().setTitle(documentTitle);
        document = docsService.documents().create(document).execute();
        String documentId = document.getDocumentId();

        List<Request> requests = parseAiContentToRequests(aiContent);

        double marginInPoints = 36.0; // 0.5 inches
        requests.add(new Request().setUpdateDocumentStyle(new UpdateDocumentStyleRequest()
                .setDocumentStyle(new DocumentStyle()
                        .setMarginTop(new Dimension().setMagnitude(marginInPoints).setUnit("PT"))
                        .setMarginBottom(new Dimension().setMagnitude(marginInPoints).setUnit("PT"))
                        .setMarginLeft(new Dimension().setMagnitude(marginInPoints).setUnit("PT"))
                        .setMarginRight(new Dimension().setMagnitude(marginInPoints).setUnit("PT")))
                .setFields("marginTop,marginBottom,marginLeft,marginRight")
        ));

        if (!requests.isEmpty()) {
            BatchUpdateDocumentRequest body = new BatchUpdateDocumentRequest().setRequests(requests);
            docsService.documents().batchUpdate(documentId, body).execute();
        }

        return documentId;
    }

    public void downloadAsPdf(String refreshToken, String documentId, OutputStream outputStream)
            throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        UserCredentials credentials = getCredentials(refreshToken);
        HttpRequestInitializer requestInitializer = new HttpCredentialsAdapter(credentials);

        Drive driveService = new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, requestInitializer)
                .setApplicationName(APPLICATION_NAME)
                .build();

        driveService.files().export(documentId, "application/pdf").executeMediaAndDownloadTo(outputStream);
    }

    // --- FINAL AND CORRECTED PARSING LOGIC ---
    private List<Request> parseAiContentToRequests(String aiContent) {
        List<Request> requests = new ArrayList<>();
        int currentIndex = 1;
        String[] lines = aiContent.split("\n");
        boolean closingTagProcessed = false;

        for (String line : lines) {
            String originalLine = line.trim();
            if (originalLine.isEmpty()) {
                requests.add(new Request().setInsertText(new InsertTextRequest().setText("\n").setLocation(new Location().setIndex(currentIndex))));
                currentIndex++;
                continue;
            }

            String text;
            ParagraphStyle paragraphStyle = new ParagraphStyle();
            TextStyle textStyle = new TextStyle();
            StringJoiner paragraphFields = new StringJoiner(",");
            StringJoiner textFields = new StringJoiner(",");

            textStyle.setWeightedFontFamily(new WeightedFontFamily().setFontFamily("Times New Roman"));
            textFields.add("weightedFontFamily");
            textStyle.setFontSize(new Dimension().setMagnitude(11.0).setUnit("PT"));
            textFields.add("fontSize");

            if (originalLine.startsWith("[H1]")) {
                text = originalLine.substring(4).trim() + "\n";
                if (closingTagProcessed) {
                    // FIX: This is the SIGNATURE line. Match the font size to the body text (11pt) and ensure it's not bold.
                    textStyle.setFontSize(new Dimension().setMagnitude(11.0).setUnit("PT")).setBold(false);
                    textFields.add("fontSize,bold");
                } else {
                    // This is the main HEADER line. Make it bold.
                    textStyle.setFontSize(new Dimension().setMagnitude(13.0).setUnit("PT")).setBold(true);
                    textFields.add("fontSize,bold");
                }
            } else if (originalLine.startsWith("[H2]")) {
                text = originalLine.substring(4).trim() + "\n";
            } else if (originalLine.startsWith("[DATE]")) {
                text = "\n" + originalLine.substring(6).trim() + "\n\n";
            } else if (originalLine.startsWith("[H3]")) {
                text = originalLine.substring(4).trim() + "\n";
            } else if (originalLine.startsWith("[SUBJECT]")) {
                text = "\n" + originalLine.substring(9).trim() + "\n\n";
            } else if (originalLine.startsWith("[GREETING]")) {
                text = originalLine.substring(10).trim() + "\n\n";
            } else if (originalLine.startsWith("[P]")) {
                text = originalLine.substring(3).trim() + "\n\n";
                paragraphStyle.setAlignment("JUSTIFIED");
                paragraphFields.add("alignment");
            } else if (originalLine.startsWith("[CLOSING]")) {
                // FIX: Reduced newlines to remove unwanted space before the signature name.
                text = originalLine.substring(9).trim() + "\n";
                closingTagProcessed = true;
            } else {
                text = originalLine + "\n";
            }

            requests.add(new Request().setInsertText(new InsertTextRequest().setText(text).setLocation(new Location().setIndex(currentIndex))));

            int endIndex = currentIndex + text.length();
            if (endIndex > currentIndex) {
                paragraphStyle.setLineSpacing(115f); // 1.15 line spacing
                paragraphFields.add("lineSpacing");

                requests.add(new Request().setUpdateParagraphStyle(new UpdateParagraphStyleRequest()
                        .setRange(new Range().setStartIndex(currentIndex).setEndIndex(endIndex > currentIndex ? endIndex -1: currentIndex))
                        .setParagraphStyle(paragraphStyle)
                        .setFields(paragraphFields.toString())));

                requests.add(new Request().setUpdateTextStyle(new UpdateTextStyleRequest()
                        .setRange(new Range().setStartIndex(currentIndex).setEndIndex(endIndex > currentIndex ? endIndex -1: currentIndex))
                        .setTextStyle(textStyle)
                        .setFields(textFields.toString())));
            }
            currentIndex = endIndex;
        }
        return requests;
    }
}