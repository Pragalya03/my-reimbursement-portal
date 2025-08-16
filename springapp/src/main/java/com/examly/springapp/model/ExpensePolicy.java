package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "expense_policies")
public class ExpensePolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "policy_name", nullable = false, length = 100)
    private String policyName;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ExpenseCategory category;

    @Column(name = "spending_limit", precision = 10, scale = 2)
    private BigDecimal spendingLimit;

    @Column(name = "approval_required", nullable = false)
    private Boolean approvalRequired = true;

    @Column(name = "receipt_required", nullable = false)
    private Boolean receiptRequired = true;

    @Column(name = "effective_date", nullable = false)
    private LocalDate effectiveDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory category) {
        this.category = category;
    }

    public BigDecimal getSpendingLimit() {
        return spendingLimit;
    }

    public void setSpendingLimit(BigDecimal spendingLimit) {
        this.spendingLimit = spendingLimit;
    }

    public Boolean getApprovalRequired() {
        return approvalRequired;
    }

    public void setApprovalRequired(Boolean approvalRequired) {
        this.approvalRequired = approvalRequired;
    }

    public Boolean getReceiptRequired() {
        return receiptRequired;
    }

    public void setReceiptRequired(Boolean receiptRequired) {
        this.receiptRequired = receiptRequired;
    }

    public LocalDate getEffectiveDate() {
        return effectiveDate;
    }

    public void setEffectiveDate(LocalDate effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public ExpensePolicy(Long id, String policyName, ExpenseCategory category, BigDecimal spendingLimit,
            Boolean approvalRequired, Boolean receiptRequired, LocalDate effectiveDate, LocalDate expiryDate,
            Boolean isActive) {
        this.id = id;
        this.policyName = policyName;
        this.category = category;
        this.spendingLimit = spendingLimit;
        this.approvalRequired = approvalRequired;
        this.receiptRequired = receiptRequired;
        this.effectiveDate = effectiveDate;
        this.expiryDate = expiryDate;
        this.isActive = isActive;
    }


    public ExpensePolicy(){}
