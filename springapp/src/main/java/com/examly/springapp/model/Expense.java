package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense {

    public enum Status {
        PENDING, APPROVED, REJECTED, PAID
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private User employee;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 200)
    private String description;

    @Column(name = "expense_date", nullable = false)
    private LocalDate expenseDate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ExpenseCategory category;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    @Column(name = "submission_date", nullable = false)
    private LocalDateTime submissionDate = LocalDateTime.now();

    @Column(name = "approval_date")
    private LocalDateTime approvalDate;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "business_purpose", columnDefinition = "TEXT")
    private String businessPurpose;

    @Column(name = "project_code", length = 20)
    private String projectCode;

    @Column(name = "currency_code", length = 3)
    private String currencyCode = "USD";

    @Column(name = "exchange_rate", precision = 10, scale = 4)
    private BigDecimal exchangeRate = BigDecimal.valueOf(1.0);

    // Getters and setters
}
