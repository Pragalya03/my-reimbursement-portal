// package com.examly.springapp.model;

// import jakarta.persistence.*;
// import java.math.BigDecimal;
// import java.util.List;

// @Entity
// @Table(name = "departments")
// public class Department {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Column(name = "department_name", nullable = false, length = 100)
//     private String departmentName;

//     @Column(name = "department_code", unique = true, nullable = false, length = 10)
//     private String departmentCode;

//     @OneToOne
//     @JoinColumn(name = "manager_id")
//     private User manager;

//     @Column(name = "budget_limit", precision = 12, scale = 2)
//     private BigDecimal budgetLimit;

//     @Column(name = "cost_center", length = 20)
//     private String costCenter;

//     @Column(name = "is_active", nullable = false)
//     private Boolean isActive = true;

//     @OneToMany(mappedBy = "department")
//     private List<User> users;

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     public String getDepartmentName() {
//         return departmentName;
//     }

//     public void setDepartmentName(String departmentName) {
//         this.departmentName = departmentName;
//     }

//     public String getDepartmentCode() {
//         return departmentCode;
//     }

//     public void setDepartmentCode(String departmentCode) {
//         this.departmentCode = departmentCode;
//     }

//     public User getManager() {
//         return manager;
//     }

//     public void setManager(User manager) {
//         this.manager = manager;
//     }

//     public BigDecimal getBudgetLimit() {
//         return budgetLimit;
//     }

//     public void setBudgetLimit(BigDecimal budgetLimit) {
//         this.budgetLimit = budgetLimit;
//     }

//     public String getCostCenter() {
//         return costCenter;
//     }

//     public void setCostCenter(String costCenter) {
//         this.costCenter = costCenter;
//     }

//     public Boolean getIsActive() {
//         return isActive;
//     }

//     public void setIsActive(Boolean isActive) {
//         this.isActive = isActive;
//     }

//     public List<User> getUsers() {
//         return users;
//     }

//     public void setUsers(List<User> users) {
//         this.users = users;
//     }

//     public Department(Long id, String departmentName, String departmentCode, User manager, BigDecimal budgetLimit,
//             String costCenter, Boolean isActive, List<User> users) {
//         this.id = id;
//         this.departmentName = departmentName;
//         this.departmentCode = departmentCode;
//         this.manager = manager;
//         this.budgetLimit = budgetLimit;
//         this.costCenter = costCenter;
//         this.isActive = isActive;
//         this.users = users;
//     }

//     // Getters and setters
    
// }


package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "department_name", nullable = false, length = 100)
    private String departmentName;

    @Column(name = "department_code", unique = true, nullable = false, length = 10)
    private String departmentCode;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    @JsonIgnoreProperties({"department", "passwordHash"}) // prevent recursion and hide sensitive data
    private User manager;

    @Column(name = "budget_limit", precision = 12, scale = 2)
    private BigDecimal budgetLimit;

    @Column(name = "cost_center", length = 20)
    private String costCenter;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"department", "manager", "passwordHash"})
    private List<User> users;

    public Department() {}

    public Department(Long id, String departmentName, String departmentCode, User manager, BigDecimal budgetLimit,
            String costCenter, Boolean isActive, List<User> users) {
        this.id = id;
        this.departmentName = departmentName;
        this.departmentCode = departmentCode;
        this.manager = manager;
        this.budgetLimit = budgetLimit;
        this.costCenter = costCenter;
        this.isActive = isActive;
        this.users = users;
    }

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }

    public String getDepartmentCode() { return departmentCode; }
    public void setDepartmentCode(String departmentCode) { this.departmentCode = departmentCode; }

    public User getManager() { return manager; }
    public void setManager(User manager) { this.manager = manager; }

    public BigDecimal getBudgetLimit() { return budgetLimit; }
    public void setBudgetLimit(BigDecimal budgetLimit) { this.budgetLimit = budgetLimit; }

    public String getCostCenter() { return costCenter; }
    public void setCostCenter(String costCenter) { this.costCenter = costCenter; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public List<User> getUsers() { return users; }
    public void setUsers(List<User> users) { this.users = users; }
}
