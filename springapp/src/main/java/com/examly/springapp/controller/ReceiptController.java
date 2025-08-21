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
// added loging in network tab
// package com.examly.springapp.controller;

// import com.examly.springapp.model.Expense;
// import com.examly.springapp.model.Receipt;
// import com.examly.springapp.repository.ExpenseRepository;
// import com.examly.springapp.service.ReceiptService;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.core.io.Resource;
// import org.springframework.core.io.UrlResource;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import java.io.IOException;
// import java.nio.file.*;
// import java.time.LocalDateTime;
// import java.util.List;

// @RestController
// @RequestMapping("/receipts")
// public class ReceiptController {

//     @Autowired
//     private ReceiptService receiptService;

//     @Autowired
//     private ExpenseRepository expenseRepository;

//     @GetMapping
//     public List<Receipt> getAllReceipts() {
//         return receiptService.getAllReceipts();
//     }

//     @GetMapping("/{id}")
//     public Receipt getReceiptById(@PathVariable Long id) {
//         return receiptService.getReceiptById(id);
//     }

//     @PostMapping("/upload")
//     public ResponseEntity<Receipt> uploadReceipt(
//             @RequestParam("file") MultipartFile file,
//             @RequestParam("expenseId") Long expenseId,
//             @RequestParam("fileName") String fileName,
//             @RequestParam("fileSize") Long fileSize,
//             @RequestParam("fileType") String fileType,
//             @RequestParam("filePath") String filePath,
//             @RequestParam("uploadDate") String uploadDateStr
//     ) throws IOException {

//         Expense expense = expenseRepository.findById(expenseId)
//                 .orElseThrow(() -> new RuntimeException("Expense not found"));

//         // Save file physically
//         Path uploadDir = Paths.get("uploads");
//         if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);
//         Path fileLocation = uploadDir.resolve(file.getOriginalFilename());
//         Files.copy(file.getInputStream(), fileLocation, StandardCopyOption.REPLACE_EXISTING);

//         // Create Receipt entity
//         Receipt receipt = new Receipt();
//         receipt.setExpense(expense);
//         receipt.setFileName(fileName);
//         receipt.setFileSize(fileSize);
//         receipt.setFileType(fileType);
//         receipt.setFilePath(fileLocation.toString());
//         receipt.setUploadDate(LocalDateTime.parse(uploadDateStr));

//         Receipt saved = receiptService.createReceipt(receipt);
//         return ResponseEntity.ok(saved);
//     }

//     @PutMapping("/{id}")
//     public Receipt updateReceipt(@PathVariable Long id, @RequestBody Receipt receipt) {
//         return receiptService.updateReceipt(id, receipt);
//     }

//     @DeleteMapping("/{id}")
//     public void deleteReceipt(@PathVariable Long id) {
//         receiptService.deleteReceipt(id);
//     }

//     @GetMapping("/expense/{expenseId}")
//     public List<Receipt> getReceiptsByExpense(@PathVariable Long expenseId) {
//         return receiptService.getReceiptsByExpense(expenseId);
//     }

//     @GetMapping("/receipts/download/{filename:.+}")
//     public ResponseEntity<Resource> downloadReceipt(@PathVariable String filename) {
//         try {
//             Path filePath = Paths.get("uploads").resolve(filename).normalize(); // relative to springapp/
//             Resource resource = new UrlResource(filePath.toUri());
//             if (!resource.exists()) {
//                 throw new RuntimeException("File not found: " + filename);
//             }
    
//             // String contentType = "application/octet-stream";
//             // if(filename.endsWith(".png")) contentType = "image/png";
//             // if(filename.endsWith(".jpg") || filename.endsWith(".jpeg")) contentType = "image/jpeg";
//             // if(filename.endsWith(".pdf")) contentType = "application/pdf";

//             String contentType=Files.probeContentType(filePath);
//             if(contentType==null) contentType= "application/octet-stream";
            
//             return ResponseEntity.ok()
//                     .contentType(MediaType.parseMediaType(contentType))
//                     .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//                     .body(resource);
    
//         } catch (Exception e) {
//             throw new RuntimeException("Could not download file: " + filename, e);
//         }
//     }
// }

package com.examly.springapp.controller;

import com.examly.springapp.model.Expense;
import com.examly.springapp.model.Receipt;
import com.examly.springapp.repository.ExpenseRepository;
import com.examly.springapp.service.ReceiptService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
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

    @GetMapping("/receipts/download/{filename:.+}")
    public ResponseEntity<Resource> downloadReceipt(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("uploads").resolve(filename).normalize(); // relative to springapp/
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new RuntimeException("File not found: " + filename);
            }
    
            // String contentType = "application/octet-stream";
            // if(filename.endsWith(".png")) contentType = "image/png";
            // if(filename.endsWith(".jpg") || filename.endsWith(".jpeg")) contentType = "image/jpeg";
            // if(filename.endsWith(".pdf")) contentType = "application/pdf";

            String contentType=Files.probeContentType(filePath);
            if(contentType==null) contentType= "application/octet-stream";
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
    
        } catch (Exception e) {
            throw new RuntimeException("Could not download file: " + filename, e);
        }
    }

    private final Path fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Detect file content type
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // fallback
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);

        } catch (MalformedURLException ex) {
            return ResponseEntity.badRequest().build();
        } catch (IOException ex) {
            return ResponseEntity.internalServerError().build();
        }
    }

}

 
