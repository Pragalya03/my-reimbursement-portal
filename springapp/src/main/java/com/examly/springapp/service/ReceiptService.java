package com.examly.springapp.service;

import com.examly.springapp.model.Expense;
import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ReceiptRepository;
import com.examly.springapp.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final ExpenseRepository expenseRepository;

    public ReceiptService(ReceiptRepository receiptRepository, ExpenseRepository expenseRepository) {
        this.receiptRepository = receiptRepository;
        this.expenseRepository = expenseRepository;
    }

    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    public Receipt getReceiptById(Long id) {
        return receiptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receipt not found with id " + id));
    }

    public Receipt createReceipt(Receipt receipt){
        if(receipt.getExpense()!=null && receipt.getExpense().getId()!=null){
            Expense expense = expenseRepository.findById(receipt.getExpense().getId())
            .orElseThrow(()-> new RuntimeException("Expense not found"));
            receipt.setExpense(expense);
        }
        if(receipt.getUploadDate()==null){
            receipt.setUploadDate(LocalDateTime.now());
        }
        return receiptRepository.save(receipt);
    }
    
    public Receipt updateReceipt(Long id, Receipt receiptDetails) {
        Receipt receipt = getReceiptById(id);
        receipt.setExpense(receiptDetails.getExpense());
        receipt.setFileName(receiptDetails.getFileName());
        receipt.setFileSize(receiptDetails.getFileSize());
        receipt.setFileType(receiptDetails.getFileType());
        receipt.setFilePath(receiptDetails.getFilePath());
        receipt.setUploadDate(receiptDetails.getUploadDate());
        return receiptRepository.save(receipt);
    }

    public void deleteReceipt(Long id) {
        Receipt receipt = getReceiptById(id);
        receiptRepository.delete(receipt);
    }

    public List<Receipt> getReceiptsByExpense(Long expenseId) {
        return receiptRepository.findByExpenseId(expenseId);
    }
}

