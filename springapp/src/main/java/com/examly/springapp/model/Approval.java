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

    // @ManyToOne
    // @JoinColumn(name = "approver_id")
    // private User approver;

    // @Column(name = "approval_level", nullable = false)
    // private int approvalLevel;

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

    
    // public User getApprover() {
    //     return approver;
    // }
    
    // public void setApprover(User approver) {
    //     this.approver = approver;
    // }

    // public int getApprovalLevel() {
    //     return approvalLevel;
    // }
    
    // public void setApprovalLevel(int approvalLevel) {
    //     this.approvalLevel = approvalLevel;
    // }
    
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
    
    public Approval(Long id, Expense expense, /*User approver, int approvalLevel,*/ ApprovalStatus approvalStatus,
            LocalDateTime approvalDate, String comments, Boolean isFinalApproval) {
        this.id = id;
        this.expense = expense;
        // this.approver = approver;
        // this.approvalLevel = approvalLevel;
        this.approvalStatus = approvalStatus;
        this.approvalDate = approvalDate;
        this.comments = comments;
        this.isFinalApproval = isFinalApproval;
    }
    public Approval() {}
}