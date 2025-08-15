package com.examly.springapp.controller;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Optional<Payment> payment = paymentRepository.findById(id);
        return payment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        return paymentRepository.findById(id).map(payment -> {
            payment.setExpenseId(paymentDetails.getExpenseId());
            payment.setPaymentDate(paymentDetails.getPaymentDate());
            payment.setPaymentMethod(paymentDetails.getPaymentMethod());
            payment.setTransactionId(paymentDetails.getTransactionId());
            payment.setAmountPaid(paymentDetails.getAmountPaid());
            payment.setPaymentStatus(paymentDetails.getPaymentStatus());
            return ResponseEntity.ok(paymentRepository.save(payment));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        return paymentRepository.findById(id).map(payment -> {
            paymentRepository.delete(payment);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
