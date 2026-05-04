package com.wiggens.timesheet.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetricsDto {
    private long employeeCount;
    private long timesheetCount;
}

