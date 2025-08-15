package com.examly.springapp.controller;

import com.examly.springapp.model.ExpensePolicy;
import com.examly.springapp.repository.ExpensePolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/policies")
public class ExpensePolicyController {

    @Autowired
    private ExpensePolicyRepository policyRepository;

    @GetMapping
    public List<ExpensePolicy> getAllPolicies() {
        return policyRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpensePolicy> getPolicyById(@PathVariable Long id) {
        Optional<ExpensePolicy> policy = policyRepository.findById(id);
        return policy.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExpensePolicy createPolicy(@RequestBody ExpensePolicy policy) {
        return policyRepository.save(policy);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpensePolicy> updatePolicy(@PathVariable Long id, @RequestBody ExpensePolicy policyDetails) {
        return policyRepository.findById(id).map(policy -> {
            policy.setPolicyName(policyDetails.getPolicyName());
            policy.setPolicyDescription(policyDetails.getPolicyDescription());
            policy.setPolicyLimit(policyDetails.getPolicyLimit());
            policy.setApplicableRoles(policyDetails.getApplicableRoles());
            policy.setIsActive(policyDetails.getIsActive());
            return ResponseEntity.ok(policyRepository.save(policy));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicy(@PathVariable Long id) {
        return policyRepository.findById(id).map(policy -> {
            policyRepository.delete(policy);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
