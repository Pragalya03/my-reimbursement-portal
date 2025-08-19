package com.examly.springapp.service;

import com.examly.springapp.model.Approval;
import com.examly.springapp.repository.ApprovalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApprovalService {

    private final ApprovalRepository approvalRepository;

    public ApprovalService(ApprovalRepository approvalRepository) {
        this.approvalRepository = approvalRepository;
    }

    public List<Approval> getAllApprovals() {
        return approvalRepository.findAll();
    }

    public Approval getApprovalById(Long id) {
        return approvalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Approval not found with id " + id));
    }

    public Approval createApproval(Approval approval) {
        return approvalRepository.save(approval);
    }

    public Approval updateApproval(Long id, Approval approvalDetails) {
        Approval approval = getApprovalById(id);
        approval.setApprovalStatus(approvalDetails.getApprovalStatus());
        approval.setComments(approvalDetails.getComments());
        approval.setApprovalDate(approvalDetails.getApprovalDate());
        approval.setIsFinalApproval(approvalDetails.getIsFinalApproval());
        // approval.setApprovalLevel(approvalDetails.getApprovalLevel());
        // approval.setApprover(approvalDetails.getApprover());
        approval.setExpense(approvalDetails.getExpense());
        return approvalRepository.save(approval);
    }

    public void deleteApproval(Long id) {
        Approval approval = getApprovalById(id);
        approvalRepository.delete(approval);
    }

    public List<Approval> getApprovalsByExpense(Long expenseId) {
        return approvalRepository.findByExpenseId(expenseId);
    }
}
