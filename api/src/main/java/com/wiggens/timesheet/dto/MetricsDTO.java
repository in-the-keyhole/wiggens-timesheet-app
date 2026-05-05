package com.wiggens.timesheet.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MetricsDTO {
    private long employeeCount;
    private long timesheetCount;
}

