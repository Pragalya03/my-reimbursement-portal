package com.examly.springapp.service;

import com.examly.springapp.model.ExpensePolicy;
import com.examly.springapp.repository.ExpensePolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpensePolicyService {

    private final ExpensePolicyRepository expensePolicyRepository;

    public ExpensePolicyService(ExpensePolicyRepository expensePolicyRepository) {
        this.expensePolicyRepository = expensePolicyRepository;
    }

    public List<ExpensePolicy> getAllPolicies() {
        return expensePolicyRepository.findAll();
    }

    public Optional<ExpensePolicy> getPolicyById(Long id) {
        return expensePolicyRepository.findById(id);
    }

    public ExpensePolicy savePolicy(ExpensePolicy policy) {
        return expensePolicyRepository.save(policy);
    }

    public List<ExpensePolicy> getActivePolicies() {
        return expensePolicyRepository.findByIsActiveTrue();
    }
}

