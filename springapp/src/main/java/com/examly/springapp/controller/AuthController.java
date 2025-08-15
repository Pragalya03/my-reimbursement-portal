package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import com.examly.springapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Register a new user
     */
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        // This will hash the password and save the user
        return userService.registerUser(user);
    }

    /**
     * Login user and return JWT token
     */
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        User user = userService.loginUser(request.getUsernameOrEmail(), request.getPassword());
        String token = jwtUtil.generateToken(user.getUsername());
        return Map.of("token", token); // {"token": "jwt_here"}
    }

    // DTO for login request
    public static class LoginRequest {
        private String usernameOrEmail;
        private String password;

        public String getUsernameOrEmail() { return usernameOrEmail; }
        public void setUsernameOrEmail(String usernameOrEmail) { this.usernameOrEmail = usernameOrEmail; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
