package com.examly.springapp.controller;

import com.examly.springapp.model.Expense;
import com.examly.springapp.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.time.LocalDate;
import java.util.*; 

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService){
        this.expenseService=expenseService;
    }

    private static final String VALIDATION_FAILED="Validation failed";
    private static final String NOT_FOUND="Not Found";
    @PostMapping
    public ResponseEntity<?> createExpense( @RequestBody Expense expense){
        if(expense.getEmployeeId()==null) 
            return error(VALIDATION_FAILED, "EmployeeId is required");

        if(expense.getAmount()==null || expense.getAmount()<=0) 
            return error(VALIDATION_FAILED, "Amount must be greater than 0");

        if(expense.getDescription()==null || expense.getDescription().trim().length()<5)
            return error(VALIDATION_FAILED, "Description is required and must be 5-200 characters");
        
        if(expense.getDate()==null) 
            return error(VALIDATION_FAILED,"Date is required");
        
        if(expense.getDate().isAfter(LocalDate.now())) 
            return error(VALIDATION_FAILED,"Date cannot be in the future");
        
        Expense createdExpense = expenseService.createExpense(expense);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExpense);
    }

    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses(){
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable Long id){
        Optional<Expense> expense=expenseService.getExpenseById(id);
        return expense.<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(()-> error(NOT_FOUND,"Expense not found with ID: "+id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateExpenseStatus(
        @PathVariable Long id,
        @RequestBody Expense statusUpdateRequest){
            String status=statusUpdateRequest.getStatus();
            String remarks=statusUpdateRequest.getRemarks();

            if(!"APPROVED".equalsIgnoreCase(status) && !"REJECTED".equalsIgnoreCase(status)){
                return error(VALIDATION_FAILED,"Status must be either APPROVED or REJECTED");
            }
            
            if("REJECTED".equalsIgnoreCase(status) && (remarks==null || remarks.trim().isEmpty())){
                return error(VALIDATION_FAILED,"Remarks are required when rejecting an expense");
            }

            Optional<Expense> updatedExpense=expenseService.updateExpenseStatus(id, status.toUpperCase(), remarks);

            return updatedExpense.<ResponseEntity<?>>map(ResponseEntity::ok)
                    .orElseGet(()-> error(NOT_FOUND,"Expense not found with ID: "+id));
        }

    private ResponseEntity<Map<String,String>> error(String error, String message){
        Map<String, String> body=new HashMap<>();
        body.put("error", error);
        body.put("message", message);
        return ResponseEntity.status(NOT_FOUND.equals(error) ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST).body(body);
    }
}