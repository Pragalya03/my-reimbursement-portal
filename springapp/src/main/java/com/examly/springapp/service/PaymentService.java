package com.examly.springapp.service;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id " + id));
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment paymentDetails) {
        Payment payment = getPaymentById(id);
        payment.setExpense(paymentDetails.getExpense());
        payment.setPaymentAmount(paymentDetails.getPaymentAmount());
        payment.setPaymentDate(paymentDetails.getPaymentDate());
        payment.setPaymentMethod(paymentDetails.getPaymentMethod());
        payment.setTransactionId(paymentDetails.getTransactionId());
        payment.setBankAccountId(paymentDetails.getBankAccountId());
        payment.setStatus(paymentDetails.getStatus());
        payment.setProcessedBy(paymentDetails.getProcessedBy());
        return paymentRepository.save(payment);
    }

    public void deletePayment(Long id) {
        Payment payment = getPaymentById(id);
        paymentRepository.delete(payment);
    }

    public List<Payment> getPaymentsByExpense(Long expenseId) {
        return paymentRepository.findByExpenseId(expenseId);
    }
}
