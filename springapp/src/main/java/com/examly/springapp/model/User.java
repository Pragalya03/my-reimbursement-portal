package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "users")
public class User {

    public enum Role {
        EMPLOYEE, MANAGER, FINANCE_MANAGER, ADMIN, AUDITOR
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false, length = 50)
    private String username;

    @Column(unique = true, nullable = false, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false, length = 255)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "employee_id", unique = true, nullable = false, length = 20)
    private String employeeId;

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "department_id")
    @JsonIgnoreProperties("users")
    private Department department;

    // @ManyToOne(optional=true)
    // @JoinColumn(name = "manager_id")
    // @JsonIgnoreProperties({"manager","department"})
    // private User manager;

    @Column(name = "created_date", nullable = false, updatable = false)
    private LocalDateTime createdDate = LocalDateTime.now();

    // @Column(name = "last_login")
    // private LocalDateTime lastLogin;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    // @PrePersist
    // protected void onCreate(){
    //     this.createdDate=LocalDateTime.now();
    //     this.lastLogin=null;
    // }

    public void onUpdate(){
        
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    // public User getManager() {
    //     return manager;
    // }

    // public void setManager(User manager) {
    //     this.manager = manager;
    // }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    // public LocalDateTime getLastLogin() {
    //     return lastLogin;
    // }

    // public void setLastLogin(LocalDateTime lastLogin) {
    //     this.lastLogin = lastLogin;
    // }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public User(Long id, String username, String email, String passwordHash, Role role, String employeeId,
            Department department, /*User manager,*/ LocalDateTime createdDate, /*LocalDateTime lastLogin,*/ Boolean isActive) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.employeeId = employeeId;
        this.department = department;
        //this.manager = manager;
        this.createdDate = createdDate;
        // this.lastLogin = lastLogin;
        this.isActive = isActive;
    }

    public User(){}
}
