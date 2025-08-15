package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "expense_categories")
public class ExpenseCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category_name", nullable = false, length = 50)
    private String categoryName;

    @Column(name = "category_code", unique = true, nullable = false, length = 10)
    private String categoryCode;

    @Column(name = "policy_limit", precision = 10, scale = 2)
    private BigDecimal policyLimit;

    @Column(name = "requires_receipt", nullable = false)
    private Boolean requiresReceipt = true;

    @Column(name = "requires_business_purpose", nullable = false)
    private Boolean requiresBusinessPurpose = false;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private ExpenseCategory parentCategory;

    @OneToMany(mappedBy = "parentCategory", cascade = CascadeType.ALL)
    private List<ExpenseCategory> subCategories = new ArrayList<>();

    public ExpenseCategory(){}
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public BigDecimal getPolicyLimit() {
        return policyLimit;
    }

    public void setPolicyLimit(BigDecimal policyLimit) {
        this.policyLimit = policyLimit;
    }

    public Boolean getRequiresReceipt() {
        return requiresReceipt;
    }

    public void setRequiresReceipt(Boolean requiresReceipt) {
        this.requiresReceipt = requiresReceipt;
    }

    public Boolean getRequiresBusinessPurpose() {
        return requiresBusinessPurpose;
    }

    public void setRequiresBusinessPurpose(Boolean requiresBusinessPurpose) {
        this.requiresBusinessPurpose = requiresBusinessPurpose;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public ExpenseCategory getParentCategory() {
        return parentCategory;
    }

    public void setParentCategory(ExpenseCategory parentCategory) {
        this.parentCategory = parentCategory;
    }

    public List<ExpenseCategory> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<ExpenseCategory> subCategories) {
        this.subCategories = subCategories = subCategories!=null?subCategories:new ArrayList<>();
    }

    public ExpenseCategory(Long id, String categoryName, String categoryCode, BigDecimal policyLimit,
            Boolean requiresReceipt, Boolean requiresBusinessPurpose, Boolean isActive, ExpenseCategory parentCategory,
            List<ExpenseCategory> subCategories) {
        this.id = id;
        this.categoryName = categoryName;
        this.categoryCode = categoryCode;
        this.policyLimit = policyLimit;
        this.requiresReceipt = requiresReceipt;
        this.requiresBusinessPurpose = requiresBusinessPurpose;
        this.isActive = isActive;
        this.parentCategory = parentCategory;
        this.subCategories = subCategories!=null?subCategories:new ArrayList<>();
    }

    // Getters and setters
    
}
