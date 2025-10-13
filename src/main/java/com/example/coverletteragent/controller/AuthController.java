package com.example.coverletteragent.controller;

import com.example.coverletteragent.service.AuthService;
import com.example.coverletteragent.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String authHeader) {
        try {
            String oldJwt = authHeader.substring(7);
            String refreshToken = tokenProvider.getGoogleRefreshTokenFromToken(oldJwt);
            String newJwt = authService.refreshAccessToken(refreshToken);
            return ResponseEntity.ok(Map.of("token", newJwt));
        } catch (Exception e) {
            // This is critical for the frontend to know it must force a re-login
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }
}