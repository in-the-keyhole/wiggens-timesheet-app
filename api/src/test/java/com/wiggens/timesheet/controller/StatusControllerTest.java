package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.domain.Employee;
import com.wiggens.timesheet.domain.Timesheet;
import com.wiggens.timesheet.domain.TimesheetEntry;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.DayOfWeek;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class StatusControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    TimesheetRepository timesheetRepository;

    LocalDate weekStart;

    @BeforeEach
    void setup() {
        weekStart = LocalDate.now().with(java.time.DayOfWeek.MONDAY);
        timesheetRepository.deleteAll();
    }

    @Test
    void listsEmployeesWithNoHours() throws Exception {
        Employee anyEmp = employeeRepository.findAll().get(0);
        // create a timesheet with hours for the first employee to exclude them from results
        Timesheet ts = Timesheet.builder().employee(anyEmp).weekStart(weekStart).build();
        ts.getEntries().add(TimesheetEntry.builder().timesheet(ts).dayOfWeek(DayOfWeek.MONDAY).hours(8).build());
        timesheetRepository.save(ts);

        mockMvc.perform(get("/codex-example/api/v1/status/inactive")
                        .param("weekStart", weekStart.toString())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                // should return at least one employee (the other seeded one)
                .andExpect(jsonPath("$[0].id").exists());
    }
}

