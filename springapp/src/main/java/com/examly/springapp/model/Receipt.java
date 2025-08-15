package com.examly.springapp.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "receipts")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "expense_id")
    private Expense expense;

    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    @Column(name = "file_type", nullable = false, length = 50)
    private String fileType;

    @Column(name = "file_path", nullable = false, length = 500)
    private String filePath;

    @Column(columnDefinition = "TEXT")
    private String ocrText;

    @Column(name = "ocr_amount", precision = 10, scale = 2)
    private BigDecimal ocrAmount;

    @Column(name = "ocr_date")
    private LocalDate ocrDate;

    @Column(name = "ocr_vendor", length = 100)
    private String ocrVendor;

    @Column(name = "upload_date", nullable = false)
    private LocalDateTime uploadDate = LocalDateTime.now();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getOcrText() {
        return ocrText;
    }

    public void setOcrText(String ocrText) {
        this.ocrText = ocrText;
    }

    public BigDecimal getOcrAmount() {
        return ocrAmount;
    }

    public void setOcrAmount(BigDecimal ocrAmount) {
        this.ocrAmount = ocrAmount;
    }

    public LocalDate getOcrDate() {
        return ocrDate;
    }

    public void setOcrDate(LocalDate ocrDate) {
        this.ocrDate = ocrDate;
    }

    public String getOcrVendor() {
        return ocrVendor;
    }

    public void setOcrVendor(String ocrVendor) {
        this.ocrVendor = ocrVendor;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Receipt(Long id, Expense expense, String fileName, Long fileSize, String fileType, String filePath,
            String ocrText, BigDecimal ocrAmount, LocalDate ocrDate, String ocrVendor, LocalDateTime uploadDate) {
        this.id = id;
        this.expense = expense;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.fileType = fileType;
        this.filePath = filePath;
        this.ocrText = ocrText;
        this.ocrAmount = ocrAmount;
        this.ocrDate = ocrDate;
        this.ocrVendor = ocrVendor;
        this.uploadDate = uploadDate;
    }

    // Getters and setters
    
}
