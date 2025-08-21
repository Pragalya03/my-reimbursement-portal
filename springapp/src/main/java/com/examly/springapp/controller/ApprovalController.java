package com.examly.springapp.controller;

import com.examly.springapp.dto.ApprovalRequest;
import com.examly.springapp.model.Approval;
import com.examly.springapp.model.Expense;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.ExpenseRepository;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/approvals")
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;
  
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Approval> getAllApprovals() {
        return approvalService.getAllApprovals();
    }

    @GetMapping("/{id}")
    public Approval getApprovalById(@PathVariable Long id) {
        return approvalService.getApprovalById(id);
    }

    @PostMapping
    public Approval createApproval(@RequestBody ApprovalRequest request) {
        Expense expense = expenseRepository.findById(request.getExpenseId())
                                           .orElseThrow(() -> new RuntimeException("Expense not found"));

        Approval approval = new Approval();
        approval.setExpense(expense);
        approval.setApprovalStatus(Approval.ApprovalStatus.valueOf(request.getApprovalStatus()));
        approval.setApprovalDate(LocalDateTime.now());
        approval.setComments(request.getComments());
        approval.setIsFinalApproval(request.getIsFinalApproval());

        return approvalService.createApproval(approval);
    }


    @PutMapping("/{id}")
    public Approval updateApproval(@PathVariable Long id, @RequestBody Approval approval) {
        return approvalService.updateApproval(id, approval);
    }

    @DeleteMapping("/{id}")
    public void deleteApproval(@PathVariable Long id) {
        approvalService.deleteApproval(id);
    }
}
