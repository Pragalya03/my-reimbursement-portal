package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.model.Department;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.Map;

@Service
public class UserService {
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    public User createUser(User user) {
        if(user.getDepartment()!=null && user.getDepartment().getId()!=null){
            Department dept=departmentRepository.findById(user.getDepartment().getId())
            .orElseThrow(()->new RuntimeException("Invalid department id"));
        user.setDepartment(dept);
        }
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setPasswordHash(userDetails.getPasswordHash());
        user.setRole(userDetails.getRole());
        user.setEmployeeId(userDetails.getEmployeeId());
        user.setDepartment(userDetails.getDepartment());
        user.setIsActive(userDetails.getIsActive());
        return userRepository.save(user);
    }
    public User updateUserSafe(Long id, Map<String, Object> updates) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    
        if (updates.containsKey("username")) {
            existing.setUsername(updates.get("username").toString());
        }
        if (updates.containsKey("email")) {
            existing.setEmail(updates.get("email").toString());
        }
        if (updates.containsKey("role")) {
            try {
                existing.setRole(User.Role.valueOf(updates.get("role").toString().toUpperCase()));
            } catch (IllegalArgumentException e) {
            }
        }
        if (updates.containsKey("password")) {
            existing.setPasswordHash(updates.get("password").toString());
        }
    
        return userRepository.save(existing);
    }


    public User updateUserPartial(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    
        if (updatedUser.getUsername() != null) existingUser.setUsername(updatedUser.getUsername());
        if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPasswordHash() != null) existingUser.setPasswordHash(updatedUser.getPasswordHash());
        if (updatedUser.getRole() != null) existingUser.setRole(updatedUser.getRole());
        if (updatedUser.getEmployeeId() != null) existingUser.setEmployeeId(updatedUser.getEmployeeId());
        if (updatedUser.getDepartment() != null) existingUser.setDepartment(updatedUser.getDepartment());
        if (updatedUser.getIsActive() != null) existingUser.setIsActive(updatedUser.getIsActive());
    
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username " + username));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email " + email));
    }
}
