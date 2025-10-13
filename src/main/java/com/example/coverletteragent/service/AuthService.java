package com.example.coverletteragent.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleRefreshTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    public String refreshAccessToken(String refreshToken) throws IOException {
        GoogleTokenResponse tokenResponse = new GoogleRefreshTokenRequest(
                new NetHttpTransport(),
                new GsonFactory(),
                refreshToken,
                clientId,
                clientSecret
        ).execute();

        String newAccessToken = tokenResponse.getAccessToken();

        // We need to create a dummy Authentication object to pass to the token provider.
        // The details don't matter as much as the new access token.
        var principal = new org.springframework.security.core.userdetails.User("user", "", Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        var dummyAuth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());

        // We create a new JWT for our app, containing the NEW Google Access Token
        // but the SAME long-lived Google Refresh Token.
        return jwtTokenProvider.createToken(dummyAuth, newAccessToken, refreshToken);
    }
}