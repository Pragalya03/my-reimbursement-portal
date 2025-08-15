package com.examly.springapp.repository;

import com.examly.springapp.model.ExpensePolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpensePolicyRepository extends JpaRepository<ExpensePolicy, Long> {

    List<ExpensePolicy> findByIsActiveTrue();

    List<ExpensePolicy> findByCategoryId(Long categoryId);

    List<ExpensePolicy> findByApprovalRequiredTrue();
}
