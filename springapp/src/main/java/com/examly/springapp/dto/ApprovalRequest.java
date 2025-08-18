public class ApprovalRequest {
    private Long expenseId;
    private Long approverId;
    private int approvalLevel;
    private String approvalStatus; // PENDING, APPROVED, REJECTED
    private String approvalDate;   // ISO string "2025-08-18T12:34:56"
    private String comments;
    private Boolean isFinalApproval;

    // getters and setters
}
