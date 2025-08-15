package com.examly.springapp.service;

import com.examly.springapp.model.ExpenseCategory;
import com.examly.springapp.repository.ExpenseCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseCategoryService {

    private final ExpenseCategoryRepository expenseCategoryRepository;

    public ExpenseCategoryService(ExpenseCategoryRepository expenseCategoryRepository) {
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    public List<ExpenseCategory> getAllCategories() {
        return expenseCategoryRepository.findAll();
    }

    public ExpenseCategory getCategoryById(Long id) {
        return expenseCategoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ExpenseCategory not found with id " + id));
    }

    public ExpenseCategory createCategory(ExpenseCategory category) {
        return expenseCategoryRepository.save(category);
    }

    public ExpenseCategory updateCategory(Long id, ExpenseCategory categoryDetails) {
        ExpenseCategory category = getCategoryById(id);
        category.setCategoryName(categoryDetails.getCategoryName());
        category.setCategoryCode(categoryDetails.getCategoryCode());
        category.setPolicyLimit(categoryDetails.getPolicyLimit());
        category.setRequiresReceipt(categoryDetails.getRequiresReceipt());
        category.setRequiresBusinessPurpose(categoryDetails.getRequiresBusinessPurpose());
        category.setIsActive(categoryDetails.getIsActive());
        category.setParentCategory(categoryDetails.getParentCategory());
        return expenseCategoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        ExpenseCategory category = getCategoryById(id);
        expenseCategoryRepository.delete(category);
    }

    public List<ExpenseCategory> getActiveCategories() {
        return expenseCategoryRepository.findByIsActiveTrue();
    }
}
