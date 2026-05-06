package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/codex-example/api/v1/metrics")
@RequiredArgsConstructor
public class MetricsController {
    private final EmployeeRepository employeeRepository;
    private final TimesheetRepository timesheetRepository;

    @GetMapping
    public Map<String, Object> metrics() {
        Map<String, Object> m = new HashMap<>();
        m.put("employeeCount", employeeRepository.count());
        m.put("timesheetCount", timesheetRepository.count());
        return m;
    }
}

