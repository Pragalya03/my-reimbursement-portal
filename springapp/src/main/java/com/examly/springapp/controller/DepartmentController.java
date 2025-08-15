package com.examly.springapp.controller;

import com.examly.springapp.model.Department;
import com.examly.springapp.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Optional<Department> department = departmentRepository.findById(id);
        return department.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        return departmentRepository.save(department);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department departmentDetails) {
        return departmentRepository.findById(id).map(department -> {
            department.setDepartmentName(departmentDetails.getDepartmentName());
            department.setDepartmentCode(departmentDetails.getDepartmentCode());
            department.setManagerId(departmentDetails.getManagerId());
            department.setBudgetLimit(departmentDetails.getBudgetLimit());
            department.setCostCenter(departmentDetails.getCostCenter());
            department.setIsActive(departmentDetails.getIsActive());
            return ResponseEntity.ok(departmentRepository.save(department));
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        return departmentRepository.findById(id).map(department -> {
            departmentRepository.delete(department);
            return ResponseEntity.ok().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
