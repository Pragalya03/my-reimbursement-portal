package com.examly.springapp.repository;

import com.examly.springapp.model.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

    List<Receipt> findByExpenseId(Long expenseId);

    List<Receipt> findByFileType(String fileType);

    List<Receipt> findByOcrVendor(String ocrVendor);
}
