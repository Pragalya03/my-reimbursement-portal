package com.examly.springapp.controller;

import com.examly.springapp.model.Approval;
import com.examly.springapp.service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/approvals")
public class ApprovalController {

    @Autowired
    private ApprovalService approvalService;
  
    @GetMapping
    public List<Approval> getAllApprovals() {
        return approvalService.getAllApprovals();
    }

    @GetMapping("/{id}")
    public Approval getApprovalById(@PathVariable Long id) {
        return approvalService.getApprovalById(id);
    }

    @PostMapping
    public Approval createApproval(@RequestBody Approval approval) {
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
