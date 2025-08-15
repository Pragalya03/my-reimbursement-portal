package com.examly.springapp.controller;

import com.examly.springapp.model.ExpenseCategory;
import com.examly.springapp.repository.ExpenseCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryRepository categoryRepository;

    @GetMapping
    public List<ExpenseCategory> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseCategory> getCategoryById(@PathVariable Long id) {
        Optional<ExpenseCategory> category = categoryRepository.findById(id);
        return category.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ExpenseCategory createCategory(@RequestBody ExpenseCategory category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseCategory> updateCategory(@PathVariable Long id, @RequestBody ExpenseCategory categoryDetails) {
        return categoryRepository.findById(id).map(category -> {
            category.setCategoryName(categoryDetails.getCategoryName());
            category.setCategoryCode(categoryDetails.getCategoryCode());
            category.setPolicyLimit(categoryDetails.getPolicyLimit());
            category.setRequiresReceipt(categoryDetails.getRequiresReceipt());
            category.setRequiresBusinessPurpose(categoryDetails.getRequiresBusinessPurpose());
            category.setIsActive(categoryDetails.getIsActive());
            category.setParentCategoryId(categoryDetails.getParentCategoryId());
            return ResponseEntity.ok(categoryRepository.save(category));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        return categoryRepository.findById(id).map(category -> {
            categoryRepository.delete(category);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
