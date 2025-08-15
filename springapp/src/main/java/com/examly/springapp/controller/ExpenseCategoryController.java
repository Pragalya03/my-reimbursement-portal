package com.examly.springapp.controller;

import com.examly.springapp.model.ExpenseCategory;
import com.examly.springapp.service.ExpenseCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryService categoryService;

    @GetMapping
    public List<ExpenseCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public ExpenseCategory getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping
    public ExpenseCategory createCategory(@RequestBody ExpenseCategory category) {
        return categoryService.createCategory(category);
    }

    @PutMapping("/{id}")
    public ExpenseCategory updateCategory(@PathVariable Long id, @RequestBody ExpenseCategory category) {
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
}
