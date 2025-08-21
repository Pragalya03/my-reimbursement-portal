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

    @Enumerated(EnumType.STRING)
    @Column(name = "approval_status")
    private ApprovalStatus approvalStatus;

    @Column(name = "approval_date")
    private LocalDateTime approvalDate;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "is_final_approval", nullable = false)
    private Boolean isFinalApproval = false;

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
   
    public ApprovalStatus getApprovalStatus() {
        return approvalStatus;
    }
    
    public void setApprovalStatus(ApprovalStatus approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
    
    public LocalDateTime getApprovalDate() {
        return approvalDate;
    }

    public void setApprovalDate(LocalDateTime approvalDate) {
        this.approvalDate = approvalDate;
    }
    
    public String getComments() {
        return comments;
    }
    
    public void setComments(String comments) {
        this.comments = comments;
    }
    
    public Boolean getIsFinalApproval() {
        return isFinalApproval;
    }
    
    public void setIsFinalApproval(Boolean isFinalApproval) {
        this.isFinalApproval = isFinalApproval;
    }
    
    public Approval(Long id, Expense expense, ApprovalStatus approvalStatus,
            LocalDateTime approvalDate, String comments, Boolean isFinalApproval) {
        this.id = id;
        this.expense = expense;
        this.approvalStatus = approvalStatus;
        this.approvalDate = approvalDate;
        this.comments = comments;
        this.isFinalApproval = isFinalApproval;
    }
    public Approval() {}
}
