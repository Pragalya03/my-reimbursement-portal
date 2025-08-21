package com.examly.springapp.repository;

import com.examly.springapp.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentCode(String departmentCode);

    List<Department> findByIsActiveTrue();

    //List<Department> findByManagerId(Long managerId);
}
