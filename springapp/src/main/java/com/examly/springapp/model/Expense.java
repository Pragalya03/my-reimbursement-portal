package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // In tests, employeeId is a Long, not a User object
    @Column(name = "employee_id", nullable = false)
    private Long employeeId;

    // In tests, amount is double, so we'll store as Double
    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false, length = 200)
    private String description;

    // In tests, field is named "date"
    @Column(name = "expense_date", nullable = false)
    private LocalDate date;

    // Keep as String for test compatibility; default to "PENDING"
    @Column(nullable = false)
    private String status = "PENDING";

    // Can be null, tests check for "doesNotExist"
    @Column(columnDefinition = "TEXT")
    private String remarks;

    public Expense() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
