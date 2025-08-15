package com.examly.springapp.controller;

import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ReceiptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptRepository receiptRepository;

    @GetMapping
    public List<Receipt> getAllReceipts() {
        return receiptRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Receipt> getReceiptById(@PathVariable Long id) {
        Optional<Receipt> receipt = receiptRepository.findById(id);
        return receipt.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Receipt createReceipt(@RequestBody Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Receipt> updateReceipt(@PathVariable Long id, @RequestBody Receipt receiptDetails) {
        return receiptRepository.findById(id).map(receipt -> {
            receipt.setExpenseId(receiptDetails.getExpenseId());
            receipt.setFilePath(receiptDetails.getFilePath());
            receipt.setFileType(receiptDetails.getFileType());
            receipt.setFileSize(receiptDetails.getFileSize());
            receipt.setUploadDate(receiptDetails.getUploadDate());
            receipt.setUploadedBy(receiptDetails.getUploadedBy());
            return ResponseEntity.ok(receiptRepository.save(receipt));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable Long id) {
        return receiptRepository.findById(id).map(receipt -> {
            receiptRepository.delete(receipt);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
