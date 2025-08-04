package com.examly.springapp.controller;

import com.examly.springapp.model.Expense;
import com.examly.springapp.repository.ExpenseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ExpenseControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private ExpenseRepository expenseRepository;

        @Autowired
        private ObjectMapper objectMapper;

        @BeforeEach
        public void setup() {
                expenseRepository.deleteAll();
        }

        @Test
        public void controller_testCreateExpense_Success() throws Exception {
                Expense expense = new Expense();
                expense.setEmployeeId(101L);
                expense.setAmount(150.75);
                expense.setDescription("Office supplies");
                expense.setDate(LocalDate.of(2023, 10, 15));

                mockMvc.perform(post("/api/expenses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(expense)))
                        .andExpect(status().isCreated())
                        .andExpect(jsonPath("$.id").exists())
                        .andExpect(jsonPath("$.employeeId").value(101L))
                        .andExpect(jsonPath("$.amount").value(150.75))
                        .andExpect(jsonPath("$.description").value("Office supplies"))
                        .andExpect(jsonPath("$.status").value("PENDING"))
                        .andExpect(jsonPath("$.remarks").doesNotExist());
        }

        @Test
        public void controller_testCreateExpense_ValidationFailure() throws Exception {
                Expense expense = new Expense();
                expense.setEmployeeId(null);
                expense.setAmount(-5.0);
                expense.setDescription("");
                expense.setDate(LocalDate.of(2030, 1, 1)); // future date

                mockMvc.perform(post("/api/expenses")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(expense)))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.error").value("Validation failed"))
                        .andExpect(jsonPath("$.message", not(emptyString())));
        }

        @Test
        public void controller_testGetAllExpenses() throws Exception {
                Expense expense1 = new Expense();
                expense1.setEmployeeId(101L);
                expense1.setAmount(150.75);
                expense1.setDescription("Office supplies A");
                expense1.setDate(LocalDate.of(2023, 10, 15));
                expenseRepository.save(expense1);

                Expense expense2 = new Expense();
                expense2.setEmployeeId(102L);
                expense2.setAmount(75.50);
                expense2.setDescription("Transportation B");
                expense2.setDate(LocalDate.of(2023, 10, 10));
                expense2.setStatus("APPROVED");
                expense2.setRemarks("Approved as per policy");
                expenseRepository.save(expense2);

                mockMvc.perform(get("/api/expenses"))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$", hasSize(2)))
                        .andExpect(jsonPath("$[0].id").exists())
                        .andExpect(jsonPath("$[1].id").exists());
        }

        @Test
        public void controller_testUpdateExpenseStatus_Approve() throws Exception {
                Expense expense = new Expense();
                expense.setEmployeeId(201L);
                expense.setAmount(500.00);
                expense.setDescription("Hotel stay");
                expense.setDate(LocalDate.now().minusDays(1));
                expenseRepository.save(expense);

                Long id = expense.getId();
                String reqJson = "{" +
                        "\"status\": \"APPROVED\"," +
                        "\"remarks\": \"Approved as per policy\"}";

                mockMvc.perform(put("/api/expenses/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.id").exists())
                        .andExpect(jsonPath("$.status").value("APPROVED"))
                        .andExpect(jsonPath("$.remarks").value("Approved as per policy"));
        }

        @Test
        public void controller_testUpdateExpenseStatus_Reject_MissingRemarks() throws Exception {
                Expense expense = new Expense();
                expense.setEmployeeId(301L);
                expense.setAmount(220.00);
                expense.setDescription("Food expense");
                expense.setDate(LocalDate.now().minusDays(2));
                expenseRepository.save(expense);

                Long id = expense.getId();
                String reqJson = "{" +
                        "\"status\": \"REJECTED\", \"remarks\": \"\"}";

                mockMvc.perform(put("/api/expenses/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.error").value("Validation failed"))
                        .andExpect(jsonPath("$.message", containsString("Remarks are required")));
        }

        @Test
        public void controller_testUpdateExpenseStatus_NotFound() throws Exception {
                String reqJson = "{" +
                        "\"status\": \"APPROVED\"," +
                        "\"remarks\": \"ok\"}";

                mockMvc.perform(put("/api/expenses/99999/status")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(reqJson))
                        .andExpect(status().isNotFound())
                        .andExpect(jsonPath("$.error").value("Not Found"))
                        .andExpect(jsonPath("$.message", not(emptyString())));
        }

        @Test
        public void controller_testUpdateExpenseStatus_InvalidStatus() throws Exception {
                Expense expense = new Expense();
                expense.setEmployeeId(401L);
                expense.setAmount(399.25);
                expense.setDescription("Software tools");
                expense.setDate(LocalDate.now().minusDays(3));
                expenseRepository.save(expense);

                Long id = expense.getId();
                // Correct JSON body (no syntax errors)
                String reqJson = "{" +
                        "\"status\": \"INVALID\", \"remarks\": \"Test\"}";

                mockMvc.perform(put("/api/expenses/" + id + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(reqJson))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.error").value("Validation failed"))
                        .andExpect(jsonPath("$.message", containsString("Status must be either APPROVED or REJECTED")));
        }

        @Test
                public void controller_testCreateExpense_MissingDate() throws Exception {
                Expense expense = new Expense();
                expense.setEmployeeId(101L);
                expense.setAmount(120.00);
                expense.setDescription("Travel");

                mockMvc.perform(post("/api/expenses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(expense)))
                        .andExpect(status().isBadRequest())
                        .andExpect(jsonPath("$.error").value("Validation failed"))
                        .andExpect(jsonPath("$.message", containsString("Date is required")));
        }

        

        @Test
                public void controller_testGetExpenseById_NotFound() throws Exception {
                mockMvc.perform(get("/api/expenses/99999"))
                        .andExpect(status().isNotFound())
                        .andExpect(jsonPath("$.error").value("Not Found"));
        }
        
        @Test
        public void controller_testCreateExpense_ZeroAmount() throws Exception {
        Expense expense = new Expense();
        expense.setEmployeeId(701L);
        expense.setAmount(0.0);
        expense.setDescription("Zero amount test");
        expense.setDate(LocalDate.now());

        mockMvc.perform(post("/api/expenses")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(expense)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("Validation failed"))
                .andExpect(jsonPath("$.message", containsString("Amount must be greater than 0")));
        }

}
