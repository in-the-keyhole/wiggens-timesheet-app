package com.wiggens.timesheet.web;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wiggens.timesheet.dto.DashboardSummaryDto;
import com.wiggens.timesheet.dto.EmployeeDto;
import com.wiggens.timesheet.dto.TimesheetDto;
import com.wiggens.timesheet.dto.TimesheetEntryDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class DashboardControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @Test
    void returnsSummaryCounts() throws Exception {
        // ensure at least one employee and one timesheet exist
        EmployeeDto employee = EmployeeDto.builder().firstName("Alan").lastName("Turing").build();
        String empJson = mockMvc.perform(post("/codex-example/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(employee)))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        EmployeeDto createdEmp = mapper.readValue(empJson, new TypeReference<>(){});

        LocalDate monday = LocalDate.now().with(java.time.DayOfWeek.MONDAY);
        TimesheetDto ts = TimesheetDto.builder()
                .employeeId(createdEmp.getId())
                .weekStart(monday)
                .entries(List.of(
                        TimesheetEntryDto.builder().dayOfWeek(DayOfWeek.MONDAY).projectCode("PRJ1").hours(8.0).build()
                ))
                .build();
        mockMvc.perform(post("/codex-example/api/v1/timesheets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(ts)))
                .andExpect(status().isOk());

        String summaryJson = mockMvc.perform(get("/codex-example/api/v1/dashboard/summary"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        DashboardSummaryDto summary = mapper.readValue(summaryJson, new TypeReference<>(){});

        assertThat(summary.getEmployeeCount()).isGreaterThanOrEqualTo(1);
        assertThat(summary.getTimesheetCount()).isGreaterThanOrEqualTo(1);
    }
}

