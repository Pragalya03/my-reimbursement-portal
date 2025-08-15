package com.examly.springapp.service;

import com.examly.springapp.model.Approval;
import com.examly.springapp.repository.ApprovalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApprovalService {

    private final ApprovalRepository approvalRepository;

    public ApprovalService(ApprovalRepository approvalRepository) {
        this.approvalRepository = approvalRepository;
    }

    public List<Approval> getAllApprovals() {
        return approvalRepository.findAll();
    }

    public Optional<Approval> getApprovalById(Long id) {
        return approvalRepository.findById(id);
    }

    public Approval saveApproval(Approval approval) {
        return approvalRepository.save(approval);
    }

    public List<Approval> getApprovalsByExpense(Long expenseId) {
        return approvalRepository.findByExpenseId(expenseId);
    }
}

