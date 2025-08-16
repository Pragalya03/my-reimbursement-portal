package com.examly.springapp.service;

import com.examly.springapp.model.ExpenseCategory;
import com.examly.springapp.model.ExpensePolicy;
import com.examly.springapp.repository.ExpenseCategoryRepository;
import com.examly.springapp.repository.ExpensePolicyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpensePolicyService {

    private final ExpensePolicyRepository expensePolicyRepository;
    @Autowired
    private ExpenseCategoryRepository categoryRepo;
    public ExpensePolicyService(ExpensePolicyRepository expensePolicyRepository) {
        this.expensePolicyRepository = expensePolicyRepository;
    }

    public List<ExpensePolicy> getAllPolicies() {
        return expensePolicyRepository.findAll();
    }

    public ExpensePolicy getPolicyById(Long id) {
        return expensePolicyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found with id " + id));
    }
    
public ExpensePolicy createPolicy(ExpensePolicy policy) {
    if (policy.getCategory() != null && policy.getCategory().getId() != null) {
        ExpenseCategory category = categoryRepo.findById(policy.getCategory().getId())
            .orElseThrow(() -> new RuntimeException("Category not found"));
        policy.setCategory(category);
    }
    return expensePolicyRepository.save(policy);
}


    public ExpensePolicy updatePolicy(Long id, ExpensePolicy policyDetails) {
        ExpensePolicy policy = getPolicyById(id);

        policy.setPolicyName(policyDetails.getPolicyName());

        if (policyDetails.getCategory() != null && policyDetails.getCategory().getId() != null) {
            ExpenseCategory category = categoryRepo.findById(policyDetails.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            policy.setCategory(category);
        }

        policy.setSpendingLimit(policyDetails.getSpendingLimit());
        policy.setApprovalRequired(policyDetails.getApprovalRequired());
        policy.setReceiptRequired(policyDetails.getReceiptRequired());
        policy.setEffectiveDate(policyDetails.getEffectiveDate());
        policy.setExpiryDate(policyDetails.getExpiryDate());
        policy.setIsActive(policyDetails.getIsActive());

        return expensePolicyRepository.save(policy);
    }
    
    public void deletePolicy(Long id) {
        ExpensePolicy policy = getPolicyById(id);
        expensePolicyRepository.delete(policy);
    }

    public List<ExpensePolicy> getActivePolicies() {
        return expensePolicyRepository.findByIsActiveTrue();
    }
}
