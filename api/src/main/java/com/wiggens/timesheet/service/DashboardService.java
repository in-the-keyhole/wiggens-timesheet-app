package com.wiggens.timesheet.service;

import com.wiggens.timesheet.dto.DashboardSummaryDto;
import com.wiggens.timesheet.repository.EmployeeRepository;
import com.wiggens.timesheet.repository.TimesheetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final EmployeeRepository employeeRepository;
    private final TimesheetRepository timesheetRepository;

    public DashboardSummaryDto getSummary() {
        long employeeCount = employeeRepository.count();
        long timesheetCount = timesheetRepository.count();
        return DashboardSummaryDto.builder()
                .employeeCount(employeeCount)
                .timesheetCount(timesheetCount)
                .build();
    }
}

