package com.examly.springapp.dto; 

public class ApprovalRequest {
    private Long expenseId;
    // private Long approverId;
    // private int approvalLevel;
    private String approvalStatus; // PENDING, APPROVED, REJECTED
    private String approvalDate;   // ISO string "2025-08-18T12:34:56"
    private String comments;
    private Boolean isFinalApproval;
    public Long getExpenseId() {
        return expenseId;
    }
    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }
    // public Long getApproverId() {
    //     return approverId;
    // }
    // public void setApproverId(Long approverId) {
    //     this.approverId = approverId;
    // }
    // public int getApprovalLevel() {
    //     return approvalLevel;
    // }
    // public void setApprovalLevel(int approvalLevel) {
    //     this.approvalLevel = approvalLevel;
    // }
    public String getApprovalStatus() {
        return approvalStatus;
    }
    public void setApprovalStatus(String approvalStatus) {
        this.approvalStatus = approvalStatus;
    }
    public String getApprovalDate() {
        return approvalDate;
    }
    public void setApprovalDate(String approvalDate) {
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
    // public ApprovalRequest(Long expenseId, /*Long approverId, int approvalLevel,*/ String approvalStatus,
    //         String approvalDate, String comments, Boolean isFinalApproval) {
    //     this.expenseId = expenseId;
    //     // this.approverId = approverId;
    //     // this.approvalLevel = approvalLevel;
    //     this.approvalStatus = approvalStatus;
    //     this.approvalDate = approvalDate;
    //     this.comments = comments;
    //     this.isFinalApproval = isFinalApproval;
    // }

    
}
