package com.examly.springapp.controller;

import com.examly.springapp.model.Expense;
import com.examly.springapp.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List; 
import java.util.Optional ; 

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense){
        Expense createdExpense = expenseService.createExpense(expense);
        return ResponseEntity.status(201).body(createdExpense);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(){
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateExpenseStatus(
        @PathVariable Long id,
        @RequestBody Expense statusUpdateRequest){
            String status=statusUpdateRequest.getStatus();
            String remarks=statusUpdateRequest.getRemarks();

            if(!status.equalsIgnoreCase("APPROVED") && !status.equalsIgnoreCase("REJECTED")){
                return ResponseEntity.badRequest().body("Invalid status. Use APPROVED or REJECTED.");
            }
            
            if(status.equalsIgnoreCase("REJECTED") && (remarks==null || remarks.trim().isEmpty())){
                return ResponseEntity.badRequest().body("Remarks are required when rejecting an expense.");
            }

            Optional<Expense> updatedExpense=expenseService.updateExpenseStatus(id, status.toUpperCase(), remarks);

            return updatedExpense
                    .map(ResponseEntity::ok)
                    .orElseGet(()-> ResponseEntity.notFound().build());
        }

}