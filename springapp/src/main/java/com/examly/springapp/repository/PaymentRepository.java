package com.examly.springapp.repository;

import com.examly.springapp.model.Payment;
import com.examly.springapp.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    List<Payment> findByExpenseId(Long expenseId);

    List<Payment> findByStatus(String status);

    List<Payment> findByPaymentMethod(String paymentMethod);

    List<Payment> findByProcessedBy(User user);
}
