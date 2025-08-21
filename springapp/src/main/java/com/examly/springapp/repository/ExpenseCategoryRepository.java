package com.examly.springapp.repository;

import com.examly.springapp.model.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {

    Optional<ExpenseCategory> findByCategoryCode(String categoryCode);

    List<ExpenseCategory> findByIsActiveTrue();

    //List<ExpenseCategory> findByParentCategoryId(Long parentCategoryId);
}
