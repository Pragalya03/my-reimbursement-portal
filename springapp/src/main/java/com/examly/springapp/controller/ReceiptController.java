package com.examly.springapp.controller;

import com.examly.springapp.model.Receipt;
import com.examly.springapp.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping
    public List<Receipt> getAllReceipts() {
        return receiptService.getAllReceipts();
    }

    @GetMapping("/{id}")
    public Receipt getReceiptById(@PathVariable Long id) {
        return receiptService.getReceiptById(id);
    }

    @PostMapping
    public Receipt createReceipt(@RequestBody Receipt receipt) {
        return receiptService.createReceipt(receipt);
    }

    @PutMapping("/{id}")
    public Receipt updateReceipt(@PathVariable Long id, @RequestBody Receipt receipt) {
        return receiptService.updateReceipt(id, receipt);
    }

    @DeleteMapping("/{id}")
    public void deleteReceipt(@PathVariable Long id) {
        receiptService.deleteReceipt(id);
    }
}
