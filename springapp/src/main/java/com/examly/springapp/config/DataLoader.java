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

        if (departmentRepository.count() > 0 || userRepository.count() > 0) {
            logger.info("Departments and users already exist. Skipping data loader.");
            return;
        }

        // ---------- Preload Departments ----------
        Department finance = new Department();
        finance.setId(2L);
        finance.setDepartmentName("Finance");
        finance.setDepartmentCode("FIN01");
        finance.setBudgetLimit(new BigDecimal("100000"));
        finance.setCostCenter("CC102");
        finance.setIsActive(true);

        Department it = new Department();
        it.setId(3L);
        it.setDepartmentName("IT");
        it.setDepartmentCode("IT01");
        it.setBudgetLimit(new BigDecimal("75000"));
        it.setCostCenter("CC103");
        it.setIsActive(true);

        Department marketing = new Department();
        marketing.setId(4L);
        marketing.setDepartmentName("Marketing");
        marketing.setDepartmentCode("MKT01");
        marketing.setBudgetLimit(new BigDecimal("60000"));
        marketing.setCostCenter("CC104");
        marketing.setIsActive(true);

        departmentRepository.save(finance);
        departmentRepository.save(it);
        departmentRepository.save(marketing);

        // ---------- Preload Users ----------
        User sunitha = new User();
        sunitha.setUsername("Sunitha");
        sunitha.setEmail("jane@example.com");
        sunitha.setPasswordHash(DEFAULT_PASSWORD);
        sunitha.setRole(User.Role.MANAGER);
        sunitha.setEmployeeId("EMP102");
        sunitha.setDepartment(finance);
        sunitha.setManager(null);
        sunitha.setIsActive(true);

        // Save manager first
        userRepository.save(sunitha);

        User mahesh = new User();
        mahesh.setUsername("Mahesh");
        mahesh.setEmail("alice@example.com");
        mahesh.setPasswordHash(DEFAULT_PASSWORD);
        mahesh.setRole(User.Role.FINANCE_MANAGER);
        mahesh.setEmployeeId("EMP103");
        mahesh.setDepartment(finance);
        mahesh.setManager(sunitha);
        mahesh.setIsActive(true);

        User ramya = new User();
        ramya.setUsername("Ramya");
        ramya.setEmail("bob@example.com");
        ramya.setPasswordHash(DEFAULT_PASSWORD);
        ramya.setRole(User.Role.ADMIN);
        ramya.setEmployeeId("EMP104");
        ramya.setDepartment(it);
        ramya.setManager(sunitha);
        ramya.setIsActive(true);

        User jackson = new User();
        jackson.setUsername("Jackson");
        jackson.setEmail("eve@example.com");
        jackson.setPasswordHash(DEFAULT_PASSWORD);
        jackson.setRole(User.Role.AUDITOR);
        jackson.setEmployeeId("EMP105");
        jackson.setDepartment(marketing);
        jackson.setManager(sunitha);
        jackson.setIsActive(true);

        // Save remaining users
        userRepository.save(mahesh);
        userRepository.save(ramya);
        userRepository.save(jackson);

        logger.info("Default departments and users loaded successfully!");
    }
}
