package com.example.coverletteragent.config;

import com.example.coverletteragent.service.JwtTokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider tokenProvider;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

        OAuth2AuthorizedClient authorizedClient = authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName()
        );

        String accessToken = authorizedClient.getAccessToken().getTokenValue();
        String refreshToken = authorizedClient.getRefreshToken() != null ? authorizedClient.getRefreshToken().getTokenValue() : null;

        // If no refresh token is available, redirect with an error
        if (refreshToken == null || refreshToken.isEmpty()) {
            String errorRedirectUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                    .queryParam("error", "no_refresh_token")
                    .queryParam("message", "Please revoke app access in your Google Account settings and log in again")
                    .build().toUriString();
            response.sendRedirect(errorRedirectUrl);
            return;
        }

        String jwt = tokenProvider.createToken(authentication, accessToken, refreshToken);

        String redirectUrl = UriComponentsBuilder.fromUriString(frontendUrl)
                .queryParam("token", jwt)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }
}
