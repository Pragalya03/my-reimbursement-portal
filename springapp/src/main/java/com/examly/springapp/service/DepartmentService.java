// package com.examly.springapp.service;

// import com.examly.springapp.model.Department;
// import com.examly.springapp.repository.DepartmentRepository;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class DepartmentService {

//     private final DepartmentRepository departmentRepository;

//     public DepartmentService(DepartmentRepository departmentRepository) {
//         this.departmentRepository = departmentRepository;
//     }

//     public List<Department> getAllDepartments() {
//         return departmentRepository.findAll();
//     }

//     public Department getDepartmentById(Long id) {
//         return departmentRepository.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Department not found with id " + id));
//     }

//     public Department createDepartment(Department department) {
//         return departmentRepository.save(department);
//     }

//     public Department updateDepartment(Long id, Department departmentDetails) {
//         Department department = getDepartmentById(id);
//         department.setDepartmentName(departmentDetails.getDepartmentName());
//         department.setDepartmentCode(departmentDetails.getDepartmentCode());
//         department.setManager(departmentDetails.getManager());
//         department.setBudgetLimit(departmentDetails.getBudgetLimit());
//         department.setCostCenter(departmentDetails.getCostCenter());
//         department.setIsActive(departmentDetails.getIsActive());
//         return departmentRepository.save(department);
//     }

//     public void deleteDepartment(Long id) {
//         Department department = getDepartmentById(id);
//         departmentRepository.delete(department);
//     }

//     public List<Department> getActiveDepartments() {
//         return departmentRepository.findByIsActiveTrue();
//     }
// }


package com.examly.springapp.service;

import com.examly.springapp.model.Department;
import com.examly.springapp.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll()
                .stream()
                .map(this::sanitizeDepartment)
                .collect(Collectors.toList());
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .map(this::sanitizeDepartment)
                .orElseThrow(() -> new RuntimeException("Department not found with id " + id));
    }

    public Department createDepartment(Department department) {
        return sanitizeDepartment(departmentRepository.save(department));
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id " + id));

        department.setDepartmentName(departmentDetails.getDepartmentName());
        department.setDepartmentCode(departmentDetails.getDepartmentCode());
        department.setManager(departmentDetails.getManager());
        department.setBudgetLimit(departmentDetails.getBudgetLimit());
        department.setCostCenter(departmentDetails.getCostCenter());
        department.setIsActive(departmentDetails.getIsActive());

        return sanitizeDepartment(departmentRepository.save(department));
    }

    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id " + id));
        departmentRepository.delete(department);
    }

    public List<Department> getActiveDepartments() {
        return departmentRepository.findByIsActiveTrue()
                .stream()
                .map(this::sanitizeDepartment)
                .collect(Collectors.toList());
    }

    /**
     * Ensures manager and users are safe for JSON serialization
     */
    private Department sanitizeDepartment(Department dept) {
        if (dept.getUsers() == null) {
            dept.setUsers(List.of()); // empty list instead of null
        }
        // manager can stay null if none exists
        return dept;
    }
}