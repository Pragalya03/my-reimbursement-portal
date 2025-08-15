package com.examly.springapp.controller;

import com.examly.springapp.model.Expense;
import com.examly.springapp.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable Long id) {
        Optional<Expense> expense = expenseRepository.findById(id);
        return expense.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Expense createExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expenseDetails) {
        return expenseRepository.findById(id).map(expense -> {
            expense.setAmount(expenseDetails.getAmount());
            expense.setDescription(expenseDetails.getDescription());
            expense.setStatus(expenseDetails.getStatus());
            expense.setRemarks(expenseDetails.getRemarks());
            return ResponseEntity.ok(expenseRepository.save(expense));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        return expenseRepository.findById(id).map(expense -> {
            expenseRepository.delete(expense);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
