package com.examly.springapp.service;

import com.examly.springapp.model.ExpenseCategory;
import com.examly.springapp.repository.ExpenseCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseCategoryService {

    private final ExpenseCategoryRepository expenseCategoryRepository;

    public ExpenseCategoryService(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    public List<ExpenseCategory> getAllCategories() {
        return expenseCategoryRepository.findAll();
    }

    public Optional<ExpenseCategory> getCategoryById(Long id) {
        return expenseCategoryRepository.findById(id);
    }

    public ExpenseCategory saveCategory(ExpenseCategory category) {
        return expenseCategoryRepository.save(category);
    }

    public List<ExpenseCategory> getActiveCategories() {
        return expenseCategoryRepository.findByIsActiveTrue();
    }
}

