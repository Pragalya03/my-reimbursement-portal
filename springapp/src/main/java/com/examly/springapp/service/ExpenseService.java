package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Expense;
import com.examly.springapp.repository.ExpenseRepository;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;
    
    public Expense createExpense(Expense expense){
        expense.setStatus("PENDING");
        return expenseRepository.save(expense);
    }

    public List<Expense> getAllExpenses(){
        return expenseRepository.findAll();
    }

    public Optional<Expense> updateExpenseStatus(Long id, String status, String remarks){
        Optional<Expense> optionalExpense=expenseRepository.findById(id);
        if(optionalExpense.isPresent()){
            Expense expense=optionalExpense.get();
            expense.setStatus(status);
            expense.setRemarks(remarks);
            expenseRepository.save(expense);
        }

        return optionalExpense;
    }

    public Optional<Expense> getExpenseById(Long id) {
        return expenseRepository.findById(id);
    }

}
