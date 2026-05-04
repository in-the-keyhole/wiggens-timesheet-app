package com.wiggens.timesheet.web;

import com.wiggens.timesheet.TimesheetApiApplication;
import com.wiggens.timesheet.web.dto.EmployeeDto;
import com.wiggens.timesheet.web.dto.TimesheetDtos;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = TimesheetApiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TimesheetControllerTest {
    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate restTemplate;

    private String base() { return "http://localhost:" + port + "/codex-example/api/v1"; }

    @Test
    void submitTimesheetAndFetchReport() {
        // Find a seeded employee
        ResponseEntity<EmployeeDto[]> list = restTemplate.getForEntity(base() + "/employees", EmployeeDto[].class);
        assertThat(list.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(list.getBody()).isNotNull();
        Long empId = list.getBody()[0].getId();

        // Prepare a simple 7-day timesheet with 1 hour per day
        LocalDate monday = LocalDate.now().with(java.time.DayOfWeek.MONDAY);
        TimesheetDtos.TimesheetRequest req = new TimesheetDtos.TimesheetRequest();
        req.setEmployeeId(empId);
        req.setWeekStart(monday);
        List<TimesheetDtos.EntryDto> entries = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            TimesheetDtos.EntryDto e = new TimesheetDtos.EntryDto();
            e.setWorkDate(monday.plusDays(i));
            e.setHours(1.0);
            entries.add(e);
        }
        req.setEntries(entries);

        ResponseEntity<TimesheetDtos.TimesheetSummary> submit = restTemplate.postForEntity(base() + "/timesheets", req, TimesheetDtos.TimesheetSummary.class);
        assertThat(submit.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(submit.getBody()).isNotNull();
        assertThat(submit.getBody().getTotalHours()).isEqualTo(7.0);

        // Fetch report for the same week
        ResponseEntity<TimesheetDtos.TimesheetSummary[]> report = restTemplate.getForEntity(base() + "/reports?weekStart=" + monday, TimesheetDtos.TimesheetSummary[].class);
        assertThat(report.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(report.getBody()).isNotNull();
        assertThat(report.getBody().length).isGreaterThanOrEqualTo(1);
        assertThat(report.getBody()[0].getTotalHours()).isGreaterThanOrEqualTo(7.0);
    }
}

