package com.wiggens.timesheet.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wiggens.timesheet.dto.CreateTimesheetRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MetricsAndTimesheetIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void metrics_and_submit_timesheet_flow() throws Exception {
        // Verify seeded employees present
        mockMvc.perform(get("/codex-example/api/v1/employees"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))));

        // Check initial metrics
        mockMvc.perform(get("/codex-example/api/v1/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.employeeCount", greaterThanOrEqualTo(2)))
                .andExpect(jsonPath("$.timesheetCount", is(0)));

        // Submit a timesheet for employee id 1 (seed order is deterministic enough for test here)
        CreateTimesheetRequest req = CreateTimesheetRequest.builder()
                .employeeId(1L)
                .weekStart(LocalDate.now().with(java.time.DayOfWeek.MONDAY))
                .mon(8).tue(8).wed(8).thu(8).fri(8).sat(0).sun(0)
                .build();

        mockMvc.perform(post("/codex-example/api/v1/timesheets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.totalHours", is(40.0)));

        // Metrics should reflect 1 timesheet
        mockMvc.perform(get("/codex-example/api/v1/metrics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.timesheetCount", is(1)));
    }
}

