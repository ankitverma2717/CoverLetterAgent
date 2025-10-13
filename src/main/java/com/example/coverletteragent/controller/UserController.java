package com.example.coverletteragent.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @GetMapping("/api/v1/user")
    public Map<String, String> getUser(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            // This case shouldn't be hit if security is configured correctly,
            // but it's good practice. Spring Security will return 401 before this.
            return null;
        }
        // Return the user's name from their Google profile
        return Map.of("name", principal.getAttribute("name"));
    }
}