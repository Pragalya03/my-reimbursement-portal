package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private Long employeeId;
    
    @Column(nullable=false)
    private Double amount;
    
    @Column(nullable=false, length=200)
    private String description;
    
    @Column(nullable=false)
    private LocalDate date;
    
    @Column(nullable=false)
    private String status = "PENDING";
    
    private String remarks;

    public Expense(){}
    
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
    public Expense(Long id, Long employeeId, Double amount, String description, LocalDate date, String status,
            String remarks) {
        this.id = id;
        this.employeeId = employeeId;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.status = status;
        this.remarks = remarks;
    }
}



