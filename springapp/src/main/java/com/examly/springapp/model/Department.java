package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", nullable = false, length = 100)
    private String departmentName;

    @Column(name = "department_code", unique = true, nullable = false, length = 10)
    private String departmentCode;

    @OneToOne
    @JoinColumn(name = "manager_id")
    private User manager;

    @Column(name = "budget_limit", precision = 12, scale = 2)
    private BigDecimal budgetLimit;

    @Column(name = "cost_center", length = 20)
    private String costCenter;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "department")
    private List<User> users;

    // Getters and setters
}
