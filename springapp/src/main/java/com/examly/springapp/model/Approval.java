package com.examly.springapp.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "approvals")
public class Approval {

    public enum ApprovalStatus {
        PENDING, APPROVED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "expense_id")
    private Expense expense;

    @ManyToOne
    @JoinColumn(name = "approver_id")
    private User approver;

    @Column(name = "approval_level", nullable = false)
    private int approvalLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    private ApprovalStatus approvalStatus;

    @Column(name = "approval_date")
    private LocalDateTime approvalDate;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "is_final_approval", nullable = false)
    private Boolean isFinalApproval = false;

    // Getters and setters
}
