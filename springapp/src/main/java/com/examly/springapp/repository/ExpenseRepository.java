package com.examly.springapp.repository;

import com.examly.springapp.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByEmployeeId(Long employeeId);

    List<Expense> findByStatus(String status);

    List<Expense> findByEmployeeIdAndStatus(Long employeeId, String status);

    List<Expense> findByExpenseDateBetween(LocalDate startDate, LocalDate endDate);

    List<Expense> findByEmployeeIdAndExpenseDateBetween(Long employeeId, LocalDate startDate, LocalDate endDate);

    List<Expense> findByEmployeeIdAndStatusAndExpenseDateBetween(Long employeeId, String status, LocalDate startDate, LocalDate endDate);

    Optional<Expense> findById(Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Expense e SET e.status = :status, e.remarks = :remarks WHERE e.id = :id")
    int updateExpenseStatusAndRemarks(Long id, String status, String remarks);
}
