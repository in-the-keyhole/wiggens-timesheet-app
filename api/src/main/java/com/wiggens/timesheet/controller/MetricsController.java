package com.wiggens.timesheet.controller;

import com.wiggens.timesheet.dto.MetricsDTO;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/codex-example/api/v1/metrics")
@RequiredArgsConstructor
public class MetricsController {
    private final EmployeeRepository employeeRepository;
    private final TimesheetRepository timesheetRepository;

    @GetMapping
    public MetricsDTO get() {
        return MetricsDTO.builder()
                .employeeCount(employeeRepository.count())
                .timesheetCount(timesheetRepository.count())
                .build();
    }
}

