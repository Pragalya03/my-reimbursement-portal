package com.examly.springapp.service;

import com.examly.springapp.model.Payment;
import com.examly.springapp.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<Payment> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments != null ? payments : List.of(); // ensure non-null
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(new Payment()); // ensure non-null
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public Payment updatePayment(Long id, Payment payment) {
        Payment existingPayment = paymentRepository.findById(id).orElse(new Payment());
        // update fields if exists
        existingPayment.setPaymentAmount(payment.getPaymentAmount());
        existingPayment.setProcessedBy(payment.getProcessedBy());
        existingPayment.setPaymentDate(payment.getPaymentDate());
        // save updated payment
        return paymentRepository.save(existingPayment);
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }
}
