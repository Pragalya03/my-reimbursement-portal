package com.examly.springapp.config;

import com.examly.springapp.model.Department;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.DepartmentRepository;
import com.examly.springapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);
    private static final String DEFAULT_PASSWORD = "pass123";

    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    public DataLoader(DepartmentRepository departmentRepository, UserRepository userRepository) {
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // ---------- Preload Departments ----------
        Department finance = departmentRepository.findByDepartmentCode("FIN01")
                .orElseGet(() -> {
                    Department d = new Department();
                    d.setDepartmentName("Finance");
                    d.setDepartmentCode("FIN01");
                    d.setBudgetLimit(new BigDecimal("100000"));
                    d.setCostCenter("CC102");
                    d.setIsActive(true);
                    return departmentRepository.save(d);
                });

        Department it = departmentRepository.findByDepartmentCode("IT01")
                .orElseGet(() -> {
                    Department d = new Department();
                    d.setDepartmentName("IT");
                    d.setDepartmentCode("IT01");
                    d.setBudgetLimit(new BigDecimal("75000"));
                    d.setCostCenter("CC103");
                    d.setIsActive(true);
                    return departmentRepository.save(d);
                });

        Department marketing = departmentRepository.findByDepartmentCode("MKT01")
                .orElseGet(() -> {
                    Department d = new Department();
                    d.setDepartmentName("Marketing");
                    d.setDepartmentCode("MKT01");
                    d.setBudgetLimit(new BigDecimal("60000"));
                    d.setCostCenter("CC104");
                    d.setIsActive(true);
                    return departmentRepository.save(d);
                });

        // ---------- Preload Users ----------
        // 1. Manager Sunitha
        Optional<User> sunithaOpt = userRepository.findByEmail("jane@example.com");
        User sunitha = sunithaOpt.orElseGet(() -> {
            User u = new User();
            u.setUsername("Sunitha");
            u.setEmail("jane@example.com");
            u.setPasswordHash(DEFAULT_PASSWORD);
            u.setRole(User.Role.MANAGER);
            u.setEmployeeId("EMP102");
            u.setDepartment(finance);
            u.setManager(null);
            u.setIsActive(true);
            return userRepository.save(u);
        });

        // 2. Assign manager to all departments
        finance.setManager(sunitha);
        it.setManager(sunitha);
        marketing.setManager(sunitha);
        departmentRepository.save(finance);
        departmentRepository.save(it);
        departmentRepository.save(marketing);

        // 3. Other users
        saveUserIfNotExists("Mahesh", "alice@example.com", User.Role.FINANCE_MANAGER, "EMP103", finance, sunitha);
        saveUserIfNotExists("Ramya", "bob@example.com", User.Role.ADMIN, "EMP104", it, sunitha);
        saveUserIfNotExists("Jackson", "eve@example.com", User.Role.AUDITOR, "EMP105", marketing, sunitha);

        logger.info("Default departments and users loaded successfully!");
    }

    private void saveUserIfNotExists(String username, String email, User.Role role, String empId,
                                     Department dept, User manager) {
        if(userRepository.findByEmail(email).isEmpty()) {
            User u = new User();
            u.setUsername(username);
            u.setEmail(email);
            u.setPasswordHash(DEFAULT_PASSWORD);
            u.setRole(role);
            u.setEmployeeId(empId);
            u.setDepartment(dept);
            u.setManager(manager);
            u.setIsActive(true);
            userRepository.save(u);
        }
    }
}
