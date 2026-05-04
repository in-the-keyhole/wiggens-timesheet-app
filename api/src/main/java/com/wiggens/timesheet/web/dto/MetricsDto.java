package com.wiggens.timesheet.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MetricsDto {
    private long employeeCount;
    private long timesheetCount;
}

