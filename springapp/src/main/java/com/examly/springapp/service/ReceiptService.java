// package com.examly.springapp.service;

// import com.examly.springapp.model.Receipt;
// import com.examly.springapp.repository.ReceiptRepository;
// import org.springframework.stereotype.Service;
// import java.util.List;

// @Service
// public class ReceiptService {

//     private final ReceiptRepository receiptRepository;

//     public ReceiptService(ReceiptRepository receiptRepository) {
//         this.receiptRepository = receiptRepository;
//     }

//     public List<Receipt> getAllReceipts() {
//         return receiptRepository.findAll();
//     }

//     public Receipt getReceiptById(Long id) {
//         return receiptRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Receipt not found with id " + id));
//     }

//     public Receipt createReceipt(Receipt receipt) {
//         return receiptRepository.save(receipt);
//     }

//     public Receipt updateReceipt(Long id, Receipt receiptDetails) {
//         Receipt receipt = getReceiptById(id);
//         receipt.setExpense(receiptDetails.getExpense());
//         receipt.setFileName(receiptDetails.getFileName());
//         receipt.setFileSize(receiptDetails.getFileSize());
//         receipt.setFileType(receiptDetails.getFileType());
//         receipt.setFilePath(receiptDetails.getFilePath());
//         receipt.setOcrText(receiptDetails.getOcrText());
//         receipt.setOcrAmount(receiptDetails.getOcrAmount());
//         receipt.setOcrDate(receiptDetails.getOcrDate());
//         receipt.setOcrVendor(receiptDetails.getOcrVendor());
//         receipt.setUploadDate(receiptDetails.getUploadDate());
//         return receiptRepository.save(receipt);
//     }

//     public void deleteReceipt(Long id) {
//         Receipt receipt = getReceiptById(id);
//         receiptRepository.delete(receipt);
//     }

//     public List<Receipt> getReceiptsByExpense(Long expenseId) {
//         return receiptRepository.findByExpenseId(expenseId);
//     }
// }
///////////
/* not able to upload
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
        Long expenseId = receipt.getExpense().getId();
        if (!receiptRepository.findByExpenseId(expenseId).isEmpty()) {
            throw new RuntimeException("Receipt already exists for this expense");
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
}*/

package com.examly.springapp.service;

import com.examly.springapp.model.Expense;
import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ExpenseRepository;
import com.examly.springapp.repository.ReceiptRepository;
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

    public Receipt createReceipt(Receipt receipt) {
        if (receipt.getExpense() == null || receipt.getExpense().getId() == null) {
            throw new RuntimeException("Expense is required");
        }

        // Fetch the Expense from DB
        Expense expense = expenseRepository.findById(receipt.getExpense().getId())
                .orElseThrow(() -> new RuntimeException("Expense not found with id " + receipt.getExpense().getId()));

        // Optional: check if a receipt already exists for this expense
        List<Receipt> existing = receiptRepository.findByExpenseId(expense.getId());
        if (!existing.isEmpty()) {
            throw new RuntimeException("A receipt already exists for this expense");
        }

        receipt.setExpense(expense);

        // Ensure uploadDate is set
        if (receipt.getUploadDate() == null) {
            receipt.setUploadDate(LocalDateTime.now());
        }

        return receiptRepository.save(receipt);
    }

    public Receipt updateReceipt(Long id, Receipt receiptDetails) {
        Receipt receipt = getReceiptById(id);
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
