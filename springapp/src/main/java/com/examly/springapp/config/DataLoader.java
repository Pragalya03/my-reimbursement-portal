package com.examly.springapp.config;

import com.examly.springapp.model.Department;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        // Skip if already loaded
        if(departmentRepository.count() > 0 || userRepository.count() > 0) return;

        // ---------- Preload Departments ----------
        Department finance = new Department();
        finance.setId(2L);
        finance.setDepartmentName("Finance");
        finance.setDepartmentCode("FIN01");
        finance.setManager(null); // will set manager later if needed
        finance.setBudgetLimit(100000.0);
        finance.setCostCenter("CC102");
        finance.setIsActive(true);

        Department it = new Department();
        it.setId(3L);
        it.setDepartmentName("IT");
        it.setDepartmentCode("IT01");
        it.setManager(null);
        it.setBudgetLimit(75000.0);
        it.setCostCenter("CC103");
        it.setIsActive(true);

        Department marketing = new Department();
        marketing.setId(4L);
        marketing.setDepartmentName("Marketing");
        marketing.setDepartmentCode("MKT01");
        marketing.setManager(null);
        marketing.setBudgetLimit(60000.0);
        marketing.setCostCenter("CC104");
        marketing.setIsActive(true);

        departmentRepository.save(finance);
        departmentRepository.save(it);
        departmentRepository.save(marketing);

        // ---------- Preload Users ----------
        User sunitha = new User();
        sunitha.setUsername("Sunitha");
        sunitha.setEmail("jane@example.com");
        sunitha.setPasswordHash("pass123");
        sunitha.setRole(User.Role.MANAGER);
        sunitha.setEmployeeId("EMP102");
        sunitha.setDepartment(finance);
        sunitha.setManager(null);
        sunitha.setIsActive(true);

        User mahesh = new User();
        mahesh.setUsername("Mahesh");
        mahesh.setEmail("alice@example.com");
        mahesh.setPasswordHash("pass123");
        mahesh.setRole(User.Role.FINANCE_MANAGER);
        mahesh.setEmployeeId("EMP103");
        mahesh.setDepartment(finance);
        mahesh.setManager(sunitha);
        mahesh.setIsActive(true);

        User ramya = new User();
        ramya.setUsername("Ramya");
        ramya.setEmail("bob@example.com");
        ramya.setPasswordHash("pass123");
        ramya.setRole(User.Role.ADMIN);
        ramya.setEmployeeId("EMP104");
        ramya.setDepartment(it);
        ramya.setManager(sunitha);
        ramya.setIsActive(true);

        User jackson = new User();
        jackson.setUsername("Jackson");
        jackson.setEmail("eve@example.com");
        jackson.setPasswordHash("pass123");
        jackson.setRole(User.Role.AUDITOR);
        jackson.setEmployeeId("EMP105");
        jackson.setDepartment(marketing);
        jackson.setManager(sunitha);
        jackson.setIsActive(true);

        // Save users
        userRepository.save(sunitha);
        userRepository.save(mahesh);
        userRepository.save(ramya);
        userRepository.save(jackson);

        System.out.println("Default departments and users loaded successfully!");
    }
}
