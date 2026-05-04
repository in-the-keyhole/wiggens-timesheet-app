package com.wiggens.timesheet.web;

import com.wiggens.timesheet.service.EmployeeService;
import com.wiggens.timesheet.service.TimesheetService;
import com.wiggens.timesheet.web.dto.MetricsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${app.api-base}")
@RequiredArgsConstructor
public class MetricsController {
    private final EmployeeService employeeService;
    private final TimesheetService timesheetService;

    @GetMapping("/metrics")
    public MetricsDto metrics() {
        return new MetricsDto(employeeService.count(), timesheetService.count());
    }
}

