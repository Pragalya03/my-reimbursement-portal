package com.examly.springapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@Profile("test") // Only active in "test" profile
public class TestSecurityConfig {

    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // disable CSRF
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // allow all requests
        return http.build();
    }
}
