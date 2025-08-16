package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.model.Department;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        user.setManager(userDetails.getManager());
        user.setLastLogin(userDetails.getLastLogin());
        user.setIsActive(userDetails.getIsActive());
        return userRepository.save(user);
    }
    public User updateUserSafe(Long id, User incoming) {
    User existing = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

    // Only update allowed fields
    if (incoming.getUsername() != null) {
        existing.setUsername(incoming.getUsername());
    }
    if (incoming.getEmail() != null) {
        existing.setEmail(incoming.getEmail());
    }
    if (incoming.getPasswordHash() != null) {
        existing.setPasswordHash(incoming.getPasswordHash());
    }
    if (incoming.getRole() != null) {
        existing.setRole(incoming.getRole());
    }
    if (incoming.getEmployeeId() != null) {
        existing.setEmployeeId(incoming.getEmployeeId());
    }
    if (incoming.getDepartment() != null) {
        existing.setDepartment(incoming.getDepartment());
    }
    if (incoming.getManager() != null) {
        existing.setManager(incoming.getManager());
    }
    if (incoming.getIsActive() != null) {
        existing.setIsActive(incoming.getIsActive());
    }

    // never overwrite createdDate or lastLogin here
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
    if (updatedUser.getManager() != null) existingUser.setManager(updatedUser.getManager());
    if (updatedUser.getIsActive() != null) existingUser.setIsActive(updatedUser.getIsActive());

    // lastLogin should not be overwritten by update requests
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
