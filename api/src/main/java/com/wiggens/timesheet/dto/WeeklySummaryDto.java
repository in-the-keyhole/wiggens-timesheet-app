package com.wiggens.timesheet.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WeeklySummaryDto {
    private Long employeeId;
    private String employeeName;
    private LocalDate weekStart;
    private double totalHours;
}

