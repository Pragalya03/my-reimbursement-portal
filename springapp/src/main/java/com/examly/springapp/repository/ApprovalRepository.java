package com.examly.springapp.repository;

import com.examly.springapp.model.Approval;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ApprovalRepository extends JpaRepository<Approval, Long> {
    List<Approval> findByExpenseId(Long expenseId);
    List<Approval> findByApprovalStatus(String approvalStatus);
    List<Approval> findByIsFinalApprovalTrue();
}
