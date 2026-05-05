package com.wiggens.timesheet.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportItemDTO {
    private Long employeeId;
    private String employeeName;
    private double totalHours;
}

