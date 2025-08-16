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

        if(departmentRepository.count() > 0 || userRepository.count() > 0){
            logger.info("Departments and users already exist. Skipping data loader.");
            return;
        }

        // ---------- Preload manager first ----------
        User sunitha = new User();
        sunitha.setUsername("Sunitha");
        sunitha.setEmail("jane@example.com");
        sunitha.setPasswordHash(DEFAULT_PASSWORD);
        sunitha.setRole(User.Role.MANAGER);
        sunitha.setEmployeeId("EMP102");
        sunitha.setIsActive(true);
        sunitha.setManager(null);
        sunitha = userRepository.save(sunitha); // Save manager first

        // ---------- Preload Departments with manager ----------
        Department finance = new Department();
        finance.setDepartmentName("Finance");
        finance.setDepartmentCode("FIN01");
        finance.setBudgetLimit(new BigDecimal("100000"));
        finance.setCostCenter("CC102");
        finance.setIsActive(true);
        finance.setManager(sunitha); // set manager before saving

        Department it = new Department();
        it.setDepartmentName("IT");
        it.setDepartmentCode("IT01");
        it.setBudgetLimit(new BigDecimal("75000"));
        it.setCostCenter("CC103");
        it.setIsActive(true);
        it.setManager(sunitha);

        Department marketing = new Department();
        marketing.setDepartmentName("Marketing");
        marketing.setDepartmentCode("MKT01");
        marketing.setBudgetLimit(new BigDecimal("60000"));
        marketing.setCostCenter("CC104");
        marketing.setIsActive(true);
        marketing.setManager(sunitha);

        departmentRepository.save(finance);
        departmentRepository.save(it);
        departmentRepository.save(marketing);

        // ---------- Preload other users ----------
        saveUser("Mahesh","alice@example.com", User.Role.FINANCE_MANAGER, "EMP103", finance, sunitha);
        saveUser("Ramya","bob@example.com", User.Role.ADMIN, "EMP104", it, sunitha);
        saveUser("Jackson","eve@example.com", User.Role.AUDITOR, "EMP105", marketing, sunitha);

        logger.info("Default departments and users loaded successfully!");
    }

    private void saveUser(String username, String email, User.Role role, String empId,
                          Department dept, User manager){
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
