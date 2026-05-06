package com.wiggens.timesheet.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wiggens.timesheet.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TimesheetControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void submitTimesheetWithNotes_persistsAndReturnsNotes() throws Exception {
        Long employeeId = employeeRepository.findAll().get(0).getId();
        LocalDate monday = LocalDate.now().with(DayOfWeek.MONDAY);

        Map<String, Object> payload = Map.of(
                "employeeId", employeeId,
                "weekStart", monday.toString(),
                "status", "OPEN",
                "entries", List.of(
                        Map.of("dayOfWeek", "MONDAY", "hours", 8, "notes", "Worked on feature A"),
                        Map.of("dayOfWeek", "TUESDAY", "hours", 6, "notes", "Code review and planning")
                )
        );

        mockMvc.perform(post("/codex-example/api/v1/timesheets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.entries[0].notes").value("Worked on feature A"))
                .andExpect(jsonPath("$.entries[1].notes").value("Code review and planning"));
    }
}

