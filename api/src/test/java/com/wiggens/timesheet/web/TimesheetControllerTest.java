package com.wiggens.timesheet.web;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
class TimesheetControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @Test
    void upsertAndFetchTimesheet() throws Exception {
        // create employee
        EmployeeDto employee = EmployeeDto.builder().firstName("Grace").lastName("Hopper").build();
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
                        TimesheetEntryDto.builder().dayOfWeek(DayOfWeek.MONDAY).projectCode("PRJ1").hours(8.0).build(),
                        TimesheetEntryDto.builder().dayOfWeek(DayOfWeek.TUESDAY).projectCode("PRJ1").hours(7.5).build()
                ))
                .build();

        String upsertJson = mockMvc.perform(post("/codex-example/api/v1/timesheets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(ts)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        TimesheetDto saved = mapper.readValue(upsertJson, new TypeReference<>(){});
        assertThat(saved.getEntries()).hasSize(2);

        mockMvc.perform(get("/codex-example/api/v1/timesheets/employee/" + createdEmp.getId())
                        .param("weekStart", monday.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.entries.length()").value(2));
    }
}

