// package com.examly.springapp.controller;

// import com.examly.springapp.model.Receipt;
// import com.examly.springapp.service.ReceiptService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/receipts")
// public class ReceiptController {

//     @Autowired
//     private ReceiptService receiptService;

//     @GetMapping
//     public List<Receipt> getAllReceipts() {
//         return receiptService.getAllReceipts();
//     }

//     @GetMapping("/{id}")
//     public Receipt getReceiptById(@PathVariable Long id) {
//         return receiptService.getReceiptById(id);
//     }

//     @PostMapping
//     public Receipt createReceipt(@RequestBody Receipt receipt) {
//         return receiptService.createReceipt(receipt);
//     }

//     @PutMapping("/{id}")
//     public Receipt updateReceipt(@PathVariable Long id, @RequestBody Receipt receipt) {
//         return receiptService.updateReceipt(id, receipt);
//     }

//     @DeleteMapping("/{id}")
//     public void deleteReceipt(@PathVariable Long id) {
//         receiptService.deleteReceipt(id);
//     }
// }

///////////////////
// failed to upload receipt
package com.examly.springapp.controller;

import com.examly.springapp.model.Expense;
import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ExpenseRepository;
import com.examly.springapp.service.ReceiptService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/receipts")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping
    public List<Receipt> getAllReceipts() {
        return receiptService.getAllReceipts();
    }

    @GetMapping("/{id}")
    public Receipt getReceiptById(@PathVariable Long id) {
        return receiptService.getReceiptById(id);
    }

    @PostMapping("/upload")
    public ResponseEntity<Receipt> uploadReceipt(
            @RequestParam("file") MultipartFile file,
            @RequestParam("expenseId") Long expenseId,
            @RequestParam("fileName") String fileName,
            @RequestParam("fileSize") Long fileSize,
            @RequestParam("fileType") String fileType,
            @RequestParam("filePath") String filePath,
            @RequestParam("uploadDate") String uploadDateStr
    ) throws IOException {

        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Save file physically
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);
        Path fileLocation = uploadDir.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), fileLocation, StandardCopyOption.REPLACE_EXISTING);

        // Create Receipt entity
        Receipt receipt = new Receipt();
        receipt.setExpense(expense);
        receipt.setFileName(fileName);
        receipt.setFileSize(fileSize);
        receipt.setFileType(fileType);
        receipt.setFilePath(fileLocation.toString());
        receipt.setUploadDate(LocalDateTime.parse(uploadDateStr));

        Receipt saved = receiptService.createReceipt(receipt);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Receipt updateReceipt(@PathVariable Long id, @RequestBody Receipt receipt) {
        return receiptService.updateReceipt(id, receipt);
    }

    @DeleteMapping("/{id}")
    public void deleteReceipt(@PathVariable Long id) {
        receiptService.deleteReceipt(id);
    }

    @GetMapping("/expense/{expenseId}")
    public List<Receipt> getReceiptsByExpense(@PathVariable Long expenseId) {
        return receiptService.getReceiptsByExpense(expenseId);
    }
}


