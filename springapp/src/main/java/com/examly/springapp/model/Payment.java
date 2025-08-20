package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    public enum PaymentMethod {
        DIRECT_DEPOSIT, CHECK, PAYROLL
    }

    public enum PaymentStatus {
        PENDING, PROCESSED, COMPLETED, FAILED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "expense_id")
    private Expense expense;

    @Column(name = "payment_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal paymentAmount;

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    // @Column(name = "transaction_id", length = 100)
    // private String transactionId;

    // @Column(name = "bank_account_id", length = 50)
    // private String bankAccountId;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    // @ManyToOne
    // @JoinColumn(name = "processed_by")
    // private User processedBy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public BigDecimal getPaymentAmount() {
        return paymentAmount;
    }

    public void setPaymentAmount(BigDecimal paymentAmount) {
        this.paymentAmount = paymentAmount;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    // public String getTransactionId() {
    //     return transactionId;
    // }

    // public void setTransactionId(String transactionId) {
    //     this.transactionId = transactionId;
    // }

    // public String getBankAccountId() {
    //     return bankAccountId;
    // }

    // public void setBankAccountId(String bankAccountId) {
    //     this.bankAccountId = bankAccountId;
    // }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    // public User getProcessedBy() {
    //     return processedBy;
    // }

    // public void setProcessedBy(User processedBy) {
    //     this.processedBy = processedBy;
    // }

    public Payment(Long id, Expense expense, BigDecimal paymentAmount, LocalDateTime paymentDate,
            PaymentMethod paymentMethod, /*String transactionId, String bankAccountId,*/ PaymentStatus status
            /*User processedBy*/) {
        this.id = id;
        this.expense = expense;
        this.paymentAmount = paymentAmount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        // this.transactionId = transactionId;
        // this.bankAccountId = bankAccountId;
        this.status = status;
        // this.processedBy = processedBy;
    }

    // Getters and setters
    public Payment(){}
}
