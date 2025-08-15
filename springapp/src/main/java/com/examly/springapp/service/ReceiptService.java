package com.examly.springapp.service;

import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    public Optional<Receipt> getReceiptById(Long id) {
        return receiptRepository.findById(id);
    }

    public Receipt saveReceipt(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public List<Receipt> getReceiptsByExpense(Long expenseId) {
        return receiptRepository.findByExpenseId(expenseId);
    }
}

