package com.examly.springapp.service;

import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ReceiptRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    public Receipt getReceiptById(Long id) {
        return receiptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receipt not found with id " + id));
    }

    public Receipt createReceipt(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public Receipt updateReceipt(Long id, Receipt receiptDetails) {
        Receipt receipt = getReceiptById(id);
        receipt.setExpense(receiptDetails.getExpense());
        receipt.setFileName(receiptDetails.getFileName());
        receipt.setFileSize(receiptDetails.getFileSize());
        receipt.setFileType(receiptDetails.getFileType());
        receipt.setFilePath(receiptDetails.getFilePath());
        receipt.setOcrText(receiptDetails.getOcrText());
        receipt.setOcrAmount(receiptDetails.getOcrAmount());
        receipt.setOcrDate(receiptDetails.getOcrDate());
        receipt.setOcrVendor(receiptDetails.getOcrVendor());
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
