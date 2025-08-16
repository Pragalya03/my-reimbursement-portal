package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/register")
public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest request) {
    Department department = departmentRepository.findById(request.getDepartmentId())
        .orElseThrow(() -> new RuntimeException("Department not found"));

    User user = new User();
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    user.setRole(request.getRole());
    user.setEmployeeId(request.getEmployeeId());
    user.setDepartment(department);
    user.setManager(department.getManager());
    user.setCreatedDate(LocalDateTime.now());
    user.setLastLogin(LocalDateTime.now());
    user.setIsActive(true);

    userRepository.save(user);
    return ResponseEntity.ok("User registered successfully");
}


    // ✅ Modified: allow partial update instead of overwriting with nulls
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return userService.updateUserSafe(id, updates);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
