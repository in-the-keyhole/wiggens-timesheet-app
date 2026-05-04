package com.wiggens.timesheet.web;

import com.wiggens.timesheet.TimesheetApiApplication;
import com.wiggens.timesheet.web.dto.MetricsDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = TimesheetApiApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MetricsControllerTest {
    @LocalServerPort
    int port;

    @Autowired
    TestRestTemplate restTemplate;

    private String base() { return "http://localhost:" + port + "/codex-example/api/v1"; }

    @Test
    void metricsReturnsCounts() {
        ResponseEntity<MetricsDto> resp = restTemplate.getForEntity(base() + "/metrics", MetricsDto.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().getEmployeeCount()).isGreaterThanOrEqualTo(0);
        assertThat(resp.getBody().getTimesheetCount()).isGreaterThanOrEqualTo(0);
    }
}

