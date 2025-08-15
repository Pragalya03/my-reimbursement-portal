package com.examly.springapp.controller;

import com.examly.springapp.model.ExpensePolicy;
import com.examly.springapp.service.ExpensePolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/policies")
public class ExpensePolicyController {

    @Autowired
    private ExpensePolicyService policyService;

    @GetMapping
    public List<ExpensePolicy> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @GetMapping("/{id}")
    public ExpensePolicy getPolicyById(@PathVariable Long id) {
        return policyService.getPolicyById(id);
    }

    @PostMapping
    public ExpensePolicy createPolicy(@RequestBody ExpensePolicy policy) {
        return policyService.createPolicy(policy);
    }

    @PutMapping("/{id}")
    public ExpensePolicy updatePolicy(@PathVariable Long id, @RequestBody ExpensePolicy policy) {
        return policyService.updatePolicy(id, policy);
    }

    @DeleteMapping("/{id}")
    public void deletePolicy(@PathVariable Long id) {
        policyService.deletePolicy(id);
    }
}
