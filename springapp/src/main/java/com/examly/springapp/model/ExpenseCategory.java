package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

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

    @OneToMany(mappedBy = "parentCategory")
    private List<ExpenseCategory> subCategories;

    // Getters and setters
}
