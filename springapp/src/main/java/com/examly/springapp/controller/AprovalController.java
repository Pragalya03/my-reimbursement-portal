package com.examly.springapp.controller;

import com.examly.springapp.model.Approval;
import com.examly.springapp.repository.ApprovalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/approvals")
public class ApprovalController {

    @Autowired
    private ApprovalRepository approvalRepository;

    @GetMapping
    public List<Approval> getAllApprovals() {
        return approvalRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Approval> getApprovalById(@PathVariable Long id) {
        Optional<Approval> approval = approvalRepository.findById(id);
        return approval.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Approval createApproval(@RequestBody Approval approval) {
        return approvalRepository.save(approval);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Approval> updateApproval(@PathVariable Long id, @RequestBody Approval approvalDetails) {
        return approvalRepository.findById(id).map(approval -> {
            approval.setExpenseId(approvalDetails.getExpenseId());
            approval.setApproverId(approvalDetails.getApproverId());
            approval.setApprovalLevel(approvalDetails.getApprovalLevel());
            approval.setApprovalStatus(approvalDetails.getApprovalStatus());
            approval.setApprovalDate(approvalDetails.getApprovalDate());
            approval.setComments(approvalDetails.getComments());
            approval.setIsFinalApproval(approvalDetails.getIsFinalApproval());
            return ResponseEntity.ok(approvalRepository.save(approval));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApproval(@PathVariable Long id) {
        return approvalRepository.findById(id).map(approval -> {
            approvalRepository.delete(approval);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
