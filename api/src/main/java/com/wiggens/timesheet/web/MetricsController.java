package com.wiggens.timesheet.web;

import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/codex-example/api/v1/metrics")
@RequiredArgsConstructor
public class MetricsController {
    private final EmployeeRepository employeeRepository;
    private final TimesheetRepository timesheetRepository;

    @GetMapping
    public Map<String, Long> metrics() {
        return Map.of(
                "employees", employeeRepository.count(),
                "timesheets", timesheetRepository.count()
        );
    }
}

