package com.examly.springapp.dto; 

public class ApprovalRequest {
    private Long expenseId;
    private String approvalStatus; 
    private String approvalDate;   
    private String comments;
    private Boolean isFinalApproval;
    public Long getExpenseId() {
        return expenseId;
    }
    public void setExpenseId(Long expenseId) {
        this.expenseId = expenseId;
    }
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
}
