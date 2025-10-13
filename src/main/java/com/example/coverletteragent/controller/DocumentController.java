package com.example.coverletteragent.controller;

import com.example.coverletteragent.service.GoogleDocsService;
import com.example.coverletteragent.service.JwtTokenProvider;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/document")
@RequiredArgsConstructor
public class DocumentController {

    private final GoogleDocsService googleDocsService;
    private final JwtTokenProvider tokenProvider;

    @GetMapping("/{documentId}/download")
    public void downloadDocument(
            @PathVariable String documentId,
            // Make header optional
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            // Add token as an optional query parameter
            @RequestParam(value = "token", required = false) String tokenParam,
            HttpServletResponse response) {

        String jwt = null;

        // Prefer the header, but fall back to the query parameter
        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
        } else if (StringUtils.hasText(tokenParam)) {
            jwt = tokenParam;
        }

        if (jwt == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        try {
            String refreshToken = tokenProvider.getGoogleRefreshTokenFromToken(jwt);

            response.setContentType("application/pdf");
            // Use "inline" for preview, "attachment" for forced download
            response.setHeader("Content-Disposition", "inline; filename=\"CoverLetter.pdf\"");

            googleDocsService.downloadAsPdf(refreshToken, documentId, response.getOutputStream());

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            e.printStackTrace();
        }
    }
}