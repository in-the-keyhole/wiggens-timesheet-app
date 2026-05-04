package com.wiggens.timesheet.service;

import com.wiggens.timesheet.dto.MetricsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MetricsService {
    private final EmployeeService employeeService;
    private final TimesheetService timesheetService;

    public MetricsDto getMetrics() {
        return MetricsDto.builder()
                .employeeCount(employeeService.countEmployees())
                .timesheetCount(timesheetService.countTimesheets())
                .build();
    }
}

