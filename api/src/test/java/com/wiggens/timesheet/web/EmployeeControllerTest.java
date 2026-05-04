package com.wiggens.timesheet.web;

import com.wiggens.timesheet.TimesheetApiApplication;
import com.wiggens.timesheet.web.dto.EmployeeDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = TimesheetApiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EmployeeControllerTest {
    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate restTemplate;

    private String base() { return "http://localhost:" + port + "/codex-example/api/v1"; }

    @Test
    void listEmployeesReturnsSeeded() {
        ResponseEntity<EmployeeDto[]> resp = restTemplate.getForEntity(base() + "/employees", EmployeeDto[].class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().length).isGreaterThanOrEqualTo(2);
    }
}

